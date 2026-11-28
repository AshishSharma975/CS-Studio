
import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
  Cinzel,
  Instrument_Serif,
} from "next/font/google";

import { ThemeProvider } from "@/shared/components/providers";
import "./globals.css";

import { LenisScroll } from "@/shared/components/anims";

import { Header } from "@/shared/components/layout/Header";
import { SocialSidebar } from "@/shared/components/layout/SocialSidebar";
import { Footer } from "@/shared/components/layout/Footer";

import { siteConfig } from "@/config/site-config";

import { Analytics } from "@vercel/analytics/next";


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

// ==========================================
// BRAND INFORMATION
// ==========================================

const BRAND_NAME = "Calcutta Studio";

const BRAND_DESCRIPTION = siteConfig.description;

const WEBSITE_URL = siteConfig.url;

// ==========================================
// STRUCTURED DATA - GOOGLE SEO
// ==========================================

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // WEBSITE
    {
      "@type": "WebSite",

      "@id": `${WEBSITE_URL}/#website`,

      url: `${WEBSITE_URL}/`,

      name: BRAND_NAME,

      alternateName: "CS Studio",

      description: BRAND_DESCRIPTION,

      creator: {
        "@id": `${WEBSITE_URL}/#ashish`,
      },

      publisher: {
        "@id": `${WEBSITE_URL}/#organization`,
      },
    },

    // ORGANIZATION
    {
      "@type": "Organization",

      "@id": `${WEBSITE_URL}/#organization`,

      name: BRAND_NAME,

      url: `${WEBSITE_URL}/`,

      description: BRAND_DESCRIPTION,

      sameAs: [
        siteConfig.links.instagramStudio,
        siteConfig.links.facebook,
        siteConfig.links.behance,
      ],

      employee: {
        "@id": `${WEBSITE_URL}/#creative-director`,
      },

      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.links.phone,
        contactType: "customer service",
        contactOption: "TollFree",
        availableLanguage: ["English", "Hindi"],
      },
    },

    // CREATIVE DIRECTOR
    {
      "@type": "Person",

      "@id": `${WEBSITE_URL}/#creative-director`,

      name: "Subham Sharma",

      alternateName: "Sinu",

      jobTitle: "Creative Director",

      worksFor: {
        "@id": `${WEBSITE_URL}/#organization`,
      },

      sameAs: [
        siteConfig.links.instagramOwner,
      ],
    },

    // WEBSITE DEVELOPER
    {
      "@type": "Person",

      "@id": `${WEBSITE_URL}/#ashish`,

      name: "Ashish Sharma",

      jobTitle: "Website Designer and Developer",

      description:
        "Ashish Sharma designed and developed the official Calcutta Studio website.",

      sameAs: [
        siteConfig.links.linkedin,
      ],
    },
  ],
};

// ==========================================
// SEO METADATA
// ==========================================

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),

  applicationName: BRAND_NAME,

  title: {
    default:
      "Calcutta Studio | Wedding Cinematography & Bridal Films",

    template: `%s | ${BRAND_NAME}`,
  },

  description: BRAND_DESCRIPTION,

  keywords: siteConfig.keywords,

  authors: siteConfig.authors,

  creator: siteConfig.creator,

  publisher: BRAND_NAME,

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

  // GOOGLE SEARCH CONSOLE
  verification: {
    google:
      "Cup2jMupTe9zsCKGgTqk-DnWapbD77rW4fDm8UOZItY",
  },

  // OPEN GRAPH
  openGraph: {
    type: "website",

    locale: "en_IN",

    url: WEBSITE_URL,

    siteName: BRAND_NAME,

    title:
      "Calcutta Studio | Wedding Cinematography & Bridal Films",

    description: BRAND_DESCRIPTION,

    images: [
      {
        url: siteConfig.ogImage,

        width: 1200,

        height: 630,

        alt:
          "Calcutta Studio - Wedding Cinematography & Bridal Films",
      },
    ],
  },

  // TWITTER / X
  twitter: {
    card: "summary_large_image",

    title:
      "Calcutta Studio | Wedding Cinematography & Bridal Films",

    description: BRAND_DESCRIPTION,

    images: [siteConfig.ogImage],
  },

  // FAVICONS
  icons: {
    icon: siteConfig.icons.icon,

    shortcut: siteConfig.icons.shortcut,

    apple: siteConfig.icons.apple,
  },
};

// ==========================================
// ROOT LAYOUT
// ==========================================

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
        {/* PRELOAD 3D MODEL */}
        <link
          rel="preload"
          href="/models/gothic_ring.glb"
          as="fetch"
          crossOrigin="anonymous"
        />

        {/* GOOGLE STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
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
