"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StarRating } from '@/components/ui/StarRating';
import { motion } from 'framer-motion';

export function TourDetails({ tour, reviews }: { tour: any, reviews: any[] }) {
    const { language, t, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';
    const [showBooking, setShowBooking] = useState(false);

    const [formData, setFormData] = useState({
        customerName: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        customerName: '',
        phone: ''
    });

    const validateForm = () => {
        const newErrors = { customerName: '', phone: '' };
        let isValid = true;

        if (!formData.customerName.trim()) {
            newErrors.customerName = t('Введите ваше имя', 'Enter your name');
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('Введите номер телефона', 'Enter phone number');
            isValid = false;
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = t('Некорректный формат телефона', 'Invalid phone format');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const message = `Здравствуйте! Хочу забронировать тур "${title}".\n\nМои контакты:\nИмя: ${formData.customerName}\nТелефон: ${formData.phone}`;
        const whatsappUrl = `https://wa.me/996500715638?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        setShowBooking(false);
    };

    const title = tour[`title_${displayLanguage}`] || tour.title_ru;
    const description = tour[`description_${displayLanguage}`] || tour.description_ru;
    const location = tour[`location_${displayLanguage}`] || tour.location_ru;
    const program = tour[`program_${displayLanguage}`] || tour.program_ru || [];
    const included = tour[`included_${displayLanguage}`] || tour.included_ru || [];
    const notIncluded = tour[`notIncluded_${displayLanguage}`] || tour.notIncluded_ru || [];

    return (
        <div className="pb-24">
            {/* Immersive Hero */}
            <div className="relative h-[55vh] md:h-[70vh] min-h-[400px] md:min-h-[600px] mb-8 overflow-hidden bg-forest-900 group rounded-b-[40px] md:rounded-b-[80px]">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={tour.images?.[0] || '/hero/kyrgyzstan-hero.webp'}
                        alt={title}
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                </motion.div>
                {/* Complex Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-forest-900/90" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent opacity-80" />

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-20">
                    <div className="container-x mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest">
                                    <span className="text-gold text-lg">📅</span> {tour.duration} {t("дней", "days")}
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest">
                                    <span className="text-gold text-lg">📍</span> {location}
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest">
                                    {tour.difficulty === 'easy' ? '🟢' : tour.difficulty === 'medium' ? '🟡' : '🔴'}
                                    <span className="ml-1">
                                        {t(
                                            tour.difficulty === 'easy' ? 'Легкий' : tour.difficulty === 'medium' ? 'Средний' : 'Сложный',
                                            tour.difficulty === 'easy' ? 'Easy' : tour.difficulty === 'medium' ? 'Medium' : 'Hard'
                                        )}
                                    </span>
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] text-balance drop-shadow-xl uppercase">
                                {title}
                            </h1>

                            <div className="flex items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                                    <StarRating rating={4.8} size="md" />
                                    <span className="font-bold text-lg text-white ml-2">4.8</span>
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest opacity-80 border-b border-white/30 pb-0.5 hover:text-gold hover:border-gold transition-colors cursor-pointer">
                                    {reviews.length} {t("отзывов", "reviews")}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container-x mx-auto px-4 md:px-0 -mt-12 md:-mt-24 relative z-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Description Card */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-sage-100 relative overflow-hidden"
                        >
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <div className="flex items-center gap-6 mb-8 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-forest-900 text-gold flex items-center justify-center shadow-lg shadow-forest-900/20">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black text-forest-900 uppercase tracking-tighter mb-1">{t("О путешествии", "About the Journey")}</h2>
                                    <div className="h-1 w-20 bg-gold rounded-full" />
                                </div>
                            </div>
                            <div className="prose prose-lg text-forest-800/80 leading-relaxed font-medium text-pretty relative z-10">
                                {description.split('\n').map((paragraph: string, idx: number) => (
                                    <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                                ))}
                            </div>
                        </motion.section>

                        {/* Gallery Section */}
                        {tour.images && tour.images.length > 0 && (
                            <section>
                                <div className="flex items-center gap-5 mb-8 px-4">
                                    <div className="w-14 h-14 rounded-2xl bg-forest-900 text-gold flex items-center justify-center shadow-lg shadow-forest-900/20">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black text-forest-900 uppercase tracking-tighter mb-1">{t("Галерея", "Gallery")}</h2>
                                        <div className="h-1 w-20 bg-gold rounded-full" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {tour.images.map((img: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`relative rounded-3xl overflow-hidden shadow-md group ${i % 3 === 0 ? 'col-span-2 md:col-span-2 row-span-2 min-h-[300px]' : 'min-h-[150px]'}`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${title} gallery ${i + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Program */}
                        {program.length > 0 && (
                            <section>
                                <div className="flex items-center gap-5 mb-12 px-4">
                                    <div className="w-14 h-14 rounded-2xl bg-forest-900 text-gold flex items-center justify-center shadow-lg shadow-forest-900/20">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black text-forest-900 uppercase tracking-tighter mb-1">{t("Программа тура", "Itinerary")}</h2>
                                        <div className="h-1 w-20 bg-gold rounded-full" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {program.map((day: any, i: number) => (
                                        <div key={i} className="group relative pl-0 md:pl-0">
                                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative">
                                                {/* Day Badge */}
                                                <div className="flex-shrink-0 md:w-32 text-left md:text-right pt-2">
                                                    <span className="inline-block md:block text-5xl font-black text-forest-900/10 group-hover:text-gold transition-colors duration-500">
                                                        {String(day.day).padStart(2, '0')}
                                                    </span>
                                                </div>

                                                {/* Content Card */}
                                                <div className="flex-1 bg-white p-8 md:p-10 rounded-[32px] border border-sage-100 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <h3 className="text-xl font-black text-forest-900 mb-3 relative z-10">{day.title}</h3>
                                                    <p className="text-forest-700/80 leading-relaxed font-medium relative z-10">{day.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Included/Excluded Grid */}
                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[40px] p-10 border border-emerald-100 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <h3 className="text-xl font-black text-forest-900 mb-8 uppercase tracking-widest flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">✓</div>
                                    {t("Включено", "Included")}
                                </h3>
                                <ul className="space-y-5 relative z-10">
                                    {included.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4 text-forest-900 text-sm font-bold">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-[40px] p-10 border border-rose-100 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <h3 className="text-xl font-black text-forest-900 mb-8 uppercase tracking-widest flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">✗</div>
                                    {t("Не включено", "Excluded")}
                                </h3>
                                <ul className="space-y-5 relative z-10">
                                    {notIncluded.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4 text-forest-900 text-sm font-bold">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-300 mt-2 flex-shrink-0" />
                                            <span className="leading-snug opacity-60">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Reviews */}
                        {reviews.length > 0 && (
                            <section>
                                <div className="flex items-center gap-5 mb-12 px-4">
                                    <div className="w-14 h-14 rounded-2xl bg-forest-900 text-gold flex items-center justify-center shadow-lg shadow-forest-900/20">
                                        <span className="text-2xl">★</span>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black text-forest-900 uppercase tracking-tighter mb-1">{t("Отзывы", "Reviews")}</h2>
                                        <div className="h-1 w-20 bg-gold rounded-full" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {reviews.map((review: any) => (
                                        <div key={review.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-sage-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-forest-900 overflow-hidden relative shadow-lg shrink-0">
                                                        {review.avatar ? (
                                                            <Image
                                                                src={review.avatar}
                                                                alt={review.authorName || "Guest"}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gold font-black text-lg">
                                                                {review.authorName?.[0] || "U"}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-forest-900 uppercase tracking-wide text-sm">{review.authorName || review.userName}</div>
                                                        <div className="text-[10px] text-forest-500 font-bold uppercase tracking-widest">{t("Проверенный турист", "Verified Traveler")}</div>
                                                    </div>
                                                </div>
                                                <StarRating rating={review.rating} size="sm" />
                                            </div>
                                            <p className="text-forest-700 leading-relaxed font-medium text-sm">
                                                "{review[`text_${displayLanguage}`] || review.text_ru || review.comment}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            {/* Price Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-[40px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-sage-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-forest-900 via-gold to-forest-900" />

                                <div className="text-center mb-8 pt-4">
                                    <span className="text-xs font-black text-forest-400 uppercase tracking-widest block mb-3">{t("Стоимость путешествия", "Total Price per person")}</span>
                                    <div className="flex items-start justify-center gap-1 text-forest-900 scale-110 origin-center mb-2">
                                        <span className="text-3xl font-bold mt-2">$</span>
                                        <span className="text-7xl font-black tracking-tighter" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>{tour.price}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-widest border border-emerald-100">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        {t("Доступно сейчас", "Available Now")}
                                    </div>
                                </div>

                                {!showBooking ? (
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        size="lg"
                                        className="h-16 text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-gold/30"
                                        onClick={() => setShowBooking(true)}
                                    >
                                        <span className="mr-2 text-xl">⚡</span> {t("Забронировать", "Book Now")}
                                    </Button>
                                ) : (
                                    <form onSubmit={handleWhatsAppSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                        <div className="space-y-3">
                                            <div>
                                                <Input
                                                    placeholder={t("Имя", "Your Name")}
                                                    value={formData.customerName}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, customerName: e.target.value });
                                                        if (errors.customerName) setErrors({ ...errors, customerName: '' });
                                                    }}
                                                    className={`h-14 bg-sage-50 border-transparent focus:bg-white focus:border-forest-200 transition-all rounded-2xl px-5 text-sm font-semibold placeholder:font-medium ${errors.customerName ? 'border-red-500' : ''}`}
                                                />
                                                {errors.customerName && <p className="text-red-500 text-xs mt-1 pl-2">{errors.customerName}</p>}
                                            </div>
                                            <div>
                                                <Input
                                                    placeholder={t("Телефон", "Phone Number")}
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, phone: e.target.value });
                                                        if (errors.phone) setErrors({ ...errors, phone: '' });
                                                    }}
                                                    className={`h-14 bg-sage-50 border-transparent focus:bg-white focus:border-forest-200 transition-all rounded-2xl px-5 text-sm font-semibold placeholder:font-medium ${errors.phone ? 'border-red-500' : ''}`}
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1 pl-2">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            fullWidth
                                            size="lg"
                                            className="h-16 font-black uppercase tracking-widest text-xs shadow-2xl shadow-gold/20 flex flex-col items-center justify-center gap-1"
                                        >
                                            <span>{t("Написать в WhatsApp", "Write to WhatsApp")}</span>
                                        </Button>
                                        <div className="text-center pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowBooking(false)}
                                                className="text-[10px] font-black text-forest-300 uppercase tracking-widest hover:text-forest-500 transition-colors"
                                            >
                                                {t("Отмена", "Cancel")}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="mt-8 pt-8 border-t border-sage-100 space-y-5">
                                    <div className="flex items-center gap-4 text-forest-800">
                                        <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-lg">🛡️</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-black text-forest-900 uppercase tracking-wide mb-0.5">{t("Безопасная оплата", "Secure Payment")}</div>
                                            <div className="text-[10px] text-forest-500 font-medium">{t("Никаких скрытых комиссий", "No hidden fees")}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-forest-800">
                                        <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-lg">💬</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-black text-forest-900 uppercase tracking-wide mb-0.5">{t("Поддержка 24/7", "24/7 Support")}</div>
                                            <div className="text-[10px] text-forest-500 font-medium">{t("Всегда на связи", "Always online")}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Booking Bar */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="lg:hidden fixed bottom-20 md:bottom-6 left-4 right-4 z-40"
            >
                <div className="bg-forest-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10 flex items-center justify-between gap-4">
                    <div>
                        <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider mb-0.5">{t("Цена за тур", "Tour Price")}</div>
                        <div className="flex items-baseline gap-1 text-white">
                            <span className="text-sm font-bold">$</span>
                            <span className="text-2xl font-black">{tour.price}</span>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => setShowBooking(true)}
                        className="h-12 px-6 shadow-lg shadow-gold/10"
                    >
                        {t("Забронировать", "Book Now")}
                    </Button>
                </div>
            </motion.div>

            {/* Mobile Booking Modal */}
            {showBooking && (
                <div className="lg:hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm sm:max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-sage-100 flex items-center justify-between bg-sage-50/50">
                            <h3 className="text-xl font-black text-forest-900 uppercase tracking-tight">{t("Бронирование", "Booking")}</h3>
                            <button onClick={() => setShowBooking(false)} className="w-8 h-8 rounded-full bg-sage-200 hover:bg-sage-300 flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-forest-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 md:p-8">
                            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                                <div className="space-y-3">
                                    <div>
                                        <Input
                                            placeholder={t("Имя", "Your Name")}
                                            value={formData.customerName}
                                            onChange={(e) => {
                                                setFormData({ ...formData, customerName: e.target.value });
                                                if (errors.customerName) setErrors({ ...errors, customerName: '' });
                                            }}
                                            className={`h-12 rounded-xl ${errors.customerName ? 'border-red-500' : ''}`}
                                        />
                                        {errors.customerName && <p className="text-red-500 text-xs mt-1 pl-2">{errors.customerName}</p>}
                                    </div>
                                    <div>
                                        <Input
                                            placeholder={t("Телефон", "Phone Number")}
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                setFormData({ ...formData, phone: e.target.value });
                                                if (errors.phone) setErrors({ ...errors, phone: '' });
                                            }}
                                            className={`h-12 rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1 pl-2">{errors.phone}</p>}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    size="lg"
                                    className="h-14 font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-2"
                                >
                                    <span>{t("Написать в WhatsApp", "Write to WhatsApp")}</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
