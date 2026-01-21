import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { BottomNav } from "@/components/ui/BottomNav";

export const metadata = {
    title: "Отзывы | KG Tours",
    description: "Отзывы наших путешественников",
};

export default function ReviewsLayout({
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
