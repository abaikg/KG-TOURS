import React from 'react';
import Link from 'next/link';
import { getTours } from '@/app/actions/tours';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function AdminToursPage() {
    const { data: tours, success } = await getTours();

    if (!success) {
        return (
            <div className="p-4 text-red-500 glass rounded-xl">
                Failed to load tours. Check database connection.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">
                        Экспедиции
                    </h1>
                    <p className="text-slate-400 font-medium">Управление каталогом маршрутов</p>
                </div>
                <Link href="/admin/tours/new">
                    <Button variant="primary" size="lg" className="px-8 shadow-xl bg-white text-forest-900 hover:bg-white">+ Создать Маршрут</Button>
                </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Маршрут</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Цена</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Срок</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Статус</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500 text-right">Управление</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {tours?.map((tour) => (
                            <tr key={tour.id} className="hover:bg-white/5 transition-all group">
                                <td className="p-6">
                                    <div className="font-bold text-white text-lg">{tour.title_ru}</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{tour.title_en}</div>
                                </td>
                                <td className="p-6">
                                    <div className="text-white font-extrabold uppercase tracking-tight">${tour.price}</div>
                                </td>
                                <td className="p-6 text-slate-400 font-medium">
                                    {tour.duration} {tour.duration === 1 ? 'день' : 'дней'}
                                </td>
                                <td className="p-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] ${tour.isPublished ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/10'}`}>
                                        {tour.isPublished ? 'Publish' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <Link href={`/admin/tours/${tour.id}`}>
                                        <Button variant="secondary" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">Редактировать</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {tours?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center">
                                    <div className="text-5xl mb-4">🏔️</div>
                                    <div className="text-slate-400 font-bold">Каталог пуст</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
