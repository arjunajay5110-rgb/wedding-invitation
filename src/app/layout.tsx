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
  title: "Wedding Invitation | Keerthana & Sreerag",
  description: "You are cordially invited to celebrate the wedding of Keerthana & Sreerag on September 13, 2026. Find the venue, schedule, and RSVP details here.",
  keywords: "Wedding Invitation, Keerthana Sreerag Wedding, Kerala Wedding, Nanak Convention Centre, Pandalam",
  openGraph: {
    title: "Wedding Invitation | Keerthana & Sreerag",
    description: "You are cordially invited to celebrate the wedding of Keerthana & Sreerag on September 13, 2026.",
    type: "website",
    images: [
      {
        url: "/images/kerala_couple_new.png", // Beautiful couple photo preview
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
