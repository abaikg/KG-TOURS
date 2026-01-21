import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { BottomNav } from "@/components/ui/BottomNav";
import AboutPage from "./page";

export const metadata = {
    title: "О нас | KG Tours",
    description: "Узнайте больше о команде KG Tours",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
            <BottomNav />
        </>
    );
}
