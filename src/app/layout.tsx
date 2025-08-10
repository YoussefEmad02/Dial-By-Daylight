import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Dial By Daylight - Cost-Effective Outbound Teams Built Fast",
    template: "%s | Dial By Daylight"
  },
  description: "Transform your business with Dial By Daylight's cost-effective, high-performance outbound teams. Professional cold calling, customer support, appointment setting, and virtual assistance services. Scale your operations fast with our expert remote teams.",
  keywords: [
    "outbound teams",
    "cold calling",
    "customer support",
    "appointment setting", 
    "virtual assistance",
    "BPO services",
    "lead generation",
    "remote teams",
    "business process outsourcing",
    "cost-effective solutions",
    "professional services",
    "24/7 support"
  ],
  authors: [{ name: "Dial By Daylight", url: "https://dialbydaylight.com" }],
  creator: "Dial By Daylight",
  publisher: "Dial By Daylight",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dialbydaylight.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dialbydaylight.com",
    siteName: "Dial By Daylight",
    title: "Dial By Daylight - Cost-Effective Outbound Teams Built Fast",
    description: "Transform your business with our cost-effective, high-performance outbound teams. Professional cold calling, customer support, appointment setting, and virtual assistance services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dial By Daylight - Professional Outbound Teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dialbydaylight",
    creator: "@dialbydaylight",
    title: "Dial By Daylight - Cost-Effective Outbound Teams Built Fast",
    description: "Transform your business with our cost-effective, high-performance outbound teams. Professional cold calling, customer support, appointment setting, and virtual assistance services.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Business Services",
  classification: "Business Process Outsourcing",
  other: {
    "theme-color": "#3B82F6",
    "msapplication-TileColor": "#3B82F6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Dial By Daylight",
    "application-name": "Dial By Daylight",
    "msapplication-TileImage": "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dial By Daylight" />
        <meta name="application-name" content="Dial By Daylight" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          themes={["light"]}
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
