'use client';

import React from 'react';
import TourForm from '@/components/Admin/TourForm';

export default function NewTourPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase mb-2">
                    Новый Маршрут
                </h1>
                <p className="text-slate-400 font-medium">Создание новой экспедиции в каталог</p>
            </div>
            <div className="max-w-5xl mx-auto">
                <TourForm />
            </div>
        </div>
    );
}
