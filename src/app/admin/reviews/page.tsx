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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Reviews
            </h1>

            <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 font-semibold text-slate-300">Tour</th>
                            <th className="p-4 font-semibold text-slate-300">Author</th>
                            <th className="p-4 font-semibold text-slate-300">Rating</th>
                            <th className="p-4 font-semibold text-slate-300">Comment (RU)</th>
                            <th className="p-4 font-bold text-slate-300">Status</th>
                            <th className="p-4 font-bold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-white">
                                    {review.tour?.title_ru || review.tour?.title || 'Unknown Tour'}
                                </td>
                                <td className="p-4 text-slate-300">
                                    {review.authorName || review.name}
                                </td>
                                <td className="p-4">
                                    <span className="text-yellow-400 font-bold">★ {review.rating}</span>
                                </td>
                                <td className="p-4 text-slate-400 max-w-xs truncate">
                                    {review.text_ru || review.text_en || review.comment}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${review.status === 'APPROVED' ? 'bg-secondary/20 text-secondary' :
                                            review.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'
                                        }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    {/* Simple server action form for delete */}
                                    <form action={async () => {
                                        'use server';
                                        await deleteReview(review.id);
                                    }}>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                            Delete
                                        </Button>
                                    </form>
                                    {/* Allow Publish/Reject later */}
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-400">
                                    No reviews yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
