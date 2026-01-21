import React from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li>
                            <Link href="/admin" className="block px-6 py-3 text-gray-700 hover:bg-gray-200">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/tours" className="block px-6 py-3 text-gray-700 hover:bg-gray-200">
                                Tours
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/reviews" className="block px-6 py-3 text-gray-700 hover:bg-gray-200">
                                Reviews
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="block px-6 py-3 text-gray-700 hover:bg-gray-200">
                                Back to Site
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
