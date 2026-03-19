import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-auto relative overflow-hidden">
      {/* Decorative subtle pattern in footer */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBsMjAgMjAtMjAgMjBMMCAyMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight mb-4 inline-block">
              <span className="text-secondary">در</span>وسي
            </Link>
            <p className="text-primary-foreground/80 max-w-xs text-sm leading-relaxed mb-4">
              المنصة الأولى للبحث عن الدروس الدينية الإسلامية وحلقات العلم في مساجد ومراكز الداخل الفلسطيني، وعبر الإنترنت.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link href="/browse" className="hover:text-white transition-colors">تصفح الدروس</Link></li>
              <li><Link href="/add" className="hover:text-white transition-colors">أضف درساً</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">عن التطبيق</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">تواصل معنا</h3>
            <p className="text-sm text-primary-foreground/80 mb-2">
              هل تواجه مشكلة أو لديك اقتراح للتطوير؟
            </p>
            <a href="#" className="inline-block text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors border border-white/10">
              راسلنا عبر واتساب
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} دروسي. جميع الحقوق محفوظة.</p>
          <p className="mt-2 md:mt-0 font-medium flex items-center justify-center gap-1">خدمة عرب الداخل</p>
        </div>
      </div>
    </footer>
  );
}