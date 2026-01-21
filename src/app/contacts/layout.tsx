import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { BottomNav } from "@/components/ui/BottomNav";

export const metadata = {
    title: "Контакты | KG Tours",
    description: "Свяжитесь с нами",
};

export default function ContactsLayout({
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
