import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 pt-20">
                <div className="glass p-12 rounded-3xl text-center max-w-md space-y-6">
                    <div className="text-8xl font-bold text-primary">404</div>
                    <h2 className="text-3xl font-bold text-white">
                        Страница не найдена
                    </h2>
                    <p className="text-slate-400">
                        К сожалению, запрашиваемая страница не существует или была перемещена.
                    </p>
                    <Link href="/">
                        <Button variant="primary" size="lg" className="w-full">
                            Вернуться на главную
                        </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
