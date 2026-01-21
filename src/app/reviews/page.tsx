"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import Link from "next/link";

// Mock reviews for demo - in production this would come from props/API  
const mockReviews = [
    { id: 1, userName: "Александр М.", rating: 5, comment: "Потрясающий тур! Незабываемые впечатления и профессиональные гиды. KG Tours — лучшие!" },
    { id: 2, userName: "Maria K.", rating: 5, comment: "Amazing experience! The mountains of Kyrgyzstan are breathtaking. Highly recommend!" },
    { id: 3, userName: "Дмитрий С.", rating: 4, comment: "Отличная организация, красивые маршруты. Обязательно вернусь!" },
    { id: 4, userName: "Sarah L.", rating: 5, comment: "Professional guides, stunning landscapes. One of the best travel experiences I've had." },
    { id: 5, userName: "Елена В.", rating: 5, comment: "Спасибо за незабываемое путешествие! Все было на высшем уровне." },
    { id: 6, userName: "John D.", rating: 4, comment: "Great tour, beautiful scenery, friendly staff. Would definitely recommend to friends." },
];

export default function ReviewsPage() {
    const { t } = useLanguage();

    return (
        <>
            {/* Hero */}
            <section className="bg-sage-100 py-16 -mt-20 pt-32 mb-12">
                <div className="container-x mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-forest-900 mb-4">
                            {t("Отзывы", "Reviews")}
                        </h1>
                        <p className="text-lg text-forest-700 max-w-xl mx-auto">
                            {t(
                                "Что говорят наши путешественники о своих приключениях",
                                "What our travelers say about their adventures"
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-x mx-auto pb-24">
                {/* Reviews Grid */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                >
                    {mockReviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                        >
                            <Card className="p-8 h-full border-none shadow-soft hover:shadow-card transition-shadow bg-white">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sage-300 to-sage-400 flex items-center justify-center font-bold text-white text-xl">
                                        {review.userName[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-forest-900 text-lg">
                                            {review.userName}
                                        </div>
                                        <StarRating rating={review.rating} size="sm" />
                                    </div>
                                </div>
                                <p className="text-forest-700 italic leading-relaxed text-lg">
                                    "{review.comment}"
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Leave Review CTA */}
                <Card className="p-12 text-center bg-gradient-to-br from-forest-800 to-forest-900 text-white border-none shadow-float">
                    <h2 className="text-h2 font-bold mb-4">
                        {t("Были с нами в туре?", "Traveled with Us?")}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                        {t(
                            "Поделитесь своими впечатлениями! Ваш отзыв поможет другим путешественникам.",
                            "Share your experience! Your review will help other travelers."
                        )}
                    </p>
                    <Link href="/contacts">
                        <button className="btn-nature-primary bg-white text-forest-900 hover:bg-sage-100">
                            {t("Оставить отзыв", "Leave a Review")}
                        </button>
                    </Link>
                </Card>
            </div>
        </>
    );
}
