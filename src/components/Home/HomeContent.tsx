"use client";

import { useLanguage } from "@/lib/useLanguage";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { AvatarGroup } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";

export function HomeContent({ tours, reviews }: { tours: any[]; reviews: any[] }) {
    const { t, language, hasHydrated } = useLanguage();
    const displayLanguage = hasHydrated ? language : 'ru';

    const filters = [
        { icon: "🥾", label: t("Пешие туры", "Hiking") },
        { icon: "🚣", label: t("Сплавы", "Kayaking") },
        { icon: "🚴", label: t("Велотуры", "Biking") },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="container-x mx-auto pt-4 md:pt-8 pb-8 md:pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 md:p-12 relative overflow-hidden min-h-[450px] md:min-h-[600px] rounded-[24px] md:rounded-[32px] bg-forest-900"
                >
                    {/* Background Image */}
                    <Image
                        src="/hero/kyrgyzstan-hero.webp"
                        alt="Kyrgyzstan"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 max-w-2xl text-white">
                        <div className="mb-4 md:mb-6">
                            <span className="text-[10px] md:text-sm font-black tracking-[0.2em] uppercase opacity-90 border-b-2 border-gold/50 pb-1">{t("Исследуйте Мир", "Explore the World")}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tight">
                            {t("Откройте величие", "Discover the Greatness")}<br />
                            <span className="text-gold">{t("природы Киргизии", "of Kyrgyz Nature")}</span>
                        </h1>

                        <p className="text-base md:text-xl mb-8 md:mb-10 opacity-90 leading-relaxed max-w-xl">
                            {t(
                                "Уникальные экспедиции в сердце Тянь-Шаня. Мы создаем маршруты, которые открывают истинную красоту горного края.",
                                "Unique expeditions into the heart of the Tian Shan. We design routes that reveal the true beauty of high-altitude heritage."
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/tours">
                                <Button variant="primary" size="lg" className="px-10">
                                    {t("Найти приключение", "Find Adventure")}
                                </Button>
                            </Link>
                            <Link href="#about">
                                <Button variant="secondary" size="lg" className="px-10">
                                    {t("Подробнее", "Learn More")}
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-12 pt-8 border-t border-white/20">
                            <div>
                                <div className="text-xl md:text-2xl font-bold italic">7 {t("дней", "days")}</div>
                                <div className="text-[9px] md:text-sm opacity-70 uppercase tracking-widest">{t("Срок", "Duration")}</div>
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold italic">10 km</div>
                                <div className="text-[9px] md:text-sm opacity-70 uppercase tracking-widest">{t("Путь", "Route")}</div>
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold italic">8/10</div>
                                <div className="text-[9px] md:text-sm opacity-70 uppercase tracking-widest">{t("Уровень", "Grade")}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* About Us Section */}
            <section id="about" className="container-x mx-auto py-16 md:py-24 scroll-mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                    <div className="relative h-[300px] md:h-[450px] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-card group">
                        <Image
                            src="/hero/kyrgyzstan-hero.webp"
                            alt="About KG Tours"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-nature"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[40px]" />
                    </div>
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-forest-900 mb-6 md:mb-8 leading-tight tracking-tight">
                                {t("Наша История", "Our Story")}
                            </h2>
                            <div className="space-y-4 md:space-y-6 text-forest-700 leading-relaxed text-base md:text-lg">
                                <p>
                                    {t(
                                        "KG Tours — это команда профессионалов, влюбленных в природу Кыргызстана. Мы предлагаем уникальные маршруты, которые позволяют полностью погрузиться в атмосферу горного края.",
                                        "KG Tours is a team of professionals in love with the nature of Kyrgyzstan. We offer unique routes that allow you to fully immerse yourself in the atmosphere of the mountain region."
                                    )}
                                </p>
                                <p>
                                    {t(
                                        "Наша миссия — показать миру величие кыргызских гор, гостеприимство нашего народа и чистоту нетронутой природы.",
                                        "Our mission is to show the world the greatness of the Kyrgyz mountains, the hospitality of our people, and the purity of untouched nature."
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Filters */}
            <section className="container-x mx-auto pb-8">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {filters.map((filter, i) => (
                        <Pill key={i} icon={<span>{filter.icon}</span>}>
                            {filter.label}
                        </Pill>
                    ))}
                </div>
            </section>

            {/* Popular Tours Section */}
            <section id="tours" className="container-x mx-auto pb-16 md:pb-24 scroll-mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12"
                >
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-3xl md:text-5xl font-bold text-forest-900 leading-tight tracking-tight">
                            {t("Избранные Туры", "Featured Tours")}
                        </h2>
                        <p className="text-forest-700 mt-3 md:mt-4 text-base md:text-lg max-w-xl">{t("Откройте для себя наши самые востребованные маршруты", "Discover our most sought-after routes and breathtaking destinations")}</p>
                    </div>
                    <Link href="/tours" className="group flex items-center gap-2 text-forest-800 font-bold hover:text-forest-900 transition-all hidden md:flex">
                        {t("Все направления", "All Destinations")}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {tours.slice(0, 6).map((tour, i) => (
                        <motion.div
                            key={tour.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                        >
                            <Link href={`/tours/${tour.slug}`}>
                                <Card variant="image" className="group cursor-pointer overflow-hidden h-full flex flex-col hover:shadow-float transition-all duration-500">
                                    <div className="relative h-72 overflow-hidden">
                                        <Image
                                            src={tour.images?.[0] || "/hero/kyrgyzstan-hero.webp"}
                                            alt={tour[`title_${displayLanguage}`] || tour.title_ru}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-nature"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 z-10">
                                            <div className="pill-info backdrop-blur-md bg-white/20 border-white/20 text-white shadow-sm">
                                                📅 {tour.duration} {t("дней", "days")}
                                            </div>
                                            <div className="pill-info backdrop-blur-md bg-white/20 border-white/20 text-white shadow-sm">
                                                {tour.difficulty === "easy" ? "🟢" : tour.difficulty === "medium" ? "🟡" : "🔴"}
                                                {t(tour.difficulty, tour.difficulty)}
                                            </div>
                                        </div>

                                        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-2.5 shadow-soft z-10">
                                            <span className="font-extrabold text-forest-900 text-lg">${tour.price}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-cream flex-grow flex flex-col">
                                        <h3 className="text-h3 font-bold text-forest-900 mb-3 group-hover:text-forest-700 transition-colors line-clamp-1">
                                            {tour[`title_${displayLanguage}`] || tour.title_ru}
                                        </h3>
                                        <p className="text-forest-700 mb-6 line-clamp-2 leading-relaxed flex-grow">
                                            {tour[`shortDescription_${displayLanguage}`] || tour.shortDescription_ru}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                                            <StarRating rating={4.5} size="sm" />
                                            <AvatarGroup
                                                avatars={[
                                                    { alt: "User 1" },
                                                    { alt: "User 2" },
                                                    { alt: "User 3" },
                                                ]}
                                                max={2}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="bg-sage-100/50 py-16 md:py-24 scroll-mt-20">
                <div className="container-x mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-forest-900 mb-10 md:mb-14 text-center tracking-tight">
                        {t("Впечатления Гостей", "Guest Impressions")}
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.length > 0 ? (
                            reviews.map((review, i) => (
                                <Card key={i} className="p-6 bg-white border-none shadow-soft">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-sage-200 flex items-center justify-center font-bold text-forest-800">
                                            {review.userName?.[0] || "U"}
                                        </div>
                                        <div>
                                            <div className="font-bold text-forest-900">{review.userName}</div>
                                            <StarRating rating={review.rating} size="sm" />
                                        </div>
                                    </div>
                                    <p className="text-forest-700 italic text-sm line-clamp-4">
                                        "{review.comment}"
                                    </p>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 nature-card bg-white/50 text-forest-700">
                                {t("Отзывов пока нет. Станьте первым!", "No reviews yet. Be the first one!")}
                            </div>
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/reviews">
                            <Button variant="secondary" size="lg" className="px-12">
                                {t("Все отзывы", "Read More Reviews")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA / Contacts Section */}
            <CTASection />
        </div>
    );
}
