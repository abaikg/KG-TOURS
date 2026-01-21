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
        const baseStyles = "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "btn-nature-primary",
            secondary: "btn-nature-secondary",
            ghost: "bg-transparent hover:bg-sage-100 text-forest-800",
        };

        const sizes = {
            sm: "px-5 py-2 text-sm",
            md: "px-8 py-4 text-base",
            lg: "px-10 py-5 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && "w-full",
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
