"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { PageHeader } from "@/components/ui/PageHeader";
import { useState } from "react";
import Image from "next/image";

interface Review {
    id: string;
    description?: string;
    text_ru?: string;
    text_en?: string;
    rating: number;
    authorName: string; // Ensure this is handled safely
    createdAt: Date | string;
    [key: string]: any;
}

export function ReviewsContent({ reviews }: { reviews: Review[] }) {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';
    const [activeFilter, setActiveFilter] = useState('all');

    // Helper to get color based on index or hash
    const getAvatarColor = (name: string | undefined | null) => {
        const safeName = name || "Anonymous";
        const colors = [
            "bg-emerald-50 text-emerald-700",
            "bg-blue-50 text-blue-700",
            "bg-amber-50 text-amber-700",
            "bg-purple-50 text-purple-700",
            "bg-rose-50 text-rose-700",
            "bg-orange-50 text-orange-700"
        ];
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < safeName.length; i++) {
            hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    const formatDate = (dateString: string | Date) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(displayLanguage === 'ru' ? 'ru-RU' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const filteredReviews = (reviews || []).filter(review => {
        if (activeFilter === 'all') return true;
        if (activeFilter === '5 star') return review.rating === 5;
        if (activeFilter === '4 star') return review.rating === 4;
        return true;
    });

    // Calculates stats properly
    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <div className="min-h-screen antialiased pt-24 md:pt-32">
            <div className="container-x mx-auto">
                <PageHeader
                    title={t("Истории Путешествий", "Guest Stories")}
                    description={t(
                        "Откройте для себя Кыргызстан глазами наших гостей. Искренние эмоции, запечатленные в горах.",
                        "Experience Kyrgyzstan through the eyes of our guests. Authentic emotions, etched into the mountain horizon."
                    )}
                    subtitle={t("Отзывы", "Reviews")}
                />

                <Section className="!pt-0">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-sage-100 shadow-sm">
                            <StarRating rating={Number(avgRating)} size="sm" />
                            <span className="text-sm font-bold text-forest-900 uppercase tracking-wider">
                                {avgRating} {t("средняя оценка", "Average")}
                            </span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                            {[
                                { id: 'all', label: t('Все', 'All') },
                                { id: '5 star', label: '5 ★' },
                                { id: '4 star', label: '4 ★' }
                            ].map(filter => (
                                <Pill
                                    key={filter.id}
                                    active={activeFilter === filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className="capitalize whitespace-nowrap px-6 py-2"
                                >
                                    {filter.label}
                                </Pill>
                            ))}
                        </div>
                    </div>

                    {/* Masonry-style Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review, i) => (
                                <motion.div
                                    key={review.id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                >
                                    <Card className="group p-8 border-none shadow-soft hover:shadow-float bg-white rounded-[32px] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col">
                                        <div className="flex items-center gap-4 mb-6 relative z-10">
                                            {/* Avatar Image */}
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white">
                                                {review.avatar ? (
                                                    <Image
                                                        src={review.avatar}
                                                        alt={review.authorName || "Guest"}
                                                        width={56}
                                                        height={56}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className={`w-full h-full flex items-center justify-center font-black text-lg ${getAvatarColor(review.authorName)}`}>
                                                        {(review.authorName || "A").charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-forest-900 text-base uppercase tracking-tight">
                                                    {review.authorName || t("Гость", "Guest")}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <StarRating rating={review.rating} size="sm" />
                                                    <span className="text-xs text-forest-400 font-bold">{formatDate(review.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex-grow">
                                            <p className="text-forest-700/90 leading-relaxed text-base font-medium italic">
                                                "{review[`text_${displayLanguage}`] || review.text_ru || t("Нет текста отзыва", "No review text")}"
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full p-12 text-center border-2 border-dashed border-sage-200 rounded-[32px] bg-sage-50/50">
                                <div className="text-4xl mb-4 opacity-40">💬</div>
                                <h3 className="text-lg font-bold text-forest-800">{t("Отзывов пока нет", "No reviews yet")}</h3>
                            </div>
                        )}
                    </div>
                </Section>
            </div>
        </div>
    );
}
