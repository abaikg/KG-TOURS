import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_PHONE } from "@/config/site";

export function Footer() {
  const waText = encodeURIComponent("Здравствуйте! Хочу уточнить детали тура AYAN.");
  const waLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${waText}`;

  return (
    <footer id="contacts" className="mt-16 border-t border-black/5 bg-[color:var(--bg)]">
      <div className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center rounded-2xl">
              <Image
                src="/logo-ayan.webp"
                alt="AYAN"
                width={140}
                height={54}
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-sm text-[color:var(--text-muted)] leading-relaxed">
              AYAN — спокойные и честные путешествия по Кыргызстану.
              Мы показываем страну без суеты, в небольших группах и с вниманием к деталям.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5
                         text-sm font-semibold text-white whitespace-nowrap
                         bg-[color:var(--brand)]
                         shadow-[0_10px_24px_rgba(22,163,74,0.20)]
                         transition hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(22,163,74,0.24)]
                         active:translate-y-0
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                💬
              </span>
              Написать в WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-sm font-semibold text-gray-900">Навигация</div>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/#tours" className="text-[color:var(--text-muted)] hover:text-gray-900 transition">
                Туры
              </Link>
              <Link href="/#about" className="text-[color:var(--text-muted)] hover:text-gray-900 transition">
                О нас
              </Link>
              <Link href="/#reviews" className="text-[color:var(--text-muted)] hover:text-gray-900 transition">
                Отзывы
              </Link>
              <Link href="/#contacts" className="text-[color:var(--text-muted)] hover:text-gray-900 transition">
                Контакты
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
              <div className="text-xs text-[color:var(--text-muted)]">Часы работы</div>
              <div className="mt-1 text-sm font-medium text-gray-900">Пн–Вс · 09:00 — 21:00</div>
              <div className="mt-2 text-xs text-[color:var(--text-muted)]">
                Быстрее всего отвечаем в WhatsApp
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="text-sm font-semibold text-gray-900">Контакты</div>

            <div className="mt-4 grid gap-3 text-sm">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-black/10 p-4 hover:bg-black/[0.03] transition"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)]/10">
                  💬
                </span>
                <div>
                  <div className="text-xs text-[color:var(--text-muted)]">WhatsApp</div>
                  <div className="font-medium text-gray-900">+{WHATSAPP_PHONE}</div>
                </div>
              </a>

              <a
                href={`tel:+${WHATSAPP_PHONE}`}
                className="flex items-center gap-3 rounded-2xl border border-black/10 p-4 hover:bg-black/[0.03] transition"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)]/10">
                  📞
                </span>
                <div>
                  <div className="text-xs text-[color:var(--text-muted)]">Телефон</div>
                  <div className="font-medium text-gray-900">+{WHATSAPP_PHONE}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-black/10 p-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)]/10">
                  📍
                </span>
                <div>
                  <div className="text-xs text-[color:var(--text-muted)]">Локация</div>
                  <div className="font-medium text-gray-900">Бишкек, Кыргызстан</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-t border-black/5 pt-6">
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
