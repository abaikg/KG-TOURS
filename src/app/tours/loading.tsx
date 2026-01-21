import { ToursGridSkeleton } from '@/components/ui/Skeleton';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function Loading() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#0F172A] pt-24 pb-20">
                <div className="container-x px-4 max-w-7xl mx-auto">
                    <div className="mb-12 animate-pulse">
                        <div className="h-16 bg-white/10 rounded-2xl w-1/3 mb-4" />
                        <div className="h-8 bg-white/10 rounded-lg w-1/2" />
                    </div>

                    <ToursGridSkeleton />
                </div>
            </main>
            <Footer />
        </>
    );
}
