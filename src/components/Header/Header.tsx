"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t, hasHydrated } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = [
    { label: t("Туры", "Tours"), href: "/tours" },
    { label: t("О нас", "Narrative"), href: "/about" },
    { label: t("Отзывы", "Feedback"), href: "/reviews" },
    { label: t("Контакты", "Contacts"), href: "/contacts" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 py-4 transition-colors antialiased",
        scrolled
          ? "bg-cream/80 backdrop-blur-2xl border-b border-sage-200/50 shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <div className="container-x mx-auto">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="group relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl xs:text-3xl font-black tracking-tighter uppercase text-forest-900 group-hover:text-gold transition-all duration-500">
                TOURS
              </span>
              <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_rgba(244,196,48,0.5)] animate-pulse" />
            </div>
            <div className="text-[10px] font-extrabold text-forest-800/50 uppercase tracking-[0.15em] mt-1 transition-all duration-500 group-hover:opacity-100 group-hover:text-gold/70 opacity-60">
              {t("Сердце Киргизии", "Heart of Kyrgyzstan")}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-extrabold uppercase tracking-widest transition-all duration-300 relative py-2",
                    isActive
                      ? "text-forest-900"
                      : "text-forest-800/60 hover:text-gold"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="header-nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-gold rounded-full shadow-[0_0_10px_rgba(244,196,48,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "var(--color-gold)", color: "var(--color-gold)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
              className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur-md border border-sage-200 text-[11px] font-black uppercase tracking-widest text-forest-900 transition-all shadow-sm"
            >
              {hasHydrated ? language : "ru"}
            </motion.button>
            <Link href="/tours">
              <Button
                variant="primary"
                size="sm"
                className="px-8 h-11 text-[11px] font-black uppercase tracking-[0.1em] shadow-xl hover:shadow-gold/20"
              >
                {t("Выбрать тур", "Plan Escape")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Control */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/50 backdrop-blur-md border border-sage-200 text-forest-900 hover:text-gold transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Mesh */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-2xl border-b border-sage-200 shadow-2xl overflow-hidden"
            >
              <div className="container-x py-8 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-6 py-5 rounded-2xl text-[14px] font-black uppercase tracking-[0.15em] transition-all",
                        pathname === item.href
                          ? "bg-sage-100 text-forest-900"
                          : "text-forest-800/60 hover:bg-sage-50 hover:text-gold"
                      )}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-8 grid grid-cols-2 gap-4 px-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setLanguage(language === "ru" ? "en" : "ru");
                      setMobileMenuOpen(false);
                    }}
                    className="h-14 text-[11px] font-black uppercase tracking-widest border-sage-200"
                  >
                    {!hasHydrated || language === "ru" ? "ENGLISH" : "РУССКИЙ"}
                  </Button>
                  <Link href="/tours" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full h-14 text-[11px] font-black uppercase tracking-widest shadow-lg">
                      {t("Экспедиция", "Escape")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
