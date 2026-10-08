import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Share images come from the opengraph-image.tsx / twitter-image.tsx files
  // (app/lib/og-card.tsx); this root pair is the fallback for every page.
  openGraph: {
    type: "website",
    siteName: "DashClue",
  },
  twitter: { card: "summary_large_image" },
  title: {
    default: "DashClue",
    template: "%s | DashClue",
  },
  description: "AI car diagnostics and repair guidance assistant.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon1.png", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  // Lets the mobile nav pad itself for the iPhone home indicator.
  viewportFit: "cover",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        {/* Cookieless page views; only reports on Vercel deployments. */}
        <Analytics />
      </body>
    </html>
  );
}
