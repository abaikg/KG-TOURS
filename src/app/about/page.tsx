"use client";

import { useLanguage } from "@/lib/useLanguage";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function AboutPage() {
    const { t } = useLanguage();

    const stats = [
        { value: "10+", label: t("Лет опыта", "Years Experience") },
        { value: "500+", label: t("Довольных клиентов", "Happy Clients") },
        { value: "50+", label: t("Уникальных маршрутов", "Unique Routes") },
        { value: "98%", label: t("Положительных отзывов", "Positive Reviews") },
    ];

    const values = [
        {
            icon: "🏔️",
            title: t("Качество", "Quality"),
            description: t(
                "Мы гарантируем высокий уровень сервиса на каждом этапе вашего путешествия.",
                "We guarantee high-quality service at every stage of your journey."
            ),
        },
        {
            icon: "🤝",
            title: t("Надежность", "Reliability"),
            description: t(
                "Безопасность наших гостей — наш главный приоритет.",
                "The safety of our guests is our top priority."
            ),
        },
        {
            icon: "🌿",
            title: t("Экология", "Ecology"),
            description: t(
                "Мы заботимся о сохранении природы Кыргызстана для будущих поколений.",
                "We care about preserving the nature of Kyrgyzstan for future generations."
            ),
        },
        {
            icon: "💚",
            title: t("Страсть", "Passion"),
            description: t(
                "Мы любим свою работу и это видно в каждой детали наших туров.",
                "We love what we do and it shows in every detail of our tours."
            ),
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative h-[400px] -mt-20 mb-12 overflow-hidden bg-forest-900">
                <Image
                    src="/hero/kyrgyzstan-hero.webp"
                    alt="About KG Tours"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            {t("О нас", "About Us")}
                        </h1>
                        <p className="text-lg opacity-90 max-w-xl mx-auto px-4">
                            {t(
                                "Команда профессионалов, влюбленных в Кыргызстан",
                                "A team of professionals in love with Kyrgyzstan"
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-x mx-auto pb-24">
                {/* Story Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-12 items-center mb-24"
                >
                    <div className="relative h-[400px] rounded-[32px] overflow-hidden shadow-card">
                        <Image
                            src="/hero/kyrgyzstan-hero.webp"
                            alt="Our Story"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-h2 font-bold text-forest-900 mb-6">
                            {t("Наша история", "Our Story")}
                        </h2>
                        <div className="space-y-4 text-forest-700 leading-relaxed text-lg">
                            <p>
                                {t(
                                    "KG Tours была основана в 2014 году группой энтузиастов, влюбленных в красоту Кыргызстана. Мы начинали с небольших пеших маршрутов, а сегодня предлагаем полный спектр туристических услуг.",
                                    "KG Tours was founded in 2014 by a group of enthusiasts in love with the beauty of Kyrgyzstan. We started with small hiking routes, and today we offer a full range of travel services."
                                )}
                            </p>
                            <p>
                                {t(
                                    "За годы работы мы провели сотни туров и помогли тысячам путешественников открыть для себя величие наших гор, чистоту озер и гостеприимство кыргызского народа.",
                                    "Over the years, we have conducted hundreds of tours and helped thousands of travelers discover the greatness of our mountains, the purity of our lakes, and the hospitality of the Kyrgyz people."
                                )}
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Stats */}
                <section className="mb-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-8 text-center border-none shadow-soft bg-sage-50">
                                    <div className="text-4xl font-extrabold text-forest-900 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-forest-700 font-medium">
                                        {stat.label}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Values */}
                <section className="mb-24">
                    <h2 className="text-h2 font-bold text-forest-900 mb-12 text-center">
                        {t("Наши ценности", "Our Values")}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-8 h-full border-none shadow-soft hover:shadow-card transition-shadow">
                                    <div className="text-4xl mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-bold text-forest-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-forest-700 leading-relaxed">
                                        {value.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <Card className="p-12 text-center bg-gradient-to-br from-forest-800 to-forest-900 text-white border-none shadow-float">
                    <h2 className="text-h2 font-bold mb-4">
                        {t("Готовы к путешествию?", "Ready to Travel?")}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                        {t(
                            "Свяжитесь с нами и мы поможем спланировать ваше идеальное приключение.",
                            "Contact us and we will help plan your perfect adventure."
                        )}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/tours">
                            <button className="btn-nature-primary bg-white text-forest-900 hover:bg-sage-100">
                                {t("Выбрать тур", "Choose Tour")}
                            </button>
                        </Link>
                        <Link href="/contacts">
                            <button className="px-8 py-4 rounded-pill border-2 border-white/30 hover:bg-white/10 text-white font-semibold transition-colors">
                                {t("Связаться", "Contact Us")}
                            </button>
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    );
}
