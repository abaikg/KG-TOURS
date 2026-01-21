import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "count";
}

export function Chip({ className, variant = "default", children, ...props }: ChipProps) {
    return (
        <div
            className={cn(
                "chip",
                variant === "count" && "bg-forest-800 text-white font-bold",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export interface AvatarChipProps {
    src?: string;
    alt?: string;
    count?: number;
}

export function AvatarChip({ src, alt, count }: AvatarChipProps) {
    if (count) {
        return (
            <Chip variant="count" className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
                +{count}
            </Chip>
        );
    }

    return (
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
            {src ? (
                <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-sage-300 flex items-center justify-center text-forest-800 text-xs font-bold">
                    {alt?.[0] || "?"}
                </div>
            )}
        </div>
    );
}

export interface AvatarGroupProps {
    avatars: Array<{ src?: string; alt?: string }>;
    max?: number;
}

export function AvatarGroup({ avatars, max = 3 }: AvatarGroupProps) {
    const displayAvatars = avatars.slice(0, max);
    const remaining = avatars.length - max;

    return (
        <div className="flex items-center -space-x-2">
            {displayAvatars.map((avatar, i) => (
                <AvatarChip key={i} {...avatar} />
            ))}
            {remaining > 0 && <AvatarChip count={remaining} />}
        </div>
    );
}
