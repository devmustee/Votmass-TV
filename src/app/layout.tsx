import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: false,
});

export const metadata: Metadata = {
  title: "VOTMASS TV - Premium Digital Media & Online Television",
  description: "Next generation digital media platform focused on leadership, governance, youth development, education, documentaries, movies, news, and short-form video content.",
  keywords: ["VOTMASS TV", "Online TV", "Youth Development", "Governance", "Leadership", "Documentaries", "Shorts", "Podcasts", "News"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VOTMASS TV",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-dark text-white font-sans selection:bg-primary selection:text-white flex flex-col">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
