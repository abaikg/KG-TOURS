"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CTASection } from "@/components/ui/CTASection";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ContactsPage() {
    const { t, language, hasHydrated } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const displayLanguage = hasHydrated ? language : 'ru';

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const messageText = `Здравствуйте! Меня зовут ${formData.name}.
Телефон: ${formData.phone}

Сообщение:
${formData.message}`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/996779715638?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setSubmitted(true);
    };

    const contactInfo = [
        {
            icon: "📞",
            title: t("Телефон", "Phone"),
            value: "+996 500 715 638",
            href: "tel:+996500715638",
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
        { icon: "📱", label: "WhatsApp", href: "https://wa.me/996500715638" },
        { icon: "📸", label: "Instagram", href: "https://instagram.com/kgtours" },
        { icon: "💬", label: "Telegram", href: "https://t.me/kgtours" },
    ];

    return (
        <div className="min-h-screen antialiased pt-24 md:pt-32">
            <div className="container-x mx-auto">
                <PageHeader
                    title={t("Диалог с Вершинами", "Dialogue with Peaks")}
                    description={t(
                        "Мы готовы обсудить детали вашей будущей экспедиции в потаенные уголки Тянь-Шаня. Каждый запрос для нас — начало новой истории.",
                        "We are ready to design your transformative journey into the heart of the Tian Shan. Every inquiry is the beginning of a new legendary era."
                    )}
                    subtitle={t("Контакты", "Contacts")}
                />

                <Section className="!pt-6 md:!pt-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-24">
                        {/* Contact Form */}
                        <div className="order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <Card className="p-6 sm:p-12 bg-white border-none shadow-float rounded-[32px] sm:rounded-[40px] relative overflow-hidden">
                                    {submitted ? (
                                        <div className="text-center py-24 space-y-6">
                                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto">✓</div>
                                            <h3 className="text-3xl font-black text-forest-900 uppercase tracking-tight">{t("Заявка принята!", "Received!")}</h3>
                                            <p className="text-forest-600 text-lg max-w-sm mx-auto">{t("Мы свяжемся с вами совсем скоро для уточнения деталей.", "We will contact you shortly to confirm the details.")}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-6 sm:mb-10">
                                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-forest-900 mb-3 sm:mb-4 tracking-tighter uppercase">{t("Напишите нам", "Write to Us")}</h2>
                                                <p className="text-forest-600 font-medium text-sm sm:text-base">{t("Заполните форму ниже, и мы ответим в течение часа.", "Fill out the form below and we'll respond within an hour.")}</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                    <Input
                                                        label={t("Имя", "Name")}
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        required
                                                        className="bg-sage-50 border-transparent focus:bg-white"
                                                    />
                                                    <Input
                                                        label={t("Телефон", "Phone")}
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        required
                                                        className="bg-sage-50 border-transparent focus:bg-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-forest-900/60 uppercase tracking-widest pl-1">
                                                        {t("Сообщение", "Message")}
                                                    </label>
                                                    <textarea
                                                        className="w-full min-h-[160px] bg-sage-50 border border-transparent p-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all font-medium text-forest-900 placeholder:text-forest-900/30 resize-none"
                                                        placeholder={t("Опишите ваше идеальное путешествие...", "Describe your dream journey...")}
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <Button type="submit" variant="primary" fullWidth size="lg" className="h-16 text-lg font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                                    {t("Отправить", "Send Message")}
                                                </Button>
                                            </form>
                                        </>
                                    )}
                                </Card>
                            </motion.div>
                        </div>

                        {/* Contact Stats/Info */}
                        <div className="order-1 lg:order-2 space-y-8 lg:space-y-12">
                            <div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-forest-900 mb-4 sm:mb-8 tracking-tighter uppercase leading-[0.9]">
                                    {t("Всегда на", "Always in")} <br />
                                    <span className="text-forest-500">{t("связи", "Touch")}</span>
                                </h2>
                                <p className="text-forest-800 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-md text-pretty">
                                    {t(
                                        "Наша команда поддержки работает 24/7, чтобы вы чувствовали себя уверенно на каждом этапе планирования.",
                                        "Our support team operates 24/7 to ensure you feel confident at every stage of planning."
                                    )}
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {contactInfo.map((item, i) => (
                                    <motion.a
                                        key={i}
                                        href={item.href || '#'}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-sage-100 shadow-sm hover:shadow-lg hover:border-gold/30 transition-all group"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-sage-50 text-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-gold transition-all duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-forest-400 uppercase tracking-widest mb-1 group-hover:text-forest-600 transition-colors">{item.title}</div>
                                            <div className="text-lg md:text-xl font-bold text-forest-900">{item.value}</div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-xs font-black text-forest-400 mb-6 uppercase tracking-[0.3em]">
                                    {t("Мессенджеры", "Messengers")}
                                </h3>
                                <div className="flex gap-4">
                                    {socials.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-16 h-16 rounded-2xl bg-white border border-sage-200 flex items-center justify-center text-2xl hover:scale-110 hover:shadow-lg hover:border-transparent transition-all"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <div className="mt-12">
                    <CTASection />
                </div>
            </div>
        </div>
    );
}
