import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    size?: "sm" | "md";
    icon?: React.ReactNode;
}

const Pill = forwardRef<HTMLButtonElement, PillProps>(
    ({ className, active = false, size = "md", icon, children, ...props }, ref) => {
        const sizes = {
            sm: "pill-sm",
            md: "",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "pill",
                    active && "pill-active",
                    sizes[size],
                    className
                )}
                {...props}
            >
                {icon && <span className="flex-shrink-0">{icon}</span>}
                {children}
            </button>
        );
    }
);

Pill.displayName = "Pill";

export { Pill };
