"use client";

import { CTASection } from "@/components/ui/CTASection";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { FeaturedTours } from "./FeaturedTours";
import { ReviewsSection } from "./ReviewsSection";

export function HomeContent({ tours, reviews }: { tours: any[]; reviews: any[] }) {
    return (
        <div className="min-h-screen selection:bg-forest-500/30">
            <HeroSection />
            <AboutSection />
            <FeaturedTours tours={tours} />
            <ReviewsSection reviews={reviews} />
            <CTASection />
        </div>
    );
}
