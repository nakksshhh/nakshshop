"use client";

import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Wishlist({ isOpen, onClose }: WishlistProps) {
  const { state, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant) return;

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
    removeFromWishlist(product.id);
    
    toast({
      title: "Added to cart!",
      description: `${product.title} has been moved to your cart.`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Wishlist Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <Card className="h-full flex flex-col border-0 rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
              <Badge variant="secondary">{getWishlistCount()}</Badge>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto px-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-4">Save items you love to view them later!</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((product) => {
                  const image = product.images.edges[0]?.node;
                  const firstVariant = product.variants.edges[0]?.node;
                  
                  return (
                    <div key={product.id} className="flex space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex-shrink-0">
                        <Link href={`/product/${product.handle}`} onClick={onClose}>
                          <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                            {image && (
                              <Image
                                src={image.url}
                                alt={image.altText || product.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                        </Link>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.handle}`} onClick={onClose}>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-blue-600 transition-colors">
                            {product.title}
                          </h4>
                        </Link>
                        
                        {firstVariant && (
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-sm">
                              {formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddToCart(product)}
                                disabled={!firstVariant.availableForSale}
                                className="h-8 px-3"
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>

          {state.items.length > 0 && (
            <div className="border-t p-6">
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="w-full"
                size="sm"
              >
                Clear Wishlist
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}