"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui/Pill';
import { Card } from '@/components/ui/Card';
import { StarRating } from '@/components/ui/StarRating';
import { motion, AnimatePresence } from 'framer-motion';

export function ToursGrid({ tours }: { tours: any[] }) {
    const { language, t, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';
    const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
    const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

    const filtered = tours.filter(tour =>
        filter === 'all' || tour.difficulty === filter
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        return a.duration - b.duration;
    });

    const difficultyFilters = [
        { value: 'all' as const, label: t('Все', 'All'), icon: '🏔️' },
        { value: 'easy' as const, label: t('Спокойный', 'Easy'), icon: '🟢' },
        { value: 'medium' as const, label: t('Активный', 'Medium'), icon: '🟡' },
        { value: 'hard' as const, label: t('Экстрим', 'Hard'), icon: '🔴' },
    ];

    const difficultyLabels: Record<string, { ru: string; en: string }> = {
        easy: { ru: 'Спокойный', en: 'Easy' },
        medium: { ru: 'Активный', en: 'Medium' },
        hard: { ru: 'Экстрим', en: 'Hard' }
    };

    return (
        <div className="space-y-12">
            {/* Controls Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-soft border border-sage-100 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                    {difficultyFilters.map((item) => (
                        <Pill
                            key={item.value}
                            active={filter === item.value}
                            onClick={() => setFilter(item.value)}
                            icon={<span>{item.icon}</span>}
                            className="text-sm py-2 px-4"
                        >
                            {item.label}
                        </Pill>
                    ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-xs font-black text-forest-400 uppercase tracking-widest whitespace-nowrap">{t("Сортировать:", "Sort by:")}</span>
                    <div className="relative w-full md:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="appearance-none bg-sage-50 hover:bg-sage-100 transition-colors rounded-xl py-2.5 pl-4 pr-10 text-sm font-bold text-forest-900 uppercase tracking-wider w-full cursor-pointer outline-none focus:ring-2 focus:ring-forest-500/20"
                        >
                            <option value="price">{t("Цена", "Price")}</option>
                            <option value="duration">{t("Длительность", "Duration")}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-forest-500">
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {sorted.map((tour) => (
                        <motion.div
                            layout
                            key={tour.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link href={`/tours/${tour.slug}`}>
                                <Card variant="image" className="group cursor-pointer h-full border-none shadow-soft hover:shadow-float transition-all duration-500 overflow-hidden flex flex-col rounded-[24px]">
                                    <div className="relative h-[320px] overflow-hidden">
                                        <Image
                                            src={tour.images[0] || '/hero/kyrgyzstan-hero.webp'}
                                            alt={tour[`title_${displayLanguage}`] || tour.title_ru}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-nature"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                                        {/* Info Pills */}
                                        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 z-10">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/20 border border-white/10 text-white shadow-lg hover:bg-black/30 transition-colors">
                                                <span className="text-xs">📅</span>
                                                <span className="text-xs font-bold tracking-wide uppercase">{tour.duration} {t("дней", "days")}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/20 border border-white/10 text-white shadow-lg capitalization hover:bg-black/30 transition-colors">
                                                <span className="text-xs">{tour.difficulty === 'easy' ? '🟢' : tour.difficulty === 'medium' ? '🟡' : '🔴'}</span>
                                                <span className="text-xs font-bold tracking-wide uppercase">
                                                    {language === 'ru'
                                                        ? difficultyLabels[tour.difficulty.toLowerCase()]?.ru || tour.difficulty
                                                        : difficultyLabels[tour.difficulty.toLowerCase()]?.en || tour.difficulty
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price Badge */}
                                        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-lg rounded-xl px-4 py-2 shadow-xl z-10">
                                            <span className="font-black text-forest-900 text-lg tracking-tight">${tour.price}</span>
                                        </div>

                                        {/* Floating Rating */}
                                        <div className="absolute top-5 left-5 bg-black/20 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-sm z-10 border border-white/10 flex items-center gap-1">
                                            <span className="text-yellow-400">★</span>
                                            <span className="font-bold text-white text-sm">4.8</span>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white flex-grow flex flex-col relative">
                                        <h3 className="text-2xl font-bold text-forest-900 mb-3 group-hover:text-forest-600 transition-colors leading-tight">
                                            {tour[`title_${displayLanguage}`] || tour.title_ru}
                                        </h3>
                                        <div className="text-xs font-bold text-forest-400 uppercase tracking-widest mb-4">
                                            📍 {tour[`location_${displayLanguage}`] || tour.location_ru}
                                        </div>

                                        <p className="text-forest-700/80 mb-6 line-clamp-2 leading-relaxed flex-grow text-base font-medium">
                                            {tour[`shortDescription_${displayLanguage}`] || tour.shortDescription_ru}
                                        </p>

                                        <div className="flex items-center justify-between pt-5 border-t border-sage-100">
                                            <div className="text-sm font-black text-gold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                                {t("Программа тура", "View Itinerary")} →
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {sorted.length === 0 && (
                <div className="nature-card p-16 text-center bg-sage-50/50 border-dashed border-2 border-sage-200">
                    <div className="text-4xl mb-4 opacity-50">🏔️</div>
                    <p className="text-forest-800 text-lg font-bold">
                        {t("Маршруты не найдены", "No routes found")}
                    </p>
                    <p className="text-forest-600 text-sm mt-2">
                        {t("Попробуйте изменить фильтры", "Try changing the filters")}
                    </p>
                </div>
            )}
        </div>
    );
}
