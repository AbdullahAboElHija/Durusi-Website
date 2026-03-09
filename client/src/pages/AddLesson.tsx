import { useState } from "react";
import { CITIES, TOPICS, PLATFORMS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MonitorPlay, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AddLesson() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [lessonType, setLessonType] = useState<'mosque' | 'online' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setStep(3);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-primary mb-2">أضف درساً جديداً</h1>
        <p className="text-muted-foreground">ساهم في نشر العلم والدعوة بإضافة موعد الدرس</p>
      </div>

      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold text-center mb-6">ما هو نوع الدرس الذي تريد إضافته؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all border-2 hover:border-primary/50 hover:shadow-md ${lessonType === 'mosque' ? 'border-primary bg-primary/5' : 'border-border/60'}`}
              onClick={() => setLessonType('mosque')}
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الدرس <span className="text-destructive">*</span></Label>
                  <Input id="title" required placeholder="مثال: شرح كتاب رياض الصالحين" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sheikh">اسم الشيخ / المحاضر <span className="text-destructive">*</span></Label>
                  <Input id="sheikh" required placeholder="اسم المحاضر كاملاً" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">موضوع الدرس <span className="text-destructive">*</span></Label>
                  <Select required>
                    <SelectTrigger dir="rtl">
                      <SelectValue placeholder="اختر الموضوع" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      {TOPICS.map(topic => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {lessonType === 'mosque' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="city">المدينة / البلدة <span className="text-destructive">*</span></Label>
                      <Select required>
                        <SelectTrigger dir="rtl">
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent dir="rtl" className="max-h-64">
                          {CITIES.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mosque">اسم المسجد / المركز <span className="text-destructive">*</span></Label>
                      <Input id="mosque" required placeholder="مثال: مسجد عمر بن الخطاب" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان التفصيلي (اختياري)</Label>
                      <Input id="address" placeholder="اسم الحي أو الشارع" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="platform">المنصة <span className="text-destructive">*</span></Label>
                      <Select required>
                        <SelectTrigger dir="rtl">
                          <SelectValue placeholder="اختر المنصة" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                          {PLATFORMS.map(platform => (
                            <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="link">رابط البث أو القناة <span className="text-destructive">*</span></Label>
                      <Input id="link" type="url" required placeholder="https://..." dir="ltr" className="text-left" />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="day">اليوم <span className="text-destructive">*</span></Label>
                  <Select required>
                    <SelectTrigger dir="rtl">
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
                  <Input id="time" required placeholder="مثال: بعد صلاة المغرب / 20:00 مساءً" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">نبذة عن الدرس (اختياري)</Label>
                <Textarea 
                  id="description" 
                  placeholder="اكتب وصفاً مختصراً عما يتناوله الدرس..." 
                  className="min-h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">رقم هاتف أو واتساب للاستفسار (اختياري)</Label>
                <Input id="whatsapp" type="tel" placeholder="للتواصل مع منظمي الدرس" dir="ltr" className="text-left" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  رجوع
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 px-8 font-bold">
                  إرسال وإضافة
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
            <h2 className="text-3xl font-black text-primary">تم إرسال الدرس بنجاح!</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              جزاك الله خيراً على مساهمتك في نشر العلم. سيتم مراجعة الدرس ونشره على المنصة في أقرب وقت.
            </p>
            <div className="pt-6">
              <Link href="/">
                <Button size="lg" className="font-bold">
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}