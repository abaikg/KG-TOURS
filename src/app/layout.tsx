import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "AYAN — Путешествия по Кыргызстану",
    template: "%s · AYAN",
  },

  description:
    "AYAN — спокойные и продуманные путешествия по Кыргызстану. Горы, озёра, живая культура и небольшие группы. Заявка через WhatsApp.",

  keywords: [
    "туры по Кыргызстану",
    "путешествия по Кыргызстану",
    "туры Бишкек",
    "туры в горы Кыргызстан",
    "Иссык-Куль туры",
    "Сон-Куль тур",
    "AYAN travel",
  ],

  authors: [{ name: "AYAN Travel" }],
  creator: "AYAN",

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://ayan.travel", // позже заменишь
    siteName: "AYAN",
    title: "AYAN — Путешествия по Кыргызстану",
    description:
      "Спокойные путешествия по Кыргызстану без суеты и туристической декорации.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AYAN — путешествия по Кыргызстану",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AYAN — Путешествия по Кыргызстану",
    description:
      "Горы, озёра и живая культура Кыргызстана. Небольшие группы и забота о деталях.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  metadataBase: new URL("https://ayan.travel"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body
        className={[
          "min-h-screen antialiased",
          "[font-family:var(--font-sans)]",
          "text-[color:var(--text)] bg-[color:var(--bg)]",
        ].join(" ")}
      >
        {/* мягкий фон-подложка */}
        <div className="min-h-screen bg-[color:var(--bg)]">
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(22,163,74,0.10),transparent_55%)]" />
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(40%_30%_at_10%_10%,rgba(17,24,39,0.06),transparent_50%)]" />

          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
