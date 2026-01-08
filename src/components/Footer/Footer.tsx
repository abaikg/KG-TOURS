import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_PHONE } from "@/config/site";

export function Footer() {
  // Собираем ссылку WhatsApp безопасно и очищаем номер до цифр
  const wa = new URL("https://api.whatsapp.com/send");
  wa.searchParams.set("phone", String(WHATSAPP_PHONE).replace(/[^\d]/g, ""));
  wa.searchParams.set("text", "Здравствуйте! Хочу уточнить детали тура AYAN.");
  const waLink = wa.toString();

  const phoneDigits = String(WHATSAPP_PHONE).replace(/[^\d]/g, "");

  return (
    <footer
      id="contacts"
      aria-labelledby="footer-title"
      className="mt-16 border-t border-black/5 bg-[color:var(--bg)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }} // iOS safe area
    >
      <h2 id="footer-title" className="sr-only">Контакты и информация AYAN</h2>

      <div className="container-x py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-3">
          {/* Бренд и CTA */}
          <div className="max-w-md mx-auto text-center lg:mx-0 lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30"
            >
              <Image
                src="/logo-ayan.webp"
                alt="AYAN"
                width={140}
                height={54}
                sizes="(max-width: 640px) 120px, 140px"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--text-muted)] sm:text-sm">
              AYAN — спокойные и честные путешествия по Кыргызстану.
              Мы показываем страну без суеты, в небольших группах и с вниманием к деталям.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-2xl px-5
                         text-[15px] sm:text-sm font-semibold text-white whitespace-nowrap
                         bg-[color:var(--brand)]
                         shadow-[0_10px_24px_rgba(22,163,74,0.20)]
                         transition motion-safe:hover:-translate-y-[1px] motion-safe:hover:shadow-[0_14px_30px_rgba(22,163,74,0.24)]
                         active:translate-y-0
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30"
              aria-label="Написать в WhatsApp"
            >
              <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                💬
              </span>
              Написать в WhatsApp
            </a>
          </div>

          {/* (опционально) сюда можно добавить колонку навигации  */}

          {/* Контакты */}
          <address className="not-italic max-w-md mx-auto w-full lg:mx-0">
            <div className="text-sm font-semibold text-gray-900 text-center lg:text-left">
              Контакты
            </div>

            <ul className="mt-4 grid gap-3 text-sm">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-black/10 p-4
                             transition hover:bg-black/[0.03]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20"
                  aria-label="Написать в WhatsApp"
                >
                  <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)]/10 min-w-10">
                    💬
                  </span>
                  <span>
                    <span className="block text-xs text-[color:var(--text-muted)]">WhatsApp</span>
                    <span className="block font-medium text-gray-900 whitespace-nowrap">+{WHATSAPP_PHONE}</span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`tel:+${phoneDigits}`}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 p-4
                             transition hover:bg-black/[0.03]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20"
                  aria-label="Позвонить по телефону"
                >
                  <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)]/10 min-w-10">
                    📞
                  </span>
                  <span>
                    <span className="block text-xs text-[color:var(--text-muted)]">Телефон</span>
                    <span className="block font-medium text-gray-900 whitespace-nowrap">+{WHATSAPP_PHONE}</span>
                  </span>
                </a>
              </li>

              <li className="flex items-center gap-3 rounded-2xl border border-black/10 p-4">
                <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)]/10 min-w-10">
                  📍
                </span>
                <span>
                  <span className="block text-xs text-[color:var(--text-muted)]">Локация</span>
                  <span className="block font-medium text-gray-900">Бишкек, Кыргызстан</span>
                </span>
              </li>
            </ul>
          </address>
        </div>

        {/* Нижняя строка */}
        <div className="mt-10 border-t border-black/5 pt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-[color:var(--text-muted)]">
            © {new Date().getFullYear()} AYAN. Все права защищены.
          </div>
          <div className="text-xs text-[color:var(--text-muted)]">
            Спокойные путешествия по Кыргызстану
          </div>
        </div>
      </div>
    </footer>
  );
}
