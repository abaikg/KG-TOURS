import { Sidebar } from "@/components/Admin/Sidebar";
import "@/app/globals.css"; // Ensure styles

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <Sidebar />
            <main className="lg:ml-64 min-h-screen p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
