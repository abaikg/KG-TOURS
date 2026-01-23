"use client";

import { useLanguage } from "@/lib/useLanguage";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";

export default function AboutPage() {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';

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
        <div className="bg-cream min-h-screen antialiased">
            {/* Cinematic Hero */}
            <section className="relative h-[70vh] min-h-[500px] -mt-24 overflow-hidden bg-forest-900">
                <motion.div
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/tours/issyk-kul-2.webp"
                        alt="About KG Tours"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-forest-900/40 via-transparent to-forest-900/60" />

                <div className="container-x mx-auto h-full flex flex-col justify-center relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6">
                            {t("Наследие и Будущее", "Heritage & Horizon")}
                        </span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-white mb-6 tracking-tighter leading-[0.85] uppercase">
                            {t("Душа", "Spirit")} <br />
                            <span className="text-gold">{t("Наших Гор", "of Peaks")}</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-sage-100/90 font-medium max-w-2xl leading-relaxed">
                            {t(
                                "KG Tours — это не просто маршруты. Это философия погружения в первозданную чистоту природы Кыргызстана.",
                                "KG Tours is more than pathfinding. It's a philosophy of immersion into the untamed sanctuary of the Kyrgyz wilderness."
                            )}
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
                </motion.div>
            </section>

            {/* Bento Story Section */}
            <section className="container-x mx-auto py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Story Text - Large Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 space-y-12"
                    >
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black text-forest-900 mb-8 tracking-tighter uppercase leading-[0.9]">
                                {t("От мечты к", "From Vision to")} <br />
                                <span className="text-forest-700/50">{t("экспедициям", "Expeditions")}</span>
                            </h2>
                            <div className="space-y-6 text-forest-800 text-lg md:text-xl leading-relaxed font-medium">
                                <p>
                                    {t(
                                        "KG Tours была основана в 2014 году группой энтузиастов, объединенных одной страстью — раскрыть миру величие кыргызских гор так, как видим его мы.",
                                        "KG Tours emerged in 2014, forged by a collective of enthusiasts bound by a singular passion: to reveal the mountain majesty of Kyrgyzstan as we perceive it."
                                    )}
                                </p>
                                <p>
                                    {t(
                                        "Мы начинали с камерных пеших маршрутов, где каждый гость становился частью нашей семьи. Сегодня мы — архитекторы сложных экспедиций, сочетающих дикую природу с безупречным сервисом.",
                                        "We began with intimate hiking trails, where every guest became kin. Today, we are architects of complex expeditions that meld raw wilderness with flawless craftsmanship."
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Secondary Image in Text flow */}
                        <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl group">
                            <Image
                                src="/tours/ala-archa-2.webp"
                                alt="Mountain Expedition"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{t("Вид сверху", "Aerial Perspective")}</span>
                                <h3 className="text-white text-xl font-bold">{t("Высокогорные плато", "High-Altitude Sanctuary")}</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Grid - Side Image Blocks */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-[350px] rounded-[40px] overflow-hidden shadow-xl group"
                        >
                            <Image
                                src="/tours/issyk-kul-1.webp"
                                alt="Crystal Waters"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent">
                                <p className="text-sage-100/80 text-sm font-medium leading-relaxed">
                                    {t("Кристальная чистота озер и вековая тишина снежных вершин.", "The crystalline purity of lakes mirrored by the eternal silence of snowy peaks.")}
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative h-[250px] rounded-[40px] overflow-hidden shadow-lg"
                            >
                                <Image
                                    src="/tours/son-kul-1.webp"
                                    alt="Mountain Life"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="relative h-[250px] rounded-[40px] overflow-hidden shadow-lg bg-gold flex flex-col justify-center p-8"
                            >
                                <div className="text-forest-900 font-black text-4xl mb-2">9+</div>
                                <div className="text-forest-900/70 text-[10px] font-black uppercase tracking-widest leading-tight">
                                    {t("лет опыта", "years of crafting odyssey")}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-[300px] rounded-[40px] overflow-hidden shadow-xl"
                        >
                            <Image
                                src="/tours/ala-archa-trek1.jpg"
                                alt="Trekking Adventures"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Premium Stats Layer */}
            <section className="bg-forest-900 py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="container-x mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="relative inline-block mb-4">
                                    <div className="text-5xl md:text-7xl font-black text-white tracking-tighter group-hover:text-gold transition-colors duration-500">
                                        {stat.value}
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold scale-0 group-hover:scale-100 transition-transform duration-500" />
                                </div>
                                <div className="text-[10px] md:text-xs font-black text-sage-100/40 uppercase tracking-[0.3em]">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </section>

            {/* Iconic Values Section */}
            <section className="container-x mx-auto py-24 md:py-32">
                <div className="text-center mb-20">
                    <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{t("Наши Принципы", "Our Code")}</span>
                    <h2 className="text-4xl md:text-6xl font-black text-forest-900 tracking-tighter uppercase">{t("Фундамент KG Tours", "The Foundation")}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 h-full border border-forest-900/5 bg-white shadow-soft hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group rounded-[32px]">
                                <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center text-4xl mb-8 group-hover:bg-gold transition-colors duration-500 group-hover:scale-105 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-black text-forest-900 mb-4 tracking-tight uppercase">
                                    {value.title}
                                </h3>
                                <p className="text-forest-700/80 leading-relaxed font-medium">
                                    {value.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CTASection />
        </div>
    );
}
