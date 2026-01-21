import React from 'react';

interface MetricCardProps {
    title: string;
    value: string;
    subtext: string;
    subtextIntent?: 'neutral' | 'success' | 'danger';
    icon: 'green' | 'stack' | 'history';
    theme: 'green' | 'white';
    actionLabel?: string;
}

export function MetricCard({ title, value, subtext, subtextIntent = 'neutral', icon, theme, actionLabel }: MetricCardProps) {
    const isGreen = theme === 'green';

    // Theme Classes
    const cardBg = isGreen ? 'bg-[#bbf7d0] text-[#050511]' : 'bg-white text-[#050511]';
    const subtextClass = isGreen ? 'text-[#050511]/70' : subtextIntent === 'danger' ? 'text-rose-500' : 'text-gray-500';

    // Icons
    const icons = {
        green: <svg className="w-6 h-6 text-[#050511]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
        stack: <svg className="w-6 h-6 text-[#050511]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
        history: <svg className="w-6 h-6 text-[#050511]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    }

    return (
        <div className={`rounded-[2rem] p-6 relative overflow-hidden transition-all hover:-translate-y-1 duration-300 ${cardBg}`}>
            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className={`${isGreen ? 'bg-white/30' : 'bg-gray-100'} p-3 rounded-xl`}>
                    {icons[icon]}
                </div>
                {!isGreen && (
                    <button>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                )}
            </div>

            <h3 className="text-lg font-bold relative z-10">{title}</h3>
            <p className={`text-sm font-medium mb-4 relative z-10 ${subtextClass}`}>{subtext}</p>
            <div className="text-5xl font-bold tracking-tight relative z-10">{value}</div>

            {actionLabel && (
                <button className="bg-[#050511]/90 text-white px-4 py-2 rounded-full text-xs font-medium absolute bottom-6 right-6 z-20 hover:scale-105 transition">
                    {actionLabel}
                </button>
            )}

            {/* Gradient Overlay for Green Card */}
            {isGreen && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            )}
        </div>
    )
}
