"use client";

// ... imports ...
import { useEffect, useState } from "react";
// import { reviews as allReviews } from "@/data/reviews"; // legacy
import Image from "next/image";

interface Review {
  id: string; // id is string or number in data? data says number.
  id_num?: number;
  name: string;
  rating: number;
  text: string; // data uses 'text'
  comment?: string; // component uses 'comment'
  avatar?: string;
  photos?: string[];
  country?: string;
}

type Props = {
  title?: string;
  reviews?: any[]; // Loose type to handle data mismatch if any
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-[#fbbf24] drop-shadow-sm text-lg" : "text-gray-200 text-lg"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsCarousel({ title = "Reviews", reviews = [] }: Props) {
  const [index, setIndex] = useState(0);

  // auto scroll
  useEffect(() => {
    if (reviews.length === 0) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Slower for reading detailed reviews
    return () => clearInterval(t);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="text-center text-gray-500">No reviews yet.</div>
      </section>
    );
  }

  const current = reviews[index];
  const comment = current.text || current.comment; // Handle both fields

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 pb-20 pt-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-black/5">
        {/* Decorative background element */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-50/50 blur-3xl" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                Verified Travelers
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                Real stories from adventurers who trusted us with their journey through the Tian Shan mountains.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                className="h-14 w-14 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % reviews.length)}
                className="h-14 w-14 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-label="Next review"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Review Card */}
            <div className="lg:col-span-7 bg-gray-50/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-inner">
              <div className="flex gap-4 items-center mb-6">
                {/* Avatar */}
                <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0">
                  <Image
                    src={current.avatar || "/placeholder.jpg"}
                    alt={current.name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <div className="text-xl">❝</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-xl text-gray-900">{current.name}</div>
                  <div className="text-gray-500 font-medium">{current.country}</div>
                </div>

                <div className="ml-auto scale-110 origin-right hidden sm:block">
                  <Stars rating={current.rating} />
                </div>
              </div>

              <blockquote className="text-xl md:text-2xl leading-relaxed text-gray-800 font-medium font-serif italic">
                {comment}
              </blockquote>

              <div className="mt-6 flex sm:hidden">
                <Stars rating={current.rating} />
              </div>
            </div>

            {/* Photos & Navigation */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Review Photos */}
              {current.photos && current.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {current.photos.slice(0, 2).map((photo: string, idx: number) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                      <Image
                        src={photo}
                        alt={`Photo by ${current.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Mini Navigation Pills */}
              <div className="flex flex-wrap gap-2">
                {reviews.map((r, i) => (
                  <button
                    key={r.id || i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${i === index
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <div className="text-sm text-gray-400">
                Review {index + 1} of {reviews.length}
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
