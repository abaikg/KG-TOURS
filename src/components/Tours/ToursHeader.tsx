"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";

export function ToursHeader() {
    const { t } = useLanguage();

    return (
        <div className="mb-12">
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-forest-900 mb-4 tracking-tight"
            >
                {t("Коллекция Маршрутов", "Expedition Gallery")}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-forest-700 font-medium opacity-80 max-w-2xl"
            >
                {t(
                    "Экспедиции в самые потаенные уголки Тянь-Шаня. Откройте для себя Кыргызстан с новой стороны.",
                    "Odysseys into the untamed heart of the Tian Shan. Reveal the mountain spirit from a fresh perspective."
                )}
            </motion.p>
        </div>
    );
}
