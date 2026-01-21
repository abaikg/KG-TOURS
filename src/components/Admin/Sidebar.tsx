"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { name: "Обзор", href: "/admin", icon: "📊" },
    { name: "Туры", href: "/admin/tours", icon: "🏔️" },
    { name: "Отзывы", href: "/admin/reviews", icon: "💬" },
    { name: "Брони", href: "/admin/bookings", icon: "📅" },
    { name: "Настройки", href: "/admin/settings", icon: "⚙️" },
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
                <div className="flex h-16 items-center justify-center border-b border-white/10">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        KG Admin
                    </h1>
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                                pathname === item.href
                                    ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(139,92,246,0.1)] border border-primary/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 px-4 w-full">
                    <div className="p-4 glass rounded-xl">
                        <p className="text-xs text-slate-500">Logged as Admin</p>
                        <button className="mt-2 text-sm text-red-400 hover:text-red-300">Logout</button>
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
