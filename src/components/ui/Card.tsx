import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "large" | "image";
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", hover = true, ...props }, ref) => {
        const variants = {
            default: "nature-card",
            large: "nature-card-lg",
            image: "nature-card-image",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    variants[variant],
                    !hover && "hover:transform-none hover:shadow-card",
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        />
    )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("text-h3 font-semibold text-forest-900", className)}
            {...props}
        />
    )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-sm text-forest-700", className)}
            {...props}
        />
    )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        />
    )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
