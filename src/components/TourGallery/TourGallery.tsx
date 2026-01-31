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
    <div className="group">
      {/* MAIN IMAGE */}
      <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl border border-black/5 shadow-premium transition-shadow hover:shadow-2xl">
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
        />

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Caption/Title on image if needed, or just decoration */}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={[
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition-all duration-300",
                active === i
                  ? "border-blue-500 ring-2 ring-blue-500/30 scale-105 shadow-md z-10"
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-105",
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
