"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function ContactsPage() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to API
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
        <>
            {/* Hero */}
            <section className="bg-sage-100 py-16 -mt-20 pt-32 mb-12">
                <div className="container-x mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-forest-900 mb-4">
                            {t("Контакты", "Contacts")}
                        </h1>
                        <p className="text-lg text-forest-700 max-w-xl mx-auto">
                            {t(
                                "Мы всегда рады ответить на ваши вопросы",
                                "We're always happy to answer your questions"
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-x mx-auto pb-24">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="p-10 border-none shadow-soft">
                            <h2 className="text-h2 font-bold text-forest-900 mb-6">
                                {t("Напишите нам", "Write to Us")}
                            </h2>

                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="text-5xl mb-4">✅</div>
                                    <h3 className="text-xl font-bold text-forest-900 mb-2">
                                        {t("Сообщение отправлено!", "Message Sent!")}
                                    </h3>
                                    <p className="text-forest-700">
                                        {t(
                                            "Мы свяжемся с вами в ближайшее время.",
                                            "We will contact you soon."
                                        )}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <Input
                                        label={t("Имя", "Name")}
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        required
                                    />
                                    <Input
                                        label={t("Телефон", "Phone")}
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                    <div>
                                        <label className="block text-sm font-bold text-forest-900 mb-2">
                                            {t("Сообщение", "Message")}
                                        </label>
                                        <textarea
                                            className="nature-input min-h-[150px] resize-none"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <Button type="submit" variant="primary" fullWidth size="lg">
                                        {t("Отправить", "Send")}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-h2 font-bold text-forest-900 mb-6">
                            {t("Контактная информация", "Contact Information")}
                        </h2>

                        <div className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <Card key={i} className="p-6 border-none shadow-soft hover:shadow-card transition-shadow">
                                    {item.href ? (
                                        <a href={item.href} className="flex items-center gap-4 group">
                                            <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center text-2xl group-hover:bg-sage-200 transition-colors">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-forest-700">
                                                    {item.title}
                                                </div>
                                                <div className="font-bold text-forest-900 text-lg group-hover:text-forest-700 transition-colors">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center text-2xl">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-forest-700">
                                                    {item.title}
                                                </div>
                                                <div className="font-bold text-forest-900 text-lg">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>

                        {/* Socials */}
                        <div className="pt-6">
                            <h3 className="text-lg font-bold text-forest-900 mb-4">
                                {t("Мы в соцсетях", "Social Media")}
                            </h3>
                            <div className="flex gap-3">
                                {socials.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-3 rounded-pill bg-forest-800 text-white hover:bg-forest-900 transition-colors font-medium"
                                    >
                                        <span>{social.icon}</span>
                                        <span>{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
