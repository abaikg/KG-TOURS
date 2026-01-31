"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

// ... imports
export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t, hasHydrated } = useLanguage();

  // Ensure we only show localized content after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe translation function that returns Russian during SSR/before mount
  const safeT = (ru: string, en: string) => {
    if (!mounted) return ru;
    return t(ru, en);
  };

  const nav = [
    { label: safeT("Туры", "Tours"), href: "/tours" },
    { label: safeT("О нас", "Narrative"), href: "/about" },
    { label: safeT("Отзывы", "Feedback"), href: "/reviews" },
    { label: safeT("Контакты", "Contacts"), href: "/contacts" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 antialiased",
        "bg-cream/90 backdrop-blur-3xl py-4 border-b border-white/50 shadow-sm"
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
            <div
              className="text-[10px] font-extrabold text-forest-800/50 uppercase tracking-[0.15em] mt-1 transition-all duration-500 group-hover:opacity-100 group-hover:text-gold/70 opacity-60"
              suppressHydrationWarning
            >
              {safeT("Сердце Киргизии", "Heart of Kyrgyzstan")}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
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
                  suppressHydrationWarning
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
              {mounted ? language : "ru"}
            </motion.button>
            <Link href="/tours">
              <Button
                variant="primary"
                size="sm"
                className="px-8 h-11 text-[11px] font-black uppercase tracking-[0.1em] shadow-xl hover:shadow-gold/20"
              >
                {safeT("Выбрать тур", "Plan Escape")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Control */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden w-12 h-12 flex items-center justify-center rounded-2xl backdrop-blur-md border transition-all z-50 relative",
              mobileMenuOpen
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white/50 border-sage-200 text-forest-900"
            )}
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed top-0 left-0 right-0 bg-forest-900 z-40 pt-28 px-6 pb-40 overflow-y-auto flex flex-col"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(244,196,48,0.1),transparent_50%)] pointer-events-none" />

              <div className="flex-1 space-y-2 relative z-10">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-4 text-3xl font-black uppercase tracking-tight transition-all",
                        pathname === item.href
                          ? "text-white"
                          : "text-white/40 hover:text-gold"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-8 relative z-10"
              >
                {/* Language & CTA */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setLanguage(language === "ru" ? "en" : "ru");
                      setMobileMenuOpen(false);
                    }}
                    className="h-14 border border-white/20 !text-white hover:bg-white/10 text-xs font-black uppercase tracking-widest rounded-xl"
                  >
                    {mounted && language === "ru" ? "English" : "Русский"}
                  </Button>
                  <Link href="/tours" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full h-14 text-xs font-black uppercase tracking-widest shadow-gold/20">
                      {safeT("Подобрать тур", "Find Tour")}
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{safeT("Свяжитесь с нами", "Contact Us")}</div>
                    <a href="tel:+996500715638" className="text-xl font-bold text-white block">+996 500 715 638</a>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Email</div>
                    <a href="mailto:info@kg-tours.com" className="text-lg font-medium text-sage-200 block">info@kg-tours.com</a>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex gap-4">
                  {["Instagram", "WhatsApp", "Telegram"].map((social, i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/90 border border-white/5">
                      {/* Placeholder icons would go here, using first letter for now */}
                      <span className="text-sm font-bold">{social[0]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
