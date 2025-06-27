'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '@/types/shopify';
import { formatPrice } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Sparkles, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WishlistButton } from '@/components/WishlistButton';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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
    <Card 
      className="group overflow-hidden hover:shadow-botanical transition-all duration-500 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-sage/20 rounded-2xl hover-lift animate-fade-in-up relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative botanical elements */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <Sparkles className="h-4 w-4 text-sage animate-float" />
      </div>
      
      <div className="relative overflow-hidden rounded-t-2xl">
        <Link href={`/product/${product.handle}`}>
          <div className="aspect-square relative bg-warm-beige/50">
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sage/60 bg-warm-beige/30">
                <Leaf className="h-12 w-12 animate-gentle-sway" />
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </div>
        </Link>
        
        {isOnSale && (
          <Badge 
            variant="destructive" 
            className="absolute top-3 left-3 bg-terracotta border-0 text-white shadow-warm animate-float"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Sale
          </Badge>
        )}
        
        <WishlistButton
          product={product}
          className={`absolute top-3 right-3 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white shadow-warm border-sage/20 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        />
      </div>

      <CardContent className="p-6 space-y-4">
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-serif text-xl font-semibold text-sage-dark line-clamp-2 group-hover:text-sage transition-warm leading-tight">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-semibold text-sage-dark">
              {formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)}
            </span>
            {isOnSale && (
              <span className="text-sm text-warm-brown line-through opacity-75">
                {formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}
              </span>
            )}
          </div>
          
          {firstVariant.availableForSale ? (
            <Badge variant="outline" className="text-sage border-sage/30 bg-sage/5 font-medium">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="text-terracotta border-terracotta/30 bg-terracotta/5 font-medium">
              Sold Out
            </Badge>
          )}
        </div>

        {product.description && (
          <p className="text-warm-brown leading-relaxed line-clamp-2 text-sm">
            {product.description.replace(/<[^>]*>/g, '')}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!firstVariant.availableForSale || isLoading}
          className="w-full bg-sage hover:bg-sage-dark text-white rounded-full py-3 font-medium transition-warm hover-bloom shadow-warm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Adding...
            </span>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}