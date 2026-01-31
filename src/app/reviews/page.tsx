import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { ReviewsContent } from '@/components/Home/ReviewsContent';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { reviews as mockReviews } from '@/data/reviews';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: `Отзывы | ${siteConfig.name}`,
    description: 'Отзывы путешественников о турах по Кыргызстану с KG Tours.',
};

export default async function ReviewsPage() {
    // Преобразуем моковые данные в формат, который ожидает ReviewsContent
    const reviews = mockReviews.map(review => ({
        id: review.id.toString(),
        rating: review.rating,
        authorName: review.name,
        country: review.country,
        createdAt: new Date().toISOString(),
        text_ru: review.text,
        text_en: review.text,
        avatar: review.avatar,
        photos: review.photos
    }));

    return (
        <ReviewsContent reviews={reviews} />
    );
}
