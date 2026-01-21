'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { BookingStatus } from '@/types'

export async function getBookings() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            include: { tour: true },
        })
        return { success: true, data: bookings }
    } catch (e) {
        console.error('Failed to fetch bookings:', e)
        return { success: false, data: [] }
    }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { status },
        })
        revalidatePath('/admin/bookings')
        return { success: true }
    } catch (e) {
        console.error('Failed to update booking:', e)
        return { success: false, message: 'Database error' }
    }
}

export async function createBooking(data: any) {
    // Basic creation logic for client-side
    // Validation should happen before calling this or inside here
    try {
        await prisma.booking.create({
            data: {
                tourId: data.tourId,
                customerName: data.customerName,
                email: data.email,
                phone: data.phone,
                date: new Date(data.date),
                peopleCount: data.peopleCount,
                comment: data.comment,
            }
        })
        return { success: true }
    } catch (e) {
        console.error('Failed to create booking:', e)
        return { success: false, message: 'Failed to create booking' }
    }
}
