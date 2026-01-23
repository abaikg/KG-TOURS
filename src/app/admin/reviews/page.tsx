import React from 'react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { deleteReview } from '@/app/actions/reviews';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    // Cast to any to bypass local outdated types
    const reviews = await prisma.review.findMany({
        orderBy: { createdAt: 'desc' },
        include: { tour: true },
    }) as any[];

    return (
        <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">
                    Впечатления
                </h1>
                <p className="text-slate-400 font-medium">Модерация отзывов гостей</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Маршрут</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Автор</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Рейтинг</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500 w-[30%]">Отзыв</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Статус</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500 text-right">Управление</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-white/5 transition-all">
                                <td className="p-6 font-bold text-white max-w-[200px] truncate">
                                    {review.tour?.title_ru || review.tour?.title || 'Unknown'}
                                </td>
                                <td className="p-6 font-bold text-slate-300">
                                    {review.authorName || review.name}
                                </td>
                                <td className="p-6 text-yellow-400 font-black">
                                    ★ {review.rating}
                                </td>
                                <td className="p-6 text-slate-400 text-sm italic line-clamp-2 leading-relaxed">
                                    "{review.text_ru || review.text_en || review.comment}"
                                </td>
                                <td className="p-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] ${review.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                        review.status === 'REJECTED' ? 'bg-red-500/10 text-red-100 border border-red-500/20' : 'bg-slate-500/10 text-slate-400 border border-white/5'
                                        }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <form action={async () => {
                                        'use server';
                                        await deleteReview(review.id);
                                    }}>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20">
                                            Удалить
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-slate-500 font-bold uppercase tracking-widest">
                                    Отзывов пока нет
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
