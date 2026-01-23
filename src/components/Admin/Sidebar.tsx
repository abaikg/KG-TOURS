"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { name: "Обзор", href: "/admin", icon: "💎" },
    { name: "Маршруты", href: "/admin/tours", icon: "🗺️" },
    { name: "Отзывы", href: "/admin/reviews", icon: "✨" },
    { name: "Бронирования", href: "/admin/bookings", icon: "🗝️" },
    { name: "Настройки", href: "/admin/settings", icon: "🔘" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="lg:hidden fixed top-4 right-4 z-50 p-2 glass rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform bg-[#0F172A]/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-24 items-center px-8 border-b border-white/5 line-none">
                    <div className="group">
                        <div className="flex items-center gap-2 leading-none">
                            <h1 className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-gold transition-all duration-500">
                                TOURS
                            </h1>
                            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_var(--color-gold)] animate-pulse" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Admin Control</p>
                    </div>
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-5 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 uppercase tracking-widest",
                                pathname === item.href
                                    ? "bg-white/10 text-white shadow-xl border border-white/10 backdrop-blur-md"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-10 px-6 w-full">
                    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-xs font-bold ring-1 ring-white/20">A</div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Status</p>
                                <p className="text-sm font-bold text-white">Administrator</p>
                            </div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all border border-red-500/20">Sign Out</button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
