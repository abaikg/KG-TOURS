import Image from "next/image";
import { WHATSAPP_PHONE } from "@/config/site";

export function AboutSection() {
  const waText = encodeURIComponent(
    "Здравствуйте! Хочу узнать подробнее про ваши туры AYAN по Кыргызстану."
  );
  const waLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${waText}`;

  const perks = [
    {
      title: "Спокойно и без суеты",
      text: "Без спешки и «галочек». Темп путешествия — чтобы отдыхать и чувствовать.",
      icon: "🌿",
    },
    {
      title: "Маленькие группы",
      text: "Больше внимания деталям и комфорта. Вы — гость, а не поток.",
      icon: "🤍",
    },
    {
      title: "Живая культура",
      text: "Не декорация для туристов — а настоящая жизнь, люди и места между локациями.",
      icon: "🏔️",
    },
  ];

  return (
    <section id="about" className="bg-[color:var(--bg)]">
      <div className="container-x py-12">
        <div className="rounded-[var(--radius-lg)] border border-black/5 bg-white shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">

            {/* LOGO */}
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/logo-ayan.webp"
                alt="AYAN"
                width={120}
                height={48}
                className="h-12 w-auto object-contain opacity-90"
              />
              <span className="text-sm text-[color:var(--text-muted)]">
                О нас
              </span>
            </div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                  AYAN — это не просто туры по Кыргызстану.
                  <span className="text-[color:var(--brand)]">
                    {" "}
                    Это способ понять страну, а не просто увидеть её.
                  </span>
                </h2>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-full sm:w-auto h-11 px-5 rounded-2xl
                    inline-flex items-center justify-center gap-2
                    text-sm font-semibold text-white whitespace-nowrap
                    bg-[color:var(--brand)]
                    shadow-[0_10px_24px_rgba(22,163,74,0.20)]
                    transition
                    hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(22,163,74,0.24)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30
                  "
                >
                  💬 Написать в WhatsApp
                </a>

                <a
                  href="#tours"
                  className="
                    w-full sm:w-auto h-11 px-5 rounded-2xl
                    inline-flex items-center justify-center
                    text-sm font-semibold text-gray-900 whitespace-nowrap
                    bg-black/[0.03] border border-black/10
                    transition hover:bg-black/[0.05]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10
                  "
                >
                  Смотреть туры
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="mt-8 grid lg:grid-cols-5 gap-8 items-start">
              {/* Text */}
              <div className="lg:col-span-3 text-[color:var(--text-muted)] leading-relaxed space-y-4">
                <p>
                  Слово «Аян» в нашем языке означает то, что становится ясным,
                  открытым, настоящим. Именно так мы хотим, чтобы Кыргызстан
                  открылся каждому, кто приезжает сюда с нами — спокойно,
                  честно и без суеты.
                </p>

                <p>
                  Мы создаём путешествия для людей, которые хотят отдохнуть
                  душой, вдохнуть горный воздух, почувствовать тишину и увидеть
                  живую культуру, а не туристическую декорацию. Без экстрима.
                  Без спешки. Без «галочек».
                </p>

                <p>
                  Наша команда — это люди, которые выросли здесь и знают эти места
                  не по картам. Мы показываем не только красивые локации, но и
                  жизнь между ними: дороги, разговоры, простые моменты.
                </p>

                <p>
                  Мы работаем с маленькими группами и уделяем внимание деталям —
                  чтобы вы уехали не уставшими, а наполненными.
                </p>

                <p className="font-medium text-gray-900">
                  Добро пожаловать в AYAN. Пусть Кыргызстан станет для вас понятным и близким.
                </p>
              </div>

              {/* Perks */}
              <div className="lg:col-span-2 space-y-4">
                {perks.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-[var(--radius-lg)] border border-black/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[var(--brand)]/10 flex items-center justify-center text-xl">
                        {p.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {p.title}
                        </div>
                        <div className="mt-1 text-sm text-[color:var(--text-muted)]">
                          {p.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-full h-11 rounded-2xl
                    inline-flex items-center justify-center
                    text-sm font-semibold text-gray-900
                    bg-black/[0.03] border border-black/10
                    transition hover:bg-black/[0.05]
                  "
                >
                  ⚡ Получить консультацию
                </a>

                <div className="text-xs text-[color:var(--text-muted)]">
                  Обычно отвечаем в течение 5–15 минут.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
