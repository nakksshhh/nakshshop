import React from 'react';
import { getProduct } from '@/lib/shopify';
import ProductDetails from '@/components/ProductDetails';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetails product={product} />
    </div>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  return [];
}