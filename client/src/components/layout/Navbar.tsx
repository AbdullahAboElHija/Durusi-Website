import { Link, useLocation } from "wouter";
import { BookOpen, Search, PlusCircle, Info, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "الرئيسية", icon: <BookOpen className="w-4 h-4 ml-2" /> },
    { href: "/browse", label: "تصفح الدروس", icon: <Search className="w-4 h-4 ml-2" /> },
    { href: "/about", label: "عن التطبيق", icon: <Info className="w-4 h-4 ml-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
          <span className="text-secondary">در</span>وسي
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={cn(
                    "flex items-center transition-colors hover:text-secondary",
                    location === link.href ? "text-secondary" : "text-foreground/80"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <Link href="/add">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
              <PlusCircle className="w-4 h-4 ml-2" />
              أضف درسك
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg animate-in slide-in-from-top-2">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center p-3 rounded-md transition-colors",
                  location === link.href ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <Link href="/add" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg justify-center">
                  <PlusCircle className="w-4 h-4 ml-2" />
                  أضف درسك
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}