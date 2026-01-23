import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 ease-out active:scale-[0.985] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100";

        const variants = {
            primary: "btn-nature-primary",
            secondary: "btn-nature-secondary",
            ghost: "bg-transparent hover:bg-sage-100 text-forest-800 rounded-xl",
        };

        const sizes = {
            sm: "px-5 py-2.5 text-sm h-[40px]",
            md: "px-8 py-3.5 text-base h-[48px]",
            lg: "px-10 py-4.5 text-lg h-[56px]",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && "w-full",
                    // Mobile auto w-full
                    "md:w-auto",
                    fullWidth ? "w-full" : "w-full", // Default mobile to w-full as per requirements
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="opacity-80">Loading...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
