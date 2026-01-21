import { TourSkeleton } from '@/components/ui/Skeleton';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function Loading() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#0F172A] pt-24 pb-20">
                <TourSkeleton />
            </main>
            <Footer />
        </>
    );
}
