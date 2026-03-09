import { MOCK_LESSONS, CITIES, TOPICS } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { MapPin, MonitorPlay, Calendar, Clock, BookOpen, Search, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchType, setSearchType] = useState<"all" | "mosque" | "online">("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  const featuredLessons = MOCK_LESSONS.slice(0, 4);

  const stats = {
    lessons: MOCK_LESSONS.length,
    cities: new Set(MOCK_LESSONS.filter(l => l.city).map(l => l.city)).size,
    online: MOCK_LESSONS.filter(l => l.type === 'online').length
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query params
    const params = new URLSearchParams();
    if (searchType !== "all") params.set("type", searchType);
    if (selectedCity !== "all") params.set("city", selectedCity);
    if (selectedTopic !== "all") params.set("topic", selectedTopic);
    
    // Redirect to browse with params
    window.location.href = `/browse?${params.toString()}`;
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        {/* Subtle decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 mb-6 px-4 py-1.5 rounded-full text-sm font-semibold border-secondary/20 transition-colors">
            منصة الدروس الدينية في الداخل الفلسطيني
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">
            ابحث عن درس ديني <br className="hidden md:block" />
            <span className="text-secondary">قريب منك</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            دليلك الشامل لحلقات العلم، المحاضرات، والدروس في المساجد وعبر الإنترنت. 
            اختر ما يناسبك وانضم لمجالس النور.
          </p>

          {/* Search Box */}
          <Card className="shadow-xl border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CardContent className="p-2 md:p-4">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex flex-col md:flex-row gap-3">
                  <Select value={searchType} onValueChange={(v: any) => setSearchType(v)}>
                    <SelectTrigger className="h-12 text-base md:w-40 border-muted">
                      <SelectValue placeholder="نوع الدرس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="mosque">في المسجد 🕌</SelectItem>
                      <SelectItem value="online">أونلاين 💻</SelectItem>
                    </SelectContent>
                  </Select>

                  {searchType !== 'online' && (
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-12 text-base flex-1 border-muted">
                        <MapPin className="w-4 h-4 ml-2 text-muted-foreground" />
                        <SelectValue placeholder="اختر المدينة..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        <SelectItem value="all">كل المدن</SelectItem>
                        {CITIES.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger className="h-12 text-base flex-1 border-muted">
                      <BookOpen className="w-4 h-4 ml-2 text-muted-foreground" />
                      <SelectValue placeholder="الموضوع..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المواضيع</SelectItem>
                      {TOPICS.map(topic => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" size="lg" className="h-12 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all">
                  <Search className="w-5 h-5 ml-2" />
                  بحث
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-10 border-y border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-reverse md:divide-x divide-primary-foreground/20">
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-black text-secondary mb-2">+{stats.lessons}</p>
              <p className="text-sm md:text-base font-medium opacity-90">درس مسجل</p>
            </div>
            <div className="p-4 border-r border-primary-foreground/20 md:border-r-0 md:border-l">
              <p className="text-3xl md:text-4xl font-black text-secondary mb-2">+{stats.cities}</p>
              <p className="text-sm md:text-base font-medium opacity-90">مدينة وبلدة</p>
            </div>
            <div className="p-4 md:border-r border-primary-foreground/20">
              <p className="text-3xl md:text-4xl font-black text-secondary mb-2">+{stats.online}</p>
              <p className="text-sm md:text-base font-medium opacity-90">درس أونلاين</p>
            </div>
            <div className="p-4 border-r border-primary-foreground/20 md:border-r-0 md:border-l">
              <p className="text-3xl md:text-4xl font-black text-secondary mb-2">مجانًا</p>
              <p className="text-sm md:text-base font-medium opacity-90">خدمة للمجتمع</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-20 bg-background container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">دروس قادمة قريباً</h2>
            <p className="text-muted-foreground">أبرز الدروس المسجلة حديثاً على المنصة</p>
          </div>
          <Link href="/browse">
            <Button variant="outline" className="text-primary font-semibold border-primary/20 hover:bg-primary/5">
              عرض كل الدروس
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLessons.map(lesson => (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/60 bg-card group cursor-pointer overflow-hidden flex flex-col">
                <CardContent className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-muted text-muted-foreground font-semibold px-2 py-0.5 border-none">
                      {lesson.topic}
                    </Badge>
                    {lesson.type === 'online' ? (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none font-semibold">
                        <MonitorPlay className="w-3 h-3 ml-1" />
                        أونلاين
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none font-semibold">
                        <MapPin className="w-3 h-3 ml-1" />
                        في المسجد
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-secondary-foreground mb-4">
                    {lesson.sheikh}
                  </p>
                  
                  <div className="mt-auto space-y-2 text-sm text-muted-foreground pt-4 border-t border-border/40">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 ml-2 opacity-70" />
                      <span>{lesson.day}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 ml-2 opacity-70" />
                      <span>{lesson.time}</span>
                    </div>
                    <div className="flex items-center">
                      {lesson.type === 'mosque' ? (
                        <>
                          <MapPin className="w-4 h-4 ml-2 opacity-70" />
                          <span className="truncate">{lesson.mosqueName}، {lesson.city}</span>
                        </>
                      ) : (
                        <>
                          <MonitorPlay className="w-4 h-4 ml-2 opacity-70" />
                          <span>{lesson.platform}</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50 border-t border-border/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-secondary/5 rounded-l-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-card shadow-lg border border-border/60 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
            
            <h2 className="text-3xl font-black text-primary mb-4">هل أنت إمام أو مركز إسلامي؟</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              ساهم في نشر العلم والدعوة. أضف جدول دروسك اليوم ليتسنى للناس العثور عليها بسهولة والوصول إليها.
            </p>
            <Link href="/add">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 h-14 rounded-full shadow-md">
                أضف جدول دروسك مجاناً
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}