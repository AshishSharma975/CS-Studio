
import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
  Cinzel,
  Instrument_Serif,
} from "next/font/google";

import { ThemeProvider } from "@/shared/components/providers";
import "./globals.css";

import {
  LenisScroll,
  Preloader,
} from "@/shared/components/anims";

import { Header } from "@/shared/components/layout/Header";
import { SocialSidebar } from "@/shared/components/layout/SocialSidebar";
import { Footer } from "@/shared/components/layout/Footer";

import { siteConfig } from "@/config/site";

import { Analytics } from "@vercel/analytics/next";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  applicationName: siteConfig.name,

  title: {
    default: "Calcutta Studio | Digital Art & Horror Design",
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  authors: siteConfig.authors,

  creator: siteConfig.creator,

  publisher: siteConfig.name,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Google Search Console Verification
  verification: {
    google: "Cup2jMupTe9zsCKGgTqk-DnWapbD77rW4fDm8UOZItY",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Calcutta Studio | Digital Art & Horror Design",
    description: siteConfig.description,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Calcutta Studio - Digital Art & Horror Design",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Calcutta Studio | Digital Art & Horror Design",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // Website Icons
  icons: {
    icon: siteConfig.icons.icon,
    shortcut: siteConfig.icons.shortcut,
    apple: siteConfig.icons.apple,
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
      suppressHydrationWarning
      className="overflow-x-hidden max-w-full"
    >
      <head>
        <link
          rel="preload"
          href="/models/gothic_ring.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${instrumentSerif.variable} font-sans antialiased overflow-x-hidden max-w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
            <Preloader />

            <LenisScroll />

            <Header />

            <SocialSidebar />

            <main className="flex-1 overflow-x-hidden max-w-full">
              {children}
            </main>

            <Footer />

            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
