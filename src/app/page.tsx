import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { HomeContent } from '@/components/Home/HomeContent';
import { HomeSkeleton } from '@/components/Home/HomeSkeleton';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { tours as mockTours } from '@/data/tours';
import { reviews as mockReviews } from '@/data/reviews';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const dynamic = 'force-dynamic';

function getHomeData() {
  // Преобразуем моковые туры в формат для HomeContent
  const tours = mockTours.slice(0, 6).map(tour => ({
    id: tour.id.toString(),
    slug: tour.slug,
    price: parseInt(tour.price.replace(/\D/g, '')),
    price_en: tour.price_en,
    duration: tour.days,
    difficulty: tour.difficulty === 'Легкий' ? 'easy' : tour.difficulty === 'Средний' ? 'medium' : 'hard',
    title_ru: tour.title,
    title_en: tour.title_en,
    shortDescription_ru: tour.shortDescription,
    shortDescription_en: tour.shortDescription_en,
    images: tour.images,
    location_ru: tour.region,
    location_en: tour.region_en
  }));

  // Преобразуем моковые отзывы
  const reviews = mockReviews.slice(0, 6).map(review => ({
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

  return { tours, reviews };
}

function HomeData() {
  const { tours, reviews } = getHomeData();
  return <HomeContent tours={tours} reviews={reviews} />;
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<HomeSkeleton />}>
          <HomeData />
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
