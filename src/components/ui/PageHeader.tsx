"use client";

import { useLanguage } from "@/lib/useLanguage";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description: string;
    subtitle?: string;
    className?: string;
}

export function PageHeader({ title, description, subtitle, className }: PageHeaderProps) {
    const { t } = useLanguage();

    return (
        <div className={cn("relative mb-8 pt-8 md:pt-12 pb-8 md:pb-12 rounded-[24px] md:rounded-[32px] overflow-hidden bg-forest-900 border border-white/5 shadow-2xl", className)}>
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(244,196,48,0.15),transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('/patterns/noise.svg')" }} />

            <div className="relative z-10 container-x mx-auto px-6 md:px-12 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {subtitle && (
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                            <span className="h-[2px] w-12 bg-gold/70" />
                            <span className="text-xs md:text-sm font-black tracking-[0.25em] uppercase text-gold shadow-black/50 drop-shadow-sm">
                                {subtitle}
                            </span>
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[0.9] text-balance">
                        {title}
                    </h1>

                    <p className="text-lg md:text-xl text-sage-100/90 font-medium max-w-2xl text-balance leading-relaxed mx-auto md:mx-0">
                        {description}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
