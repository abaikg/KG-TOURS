'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="glass p-12 rounded-3xl text-center max-w-md space-y-6">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-3xl font-bold text-white">
                    Что-то пошло не так
                </h2>
                <p className="text-slate-400">
                    Произошла ошибка при загрузке страницы. Попробуйте обновить или вернуться на главную.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={reset} variant="primary">
                        Попробовать снова
                    </Button>
                    <Button onClick={() => window.location.href = '/'} variant="glass">
                        На главную
                    </Button>
                </div>
            </div>
        </div>
    );
}
