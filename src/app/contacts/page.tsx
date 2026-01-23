"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";

export default function ContactsPage() {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation of API call
        setSubmitted(true);
    };

    const contactInfo = [
        {
            icon: "📞",
            title: t("Телефон", "Phone"),
            value: "+996 555 123 456",
            href: "tel:+996555123456",
        },
        {
            icon: "✉️",
            title: "Email",
            value: "info@kg-tours.com",
            href: "mailto:info@kg-tours.com",
        },
        {
            icon: "📍",
            title: t("Адрес", "Address"),
            value: t("г. Бишкек, ул. Киевская 123", "Bishkek, Kievskaya st. 123"),
            href: "https://maps.google.com",
        },
        {
            icon: "🕐",
            title: t("Часы работы", "Working Hours"),
            value: t("Пн-Пт: 9:00 - 18:00", "Mon-Fri: 9:00 AM - 6:00 PM"),
            href: null,
        },
    ];

    const socials = [
        { icon: "📱", label: "WhatsApp", href: "https://wa.me/996555123456" },
        { icon: "📸", label: "Instagram", href: "https://instagram.com/kgtours" },
        { icon: "💬", label: "Telegram", href: "https://t.me/kgtours" },
    ];

    return (
        <div className="bg-cream min-h-screen antialiased">
            {/* Cinematic Hero */}
            <section className="relative h-[60vh] min-h-[500px] -mt-24 overflow-hidden bg-forest-900">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/tours/ala-archa-2.webp"
                        alt="Contact KG Tours"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-forest-900/40 via-transparent to-forest-900" />

                <div className="container-x mx-auto h-full flex flex-col justify-center relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-xl">
                            {t("Открытость и доверие", "Transparency & Trust")}
                        </span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 tracking-tighter leading-[0.85] uppercase">
                            {t("Диалог", "Dialogue")} <br />
                            <span className="text-gold">{t("с Вершинами", "with Peaks")}</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-sage-100/90 font-medium max-w-2xl leading-relaxed">
                            {t(
                                "Мы готовы обсуждать детали вашей будущей экспедиции в потаенные уголки Тянь-Шаня. Каждый запрос для нас — начало новой истории.",
                                "We are ready to design your transformative journey into the heart of the Tian Shan. Every inquiry is the beginning of a new legendary era."
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-x mx-auto py-24 md:py-32 relative z-20">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
                    {/* Glassmorphism Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="p-8 sm:p-12 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-glass relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-[100px] blur-3xl pointer-events-none" />

                            <h2 className="text-3xl md:text-4xl font-black text-forest-900 mb-10 tracking-tighter uppercase leading-tight">
                                {t("Отправить\nзапрос", "Initiate\nRequest")}
                            </h2>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
                                        <span className="text-5xl">🏔️</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-forest-900 mb-4 tracking-tight uppercase">
                                        {t("Заявка принята!", "Odyssey Initiated!")}
                                    </h3>
                                    <p className="text-forest-700 leading-relaxed font-medium">
                                        {t(
                                            "Наши эксперты свяжутся с вами в течение часа, чтобы обсудить детали вашего восхождения.",
                                            "Our mountain architects will connect with you within an hour to craft the details of your ascent."
                                        )}
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Input
                                            label={t("Имя", "Name")}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="bg-white/40 border-forest-900/10 focus:border-gold transition-all duration-300"
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="bg-white/40 border-forest-900/10 focus:border-gold transition-all duration-300"
                                        />
                                    </div>
                                    <Input
                                        label={t("Телефон", "Phone")}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="bg-white/40 border-forest-900/10 focus:border-gold transition-all duration-300"
                                    />
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-forest-900/40 uppercase tracking-widest pl-2">
                                            {t("Сообщение", "Message")}
                                        </label>
                                        <textarea
                                            className="w-full min-h-[160px] bg-white/40 backdrop-blur-md border border-forest-900/10 p-6 rounded-3xl focus:outline-none focus:border-gold transition-all duration-300 font-medium text-forest-900 placeholder:text-forest-900/20"
                                            placeholder={t("Ваши идеи для путешествия...", "Your vision for the odyssey...")}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" variant="primary" fullWidth size="lg" className="h-16 text-lg font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-gold/20 active:scale-95 transition-all">
                                        {t("Отправить", "Send Proposal")}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </motion.div>

                    {/* Contact Information & Channels */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-forest-900 mb-4 tracking-tighter uppercase leading-tight">
                                {t("Прямой\nканал", "Direct\nChannel")}
                            </h2>
                            <p className="text-forest-700/60 font-black uppercase tracking-[0.2em] text-[10px]">
                                {t("Бескомпромиссная поддержка 24/7", "Uncompromising Support 24/7")}
                            </p>
                        </motion.div>

                        <div className="grid gap-6">
                            {contactInfo.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="p-8 border border-forest-900/5 bg-white/60 backdrop-blur-xl hover:bg-white shadow-soft hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-[32px] group">
                                        {item.href ? (
                                            <a href={item.href} className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center text-3xl group-hover:bg-gold group-hover:scale-110 transition-all duration-500">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-forest-900/30 uppercase tracking-[0.2em] mb-1">
                                                        {item.title}
                                                    </div>
                                                    <div className="font-extrabold text-forest-900 text-xl tracking-tight">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center text-3xl">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-forest-900/30 uppercase tracking-[0.2em] mb-1">
                                                        {item.title}
                                                    </div>
                                                    <div className="font-extrabold text-forest-900 text-xl tracking-tight">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="mt-16 pt-10 border-t border-forest-900/5">
                            <h3 className="text-[10px] font-black text-forest-900/30 mb-8 uppercase tracking-[0.3em]">
                                {t("Цифровое присутствие", "Digital Presence")}
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-4 px-8 h-16 rounded-[24px] bg-white border border-forest-900/5 shadow-soft hover:shadow-xl transition-all"
                                    >
                                        <span className="text-xl">{social.icon}</span>
                                        <span className="font-black tracking-widest uppercase text-[10px] text-forest-900">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CTASection />
        </div>
    );
}
