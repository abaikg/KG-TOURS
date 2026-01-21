"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const nav = [
    { label: t("Туры", "Tours"), href: "/tours" },
    { label: t("О нас", "About"), href: "/about" },
    { label: t("Отзывы", "Reviews"), href: "/reviews" },
    { label: t("Контакты", "Contacts"), href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-lg border-b border-sage-200/50 shadow-sm">
      <div className="container-x mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              <Image
                src="/logo.webp"
                alt="KG Tours"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-extrabold text-forest-900 tracking-tight">KG TOURS</div>
              <div className="text-[10px] font-medium text-forest-700 uppercase tracking-wider">{t("Путешествия по Кыргызстану", "Travel in Kyrgyzstan")}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-bold text-sm uppercase tracking-wide transition-all relative py-2",
                    isActive
                      ? "text-forest-900"
                      : "text-forest-700/80 hover:text-forest-900"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="header-nav-active"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-forest-900 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
              className="px-4 py-2 rounded-pill border-2 border-sage-400 hover:border-forest-700 transition-colors font-semibold text-sm uppercase text-forest-800"
            >
              {language}
            </button>
            <Link href="/tours">
              <button className="btn-nature-primary text-sm px-6 py-3">
                {t("Подобрать тур", "Find Tour")}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sage-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-forest-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-t border-sage-200"
            >
              <div className="py-4 flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl font-bold transition-all",
                        pathname === item.href
                          ? "bg-sage-200 text-forest-900"
                          : "text-forest-700 hover:bg-sage-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pb-6 px-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setLanguage(language === "ru" ? "en" : "ru");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-pill border-2 border-sage-400 hover:border-forest-700 transition-colors font-bold text-sm uppercase text-forest-800"
                >
                  {language === "ru" ? "Switch to EN" : "Переключить на RU"}
                </button>
                <Link href="/tours" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-nature-primary w-full shadow-soft hover:shadow-card">
                    {t("Подобрать тур", "Find Tour")}
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
