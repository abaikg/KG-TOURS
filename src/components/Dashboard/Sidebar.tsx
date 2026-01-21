import React from 'react';
import Link from 'next/link';

export function Sidebar() {
    return (
        <aside className="w-64 flex-shrink-0 flex flex-col py-8 pl-6 pr-2 border-r border-white/5 h-screen sticky top-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12 pl-2">
                <div className="w-8 h-8 text-[#050511] bg-white rounded-lg flex items-center justify-center font-bold text-xl">P</div>
                <h1 className="text-2xl font-bold tracking-wide text-white">Paier</h1>
            </div>

            {/* Nav */}
            <nav className="space-y-2 flex-1">
                <NavItem icon="home" label="Home" />
                <NavItem icon="search" label="Search" />
                <NavItem icon="analytics" label="Analytics" />
                <NavItem icon="payments" label="Payments" />
                <NavItem icon="notifications" label="Notifications" />
                <NavItem icon="calendar" label="Calendar" active />
                <NavItem icon="vault" label="Vault" />
            </nav>

            <div className="mt-auto">
                <NavItem icon="profile" label="Profile" />
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
    // Simplified icons for demo
    const icons: Record<string, React.ReactNode> = {
        home: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
        search: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
        analytics: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
        payments: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>,
        notifications: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>,
        calendar: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
        vault: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>,
        profile: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
    };

    return (
        <a href="#" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${active
            ? 'bg-white text-[#050511] font-medium shadow-lg shadow-white/10 scale-105'
            : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            {icons[icon]}
            {label}
        </a>
    )
}
