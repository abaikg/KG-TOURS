"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";

// Mock reviews with bilingual support for hydration-safe rendering
const mockReviews = [
    {
        id: 1,
        userName: "Александр М.",
        rating: 5,
        comment_ru: "Потрясающий тур! Незабываемые впечатления и профессиональные гиды. KG Tours — лучшие!",
        comment_en: "Stunning tour! Unforgettable impressions and professional guides. KG Tours are the best!",
        date: "2023-10-12"
    },
    {
        id: 2,
        userName: "Maria K.",
        rating: 5,
        comment_ru: "Удивительный опыт! Горы Кыргызстана захватывают дух. Очень рекомендую!",
        comment_en: "Amazing experience! The mountains of Kyrgyzstan are breathtaking. Highly recommend!",
        date: "2023-09-25"
    },
    {
        id: 3,
        userName: "Дмитрий С.",
        rating: 4,
        comment_ru: "Отличная организация, красивые маршруты. Обязательно вернусь!",
        comment_en: "Excellent organization, beautiful routes. I will definitely be back!",
        date: "2023-08-30"
    },
    {
        id: 4,
        userName: "Sarah L.",
        rating: 5,
        comment_ru: "Профессиональные гиды, потрясающие пейзажи. Один из лучших опытов путешествий.",
        comment_en: "Professional guides, stunning landscapes. One of the best travel experiences I've had.",
        date: "2023-08-15"
    },
    {
        id: 5,
        userName: "Елена В.",
        rating: 5,
        comment_ru: "Спасибо за незабываемое путешествие! Все было на высшем уровне.",
        comment_en: "Thank you for an unforgettable journey! Everything was at the highest level.",
        date: "2023-07-20"
    },
    {
        id: 6,
        userName: "John D.",
        rating: 4,
        comment_ru: "Отличный тур, красивая природа, дружелюбный персонал. Рекомендую друзьям.",
        comment_en: "Great tour, beautiful scenery, friendly staff. Would definitely recommend to friends.",
        date: "2023-06-05"
    },
];

export default function ReviewsPage() {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';

    return (
        <div className="bg-cream min-h-screen antialiased">
            {/* Cinematic Hero */}
            <section className="relative h-[60vh] min-h-[400px] -mt-24 overflow-hidden bg-forest-900">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/tours/ala-archa-1.webp"
                        alt="Traveler Stories"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-transparent to-forest-900" />

                <div className="container-x mx-auto h-full flex flex-col justify-center relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8">
                            {t("Голоса Гор", "Voices of the Peaks")}
                        </span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 tracking-tighter leading-[0.85] uppercase">
                            {t("Истории", "Guest")} <br />
                            <span className="text-gold">{t("Путешествий", "Stories")}</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-sage-100/90 font-medium max-w-2xl leading-relaxed">
                            {t(
                                "Откройте для себя Кыргызстан глазами наших гостей. Искренние эмоции, запечатленные в горах.",
                                "Experience Kyrgyzstan through the eyes of our guests. Authentic emotions, etched into the mountain horizon."
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-x mx-auto py-24 md:py-32">
                {/* Masonry-style Grid */}
                <motion.div
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
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    {mockReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="break-inside-avoid"
                        >
                            <Card className="group p-8 sm:p-10 border border-forest-900/5 bg-white shadow-soft transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 rounded-[32px] relative overflow-hidden">
                                {/* Decorative Gold Quote Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-[100px] flex items-center justify-center pointer-events-none">
                                    <span className="text-gold/20 text-6xl font-serif">"</span>
                                </div>

                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center font-black text-forest-900 text-xl group-hover:bg-gold transition-colors duration-500">
                                        {review.userName[0]}
                                    </div>
                                    <div>
                                        <div className="font-black text-forest-900 text-lg tracking-tight uppercase">
                                            {review.userName}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <StarRating rating={review.rating} size="sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <p className="text-forest-800 leading-relaxed text-lg font-medium italic opacity-90">
                                        "{displayLanguage === 'ru' ? review.comment_ru : review.comment_en}"
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-sage-100 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-forest-800/40 uppercase tracking-widest">
                                        {review.date}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-gold" />
                                        <div className="w-1 h-1 rounded-full bg-gold/40" />
                                        <div className="w-1 h-1 rounded-full bg-gold/20" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Branding/Stats for Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 md:p-20 rounded-[48px] bg-forest-900 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/hero/kyrgyzstan-hero.webp')] bg-cover bg-center opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase whitespace-pre-line">
                            {t("Более 500\nсчастливых путешественников", "Over 500\nSatisfied Explorers")}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-black text-gold mb-2 tracking-tighter">4.9/5</div>
                                <div className="text-[10px] font-black text-sage-100/50 uppercase tracking-[0.3em]">{t("Средний рейтинг", "Avg Rating")}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-black text-gold mb-2 tracking-tighter">98%</div>
                                <div className="text-[10px] font-black text-sage-100/50 uppercase tracking-[0.3em]">{t("Возвращаемость", "Return rate")}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <CTASection />
        </div>
    );
}
