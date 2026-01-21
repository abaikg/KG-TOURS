import { prisma } from '@/lib/prisma';
import { HomeContent } from '@/components/Home/HomeContent';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

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
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let tours: any[] = [];
  let reviews: any[] = [];

  try {
    tours = await prisma.tour.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    reviews = await prisma.review.findMany({
      where: { status: 'APPROVED' },
      take: 6,
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error("Home page DB fetch error:", e);
    // Fallback data for design evaluation when DB is down
    tours = [
      {
        id: '1', slug: 'demo-tour', price: 500, duration: 7, difficulty: 'medium',
        title_ru: 'Демо-тур по Кыргызстану', title_en: 'Demo Tour Kyrgyzstan',
        shortDescription_ru: 'Пример тура для предварительного просмотра дизайна. База данных сейчас недоступна.',
        shortDescription_en: 'Example tour for design preview. Database is currently offline.',
        images: ['/hero/kyrgyzstan-hero.webp']
      }
    ];
    reviews = [
      {
        id: '1', userName: 'Traveler', rating: 5, status: 'APPROVED',
        comment: 'Design is great! (This is fallback review data)',
        createdAt: new Date().toISOString()
      }
    ];
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HomeContent tours={tours} reviews={reviews} />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
