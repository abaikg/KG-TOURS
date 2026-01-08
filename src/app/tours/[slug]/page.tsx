import { tours } from "@/data/tours";
import Link from "next/link";
import Image from "next/image";
import { TourRequestModal } from "@/components/TourRequestModal/TourRequestModal";
import { ReviewsCarousel } from "@/components/ReviewsCarousel/ReviewsCarousel";
import { TourGallery } from "@/components/TourGallery/TourGallery";


export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    return (
      <main className="min-h-screen bg-[color:var(--bg-soft)] py-10">
        <div className="container-x">
          <div className="card p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Тур не найден</h1>
            <p className="mt-2 text-[color:var(--text-muted)]">
              Проверь ссылку или вернись на главную.
            </p>
            <Link href="/" className="mt-6 inline-flex btn btn-primary ring-brand">
              На главную
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const cover = tour.images?.[0] ?? "/placeholder.jpg";

  return (
    <main className="min-h-screen bg-[color:var(--bg-soft)] py-10">
      <div className="container-x">
        <div className="mb-6">
          <Link
            href="/#tours"
            className="text-sm text-[color:var(--text-muted)] hover:text-gray-900 transition ring-brand rounded-xl inline-flex px-2 py-1"
          >
            ← Назад к турам
          </Link>
        </div>

        <div className="card overflow-hidden">
          {/* HERO IMAGE */}
          <TourGallery images={tour.images} title={tour.title} />
          {/* CONTENT */}
          <div className="p-6 md:p-10 grid lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                {tour.title}
              </h1>

              <p className="mt-4 text-[color:var(--text-muted)] text-base md:text-lg leading-relaxed">
                {tour.shortDescription}
              </p>

              <h2 className="mt-10 text-2xl font-semibold text-gray-900">
                Программа
              </h2>

              <div className="mt-4 grid gap-3">
                {tour.program.map((p) => (
                  <div
                    key={p.day}
                    className="rounded-[var(--radius-md)] border border-black/5 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 h-9 w-9 rounded-2xl bg-[var(--brand)]/10 flex items-center justify-center text-[color:var(--brand)] font-semibold">
                        {p.day}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900">
                          {p.title}
                        </div>
                        <div className="mt-1 text-[color:var(--text-muted)]">
                          {p.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="rounded-[var(--radius-lg)] border border-black/5 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Включено</h3>
                  <ul className="mt-3 space-y-2 text-[color:var(--text-muted)]">
                    {tour.included.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-[6px] h-2 w-2 rounded-full bg-[var(--brand)]" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-black/5 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Не включено</h3>
                  <ul className="mt-3 space-y-2 text-[color:var(--text-muted)]">
                    {tour.notIncluded.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-[6px] h-2 w-2 rounded-full bg-black/25" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="rounded-[var(--radius-lg)] border border-black/5 bg-white p-5 shadow-sm sticky top-24">
                <div className="text-sm text-[color:var(--text-muted)]">Цена</div>
                <div className="text-2xl font-semibold text-[color:var(--brand)] mt-1">
                  {tour.price}
                </div>

                <div className="mt-4 text-sm text-[color:var(--text-muted)] leading-relaxed">
                  Регион: <span className="text-gray-900 font-medium">{tour.region}</span>
                  <br />
                  Длительность:{" "}
                  <span className="text-gray-900 font-medium">{tour.days} дней</span>
                  <br />
                  Сложность:{" "}
                  <span className="text-gray-900 font-medium">{tour.difficulty}</span>
                </div>

                <div className="mt-6">
                  <TourRequestModal
                    tourTitle={tour.title}
                    tourUrl={`/tours/${tour.slug}`}
                  />
                </div>

                <div className="mt-3 text-xs text-[color:var(--text-muted)]">
                  Нажмите кнопку — форма откроется всплывающим окном.
                </div>

                <div className="mt-5 rounded-2xl border border-black/5 bg-black/[0.03] p-4">
                  <div className="text-xs text-[color:var(--text-muted)]">Совет</div>
                  <div className="mt-1 text-sm font-medium text-gray-900">
                    Напишите даты и количество человек — ответим быстрее.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-10">
          <ReviewsCarousel title="Отзывы о наших турах" />
        </div>
      </div>
    </main>
  );
}
