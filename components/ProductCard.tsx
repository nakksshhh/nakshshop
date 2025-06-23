'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '@/types/shopify';
import { formatPrice } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WishlistButton } from '@/components/WishlistButton';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  
  if (!firstVariant) return null;

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    const cartItem = {
      id: firstVariant.id,
      title: product.title,
      price: parseFloat(firstVariant.price.amount),
      quantity: 1,
      variant: firstVariant,
      product: {
        handle: product.handle,
        images: product.images,
      },
    };

    addToCart(cartItem);
    
    setTimeout(() => setIsLoading(false), 500);
  };

  const isOnSale = product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.handle}`}>
          <div className="aspect-square relative bg-muted">
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>
        </Link>
        
        {isOnSale && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Sale
          </Badge>
        )}
        
        <WishlistButton
          product={product}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-sm"
        />
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)}
            </span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}
              </span>
            )}
          </div>
          
          {firstVariant.availableForSale ? (
            <Badge variant="outline" className="text-green-600 border-green-600">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="text-red-600 border-red-600">
              Out of Stock
            </Badge>
          )}
        </div>

        {product.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.description.replace(/<[^>]*>/g, '')}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!firstVariant.availableForSale || isLoading}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}