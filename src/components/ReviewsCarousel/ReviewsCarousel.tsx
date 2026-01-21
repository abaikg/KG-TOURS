"use client";

import { useEffect, useState } from "react";
// import { reviews as allReviews } from "@/data/reviews"; // legacy

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

type Props = {
  title?: string;
  reviews?: Review[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsCarousel({ title = "Reviews", reviews = [] }: Props) {
  // const reviews = useMemo(() => allReviews, []);
  const [index, setIndex] = useState(0);

  // auto scroll
  useEffect(() => {
    if (reviews.length === 0) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(t);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="text-center text-gray-500">
          No reviews yet.
        </div>
      </section>
    )
  }

  const current = reviews[index];

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 pb-12">
      <div className="rounded-3xl border border-black/5 bg-white shadow-sm overflow-hidden">
        <div className="p-6 md:p-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm text-grayText">Feedback</div>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h2>
              <p className="mt-2 text-grayText">
                Real impressions from tourists.
              </p>
            </div>

            <div className="hidden md:flex gap-2">
              <button
                onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                className="h-11 w-11 rounded-2xl border border-black/10 hover:bg-black/5 transition active:scale-[0.98]"
                aria-label="Back"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % reviews.length)}
                className="h-11 w-11 rounded-2xl border border-black/10 hover:bg-black/5 transition active:scale-[0.98]"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-5 gap-6 items-stretch">
            {/* Card */}
            <div className="md:col-span-3 rounded-3xl border border-black/10 bg-gradient-to-b from-black/[0.03] to-transparent p-6">
              <Stars rating={current.rating} />
              <p className="mt-4 text-gray-900 text-lg leading-relaxed">
                “{current.comment}”
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900">{current.name}</div>
                  {/* Country removed as it's not in schema */}
                </div>

                <div className="flex gap-2 md:hidden">
                  <button
                    onClick={() =>
                      setIndex((i) => (i - 1 + reviews.length) % reviews.length)
                    }
                    className="h-10 w-10 rounded-2xl border border-black/10 hover:bg-black/5 transition active:scale-[0.98]"
                    aria-label="Back"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % reviews.length)}
                    className="h-10 w-10 rounded-2xl border border-black/10 hover:bg-black/5 transition active:scale-[0.98]"
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Dots / Navigation */}
            <div className="md:col-span-2 rounded-3xl border border-black/10 p-6">
              <div className="text-sm text-grayText">All Reviews</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {reviews.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setIndex(i)}
                    className={[
                      "px-3 py-2 rounded-2xl border transition text-sm",
                      i === index
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-600"
                        : "border-black/10 hover:bg-black/5 text-gray-900",
                    ].join(" ")}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// "use client";

// import Image from "next/image";
// import { useEffect, useMemo, useState } from "react";
// import { reviews as allReviews } from "@/data/reviews";

// type Props = { title?: string };

// function Stars({ rating }: { rating: number }) {
//   return (
//     <div className="flex items-center gap-1" aria-label={`Рейтинг ${rating} из 5`}>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <span
//           key={i}
//           className={i < rating ? "text-[color:var(--brand)]" : "text-black/15"}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// export function ReviewsCarousel({ title = "Отзывы" }: Props) {
//   const reviews = useMemo(() => allReviews, []);
//   const [index, setIndex] = useState(0);

//   // auto slide
//   useEffect(() => {
//     if (!reviews.length) return;
//     const t = window.setInterval(() => {
//       setIndex((prev) => (prev + 1) % reviews.length);
//     }, 5200);
//     return () => window.clearInterval(t);
//   }, [reviews.length]);

//   if (!reviews.length) return null;

//   const current = reviews[index];

//   return (
//     <section id="reviews" className="bg-[color:var(--bg)]">
//       <div className="container-x pb-12">
//         <div className="rounded-[var(--radius-lg)] border border-black/5 bg-white shadow-sm overflow-hidden">
//           <div className="p-6 md:p-10">
//             {/* header */}
//             <div className="flex items-end justify-between gap-4">
//               <div>
//                 <div className="text-sm text-[color:var(--text-muted)]">Доверие</div>
//                 <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
//                   {title}
//                 </h2>
//                 <p className="mt-2 text-[color:var(--text-muted)]">
//                   Живые фото и впечатления туристов.
//                 </p>
//               </div>

