import React from 'react';
import { getBookings, updateBookingStatus } from '@/app/actions/bookings';
import { Button } from '@/components/ui/Button';
import { BookingStatus } from '@/types'; // Use local enum or from prisma

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
    const { data: bookings } = await getBookings();

    return (
        <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">
                    Бронирования
                </h1>
                <p className="text-slate-400 font-medium">Управление заявками на экспедиции</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Экспедиция</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Клиент</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Дата</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500 text-center">Группа</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500">Статус</th>
                            <th className="p-6 font-bold text-xs uppercase tracking-widest text-slate-500 text-right">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bookings?.map((booking: any) => (
                            <tr key={booking.id} className="hover:bg-white/5 transition-all group">
                                <td className="p-6">
                                    <div className="font-bold text-white">{booking.tour?.title_ru || 'Unknown'}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Tour ID: {booking.tourId?.slice(-6)}</div>
                                </td>
                                <td className="p-6">
                                    <div className="font-bold text-white">{booking.customerName}</div>
                                    <div className="text-xs text-slate-400 font-medium">{booking.email}</div>
                                    <div className="text-xs text-slate-500">{booking.phone}</div>
                                </td>
                                <td className="p-6">
                                    <div className="text-white font-bold">{new Date(booking.date).toLocaleDateString()}</div>
                                </td>
                                <td className="p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-forest-900 border border-white/10 text-white font-bold">
                                        {booking.peopleCount}
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                        booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        {booking.status === 'PENDING' && (
                                            <FormUpdateStatus id={booking.id} status="CONFIRMED" label="Принять" />
                                        )}
                                        {booking.status !== 'CANCELLED' ? (
                                            <FormUpdateStatus id={booking.id} status="CANCELLED" label="Отменить" variant="ghost" />
                                        ) : null}
                                    </div>
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
