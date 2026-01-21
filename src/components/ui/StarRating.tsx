import { cn } from "@/lib/utils";

export interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: "sm" | "md" | "lg";
    showNumber?: boolean;
    className?: string;
}

export function StarRating({
    rating,
    maxRating = 5,
    size = "md",
    showNumber = false,
    className,
}: StarRatingProps) {
    const sizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl",
    };

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className={cn("flex items-center gap-0.5", sizes[size])}>
                {/* Full stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <span key={`full-${i}`} className="star">
                        ★
                    </span>
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <span className="star relative">
                        <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
                        <span className="text-sage-400">★</span>
                    </span>
                )}

                {/* Empty stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <span key={`empty-${i}`} className="text-sage-400">
                        ★
                    </span>
                ))}
            </div>

            {showNumber && (
                <span className="text-sm font-semibold text-forest-800 ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
