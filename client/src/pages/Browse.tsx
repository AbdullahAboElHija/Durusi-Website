import { CITIES, TOPICS } from "@/data/constants";
import type { Lesson } from "@shared/schema";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, MonitorPlay, Calendar, Clock, Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Browse() {
  const searchParams = new URLSearchParams(window.location.search);
  
  const initialType = searchParams.get("type") || "all";
  const initialCity = searchParams.get("city") || "all";
  const initialTopic = searchParams.get("topic") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>(initialType);
  const [selectedCities, setSelectedCities] = useState<string[]>(initialCity !== "all" ? [initialCity] : []);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialTopic !== "all" ? [initialTopic] : []);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: allLessons = [], isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = lesson.title.toLowerCase().includes(query);
        const matchSheikh = lesson.sheikh.toLowerCase().includes(query);
        if (!matchTitle && !matchSheikh) return false;
      }
      if (typeFilter !== "all" && lesson.type !== typeFilter) return false;
      if (selectedCities.length > 0 && lesson.type === "mosque") {
        if (!lesson.city || !selectedCities.includes(lesson.city)) return false;
      }
      if (selectedTopics.length > 0) {
        if (!selectedTopics.includes(lesson.topic)) return false;
      }
      return true;
    });
  }, [allLessons, searchQuery, typeFilter, selectedCities, selectedTopics]);

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setTypeFilter("all");
    setSelectedCities([]);
    setSelectedTopics([]);
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary mb-2" data-testid="text-browse-title">تصفح الدروس</h1>
        <p className="text-muted-foreground">اكتشف دروس العلم والمحاضرات الدينية المتاحة</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Button 
          variant="outline" 
          className="lg:hidden w-full flex items-center justify-center gap-2 font-semibold"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          data-testid="button-toggle-filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showMobileFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
        </Button>

        <div className={`w-full lg:w-72 flex-shrink-0 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <Card className="border-border/60 shadow-sm sticky top-24">
            <CardContent className="p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2 text-foreground">
                  <Filter className="w-4 h-4" />
                  تصفية النتائج
                </h3>
                {(typeFilter !== "all" || selectedCities.length > 0 || selectedTopics.length > 0 || searchQuery) && (
                  <button onClick={clearFilters} className="text-xs text-destructive hover:underline font-medium" data-testid="button-clear-filters">
                    مسح الكل
                  </button>
                )}
              </div>
              
              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground">نوع الدرس</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "all", label: "الكل" },
                    { value: "mosque", label: "في المسجد 🕌" },
                    { value: "online", label: "أونلاين 💻" },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" name="type" value={opt.value}
                        checked={typeFilter === opt.value} 
                        onChange={() => setTypeFilter(opt.value)}
                        className="w-4 h-4 text-primary accent-primary"
                        data-testid={`radio-type-${opt.value}`}
                      />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground">الموضوع</h4>
                <div className="space-y-2">
                  {TOPICS.map(topic => (
                    <div key={topic} className="flex items-center gap-2">
                      <Checkbox 
                        id={`topic-${topic}`} 
                        checked={selectedTopics.includes(topic)}
                        onCheckedChange={() => toggleTopic(topic)}
                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        data-testid={`checkbox-topic-${topic}`}
                      />
                      <Label htmlFor={`topic-${topic}`} className="text-sm font-medium cursor-pointer flex-1">
                        {topic}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {(typeFilter === "all" || typeFilter === "mosque") && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground">المدينة</h4>
                    <ScrollArea className="h-48 pr-4" dir="rtl">
                      <div className="space-y-2 pb-4">
                        {CITIES.map(city => (
                          <div key={city} className="flex items-center gap-2">
                            <Checkbox 
                              id={`city-${city}`} 
                              checked={selectedCities.includes(city)}
                              onCheckedChange={() => toggleCity(city)}
                              className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <Label htmlFor={`city-${city}`} className="text-sm font-medium cursor-pointer flex-1">
                              {city}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="ابحث باسم الدرس، الشيخ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-6 text-base border-border/60 shadow-sm rounded-xl bg-card"
              data-testid="input-search"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>تم العثور على <span className="font-bold text-foreground">{filteredLessons.length}</span> دروس</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 border-border/60 bg-card group cursor-pointer flex flex-col" data-testid={`card-lesson-${lesson.id}`}>
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <Badge variant="outline" className="bg-muted/50 text-muted-foreground font-semibold px-2 py-0.5 border-none shrink-0">
                          {lesson.topic}
                        </Badge>
                        {lesson.type === 'online' ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-none font-semibold whitespace-nowrap shrink-0">
                            <MonitorPlay className="w-3 h-3 ml-1" />
                            أونلاين
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 border-none font-semibold whitespace-nowrap shrink-0">
                            <MapPin className="w-3 h-3 ml-1" />
                            {lesson.city}
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      
                      <p className="text-sm font-semibold text-secondary-foreground mb-4">
                        {lesson.sheikh}
                      </p>
                      
                      <div className="mt-auto space-y-2 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 opacity-70 shrink-0" />
                          <span className="truncate">{lesson.day} - {lesson.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.type === 'mosque' ? (
                            <>
                              <MapPin className="w-4 h-4 opacity-70 shrink-0" />
                              <span className="truncate">{lesson.mosqueName}</span>
                            </>
                          ) : (
                            <>
                              <MonitorPlay className="w-4 h-4 opacity-70 shrink-0" />
                              <span className="truncate">{lesson.platform}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">جرب تغيير كلمات البحث أو تخفيف الفلاتر المحددة</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters} data-testid="button-clear-empty">
                مسح جميع الفلاتر
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}