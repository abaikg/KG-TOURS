import React from 'react';
import { getBookings, updateBookingStatus } from '@/app/actions/bookings';
import { Button } from '@/components/ui/Button';
import { BookingStatus } from '@/types'; // Use local enum or from prisma

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
    const { data: bookings } = await getBookings();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Bookings
            </h1>

            <div className="glass rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 font-semibold text-slate-300">Tour</th>
                            <th className="p-4 font-semibold text-slate-300">Customer</th>
                            <th className="p-4 font-semibold text-slate-300">Date</th>
                            <th className="p-4 font-semibold text-slate-300">People</th>
                            <th className="p-4 font-semibold text-slate-300">Status</th>
                            <th className="p-4 font-bold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bookings?.map((booking: any) => (
                            <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-white">
                                    {booking.tour?.title_ru || booking.tour?.title || 'Unknown'}
                                </td>
                                <td className="p-4 text-slate-300">
                                    <div>{booking.customerName}</div>
                                    <div className="text-xs text-slate-500">{booking.email}</div>
                                    <div className="text-xs text-slate-500">{booking.phone}</div>
                                </td>
                                <td className="p-4 text-slate-300">
                                    {new Date(booking.date).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-slate-300">
                                    {booking.peopleCount}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'CONFIRMED' ? 'bg-secondary/20 text-secondary' :
                                            booking.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    {booking.status === 'PENDING' && (
                                        <FormUpdateStatus id={booking.id} status="CONFIRMED" label="Confirm" />
                                    )}
                                    {booking.status !== 'CANCELLED' ? (
                                        <FormUpdateStatus id={booking.id} status="CANCELLED" label="Cancel" variant="ghost" />
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function FormUpdateStatus({ id, status, label, variant = "primary" }: any) {
    return (
        <form action={async () => {
            'use server';
            await updateBookingStatus(id, status);
        }}>
            <Button size="sm" variant={variant} className={variant === 'ghost' ? "text-red-400 hover:text-red-300" : ""}>
                {label}
            </Button>
        </form>
    );
}
