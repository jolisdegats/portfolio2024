import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page Transition",
  description: "Using framer-motion to add trasition between pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${playfair.className} antialiased`}>
      <body>
      <AppProvider>
        <main>
    {children}
    <div id="portal-root" />
    </main>
    </AppProvider>
      </body>
    </html>
  );
}