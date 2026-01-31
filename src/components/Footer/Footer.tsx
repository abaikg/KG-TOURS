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
    <footer className="bg-forest-900 border-t border-white/5 relative overflow-hidden pb-32 md:pb-8">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(244,196,48,0.03),transparent_70%)] pointer-events-none" />

      <div className="container-x mx-auto pt-16 md:pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 text-center md:text-left">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start space-y-6">
            <Link href="/" className="group inline-block">
              <div className="flex items-center gap-2.5">
                <span className="text-4xl font-black text-white tracking-tighter uppercase group-hover:text-gold transition-all duration-500">
                  TOURS
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_15px_rgba(244,196,48,0.5)] animate-pulse" />
              </div>
            </Link>
            <p className="text-sage-100/60 text-base leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
              {t(
                "Авторские экспедиции и погружение в самое сердце природы Кыргызстана.",
                "Crafted expeditions into the untamed heart of the Kyrgyz wilderness."
              )}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse outline outline-4 outline-emerald-500/20" />
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t("Открыты к бронированию", "Open for Expeditions")}</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-6">
            <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">
              {t("Меню", "Menu")}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-100/80 hover:text-gold hover:pl-2 transition-all duration-300 text-sm font-bold uppercase tracking-widest block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">
              {t("Контакты", "Contact")}
            </h4>
            <ul className="space-y-6">
              <li>
                <a href="tel:+996500715638" className="group flex flex-col items-center md:items-start gap-1">
                  <div className="text-lg font-bold text-white group-hover:text-gold transition-colors tracking-tight">+996 500 715 638</div>
                  <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">WhatsApp / Telegram</div>
                </a>
              </li>
              <li>
                <a href="mailto:info@kg-tours.com" className="group flex flex-col items-center md:items-start gap-1">
                  <div className="text-lg font-bold text-white group-hover:text-gold transition-colors tracking-tight">info@kg-tours.com</div>
                  <div className="text-[10px] font-bold text-sage-400 uppercase tracking-wider">{t("Почта поддержки", "Support Email")}</div>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">
              {t("Соцсети", "Socials")}
            </h4>
            <div className="flex justify-center md:justify-start gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:bg-gold hover:border-gold hover:text-forest-900 shadow-lg text-sage-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
            © 2026 KG TOURS. {t("Все права защищены.", "All rights reserved.")}
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] font-black text-white/40 hover:text-gold transition-colors uppercase tracking-[0.15em]">{t("Конфиденциальность", "Privacy Policy")}</Link>
            <Link href="#" className="text-[10px] font-black text-white/40 hover:text-gold transition-colors uppercase tracking-[0.15em]">{t("Условия", "Terms & Conditions")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
