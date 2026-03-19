import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Heart, Users, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-primary mb-4">عن منصة دروسي</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">المنصة الأولى لتوثيق والبحث عن الدروس الدينية في الداخل</p>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground mb-16">
        <p className="text-lg leading-relaxed text-justify bg-card p-6 rounded-2xl border border-border shadow-sm">انطلقت منصة "دروسي" لتكون دليلاً شاملاً يربط طالب العلم بحلقات الذكر والدروس الدينية في مساجد ومراكز عرب الداخل (مناطق 48). نؤمن بأن المساجد هي حواضن التربية، وأن تسهيل الوصول إليها هو خطوة نحو بناء مجتمع واعٍ ومتمسك بدينه.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="border-none shadow-md bg-primary/5">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary">تغطية شاملة</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              نسعى لتغطية كافة المدن والقرى العربية من الجليل والمثلث إلى النقب والمدن الساحلية.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-secondary/10">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/20 text-secondary-foreground rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-secondary-foreground">مجهود مجتمعي</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              تعتمد المنصة على مساهمات الأئمة والمراكز ومرتادي المساجد في تحديث وإضافة الدروس.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-emerald-50 dark:bg-emerald-950/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">مجانية تماماً</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              منصة غير ربحية، هدفها الأول والأخير هو خدمة الإسلام والمسلمين وتسهيل طلب العلم.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-card border border-border/60 rounded-3xl p-8 md:p-12 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-8">كيف تعمل المنصة؟</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-border/50 bg-background shadow-sm">
              <h4 className="font-bold text-lg mb-1">البحث والاستكشاف</h4>
              <p className="text-sm text-muted-foreground">استخدم محرك البحث لتصفية الدروس حسب مدينتك، أو الموضوع الذي يهمك، أو تصفح الدروس الإلكترونية.</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-secondary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-border/50 bg-background shadow-sm">
              <h4 className="font-bold text-lg mb-1">المشاركة والإضافة</h4>
              <p className="text-sm text-muted-foreground">يمكن لأي إمام مسجد أو طالب علم إضافة موعد درس جديد عبر نموذج الإضافة المبسط.</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-border/50 bg-background shadow-sm">
              <h4 className="font-bold text-lg mb-1">الحضور والانتفاع</h4>
              <p className="text-sm text-muted-foreground">احفظ موعد الدرس، تواصل مع المنظمين، وانضم إلى مجالس العلم والخير.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}