//               <div className="hidden md:flex gap-2">
//                 <button
//                   onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
//                   className="h-11 w-11 rounded-2xl border border-black/10 bg-white hover:bg-black/[0.04] transition active:scale-[0.98]"
//                   aria-label="Назад"
//                   title="Назад"
//                 >
//                   ←
//                 </button>
//                 <button
//                   onClick={() => setIndex((i) => (i + 1) % reviews.length)}
//                   className="h-11 w-11 rounded-2xl border border-black/10 bg-white hover:bg-black/[0.04] transition active:scale-[0.98]"
//                   aria-label="Вперёд"
//                   title="Вперёд"
//                 >
//                   →
//                 </button>
//               </div>
//             </div>

//             {/* content */}
//             <div className="mt-6 grid lg:grid-cols-5 gap-6 items-stretch">
//               {/* main review card */}
//               <div className="lg:col-span-3 rounded-[var(--radius-lg)] border border-black/10 bg-white p-6 shadow-sm">
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
//                       <Image
//                         src={current.avatar || "/placeholder.jpg"}
//                         alt={current.name}
//                         fill
//                         sizes="48px"
//                         className="object-cover"
//                       />
//                     </div>

//                     <div className="min-w-0">
//                       <div className="font-semibold text-gray-900 truncate">
//                         {current.name}
//                       </div>
//                       <div className="text-sm text-[color:var(--text-muted)] truncate">
//                         {current.country}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="shrink-0 text-right">
//                     <Stars rating={current.rating} />
//                     <div className="mt-1 text-xs text-[color:var(--text-muted)]">
//                       {current.rating}.0 / 5
//                     </div>
//                   </div>
//                 </div>

//                 <p className="mt-5 text-gray-900 text-lg leading-relaxed">
//                   “{current.text}”
//                 </p>

//                 {/* mobile arrows */}
//                 <div className="mt-6 flex gap-2 md:hidden">
//                   <button
//                     onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
//                     className="h-11 flex-1 rounded-2xl border border-black/10 bg-white hover:bg-black/[0.04] transition active:scale-[0.99]"
//                     aria-label="Назад"
//                   >
//                     ← Назад
//                   </button>
//                   <button
//                     onClick={() => setIndex((i) => (i + 1) % reviews.length)}
//                     className="h-11 flex-1 rounded-2xl border border-black/10 bg-white hover:bg-black/[0.04] transition active:scale-[0.99]"
//                     aria-label="Вперёд"
//                   >
//                     Вперёд →
//                   </button>
//                 </div>
//               </div>

//               {/* photos grid */}
//               <div className="lg:col-span-2 rounded-[var(--radius-lg)] border border-black/10 bg-white p-6 shadow-sm">
//                 <div className="flex items-center justify-between gap-3">
//                   <div>
//                     <div className="text-sm text-[color:var(--text-muted)]">Фото из поездки</div>
//                     <div className="mt-1 font-semibold text-gray-900">
//                       {current.name}
//                     </div>
//                   </div>

//                   <span className="text-xs text-[color:var(--text-muted)]">
//                     {current.photos?.length ? `${current.photos.length} фото` : "Нет фото"}
//                   </span>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-3">
//                   {(current.photos?.length ? current.photos : ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"])
//                     .slice(0, 4)
//                     .map((src: string, i: number) => (
//                       <div
//                         key={`${src}-${i}`}
//                         className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]"
//                       >
//                         <Image
//                           src={src}
//                           alt={`${current.name} photo ${i + 1}`}
//                           fill
//                           sizes="160px"
//                           className="object-cover hover:scale-[1.03] transition-transform duration-300"
//                         />
//                       </div>
//                     ))}
//                 </div>

//                 {/* list of names as pills */}
//                 <div className="mt-6">
//                   <div className="text-xs text-[color:var(--text-muted)]">Все отзывы</div>
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {reviews.map((r, i) => (
//                       <button
//                         key={r.id}
//                         onClick={() => setIndex(i)}
//                         className={[
//                           "px-3 py-2 rounded-2xl border text-sm font-medium transition",
//                           "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/20",
//                           i === index
//                             ? "border-[color:var(--brand)]/30 bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
//                             : "border-black/10 hover:bg-black/[0.04] text-gray-900",
//                         ].join(" ")}
//                       >
//                         {r.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-4 text-xs text-[color:var(--text-muted)]">
//                   Позже можно подключить реальные отзывы (Instagram/Google) или админку.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
