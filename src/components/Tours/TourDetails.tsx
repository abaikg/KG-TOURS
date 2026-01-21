"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { StarRating } from '@/components/ui/StarRating';
import { createBooking } from '@/app/actions/bookings';
import { motion, AnimatePresence } from 'framer-motion';

export function TourDetails({ tour, reviews }: { tour: any, reviews: any[] }) {
    const { language, t } = useLanguage();
    const [showBooking, setShowBooking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        date: '',
        peopleCount: 1,
        comment: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await createBooking({
            ...formData,
            tourId: tour.id
        });

        setLoading(false);
        if (result.success) {
            setSuccess(true);
            setFormData({ customerName: '', email: '', phone: '', date: '', peopleCount: 1, comment: '' });
        }
    };

    const title = tour[`title_${language}`] || tour.title_ru;
    const description = tour[`description_${language}`] || tour.description_ru;
    const location = tour[`location_${language}`] || tour.location_ru;
    const program = tour[`program_${language}`] || tour.program_ru || [];
    const included = tour[`included_${language}`] || tour.included_ru || [];
    const notIncluded = tour[`notIncluded_${language}`] || tour.notIncluded_ru || [];

    return (
        <div className="pb-24">
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] -mt-20 mb-8 overflow-hidden bg-forest-900">
                <Image
                    src={tour.images?.[0] || '/hero/kyrgyzstan-hero.webp'}
                    alt={title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent" />

                {/* Info Pills on Image */}
                <div className="absolute bottom-8 left-0 right-0 z-10">
                    <div className="container-x mx-auto flex flex-wrap gap-3">
                        <div className="pill-info bg-white/10 backdrop-blur-md text-white border-white/20">
                            📅 {tour.duration} {t("дней", "days")}
                        </div>
                        <div className="pill-info bg-white/10 backdrop-blur-md text-white border-white/20">
                            📍 {location}
                        </div>
                        <div className="pill-info bg-white/10 backdrop-blur-md text-white border-white/20">
                            {tour.difficulty === 'easy' ? '🟢' : tour.difficulty === 'medium' ? '🟡' : '🔴'}
                            {t(tour.difficulty, tour.difficulty)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-x mx-auto">
                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-h1 font-bold text-forest-900 mb-4">{title}</h1>
                    <div className="flex items-center gap-4">
                        <StarRating rating={4.8} showNumber size="lg" />
                        <span className="text-forest-700">({reviews.length} {t("отзывов", "reviews")})</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Description */}
                        <Card className="overflow-hidden border-none shadow-soft">
                            <div className="p-10">
                                <h2 className="text-h2 font-bold text-forest-900 mb-6">{t("Описание", "Description")}</h2>
                                <p className="text-forest-700 leading-relaxed text-lg whitespace-pre-line">
                                    {description}
                                </p>
                            </div>
                        </Card>

                        {/* Program */}
                        {program.length > 0 && (
                            <section>
                                <h2 className="text-h2 font-bold text-forest-900 mb-8 px-2">{t("Программа тура", "Tour Program")}</h2>
                                <div className="space-y-6">
                                    {program.map((day: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <Card className="border-none shadow-soft hover:shadow-card transition-shadow duration-300">
                                                <div className="p-8 flex gap-6">
                                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-sage-200 flex flex-col items-center justify-center font-bold text-forest-900">
                                                        <span className="text-xs uppercase opacity-70">{t("День", "Day")}</span>
                                                        <span className="text-2xl">{day.day}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-forest-900 mb-3">{day.title}</h3>
                                                        <p className="text-forest-700 leading-relaxed">{day.description}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Included/Not Included */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <div className="p-6">
                                    <h3 className="text-h3 font-bold text-forest-900 mb-4 flex items-center gap-2">
                                        <span className="text-2xl">✓</span>
                                        {t("Включено", "Included")}
                                    </h3>
                                    <ul className="space-y-2">
                                        {included.map((item: string, i: number) => (
                                            <li key={i} className="text-sm text-forest-700 flex items-start gap-2">
                                                <span className="text-sage-500">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>

                            <Card>
                                <div className="p-6">
                                    <h3 className="text-h3 font-bold text-forest-900 mb-4 flex items-center gap-2">
                                        <span className="text-2xl">✗</span>
                                        {t("Не включено", "Not Included")}
                                    </h3>
                                    <ul className="space-y-2">
                                        {notIncluded.map((item: string, i: number) => (
                                            <li key={i} className="text-sm text-forest-700 flex items-start gap-2">
                                                <span className="text-sage-500">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </div>

                        {/* Reviews */}
                        {reviews.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-none shadow-soft overflow-hidden">
                                    <div className="p-10">
                                        <h2 className="text-h2 font-bold text-forest-900 mb-8">{t("Отзывы", "Reviews")}</h2>
                                        <div className="space-y-8">
                                            {reviews.map((review: any) => (
                                                <div key={review.id} className="border-b border-sage-200 pb-8 last:border-0 last:pb-0">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="font-extrabold text-forest-900 text-lg">{review.authorName || review.userName}</span>
                                                        <StarRating rating={review.rating} size="sm" />
                                                    </div>
                                                    <p className="text-forest-700 italic leading-relaxed text-lg">
                                                        "{review[`text_${language}`] || review.text_ru || review.comment}"
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Booking Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:sticky lg:top-24 h-fit"
                    >
                        <Card className="border-none shadow-float overflow-hidden">
                            <div className="p-8 space-y-8">
                                <div className="text-center bg-sage-50 py-6 rounded-2xl">
                                    <div className="text-5xl font-extrabold text-forest-900 mb-2">
                                        ${tour.price}
                                    </div>
                                    <div className="text-forest-700 font-medium uppercase tracking-wider text-xs">{t("за человека", "per person")}</div>
                                </div>

                                {!showBooking ? (
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        size="lg"
                                        className="h-14 text-lg font-bold"
                                        onClick={() => setShowBooking(true)}
                                    >
                                        {t("Забронировать", "Book Now")}
                                    </Button>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {success && (
                                            <div className="bg-sage-100 text-forest-900 p-4 rounded-xl text-center font-bold">
                                                {t("Заявка отправлена!", "Booking sent!")}
                                            </div>
                                        )}

                                        <Input
                                            label={t("Имя", "Name")}
                                            value={formData.customerName}
                                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <Input
                                            label={t("Телефон", "Phone")}
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label={t("Дата", "Date")}
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                required
                                            />
                                            <Input
                                                label={t("Человек", "People")}
                                                type="number"
                                                value={formData.peopleCount}
                                                onChange={(e) => setFormData({ ...formData, peopleCount: parseInt(e.target.value) })}
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            fullWidth
                                            size="lg"
                                            isLoading={loading}
                                            className="h-14 text-lg font-bold"
                                        >
                                            {t("Отправить заявку", "Submit Request")}
                                        </Button>
                                    </form>
                                )}

                                <div className="pt-6 border-t border-sage-200 space-y-4 text-sm font-medium text-forest-700">
                                    <div className="flex items-center gap-3">
                                        <span className="w-5 h-5 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-[10px]">✓</span>
                                        <span>{t("Бесплатная отмена за 24 часа", "Free cancellation 24h")}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-5 h-5 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-[10px]">✓</span>
                                        <span>{t("Подтверждение в течение часа", "Confirmation within 1 hour")}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
