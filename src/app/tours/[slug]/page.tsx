import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { TourDetails } from '@/components/Tours/TourDetails';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

import { CTASection } from '@/components/ui/CTASection';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const tour = await prisma.tour.findUnique({
      where: { slug },
    });

    if (!tour) {
      return {
        title: 'Tour Not Found',
      };
    }

    return {
      title: `${tour.title_ru} | ${siteConfig.name}`,
      description: tour.shortDescription_ru,
      keywords: [
        tour.title_ru,
        tour.location_ru,
        tour.difficulty,
        'тур кыргызстан',
        ...siteConfig.keywords,
      ],
      openGraph: {
        type: 'website',
        url: `${siteConfig.url}/tours/${slug}`,
        title: tour.title_ru,
        description: tour.shortDescription_ru,
        images: tour.images.length > 0 ? [
          {
            url: tour.images[0],
            width: 1200,
            height: 630,
            alt: tour.title_ru,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: tour.title_ru,
        description: tour.shortDescription_ru,
        images: tour.images.length > 0 ? [tour.images[0]] : [],
      },
    };
  } catch (e) {
    return {
      title: 'Tour Not Found',
    };
  }
}


export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let tour: any = null;
  let reviews: any[] = [];

  try {
    tour = await prisma.tour.findUnique({
      where: { slug },
      include: {
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!tour) {
      notFound();
    }

    reviews = tour.reviews || [];
  } catch (e) {
    console.error("Tour page DB fetch error:", e);
    // Fallback tour to avoid 404 and allow design check
    tour = {
      id: 'demo', slug: 'demo', price: 500, duration: 7, difficulty: 'medium',
      title_ru: 'Демонстрационный тур', title_en: 'Demo Tour',
      description_ru: 'Описание временно недоступно из-за отсутствия подключения к базе данных.',
      description_en: 'Description temporary unavailable due to no DB connection.',
      location_ru: 'Кыргызстан', location_en: 'Kyrgyzstan',
      images: ['/hero/kyrgyzstan-hero.webp'],
      program_ru: [{ day: 1, title: 'Заезд', description: 'День 1 программы' }],
      included_ru: ['Гид', 'Транспорт'], notIncluded_ru: ['Перелет']
    };
    reviews = [];
  }

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
