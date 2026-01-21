"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";

export function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();

    // Don't show on admin pages
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    const navItems = [
        {
            href: "/",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            label: t("Главная", "Home"),
        },
        {
            href: "/tours",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            label: t("Туры", "Tours"),
        },
        {
            href: "/reviews",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            label: t("Отзывы", "Reviews"),
        },
        {
            href: "/contacts",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: t("Контакты", "Contacts"),
        },
    ];

    return (
        <nav className="bottom-nav md:hidden pb-safe">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center py-1 px-4 outline-none"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-active"
                                    className="absolute inset-0 bg-white/20 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={cn(
                                    "relative z-10 flex flex-col items-center gap-1 transition-colors duration-300",
                                    isActive ? "text-white" : "text-sage-400"
                                )}
                            >
                                <div className={cn("transition-transform duration-300", isActive && "scale-110")}>
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
