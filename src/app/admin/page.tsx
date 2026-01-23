'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight uppercase">Dashboard</h2>
                <p className="text-slate-400 font-medium">System performance and management overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center text-2xl">🗺️</div>
                        <div className="text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full uppercase tracking-widest">Active</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Tours</h3>
                    <p className="text-slate-400 mb-8 font-medium">Manage and curate unique experiences.</p>
                    <Link href="/admin/tours">
                        <Button variant="secondary" size="sm" className="w-full border-white/10 text-white hover:bg-white/10">Manage Catalog</Button>
                    </Link>
                </Card>

                <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center text-2xl">✨</div>
                        <div className="text-blue-400 text-xs font-bold bg-blue-400/10 px-3 py-1 rounded-full uppercase tracking-widest">Growth</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Reviews</h3>
                    <p className="text-slate-400 mb-8 font-medium">Engage with guest impressions and feedback.</p>
                    <Link href="/admin/reviews">
                        <Button variant="secondary" size="sm" className="w-full border-white/10 text-white hover:bg-white/10">Review Feedback</Button>
                    </Link>
                </Card>

                <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center text-2xl">🔘</div>
                        <div className="text-slate-400 text-xs font-bold bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">System</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Settings</h3>
                    <p className="text-slate-400 mb-8 font-medium">Fine-tune system parameters and defaults.</p>
                    <Link href="/admin/settings">
                        <Button variant="secondary" size="sm" className="w-full border-white/10 text-white hover:bg-white/10">Open Settings</Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
}
