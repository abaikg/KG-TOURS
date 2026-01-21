import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-lg bg-sage-200", className)}
            {...props}
        />
    );
}

export function TourSkeleton() {
    return (
        <div className="nature-card overflow-hidden">
            <div className="relative h-64 bg-sage-200 animate-pulse" />
            <div className="p-6 bg-cream space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16 rounded-pill" />
                </div>
            </div>
        </div>
    );
}

export function ToursGridSkeleton() {
    return (
        <div className="space-y-8">
            {/* Filters Skeleton */}
            <div className="flex gap-3">
                <Skeleton className="h-10 w-24 rounded-pill" />
                <Skeleton className="h-10 w-28 rounded-pill" />
                <Skeleton className="h-10 w-24 rounded-pill" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TourSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export function TourDetailsSkeleton() {
    return (
        <div className="pb-24">
            {/* Hero Skeleton */}
            <div className="relative h-[400px] md:h-[500px] -mt-20 mb-8 bg-sage-200 animate-pulse" />

            <div className="container-x mx-auto">
                {/* Title Skeleton */}
                <div className="mb-8 space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-32" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Content Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="nature-card p-6 space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        <div className="nature-card p-6 space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div>
                        <div className="nature-card p-6 space-y-6">
                            <Skeleton className="h-12 w-32 mx-auto" />
                            <Skeleton className="h-12 w-full rounded-pill" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
