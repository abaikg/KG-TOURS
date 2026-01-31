"use client";

import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="container-x mx-auto pt-24 md:pt-32 pb-8 md:pb-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-6 md:p-12 lg:p-16 relative overflow-hidden min-h-[500px] md:min-h-[700px] rounded-[24px] md:rounded-[40px] bg-forest-900 shadow-2xl"
            >
                {/* Background Image with Parallax-like optimized scaling */}
                <Image
                    src="/hero/kyrgyzstan-hero.webp"
                    alt="Kyrgyzstan Nature"
                    fill
                    className="object-cover opacity-70"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-forest-900/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-forest-900/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative z-10 max-w-3xl text-white flex flex-col justify-center h-full pt-12 md:pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-4 md:mb-6 flex items-center gap-4"
                    >
                        <div className="h-[2px] w-8 md:w-12 bg-gold/70" />
                        <span className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-gold/90 drop-shadow-sm">
                            {t("Исследуйте Мир", "Explore the Wild")}
                        </span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-black mb-6 md:mb-8 leading-[0.95] tracking-tight text-balance drop-shadow-lg">
                        <span className="block">{t("Откройте", "Discover")}</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-sage-200">
                            {t("величие природы", "the Greatness")}
                        </span>
                        <span className="text-gold block mt-2">{t("Киргизии", "of Kyrgyzstan")}</span>
                    </h1>

                    <p className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12 opacity-90 leading-relaxed max-w-2xl text-balance font-medium text-sage-100 shadow-black/20 drop-shadow-md">
                        {t(
                            "Авторские экспедиции в сердце Тянь-Шаня. Мы создаем маршруты, которые открывают истинную красоту горного края.",
                            "Bespoke expeditions into the heart of the Tian Shan. We craft journeys that reveal the untold beauty of our mountain heritage."
                        )}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/tours">
                            <Button variant="primary" size="lg" className="px-10 h-16 text-sm md:text-base tracking-widest shadow-[0_0_30px_rgba(244,196,48,0.2)] hover:shadow-[0_0_40px_rgba(244,196,48,0.4)]">
                                {t("Найти приключение", "Find Adventure")}
                            </Button>
                        </Link>
                        <Link href="#about">
                            <Button variant="secondary" size="lg" className="px-10 h-16 text-sm md:text-base tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                                {t("Подробнее", "Learn More")}
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="hidden md:grid grid-cols-3 gap-12 mt-20 pt-8 border-t border-white/10 max-w-xl"
                    >
                        <div>
                            <div className="text-3xl font-black italic text-white/90">7+</div>
                            <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mt-1">{t("Лет опыта", "Years")}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black italic text-white/90">50+</div>
                            <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mt-1">{t("Маршрутов", "Routes")}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black italic text-white/90">1k+</div>
                            <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mt-1">{t("Туристов", "Travelers")}</div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
