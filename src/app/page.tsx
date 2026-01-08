import { tours } from "@/data/tours";
import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_PHONE } from "@/config/site";
import { ReviewsCarousel } from "@/components/ReviewsCarousel/ReviewsCarousel";
import { AboutSection } from "@/components/About/AboutSection";

const WA_TEXT = "Здравствуйте! Хочу подобрать тур по Кыргызстану.";

export default function HomePage() {
  const waLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    WA_TEXT
  )}`;

  return (
    <main className="min-h-screen bg-[color:var(--bg)]">
      {/* HERO */}
      <section className="bg-[color:var(--bg-soft)]">
        <div className="container-x pt-10 pb-8">
          <div className="card overflow-hidden">
            <div className="p-6 md:p-10 grid lg:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div>
                <p className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] bg-black/[0.04] px-3 py-1.5 rounded-full border border-black/5">
                  🌿 Природа • Горы • Озёра
                </p>

                <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-gray-900 leading-[1.06] tracking-tight">
                  Туры по Кыргызстану —
                  <span className="text-[color:var(--brand)]">
                    {" "}
                    красиво, безопасно и под вас
                  </span>
                </h1>

                <p className="mt-4 text-[color:var(--text-muted)] text-base md:text-lg leading-relaxed">
                  Выбери маршрут, открой страницу тура и оставь заявку — мы
                  быстро ответим и подберём идеальные даты и бюджет.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href="#tours" className="btn btn-primary ring-brand">
                    Подобрать тур
                  </a>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary ring-brand"
                  >
                    Написать в WhatsApp
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[color:var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                    Гиды и маршруты
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                    Подбор под вас
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                    Поддержка в дороге
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="relative">
                {/* Hero image */}
                <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden border border-black/5">
                  <Image
                    src="/hero/kyrgyzstan-hero.webp"
                    alt="Горы и природа Кыргызстана"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />

                  {/* overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_30%_20%,rgba(22,163,74,0.18),transparent_60%)]" />
                </div>

                {/* badges */}
                <div className="absolute -bottom-4 left-4 right-4 flex gap-3">
                  <div className="flex-1 rounded-2xl border border-black/5 bg-white shadow-sm px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">
                      +10 маршрутов
                    </div>
                    <div className="text-xs text-[color:var(--text-muted)]">
                      по всему Кыргызстану
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white shadow-sm px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">
                      Ответ 5–15 мин
                    </div>
                    <div className="text-xs text-[color:var(--text-muted)]">
                      в WhatsApp
                    </div>
                  </div>
                </div>

                {/* spacer so badges don’t overlap next section */}
                <div className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* TOURS */}
      <section id="tours" className="container-x py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              Выберите тур
            </h2>
            <p className="text-[color:var(--text-muted)] mt-2">
              Открой страницу тура и нажми «Подробнее», чтобы оставить заявку.
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary ring-brand"
          >
            Нужна помощь в выборе
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className={[
                "group block overflow-hidden",
                "rounded-[var(--radius-lg)] border border-black/5 bg-white",
                "shadow-sm hover:shadow-[0_16px_40px_rgba(17,24,39,0.12)] transition",
                "ring-brand",
              ].join(" ")}
            >
              {/* image */}
              <div className="relative h-52 overflow-hidden bg-black/[0.02]">
                <Image
                  src={tour.images?.[0] ?? "/placeholder.jpg"}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                {/* pills */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur border border-black/5">
                    {tour.days} дн.
                  </span>
                  <span className="rounded-full px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur border border-black/5">
                    {tour.difficulty}
                  </span>
                </div>

                <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold text-[color:var(--brand)] bg-[color:var(--brand-soft)] border border-black/5">
                  {tour.price}
                </div>

                <div className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs text-white bg-black/40 backdrop-blur">
                  {tour.region}
                </div>
              </div>

              {/* body */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[color:var(--brand)] transition">
                  {tour.title}
                </h3>

                <p className="mt-2 text-[color:var(--text-muted)] line-clamp-2">
                  {tour.shortDescription}
                </p>

                <div className="mt-5">
                  <div className="btn btn-primary w-full justify-center">
                    Подробнее
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <AboutSection />
      <ReviewsCarousel title="Отзывы туристов" />
    </main>
  );
}
