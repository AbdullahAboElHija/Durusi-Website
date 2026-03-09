import { useState } from "react";
import type { Lesson } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Lock, CheckCircle2, XCircle, MapPin, MonitorPlay, 
  Calendar, Clock, Loader2, ShieldCheck, AlertCircle, User
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setAuthError("كلمة المرور غير صحيحة");
      }
    } catch {
      setAuthError("حدث خطأ في الاتصال");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <Card className="border-border/60 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-primary mb-2" data-testid="text-admin-login-title">لوحة الإدارة</h1>
              <p className="text-muted-foreground text-sm">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password">كلمة المرور</Label>
                <Input 
                  id="admin-password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  className="text-center"
                  required
                  data-testid="input-admin-password"
                />
              </div>

              {authError && (
                <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {authError}
                </div>
              )}

              <Button type="submit" className="w-full font-bold" data-testid="button-admin-login">
                دخول
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard password={password} />;
}

function AdminDashboard({ password }: { password: string }) {
  const headers = { "x-admin-password": password };

  const { data: pendingLessons = [], isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/admin/lessons"],
    queryFn: async () => {
      const res = await fetch("/api/admin/lessons", { headers });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    refetchInterval: 15000,
  });

  const { data: adminStats } = useQuery<{ pending: number }>({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", { headers });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "rejected" }) => {
      const res = await fetch(`/api/admin/lessons/${id}`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/lessons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/lessons/stats"] });
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary flex items-center gap-3" data-testid="text-admin-title">
            <ShieldCheck className="w-8 h-8" />
            لوحة الإدارة
          </h1>
          <p className="text-muted-foreground mt-1">إدارة ومراجعة الدروس المقدمة</p>
        </div>
        
        {adminStats && (
          <Badge variant="secondary" className="text-lg px-4 py-2 font-bold" data-testid="badge-pending-count">
            {adminStats.pending} بانتظار المراجعة
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : pendingLessons.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="py-20 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">لا توجد دروس بانتظار المراجعة</h3>
            <p className="text-muted-foreground">كل الدروس المقدمة تمت مراجعتها.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {pendingLessons.map(lesson => (
            <Card key={lesson._id} className="border-border/60 shadow-sm overflow-hidden" data-testid={`card-pending-${lesson._id}`}>
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-amber-100 text-amber-800 border-none font-semibold">
                      ⏳ بانتظار المراجعة
                    </Badge>
                    <Badge variant="outline" className="bg-muted/50 text-muted-foreground font-semibold border-none">
                      {lesson.topic}
                    </Badge>
                    {lesson.type === 'online' ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border-none font-semibold">
                        <MonitorPlay className="w-3 h-3 ml-1" />
                        أونلاين
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800 border-none font-semibold">
                        <MapPin className="w-3 h-3 ml-1" />
                        في المسجد
                      </Badge>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mb-3">{lesson.title}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4 shrink-0" />
                      <span className="font-semibold text-foreground">{lesson.sheikh}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{lesson.day} - {lesson.time}</span>
                    </div>
                    {lesson.type === 'mosque' && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{lesson.mosqueName}، {lesson.city}</span>
                      </div>
                    )}
                    {lesson.type === 'online' && lesson.platform && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MonitorPlay className="w-4 h-4 shrink-0" />
                        <span>{lesson.platform}</span>
                      </div>
                    )}
                  </div>

                  {lesson.description && (
                    <p className="text-muted-foreground text-sm bg-muted/30 rounded-lg p-3 mb-4">
                      {lesson.description}
                    </p>
                  )}

                  {lesson.whatsappContact && (
                    <p className="text-xs text-muted-foreground">
                      واتساب: <span dir="ltr" className="font-mono">{lesson.whatsappContact}</span>
                    </p>
                  )}
                </div>

                <Separator />

                <div className="p-4 bg-muted/20 flex flex-col sm:flex-row justify-end gap-3">
                  <Button 
                    variant="outline" 
                    className="text-destructive border-destructive/30 hover:bg-destructive/10 font-semibold"
                    onClick={() => statusMutation.mutate({ id: lesson._id, status: "rejected" })}
                    disabled={statusMutation.isPending}
                    data-testid={`button-reject-${lesson._id}`}
                  >
                    <XCircle className="w-4 h-4 ml-2" />
                    رفض
                  </Button>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    onClick={() => statusMutation.mutate({ id: lesson._id, status: "approved" })}
                    disabled={statusMutation.isPending}
                    data-testid={`button-approve-${lesson._id}`}
                  >
                    {statusMutation.isPending ? (
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    )}
                    اعتماد ونشر
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}