"use client";

import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cream border-t border-sage-200 pb-20 md:pb-0">
      <div className="container-x mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center overflow-hidden shadow-soft">
                <Image
                  src="/logo.webp"
                  alt="KG Tours"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-forest-900">KG TOURS</div>
              </div>
            </div>
            <p className="text-forest-700 text-sm leading-relaxed">
              {t(
                "Путешествия по самым красивым местам Кыргызстана",
                "Travel to the most beautiful places in Kyrgyzstan"
              )}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-forest-900 mb-4">{t("Навигация", "Navigation")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-forest-700 hover:text-forest-900 transition-colors text-sm">
                  {t("Туры", "Tours")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-forest-700 hover:text-forest-900 transition-colors text-sm">
                  {t("О нас", "About")}
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="text-forest-700 hover:text-forest-900 transition-colors text-sm">
                  {t("Отзывы", "Reviews")}
                </Link>
              </li>
              <li>
                <Link href="/#contacts" className="text-forest-700 hover:text-forest-900 transition-colors text-sm">
                  {t("Контакты", "Contacts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-forest-900 mb-4">{t("Контакты", "Contacts")}</h4>
            <ul className="space-y-2 text-forest-700 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@kg-tours.com" className="hover:text-forest-900 transition-colors">
                  info@kg-tours.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="tel:+996555123456" className="hover:text-forest-900 transition-colors">
                  +996 555 123 456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                {t("Бишкек, Кыргызстан", "Bishkek, Kyrgyzstan")}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-forest-900 mb-4">{t("Мы в соцсетях", "Follow Us")}</h4>
            <div className="flex gap-3">
              {["I", "F", "W"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-pill bg-sage-100 hover:bg-forest-800 hover:text-white flex items-center justify-center transition-colors font-bold text-forest-800"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sage-200 text-center text-sm text-forest-700">
          © 2026 KG Tours. {t("Все права защищены.", "All rights reserved.")}
        </div>
      </div>
    </footer>
  );
}
