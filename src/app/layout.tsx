import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SUJY Games | Crafting Meaningful Mobile Experiences',
  description:
    'SUJY Games builds high-quality, family-friendly mobile experiences rooted in cultural lore. Play our debut title, Words of Bible — a divine word puzzle journey.',
  keywords: ['mobile games', 'word puzzle', 'Words of Bible', 'hypercasual', 'Christian games', 'Hindu mythology games', 'SUJY Games'],
  authors: [{ name: 'SUJY Games', url: 'https://sujygames.com' }],
  creator: 'SUJY Games',
  openGraph: {
    title: 'SUJY Games | Crafting Meaningful Mobile Experiences',
    description: 'Beautiful, family-friendly games filled with cultural lore, relaxing gameplay, and deeply rewarding mechanics.',
    url: 'https://sujygames.com',
    siteName: 'SUJY Games',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/hero_lore.png', width: 1200, height: 630, alt: 'SUJY Games — Cultural Lore Games' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUJY Games | Crafting Meaningful Mobile Experiences',
    description: 'Beautiful, family-friendly games filled with cultural lore and rewarding mechanics.',
    images: ['/hero_lore.png'],
  },
  icons: {
    icon: '/logo1.png',
    apple: '/logo1.png',
  },
  metadataBase: new URL('https://sujygames.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-[#071022] text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
