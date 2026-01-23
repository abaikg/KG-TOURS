import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { HomeContent } from '@/components/Home/HomeContent';
import { HomeSkeleton } from '@/components/Home/HomeSkeleton';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import type { HomeTour, HomeReview } from '@/types/home';

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

async function getHomeData(): Promise<{
  tours: HomeTour[];
  reviews: HomeReview[];
}> {
  try {
    const [tours, reviews] = await Promise.all([
      prisma.tour.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.review.findMany({
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
    ]);

    return { tours, reviews };
  } catch (e) {
    console.error('Home fetch error:', e);

    return {
      tours: [
        {
          id: 'demo',
          slug: 'demo-tour',
          price: 500,
          duration: 7,
          difficulty: 'medium',
          title_ru: 'Демо-тур по Кыргызстану',
          title_en: 'Demo Tour Kyrgyzstan',
          shortDescription_ru: 'Пример тура (fallback)',
          shortDescription_en: 'Example tour (fallback)',
          images: ['/hero/kyrgyzstan-hero.webp'],
        },
      ],
      reviews: [
        {
          id: 'demo',
          userName: 'Traveler',
          rating: 5,
          comment: 'Great design!',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}

async function HomeData() {
  const { tours, reviews } = await getHomeData();
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
