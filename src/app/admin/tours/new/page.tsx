'use client';

import React from 'react';
import TourForm from '@/components/Admin/TourForm';

export default function NewTourPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
                Create New Tour
            </h1>
            <div className="max-w-5xl mx-auto">
                <TourForm />
            </div>
        </div>
    );
}
