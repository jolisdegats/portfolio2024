import { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jolisdegats.dev'),
  title: "Jolisdegats' Portfolio",
  description: "Ideas, Code and Coffee",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: "Jolisdegats' Portfolio",
    description: "Ideas, Code and Coffee",
    siteName: "Jolisdegats' Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Jolis Degats Preview",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jolisdegats' Portfolio",
    description: "Ideas, Code and Coffee",
    images: ['/og-image.png'],
  },
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