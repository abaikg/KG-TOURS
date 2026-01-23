import { ToursGridSkeleton, Skeleton } from '@/components/ui/Skeleton';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function Loading() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-12 pb-20">
                <div className="container-x mx-auto px-4">
                    <div className="mb-12">
                        <Skeleton className="h-16 w-1/3 mb-4" />
                        <Skeleton className="h-8 w-1/2" />
                    </div>

                    <ToursGridSkeleton />
                </div>
            </main>
            <Footer />
        </>
    );
}
