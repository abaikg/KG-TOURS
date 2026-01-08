"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export function TourGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div>
      {/* MAIN IMAGE */}
      <div className="relative h-64 md:h-96 overflow-hidden rounded-[var(--radius-lg)] border border-black/5">
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />

        {/* gradient for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={[
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition",
                active === i
                  ? "border-[color:var(--brand)] ring-2 ring-[color:var(--brand)]/30"
                  : "border-black/10 hover:border-black/30",
              ].join(" ")}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
