import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { ToursGrid } from '@/components/Tours/ToursGrid';
import { ToursHeader } from '@/components/Tours/ToursHeader';
import { CTASection } from '@/components/ui/CTASection';
import { tours as mockTours } from '@/data/tours';

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
    // Преобразуем моковые данные в формат, который ожидает ToursGrid
    const tours = mockTours.map(tour => ({
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

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 md:pt-32">
                <div className="container-x mx-auto">
                    <ToursHeader />
                    <ToursGrid tours={tours} />
                </div>

                <div className="mt-24">
                    <CTASection />
                </div>
            </main>
            <Footer />
            <BottomNav />
        </>
    );
}
