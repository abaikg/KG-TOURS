"use client";

import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { StarRating } from "@/components/ui/StarRating";
import { AvatarGroup } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

interface Tour {
    id: string;
    slug: string;
    price: number;
    duration: number;
    difficulty: "easy" | "medium" | "hard";
    title_ru: string;
    title_en?: string;
    shortDescription_ru: string;
    shortDescription_en?: string;
    images?: string[];
    [key: string]: any;
}

export function FeaturedTours({ tours }: { tours: Tour[] }) {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';

    const renderTourCard = (tour: Tour) => (
        <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/tours/${tour.slug}`}>
                <Card variant="image" className="group cursor-pointer overflow-hidden h-full flex flex-col hover:shadow-float transition-all duration-500 rounded-[32px] border-none bg-white">
                    <div className="relative h-80 overflow-hidden">
                        <Image
                            src={tour.images?.[0] || "/hero/kyrgyzstan-hero.webp"}
                            alt={tour[`title_${displayLanguage}`] || tour.title_ru}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-nature"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 z-10">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/20 border border-white/10 text-white shadow-sm hover:bg-black/30 transition-colors">
                                <span className="text-xs">📅</span>
                                <span className="text-xs font-bold tracking-wide uppercase">{tour.duration} {t("дней", "days")}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/20 border border-white/10 text-white shadow-sm hover:bg-black/30 transition-colors">
                                <span className="text-xs">{tour.difficulty === "easy" ? "🟢" : tour.difficulty === "medium" ? "🟡" : "🔴"}</span>
                                <span className="text-xs font-bold tracking-wide uppercase">
                                    {displayLanguage === 'ru'
                                        ? (tour.difficulty === 'easy' ? 'Спокойный' : tour.difficulty === 'medium' ? 'Активный' : 'Экстрим')
                                        : (tour.difficulty === 'easy' ? 'Easy' : tour.difficulty === 'medium' ? 'Medium' : 'Hard')
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft z-10">
                            <span className="font-black text-forest-900 text-lg tracking-tight">${tour.price}</span>
                        </div>
                    </div>

                    <div className="p-8 bg-white flex-grow flex flex-col relative z-20">
                        <h3 className="text-2xl font-bold text-forest-900 mb-3 group-hover:text-forest-600 transition-colors line-clamp-1">
                            {tour[`title_${displayLanguage}`] || tour.title_ru}
                        </h3>
                        <p className="text-forest-700/80 mb-6 line-clamp-2 leading-relaxed flex-grow text-base">
                            {tour[`shortDescription_${displayLanguage}`] || tour.shortDescription_ru}
                        </p>

                        <div className="flex items-center justify-between pt-5 border-t border-sage-100">
                            <StarRating rating={4.8} size="sm" />
                            <div className="text-sm font-bold text-forest-500 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                {t("Подробнее", "Details")} →
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );

    return (
        <Section id="tours" className="bg-sage-50/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-12 h-[2px] bg-forest-500" />
                        <span className="text-sm font-black text-forest-500 uppercase tracking-[0.2em]">{t("Коллекция", "Collection")}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-forest-900 leading-[1.1] tracking-tight">
                        {t("Избранные Экспедиции", "Featured Expeditions")}
                    </h2>
                </div>
                <Link href="/tours" className="hidden md:inline-flex group items-center gap-2 text-forest-900 font-bold hover:text-forest-600 transition-all">
                    <span className="border-b-2 border-forest-900/10 group-hover:border-forest-600 pb-1">{t("Все направления", "View all Destinations")}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {tours.slice(0, 6).map(renderTourCard)}
            </div>

            <div className="mt-12 text-center md:hidden">
                <Link href="/tours">
                    <Button variant="secondary" fullWidth>
                        {t("Все направления", "View all Destinations")}
                    </Button>
                </Link>
            </div>
        </Section>
    );
}
