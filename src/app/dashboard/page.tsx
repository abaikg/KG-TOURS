import React from 'react';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import { TopSummary } from '@/components/Dashboard/TopSummary';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { TransactionsList } from '@/components/Dashboard/TransactionsList';

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-[#050511] text-white font-sans overflow-hidden">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto h-screen">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight">Paier</span>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">changelog v1.5</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg border border-white/5 text-sm text-gray-400 w-64">
                        <span>🔒</span>
                        <span>paier.io</span>
                    </div>
                </header>

                {/* Top Summary Section (Monday Card + Calendar) */}
                <div className="mb-6">
                    <TopSummary />
                </div>

                {/* Metric Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MetricCard
                        title="Active Bills"
                        value="14"
                        subtext="+3 added new"
                        icon="green"
                        theme="green"
                        actionLabel="Manage all"
                    />
                    <MetricCard
                        title="Monthly Pay"
                        value="$475.30"
                        subtext="+10%"
                        icon="stack"
                        theme="white"
                    />
                    <MetricCard
                        title="Overdues"
                        value="$75.50"
                        subtext="2 past bills + 1 failed"
                        subtextIntent="danger"
                        icon="history"
                        theme="white"
                    />
                </div>

                {/* Transactions Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">This week</h3>
                    <TransactionsList />
                </div>
            </main>

            {/* Floating Profile Button */}
            <div className="fixed bottom-10 right-10 z-50">
                <div className="bg-[#050511] p-1.5 rounded-full border border-white/10 shadow-2xl skew-y-0 hover:scale-110 transition cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold">User</div>
                </div>
            </div>
        </div>
    );
}
