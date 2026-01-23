"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface CTASectionProps {
    className?: string;
}

export function CTASection({ className }: CTASectionProps) {
    const { t } = useLanguage();

    return (
        <section id="contacts" className={`container-x mx-auto py-16 md:py-32 scroll-mt-20 ${className}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center bg-forest-900 border border-white/10 shadow-2xl shadow-forest-900/40"
            >
                {/* Immersive Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--color-gold),transparent_70%)] opacity-[0.07] -mr-64 -mt-64 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-forest-700/20 to-transparent rounded-full -ml-48 -mb-48 blur-3xl" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8 shadow-lg shadow-black/20">
                        {t("Ваше следующее восхождение", "Your Next Ascent")}
                    </span>

                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 md:mb-8 tracking-tighter leading-[1.1] md:leading-[0.9] uppercase">
                        {t("Путь к вершинам начинается здесь", "The Saga Begins at the Summit")}
                    </h2>

                    <p className="text-base md:text-2xl text-sage-100/80 mb-10 md:mb-14 leading-relaxed font-medium">
                        {t(
                            "Свяжитесь с нами сегодня, чтобы спроектировать экспедицию, которая навсегда изменит ваше восприятие мира.",
                            "Connect with us today to architect an expedition that will refine your perception of the wild forever."
                        )}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                        <Link href="tel:+996555123456" className="w-full sm:w-auto">
                            <Button variant="primary" size="lg" className="w-full sm:px-12 h-14 md:h-16 bg-white text-forest-900 hover:bg-white shadow-2xl shadow-white/10 text-base md:text-lg font-black uppercase tracking-widest">
                                {t("Позвонить", "Direct Call")}
                            </Button>
                        </Link>
                        <Link href="mailto:info@kg-tours.com" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full sm:px-12 h-14 md:h-16 border-white/20 text-white hover:bg-white/10 backdrop-blur-md text-base md:text-lg font-black uppercase tracking-widest">
                                {t("Написать", "Send Inquiry")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
