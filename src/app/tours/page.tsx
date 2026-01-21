import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { ToursGrid } from '@/components/Tours/ToursGrid';

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
    let tours: any[] = [];

    try {
        tours = await prisma.tour.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {
        console.error("Tours page DB fetch error:", e);
        // Fallback for design preview
        tours = [
            {
                id: '1', slug: 'demo-tour', price: 500, duration: 7, difficulty: 'medium',
                title_ru: 'Демо-тур (База данных оффлайн)', title_en: 'Demo Tour (DB Offline)',
                shortDescription_ru: 'Пример тура для дизайна.', shortDescription_en: 'Example tour for design.',
                images: ['/hero/kyrgyzstan-hero.webp'], location_ru: 'Иссык-Куль', location_en: 'Issyk-Kul'
            }
        ];
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-8 pb-24">
                <div className="container-x mx-auto">
                    <div className="mb-8">
                        <h1 className="text-h1 font-bold text-forest-900 mb-2">
                            Все туры
                        </h1>
                        <p className="text-lg text-forest-700">
                            Выберите идеальное путешествие по Кыргызстану
                        </p>
                    </div>

                    <ToursGrid tours={tours} />
                </div>
            </main>
            <Footer />
            <BottomNav />
        </>
    );
}
