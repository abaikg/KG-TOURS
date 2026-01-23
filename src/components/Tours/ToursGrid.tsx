"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui/Pill';
import { Card } from '@/components/ui/Card';
import { StarRating } from '@/components/ui/StarRating';
import { AvatarGroup } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
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
        { value: 'all' as const, label: t('Весь мир', 'All Realms'), icon: '🏔️' },
        { value: 'easy' as const, label: t('Спокойно', 'Serene'), icon: '🟢' },
        { value: 'medium' as const, label: t('Активно', 'Active'), icon: '🟡' },
        { value: 'hard' as const, label: t('Вызов', 'Epic'), icon: '🔴' },
    ];

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                {difficultyFilters.map((item) => (
                    <Pill
                        key={item.value}
                        active={filter === item.value}
                        onClick={() => setFilter(item.value)}
                        icon={<span>{item.icon}</span>}
                    >
                        {item.label}
                    </Pill>
                ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-forest-800">{t("Сортировка:", "Sort by:")}</span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="nature-input py-2 px-6 text-sm font-bold uppercase tracking-wider bg-white/50 border-sage-300 w-auto h-auto cursor-pointer hover:border-forest-700 transition-colors"
                >
                    <option value="price">{t("Стоимость", "By Investment")}</option>
                    <option value="duration">{t("Время в пути", "By Timeframe")}</option>
                </select>
            </div>

            {/* Grid */}
            <motion.div
                layout
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {sorted.map((tour) => (
                        <motion.div
                            layout
                            key={tour.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link href={`/tours/${tour.slug}`}>
                                <Card variant="image" className="group cursor-pointer h-full border-none shadow-soft hover:shadow-float transition-all duration-500 overflow-hidden flex flex-col">
                                    <div className="relative h-72 overflow-hidden">
                                        <Image
                                            src={tour.images[0] || '/hero/kyrgyzstan-hero.webp'}
                                            alt={tour[`title_${displayLanguage}`] || tour.title_ru}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-nature"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity" />

                                        {/* Info Pills */}
                                        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 z-10">
                                            <div className="pill-info backdrop-blur-md bg-white/20 border-white/20 text-white shadow-sm">
                                                📅 {tour.duration} {t("дней", "days")}
                                            </div>
                                            <div className="pill-info backdrop-blur-md bg-white/20 border-white/20 text-white shadow-sm">
                                                📍 {tour[`location_${displayLanguage}`] || tour.location_ru}
                                            </div>
                                            <div className="pill-info backdrop-blur-md bg-white/20 border-white/20 text-white shadow-sm capitalize">
                                                {tour.difficulty === 'easy' ? '🟢' : tour.difficulty === 'medium' ? '🟡' : '🔴'}
                                                {t(tour.difficulty, tour.difficulty)}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-2.5 shadow-soft z-10">
                                            <span className="font-extrabold text-forest-900 text-lg">${tour.price}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-cream flex-grow flex flex-col">
                                        <h3 className="text-h3 font-bold text-forest-900 mb-3 group-hover:text-forest-700 transition-colors">
                                            {tour[`title_${displayLanguage}`] || tour.title_ru}
                                        </h3>
                                        <p className="text-forest-700 mb-6 line-clamp-2 leading-relaxed flex-grow">
                                            {tour[`shortDescription_${displayLanguage}`] || tour.shortDescription_ru}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                                            <StarRating rating={4.5} size="sm" />
                                            <AvatarGroup
                                                avatars={[
                                                    { alt: "User 1" },
                                                    { alt: "User 2" },
                                                    { alt: "User 3" },
                                                ]}
                                                max={2}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {sorted.length === 0 && (
                <div className="nature-card p-12 text-center">
                    <p className="text-forest-700 text-lg">
                        {t("Туры не найдены", "No tours found")}
                    </p>
                </div>
            )}
        </div>
    );
}
