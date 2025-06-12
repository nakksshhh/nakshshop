import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Cart from '@/components/Cart';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nakshshop - Modern E-commerce Experience',
  description: 'A beautiful Shopify-powered e-commerce store built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pb-16">
              {children}
            </main>
            <Cart />
            <Toaster />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}