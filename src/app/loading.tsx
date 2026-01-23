import { HomeSkeleton } from '@/components/ui/Skeleton';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BottomNav } from '@/components/ui/BottomNav';

export default function Loading() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <HomeSkeleton />
            </main>
            <Footer />
            <BottomNav />
        </>
    );
}
