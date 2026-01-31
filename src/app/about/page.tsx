"use client";

import { useLanguage } from "@/lib/useLanguage";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/ui/CTASection";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
    const { t, language, hasHydrated } = useLanguage();

    const stats = [
        { value: "10+", label: t("экспедиций", "Years of Discovery") },
        { value: "500+", label: t("гостей", "Happy Explorers") },
        { value: "50+", label: t("маршрутов", "Unique Expeditions") },
        { value: "98%", label: t("верных друзей", "Loyalty Rate") },
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
        <div className="min-h-screen antialiased pt-24 md:pt-32">
            <div className="container-x mx-auto">
                <PageHeader
                    title={t("Душа Наших Гор", "Spirit of the Peaks")}
                    description={t(
                        "KG Tours — это не просто маршруты. Это философия погружения в первозданную чистоту природы Кыргызстана.",
                        "KG Tours is more than pathfinding. It's a philosophy of immersion into the untamed sanctuary of the Kyrgyz wilderness."
                    )}
                    subtitle={t("О Нас", "About Us")}
                />

                {/* Bento Story Section */}
                <Section className="!pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {/* Story Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 space-y-12"
                        >
                            <div className="prose prose-lg prose-forest text-forest-800 leading-relaxed font-medium">
                                <h3 className="text-3xl font-black text-forest-900 mb-6 uppercase tracking-tight">
                                    {t("От мечты к реальности", "From Vision to Reality")}
                                </h3>
                                <p className="mb-6">
                                    {t(
                                        "KG Tours была основана в 2014 году группой энтузиастов, объединенных одной страстью — раскрыть миру величие кыргызских гор так, как видим его мы.",
                                        "KG Tours emerged in 2014, forged by a collective of enthusiasts bound by a singular passion: to reveal the mountain majesty of Kyrgyzstan as we perceive it."
                                    )}
                                </p>
                                <p className="pl-6 border-l-4 border-gold bg-sage-50/50 p-4 rounded-r-xl">
                                    {t(
                                        "Мы начинали с камерных пеших маршрутов, где каждый гость становился частью нашей семьи. Сегодня мы — архитекторы сложных экспедиций.",
                                        "We began with intimate hiking trails, where every guest became kin. Today, we are architects of complex expeditions."
                                    )}
                                </p>
                            </div>

                            <div className="relative h-[450px] rounded-[32px] overflow-hidden shadow-2xl group">
                                <Image
                                    src="/tours/ala-archa-2.webp"
                                    alt="Mountain Expedition"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-nature"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <h3 className="text-white text-2xl font-bold">{t("Высокогорные плато", "High-Altitude Sanctuary")}</h3>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image Grid */}
                        <div className="lg:col-span-5 grid grid-cols-1 gap-8 sticky top-24">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative h-[300px] rounded-[32px] overflow-hidden shadow-float group"
                            >
                                <Image
                                    src="/tours/issyk-kul-1.webp"
                                    alt="Crystal Waters"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-nature"
                                />
                            </motion.div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative h-[220px] rounded-[24px] overflow-hidden shadow-lg bg-sage-200">
                                    <Image
                                        src="/tours/son-kul-1.webp"
                                        alt="Mountain Life"
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="relative h-[220px] rounded-[24px] overflow-hidden shadow-lg bg-gold flex flex-col justify-center p-6 text-center hover:bg-amber transition-colors duration-300">
                                    <div className="text-forest-900 font-black text-5xl mb-2">10+</div>
                                    <div className="text-forest-900/60 text-[10px] font-black uppercase tracking-widest leading-tight">
                                        {t("лет опыта", "years")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Premium Stats Layer */}
            <div className="bg-forest-900 py-24 relative overflow-hidden mt-12">
                <div className="container-x mx-auto px-4 md:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-default"
                            >
                                <div className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 group-hover:text-gold transition-colors duration-500">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-black text-sage-200/50 uppercase tracking-[0.25em]">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Iconic Values Section */}
            <Section className="bg-sage-50/50">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-forest-500 text-xs font-black uppercase tracking-[0.4em] mb-4 block">{t("Наши Принципы", "Our Code")}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-forest-900 tracking-tighter uppercase">{t("Фундамент KG Tours", "The Foundation")}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-8 h-full border-none shadow-soft hover:shadow-float bg-white rounded-[32px] group">
                                <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:bg-gold transition-all duration-500 shadow-sm">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-black text-forest-900 mb-4 tracking-tight uppercase group-hover:text-gold transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-forest-700/80 leading-relaxed font-medium text-sm">
                                    {value.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <CTASection />
        </div>
    );
}
