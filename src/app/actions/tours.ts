'use server'

import { prisma } from '@/lib/prisma'
import { TourSchema, TourInput } from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'

export async function createTour(data: TourInput) {
    const result = TourSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            message: 'Validation error',
            errors: result.error.flatten().fieldErrors,
        }
    }

    const tourData = result.data;

    try {
        await prisma.tour.create({
            data: {
                ...tourData,
                program_ru: tourData.program_ru as unknown as Prisma.InputJsonValue,
                program_en: tourData.program_en ? (tourData.program_en as unknown as Prisma.InputJsonValue) : Prisma.DbNull,
            },
        })
    } catch (e) {
        console.error('Failed to create tour:', e)
        return {
            success: false,
            message: 'Database error: Failed to create tour',
        }
    }

    revalidatePath('/admin/tours')
    revalidatePath('/')
    return { success: true }
}

export async function updateTour(id: string, data: TourInput) {
    const result = TourSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            message: 'Validation error',
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { ...tourData } = result.data

    try {
        await prisma.tour.update({
            where: { id },
            data: {
                ...tourData,
                program_ru: tourData.program_ru as unknown as Prisma.InputJsonValue,
                program_en: tourData.program_en ? (tourData.program_en as unknown as Prisma.InputJsonValue) : Prisma.DbNull,
            },
        })
    } catch (e) {
        console.error('Failed to update tour:', e)
        return {
            success: false,
            message: 'Database error: Failed to update tour',
        }
    }

    revalidatePath('/admin/tours')
    revalidatePath(`/tours/${tourData.slug}`)
    revalidatePath('/')
    return { success: true }
}

export async function deleteTour(id: string) {
    try {
        await prisma.tour.delete({
            where: { id },
        })
    } catch (e) {
        console.error('Failed to delete tour:', e)
        return {
            success: false,
            message: 'Database error: Failed to delete tour',
        }
    }

    revalidatePath('/admin/tours')
    revalidatePath('/')
    return { success: true }
}

export async function getTours() {
    try {
        const tours = await prisma.tour.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return { success: true, data: tours }
    } catch (e) {
        console.error('Failed to fetch tours:', e)
        return { success: false, data: [] }
    }
}

export async function getTourBySlug(slug: string) {
    try {
        // We select fields or just get all and handle nulls in UI
        const tour = await prisma.tour.findUnique({
            where: { slug },
            include: { reviews: true }
        })
        return { success: true, data: tour }
    } catch (e) {
        console.error('Failed to fetch tour:', e)
        return { success: false, data: null }
    }
}
