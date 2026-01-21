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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Tours Management
                </h1>
                <Link href="/admin/tours/new">
                    <Button variant="primary" size="md">+ New Tour</Button>
                </Link>
            </div>

            <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 font-semibold text-slate-300">Title (RU)</th>
                            <th className="p-4 font-semibold text-slate-300">Price</th>
                            <th className="p-4 font-semibold text-slate-300">Duration</th>
                            <th className="p-4 font-semibold text-slate-300">Published</th>
                            <th className="p-4 font-bold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {tours?.map((tour) => (
                            <tr key={tour.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">
                                    {tour.title_ru}
                                    {tour.title_en && <span className="ml-2 text-xs text-slate-500">({tour.title_en})</span>}
                                </td>
                                <td className="p-4 text-slate-300">
                                    {tour.price} {tour.currency}
                                </td>
                                <td className="p-4 text-slate-300">
                                    {tour.duration} days
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${tour.isPublished ? 'bg-secondary/20 text-secondary' : 'bg-slate-500/20 text-slate-400'}`}>
                                        {tour.isPublished ? 'Live' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <Link href={`/admin/tours/${tour.id}`}>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {tours?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-400">
                                    No tours found. Create your first tour!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
