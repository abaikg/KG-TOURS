import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton rounded-xl", className)}
            {...props}
        />
    );
}

export function TourSkeleton() {
    return (
        <div className="nature-card overflow-hidden border-none bg-white/5 backdrop-blur-md">
            <div className="relative h-72 skeleton" />
            <div className="p-8 space-y-4">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-20 rounded-pill" />
                </div>
            </div>
        </div>
    );
}

export function ToursGridSkeleton() {
    return (
        <div className="space-y-12">
            {/* Filters Skeleton */}
            <div className="flex gap-4 overflow-hidden">
                <Skeleton className="h-11 w-28 rounded-pill flex-shrink-0" />
                <Skeleton className="h-11 w-32 rounded-pill flex-shrink-0" />
                <Skeleton className="h-11 w-28 rounded-pill flex-shrink-0" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TourSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export function TourDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-sage-300/20">
            {/* Hero Skeleton */}
            <div className="relative h-[450px] md:h-[600px] mb-8 skeleton rounded-none" />

            <div className="container-x mx-auto px-4 -mt-32 relative z-10 pb-24">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="nature-card p-10 space-y-6">
                            <Skeleton className="h-12 w-3/4 mb-4" />
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-5/6" />
                                <Skeleton className="h-5 w-4/5" />
                            </div>
                        </div>

                        <div className="nature-card p-10 space-y-8">
                            <Skeleton className="h-10 w-48 mb-6" />
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-6">
                                        <Skeleton className="h-16 w-16 rounded-2xl flex-shrink-0" />
                                        <div className="flex-grow space-y-3">
                                            <Skeleton className="h-6 w-1/3" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar Skeleton */}
                    <div className="space-y-6">
                        <div className="nature-card p-8 sticky top-24 space-y-8">
                            <div className="space-y-3">
                                <Skeleton className="h-16 w-32 mx-auto mb-2" />
                                <Skeleton className="h-4 w-24 mx-auto" />
                            </div>
                            <Skeleton className="h-14 w-full rounded-pill" />
                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-5/6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HomeSkeleton() {
    return (
        <div className="space-y-24">
            {/* Hero Skeleton */}
            <div className="container-x mx-auto pt-8">
                <Skeleton className="h-[600px] w-full rounded-[32px]" />
            </div>

            {/* About Section Skeleton */}
            <div className="container-x mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <Skeleton className="h-[450px] w-full rounded-[40px]" />
                    <div className="space-y-6">
                        <Skeleton className="h-12 w-2/3" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tours Grid Title Skeleton */}
            <div className="container-x mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-6 w-32 hidden md:block" />
                </div>
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <TourSkeleton key={i} />
                    ))}
                </div>
            </div>

            {/* Reviews Section Skeleton */}
            <div className="bg-sage-100 py-20">
                <div className="container-x mx-auto">
                    <Skeleton className="h-10 w-64 mx-auto mb-12" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full p-6" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdminSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-10">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-32 rounded-pill" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[24px] space-y-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <div className="pt-4 flex gap-2">
                            <Skeleton className="h-8 w-16 rounded-pill" />
                            <Skeleton className="h-8 w-16 rounded-pill" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                <div className="p-6 border-b border-white/10 space-y-4">
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="p-6 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <Skeleton className="h-6 flex-grow" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
