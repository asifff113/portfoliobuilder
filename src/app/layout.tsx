import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AMCV - Futuristic CV & Portfolio Builder",
    template: "%s | AMCV",
  },
  description:
    "Create stunning, modern CVs and portfolios with AMCV. Featuring vibrant designs, multiple templates, and export to PDF, DOCX, and more.",
  keywords: [
    "CV builder",
    "portfolio builder",
    "resume maker",
    "modern CV",
    "futuristic design",
    "PDF export",
  ],
  authors: [{ name: "AMCV" }],
  creator: "AMCV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amcv.app",
    title: "AMCV - Futuristic CV & Portfolio Builder",
    description:
      "Create stunning, modern CVs and portfolios with vibrant designs and powerful export options.",
    siteName: "AMCV",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMCV - Futuristic CV & Portfolio Builder",
    description:
      "Create stunning, modern CVs and portfolios with vibrant designs and powerful export options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d15" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
