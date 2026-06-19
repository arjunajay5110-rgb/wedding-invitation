import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Keerthana & Sreerag Wedding Invitation",
  description: "We warmly invite you to celebrate our wedding on September 13, 2026.",
  keywords: "Wedding Invitation, Keerthana Sreerag Wedding, Kerala Wedding, Nanak Convention Centre, Pandalam",
  openGraph: {
    title: "Keerthana & Sreerag Wedding Invitation",
    description: "We warmly invite you to celebrate our wedding on September 13, 2026.",
    url: "https://wedding-invitation-rho-three-83.vercel.app",
    type: "website",
    images: [
      {
        url: "https://wedding-invitation-rho-three-83.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Keerthana & Sreerag Wedding Invitation",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
