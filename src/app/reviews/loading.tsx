
import { ReviewsSkeleton } from '@/components/ui/Skeleton';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';

export default function Loading() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 md:pt-32 pb-20">
                <div className="container-x mx-auto">
                    <ReviewsSkeleton />
                </div>
            </main>
            <Footer />
            <BottomNav />
        </>
    );
}
