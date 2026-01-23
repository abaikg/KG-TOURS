import React from 'react';
import { prisma } from '@/lib/prisma';
import TourForm from '@/components/Admin/TourForm';
import { notFound } from 'next/navigation';
import { TourInput } from '@/types';

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // We cast to any because local prisma client might be outdated 
    // due to active dev server blocking generation
    const tour = await prisma.tour.findUnique({
        where: { id },
    }) as any;

    if (!tour) {
        notFound();
    }

    const initialData: TourInput & { id: string } = {
        id: tour.id,
        // RU
        title_ru: tour.title_ru || tour.title || '', // Fallback to old title if migration didn't happen but code runs? Unlikely.
        description_ru: tour.description_ru || tour.description || '',
        shortDescription_ru: tour.shortDescription_ru || tour.shortDescription || '',
        location_ru: tour.location_ru || tour.location || '',
        program_ru: (tour.program_ru || tour.program) as any || [],
        included_ru: tour.included_ru || tour.included || [],
        notIncluded_ru: tour.notIncluded_ru || tour.notIncluded || [],
        highlights_ru: tour.highlights_ru || [],

        // EN
        title_en: tour.title_en || undefined,
        description_en: tour.description_en || undefined,
        shortDescription_en: tour.shortDescription_en || undefined,
        location_en: tour.location_en || undefined,
        program_en: tour.program_en ? (tour.program_en as any) : undefined,
        included_en: tour.included_en || [],
        notIncluded_en: tour.notIncluded_en || [],
        highlights_en: tour.highlights_en || [],

        // Common
        slug: tour.slug,
        price: tour.price,
        duration: tour.duration,
        images: tour.images,
        difficulty: tour.difficulty,
        currency: tour.currency || 'USD',
        minGroupSize: tour.minGroupSize || 1,
        isPublished: tour.isPublished ?? false,
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase mb-2">
                    Редактировать
                </h1>
                <p className="text-slate-400 font-medium">Обновление параметров экспедиции: {initialData.title_ru}</p>
            </div>
            <div className="max-w-5xl">
                <TourForm initialData={initialData} isEdit={true} />
            </div>
        </div>
    );
}
