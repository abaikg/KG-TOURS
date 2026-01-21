'use client';
import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Tours</h3>
                    <p className="text-gray-600">Manage your tours here.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Reviews</h3>
                    <p className="text-gray-600">Manage customer reviews.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Settings</h3>
                    <p className="text-gray-600">System settings.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
