"use client";

import { useLanguage } from "@/lib/useLanguage";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <Section id="about" className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[400px] md:h-[550px] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl group"
                >
                    <Image
                        src="/hero/kyrgyzstan-hero.webp"
                        alt="About KG Tours"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-nature"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent" />
                    {/* Decorative badge */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
                        <p className="text-white text-lg font-medium leading-snug">
                            "{t("Горы зовут тех, чья душа им по росту", "The mountains call those whose souls match their height")}"
                        </p>
                    </div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-forest-500" />
                        <span className="text-sm font-black text-forest-500 uppercase tracking-[0.2em]">{t("Кто мы", "Who We Are")}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-forest-900 mb-8 leading-tight tracking-tight text-balance">
                        {t("Наша История", "Our Story")}
                    </h2>

                    <div className="space-y-6 text-forest-800 leading-relaxed text-lg lg:text-xl font-medium">
                        <p>
                            {t(
                                "KG Tours — это больше чем агентство. Это сообщество профессионалов, рожденных в этих горах и влюбленных в каждый их пик.",
                                "KG Tours is more than an agency. It is a community of professionals born in these mountains and in love with every peak."
                            )}
                        </p>
                        <p>
                            {t(
                                "Мы не просто водим туры, мы создаем воспоминания. Прокладывая маршруты там, где редко ступает нога человека, мы дарим вам ощущение первооткрывателя.",
                                "We don't just lead tours, we craft memories. By forging paths where few have trodden, we gift you the feeling of true discovery."
                            )}
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-6">
                        <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100">
                            <div className="text-forest-900 font-bold mb-1">{t("Эко-френдли", "Eco-Friendly")}</div>
                            <div className="text-sm text-forest-600">{t("100% уважение к природе", "100% nature respect")}</div>
                        </div>
                        <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100">
                            <div className="text-forest-900 font-bold mb-1">{t("Местные гиды", "Local Guides")}</div>
                            <div className="text-sm text-forest-600">{t("Экспертные знания", "Expert knowledge")}</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
