import type { Lesson } from "@shared/schema";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, MonitorPlay, Calendar, Clock, 
  User, BookOpen, Share2, MessageCircle, 
  ArrowRight, ExternalLink, BellPlus, Loader2, Map
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import NotFound from "./not-found";

export default function LessonDetail() {
  const params = useParams();
  const id = params.id;
  
  const { data: lesson, isLoading, isError } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !lesson) {
    return <NotFound />;
  }

  const formatArabicDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${lesson.title} - ${lesson.sheikh}`,
        text: `درس ${lesson.title} لفضيلة ${lesson.sheikh} عبر منصة دروسي`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/browse">
        <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground" data-testid="link-back-browse">
          <ArrowRight className="w-4 h-4 ml-2" />
          عودة للدروس
        </Button>
      </Link>

      <div className="bg-card border-border/60 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-primary/5 p-6 md:p-10 border-b border-border/40 relative">
          <div className="absolute left-0 top-0 w-32 h-32 bg-primary/5 rounded-br-full -z-10"></div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-3 py-1 font-bold text-sm">
              {lesson.topic}
            </Badge>
            {lesson.type === 'online' ? (
              <Badge className="bg-emerald-100 text-emerald-800 border-none font-semibold px-3 py-1 text-sm">
                <MonitorPlay className="w-4 h-4 ml-1.5" />
                أونلاين
              </Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-800 border-none font-semibold px-3 py-1 text-sm">
                <MapPin className="w-4 h-4 ml-1.5" />
                في المسجد
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-primary mb-4 leading-tight" data-testid="text-lesson-title">
            {lesson.title}
          </h1>
          
          <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-foreground" data-testid="text-lesson-sheikh">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="w-5 h-5" />
            </div>
            {lesson.sheikh}
          </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-secondary" />
                عن الدرس
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-lesson-description">
                {lesson.description || "لا يوجد وصف متاح لهذا الدرس."}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-secondary" />
                الموعد
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="bg-muted/50 border rounded-xl p-4 flex-1 min-w-[200px]">
                  <p className="text-sm text-muted-foreground mb-1">اليوم</p>
                  <p className="font-bold text-lg" data-testid="text-lesson-day">{lesson.day}</p>
                </div>
                <div className="bg-muted/50 border rounded-xl p-4 flex-1 min-w-[200px]">
                  <p className="text-sm text-muted-foreground mb-1">الساعة</p>
                  <p className="font-bold text-lg flex items-center gap-2" data-testid="text-lesson-time">
                    <Clock className="w-4 h-4 text-primary" />
                    {lesson.time}
                  </p>
                </div>
                {lesson.eventDate && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex-1 min-w-[200px]">
                    <p className="text-sm text-amber-700 mb-1">ينتهي بتاريخ</p>
                    <p className="font-bold text-lg text-amber-800" data-testid="text-lesson-event-date">
                      {formatArabicDate(lesson.eventDate)}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="border-border/60 bg-muted/20 shadow-none">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-bold text-lg border-b pb-3">المكان</h3>
                
                {lesson.type === 'mosque' ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold" data-testid="text-lesson-mosque">{lesson.mosqueName}</p>
                        <p className="text-sm text-muted-foreground">{lesson.address}، {lesson.city}</p>
                      </div>
                    </div>
                    {lesson.mapsUrl ? (
                      <a href={lesson.mapsUrl} target="_blank" rel="noreferrer" className="block w-full mt-2">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" data-testid="button-google-maps">
                          <Map className="w-4 h-4 ml-2" />
                          افتح في Google Maps
                        </Button>
                      </a>
                    ) : (
                      <div className="w-full h-24 bg-muted rounded-lg flex items-center justify-center border border-border mt-2">
                        <p className="text-xs text-muted-foreground flex flex-col items-center gap-1">
                          <MapPin className="w-5 h-5 opacity-40" />
                          لا يوجد رابط خريطة
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MonitorPlay className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold" data-testid="text-lesson-platform">عبر {lesson.platform}</p>
                        <p className="text-sm text-muted-foreground">بث مباشر أو لقاء تفاعلي</p>
                      </div>
                    </div>
                    {lesson.link && (
                      <a href={lesson.link} target="_blank" rel="noreferrer" className="block w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" data-testid="button-go-lesson">
                          الذهاب للدرس
                          <ExternalLink className="w-4 h-4 mr-2" />
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button variant="outline" className="w-full font-semibold border-primary/20 hover:bg-primary/5 text-primary" data-testid="button-add-reminder">
                <BellPlus className="w-4 h-4 ml-2" />
                أضف للمفكرة
              </Button>
              
              <Button onClick={handleShare} variant="outline" className="w-full font-semibold border-border bg-card" data-testid="button-share">
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة الدرس
              </Button>
              
              {lesson.whatsappContact && (
                <a href={`https://wa.me/${lesson.whatsappContact}`} target="_blank" rel="noreferrer" className="block w-full">
                  <Button className="w-full font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white border-none" data-testid="button-whatsapp">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    تواصل للاستفسار
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}