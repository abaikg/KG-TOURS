"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";

export function ToursHeader() {
    const { t } = useLanguage();

    return (
        <div className="relative mb-16 pt-8 md:pt-16 pb-12 rounded-[32px] overflow-hidden bg-forest-900 border border-white/5 shadow-2xl">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(244,196,48,0.15),transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('/patterns/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 container-x mx-auto px-6 md:px-12 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                        <span className="h-[2px] w-12 bg-gold/70" />
                        <span className="text-xs md:text-sm font-black tracking-[0.25em] uppercase text-gold shadow-black/50 drop-shadow-sm">
                            {t("Наши Маршруты", "Our Expeditions")}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[0.9]">
                        {t("Коллекция", "The Collection")}
                        <span className="block text-sage-200 opacity-60 font-serif italic font-normal text-3xl md:text-5xl mt-2">
                            {t("Дикой Природы", "of the Wild")}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-sage-100/90 font-medium max-w-2xl text-balance leading-relaxed mx-auto md:mx-0">
                        {t(
                            "От высокогорных озер до реликтовых лесов. Каждый маршрут — это тщательно спланированное путешествие в мир, где время течет иначе.",
                            "From alpine lakes to relict forests. Each route is a meticulously curated journey into a world where time flows differently."
                        )}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
