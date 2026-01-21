'use server'

import { prisma } from '@/lib/prisma'
import { ReviewSchema, ReviewInput } from '@/types'
import { revalidatePath } from 'next/cache'

export async function createReview(data: ReviewInput) {
    const result = ReviewSchema.safeParse(data)

    if (!result.success) {
        return {
            success: false,
            message: 'Validation error',
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { tourId, ...reviewData } = result.data

    try {
        await prisma.review.create({
            data: {
                ...reviewData,
                tour: { connect: { id: tourId } },
            },
        })
    } catch (e) {
        console.error('Failed to create review:', e)
        return {
            success: false,
            message: 'Database error: Failed to submit review',
        }
    }

    revalidatePath(`/tours`)
    // Ideally we revalidate the specific tour page, we need the slug for that. 
    // For now, revalidating the list might be enough or we fetch the tour to get the slug.
    return { success: true }
}

export async function getReviewsForTour(tourId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: { tourId },
            orderBy: { createdAt: 'desc' },
        })
        return { success: true, data: reviews }
    } catch (e) {
        console.error('Failed to fetch reviews:', e)
        return { success: false, data: [] }
    }
}

export async function deleteReview(id: string) {
    try {
        await prisma.review.delete({
            where: { id },
        })
    } catch (e) {
        console.error('Failed to delete review:', e)
        return {
            success: false,
            message: 'Database error: Failed to delete review',
        }
    }

    revalidatePath('/admin/reviews')
    return { success: true }
}
