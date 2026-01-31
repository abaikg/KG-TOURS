"use client";

import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";

interface Review {
    id: string;
    authorName?: string;
    userName?: string;
    rating: number;
    comment?: string;
    text_ru?: string;
    text_en?: string;
    createdAt: string;
    avatar?: string;
    photos?: string[];
    [key: string]: any;
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';

    const getName = (review: Review) => review.authorName || review.userName || "Guest";
    const getComment = (review: Review) => review[`text_${displayLanguage}`] || review.text_ru || review.comment || "";

    return (
        <Section id="reviews" className="bg-white">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <span className="text-sm font-black text-gold uppercase tracking-[0.2em] mb-4 block">{t("Сообщество", "Community")}</span>
                <h2 className="text-3xl md:text-5xl font-black text-forest-900 mb-6 tracking-tight">
                    {t("Истории Путешественников", "Traveler Stories")}
                </h2>
                <p className="text-lg text-forest-700/80">
                    {t("Настоящие эмоции и впечатления тех, кто уже открыл для себя магию Тянь-Шаня.", "Real emotions and impressions of those who have already discovered the magic of Tian Shan.")}
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {reviews.length > 0 ? (
                    reviews.slice(0, 3).map((review, i) => (
                        <Card key={i} className="p-8 bg-sage-50/50 border border-sage-100 shadow-sm hover:shadow-card transition-all rounded-[32px]">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-sage-200 overflow-hidden relative shadow-lg shrink-0 border-2 border-white">
                                    {review.avatar ? (
                                        <Image
                                            src={review.avatar}
                                            alt={getName(review)}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest-800 to-forest-900 text-white font-bold text-xl">
                                            {getName(review)[0] || "U"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-forest-900 text-lg">{getName(review)}</div>
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={review.rating} size="sm" />
                                        <span className="text-xs text-forest-400 font-medium">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-forest-700 italic text-base leading-relaxed mb-4">
                                "{getComment(review)}"
                            </p>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-sage-50 rounded-3xl text-forest-600 font-medium border border-dashed border-sage-200">
                        {t("Отзывов пока нет. Станьте первым!", "No reviews yet. Be the first one!")}
                    </div>
                )}
            </div>

            <div className="mt-16 text-center">
                <Link href="/reviews">
                    <Button variant="secondary" size="lg" className="px-12 h-14 text-sm tracking-widest uppercase">
                        {t("Читать больше", "Read More Stories")}
                    </Button>
                </Link>
            </div>
        </Section>
    );
}

