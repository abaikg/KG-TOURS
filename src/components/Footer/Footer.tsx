"use client";

import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      label: "WhatsApp",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 4.5l-1 4.5z"></path>
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm4 0a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm-2 2a5 5 0 0 0 5-5"></path>
        </svg>
      )
    },
    {
      label: "Telegram",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )
    }
  ];

  const navLinks = [
    { label: t("Туры", "Tours"), href: "/tours" },
    { label: t("О нас", "About"), href: "/#about" },
    { label: t("Отзывы", "Reviews"), href: "/#reviews" },
    { label: t("Контакты", "Contacts"), href: "/#contacts" }
  ];

  return (
    <footer className="bg-forest-900 border-t border-white/5 relative overflow-hidden pb-24 md:pb-0">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(circle_at_50%_0%,rgba(168,191,168,0.05),transparent_70%)] pointer-events-none" />

      <div className="container-x mx-auto pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 md:gap-12 lg:gap-24 text-center sm:text-left">

          {/* Brand & Mission */}
          <div className="flex flex-col items-center sm:items-start space-y-8">
            <Link href="/" className="group inline-block">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase group-hover:text-gold transition-all duration-500">
                  TOURS
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_15px_rgba(244,196,48,0.5)] animate-pulse" />
              </div>
            </Link>
            <p className="text-sage-100/60 text-base leading-relaxed max-w-[28ch] font-medium">
              {t(
                "Авторские экспедиции и погружение в самое сердце природы Кыргызстана.",
                "Crafted expeditions into the untamed heart of the Kyrgyz wilderness."
              )}
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              {t("Навигация", "Navigational Pathways")}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-100/70 hover:text-gold transition-all duration-300 text-sm font-bold uppercase tracking-widest block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              {t("Связь с нами", "Direct Channels")}
            </h4>
            <ul className="space-y-5">
              <li className="group">
                <a href="mailto:info@kg-tours.com" className="flex flex-col items-center sm:items-start gap-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t("Почта", "Inquiries")}</span>
                  <span className="text-sage-100 group-hover:text-gold transition-colors font-bold tracking-tight">info@kg-tours.com</span>
                </a>
              </li>
              <li className="group">
                <a href="tel:+996555123456" className="flex flex-col items-center sm:items-start gap-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t("Телефон", "Support")}</span>
                  <span className="text-sage-100 group-hover:text-gold transition-colors font-bold tracking-tight">+996 555 123 456</span>
                </a>
              </li>
              <li className="flex flex-col items-center sm:items-start gap-1">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t("Локация", "HQ")}</span>
                <span className="text-sage-100 font-bold tracking-tight">{t("Бишкек, Кыргызстан", "Bishkek, KG")}</span>
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              {t("Соцсети", "Digital Presence")}
            </h4>
            <div className="flex justify-center sm:justify-start gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors hover:bg-white/10 hover:border-white/20 shadow-xl group text-sage-100"
                  aria-label={social.label}
                >
                  <div className="group-hover:scale-110 group-hover:text-gold transition-all duration-300">{social.icon}</div>
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t("Принимаем заявки", "Booking Active")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            © 2026 KG TOURS. {t("Все права защищены.", "Curating the peaks.")}
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[9px] font-black text-slate-600 hover:text-gold transition-colors uppercase tracking-[0.2em]">{t("Конфиденциальность", "Privacy")}</Link>
            <Link href="#" className="text-[9px] font-black text-slate-600 hover:text-gold transition-colors uppercase tracking-[0.2em]">{t("Условия", "Terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
