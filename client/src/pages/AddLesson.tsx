import { useState } from "react";
import { CITIES, TOPICS, PLATFORMS } from "@/data/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MonitorPlay, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function AddLesson() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [lessonType, setLessonType] = useState<'mosque' | 'online' | null>(null);

  const [title, setTitle] = useState("");
  const [sheikh, setSheikh] = useState("");
  const [topic, setTopic] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mosqueName, setMosqueName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "فشل في إضافة الدرس");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/lessons/stats"] });
      setStep(3);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Record<string, any> = {
      type: lessonType,
      title,
      sheikh,
      topic,
      day,
      time,
      description: description || null,
      whatsappContact: whatsapp || null,
    };

    if (lessonType === "mosque") {
      data.mosqueName = mosqueName;
      data.city = city;
      data.address = address || null;
    } else {
      data.platform = platform;
      data.link = link;
    }

    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-primary mb-2" data-testid="text-add-title">أضف درساً جديداً</h1>
        <p className="text-muted-foreground">ساهم في نشر العلم والدعوة بإضافة موعد الدرس</p>
      </div>

      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold text-center mb-6">ما هو نوع الدرس الذي تريد إضافته؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all border-2 hover:border-primary/50 hover:shadow-md ${lessonType === 'mosque' ? 'border-primary bg-primary/5' : 'border-border/60'}`}
              onClick={() => setLessonType('mosque')}
              data-testid="card-type-mosque"
            >
              <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${lessonType === 'mosque' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">درس في المسجد 🕌</h3>
                  <p className="text-sm text-muted-foreground">درس وجاهي يقام في مسجد أو مركز إسلامي</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all border-2 hover:border-primary/50 hover:shadow-md ${lessonType === 'online' ? 'border-primary bg-primary/5' : 'border-border/60'}`}
              onClick={() => setLessonType('online')}
              data-testid="card-type-online"
            >
              <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${lessonType === 'online' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <MonitorPlay className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">درس أونلاين 💻</h3>
                  <p className="text-sm text-muted-foreground">بث مباشر عبر زووم، يوتيوب، أو غيرها</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              className="px-10 text-lg" 
              disabled={!lessonType}
              onClick={() => setStep(2)}
              data-testid="button-continue"
            >
              المتابعة <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <Card className="border-border/60 shadow-sm animate-in fade-in slide-in-from-right-4">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                تفاصيل {lessonType === 'mosque' ? 'الدرس في المسجد' : 'الدرس الأونلاين'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-muted-foreground">
                تغيير النوع
              </Button>
            </div>

            {mutation.isError && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4 mb-6 text-sm">
                {mutation.error.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الدرس <span className="text-destructive">*</span></Label>
                  <Input id="title" required placeholder="مثال: شرح كتاب رياض الصالحين" value={title} onChange={e => setTitle(e.target.value)} data-testid="input-title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sheikh">اسم الشيخ / المحاضر <span className="text-destructive">*</span></Label>
                  <Input id="sheikh" required placeholder="اسم المحاضر كاملاً" value={sheikh} onChange={e => setSheikh(e.target.value)} data-testid="input-sheikh" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">موضوع الدرس <span className="text-destructive">*</span></Label>
                  <Select value={topic} onValueChange={setTopic} required>
                    <SelectTrigger dir="rtl" data-testid="select-topic">
                      <SelectValue placeholder="اختر الموضوع" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      {TOPICS.map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {lessonType === 'mosque' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="city">المدينة / البلدة <span className="text-destructive">*</span></Label>
                      <Select value={city} onValueChange={setCity} required>
                        <SelectTrigger dir="rtl" data-testid="select-city">
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent dir="rtl" className="max-h-64">
                          {CITIES.map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mosque">اسم المسجد / المركز <span className="text-destructive">*</span></Label>
                      <Input id="mosque" required placeholder="مثال: مسجد عمر بن الخطاب" value={mosqueName} onChange={e => setMosqueName(e.target.value)} data-testid="input-mosque" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان التفصيلي (اختياري)</Label>
                      <Input id="address" placeholder="اسم الحي أو الشارع" value={address} onChange={e => setAddress(e.target.value)} data-testid="input-address" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="platform">المنصة <span className="text-destructive">*</span></Label>
                      <Select value={platform} onValueChange={setPlatform} required>
                        <SelectTrigger dir="rtl" data-testid="select-platform">
                          <SelectValue placeholder="اختر المنصة" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                          {PLATFORMS.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="link">رابط البث أو القناة <span className="text-destructive">*</span></Label>
                      <Input id="link" type="url" required placeholder="https://..." dir="ltr" className="text-left" value={link} onChange={e => setLink(e.target.value)} data-testid="input-link" />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="day">اليوم <span className="text-destructive">*</span></Label>
                  <Select value={day} onValueChange={setDay} required>
                    <SelectTrigger dir="rtl" data-testid="select-day">
                      <SelectValue placeholder="اختر اليوم" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      <SelectItem value="السبت">السبت</SelectItem>
                      <SelectItem value="الأحد">الأحد</SelectItem>
                      <SelectItem value="الإثنين">الإثنين</SelectItem>
                      <SelectItem value="الثلاثاء">الثلاثاء</SelectItem>
                      <SelectItem value="الأربعاء">الأربعاء</SelectItem>
                      <SelectItem value="الخميس">الخميس</SelectItem>
                      <SelectItem value="الجمعة">الجمعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">الوقت المعتاد <span className="text-destructive">*</span></Label>
                  <Input id="time" required placeholder="مثال: بعد صلاة المغرب / 20:00 مساءً" value={time} onChange={e => setTime(e.target.value)} data-testid="input-time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">نبذة عن الدرس (اختياري)</Label>
                <Textarea 
                  id="description" 
                  placeholder="اكتب وصفاً مختصراً عما يتناوله الدرس..." 
                  className="min-h-24 resize-none"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  data-testid="textarea-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">رقم هاتف أو واتساب للاستفسار (اختياري)</Label>
                <Input id="whatsapp" type="tel" placeholder="للتواصل مع منظمي الدرس" dir="ltr" className="text-left" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} data-testid="input-whatsapp" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  رجوع
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 px-8 font-bold" disabled={mutation.isPending} data-testid="button-submit">
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جارٍ الإرسال...
                    </>
                  ) : (
                    "إرسال وإضافة"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="border-primary/20 bg-primary/5 text-center py-16 animate-in zoom-in-95 duration-500">
          <CardContent className="space-y-6">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-primary" data-testid="text-success">تم إرسال الدرس بنجاح!</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              جزاك الله خيراً على مساهمتك في نشر العلم. تمت إضافة الدرس على المنصة.
            </p>
            <div className="pt-6 flex justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="font-bold" data-testid="link-back-home">
                  العودة للرئيسية
                </Button>
              </Link>
              <Link href="/browse">
                <Button size="lg" variant="outline" className="font-bold">
                  تصفح الدروس
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}