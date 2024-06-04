import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteAside } from "@/components/layout/site-aside";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem] light">
      <body
        className={cn("min-h-screen font-sans antialiased", inter.variable)}
      >
        <Providers>
          <div className="relative min-h-dvh flex-col">
            <SiteHeader />
            <div className="flex container max-w-screen-xl">
              <SiteAside />
              <main className="w-[70%]">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
