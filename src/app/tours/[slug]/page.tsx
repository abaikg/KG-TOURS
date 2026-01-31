import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { TourDetails } from '@/components/Tours/TourDetails';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { CTASection } from '@/components/ui/CTASection';
import { tours as mockTours } from '@/data/tours';
import { reviews as mockReviews } from '@/data/reviews';

export const dynamic = 'force-dynamic';

// Преобразуем моковый тур в формат компонента
function transformTour(tour: typeof mockTours[0]) {
  return {
    id: tour.id.toString(),
    slug: tour.slug,
    price: parseInt(tour.price.replace(/\D/g, '')),
    price_en: tour.price_en,
    duration: tour.days,
    difficulty: tour.difficulty === 'Легкий' ? 'easy' : tour.difficulty === 'Средний' ? 'medium' : 'hard',
    difficulty_en: tour.difficulty_en,
    title_ru: tour.title,
    title_en: tour.title_en,
    shortDescription_ru: tour.shortDescription,
    shortDescription_en: tour.shortDescription_en,
    description_ru: tour.shortDescription,
    description_en: tour.shortDescription_en,
    images: tour.images,
    location_ru: tour.region,
    location_en: tour.region_en,
    program_ru: tour.program.map(p => ({ day: p.day, title: p.title, description: p.description })),
    program_en: tour.program.map(p => ({ day: p.day, title: p.title_en, description: p.description_en })),
    included_ru: tour.included,
    included_en: tour.included_en,
    notIncluded_ru: tour.notIncluded,
    notIncluded_en: tour.notIncluded_en
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const tour = mockTours.find(t => t.slug === slug);

  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  return {
    title: `${tour.title} | ${siteConfig.name}`,
    description: tour.shortDescription,
    keywords: [
      tour.title,
      tour.region,
      tour.difficulty,
      'тур кыргызстан',
      ...siteConfig.keywords,
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/tours/${slug}`,
      title: tour.title,
      description: tour.shortDescription,
      images: tour.images.length > 0 ? [
        {
          url: tour.images[0],
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.shortDescription,
      images: tour.images.length > 0 ? [tour.images[0]] : [],
    },
  };
}


export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const rawTour = mockTours.find(t => t.slug === slug);

  if (!rawTour) {
    notFound();
  }

  const tour = transformTour(rawTour);

  // Берём несколько случайных отзывов для этого тура
  const reviews = mockReviews.slice(0, 3).map(review => ({
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
    <>
      <Header />
      <main className="min-h-screen">
        <TourDetails tour={tour} reviews={reviews} />
        <CTASection />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
