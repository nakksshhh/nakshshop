'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShopifyProduct, ShopifyVariant } from '@/types/shopify';
import { formatPrice } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailsProps {
  product: ShopifyProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart, openCart } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(
    product.variants.edges[0]?.node
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setIsLoading(true);

    const cartItem = {
      id: selectedVariant.id,
      title: product.title,
      price: parseFloat(selectedVariant.price.amount),
      quantity,
      variant: selectedVariant,
      product: {
        handle: product.handle,
        images: product.images,
      },
    };

    addToCart(cartItem);
    
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.title} added to your cart.`,
    });

    setTimeout(() => {
      setIsLoading(false);
      openCart();
    }, 500);
  };

  const images = product.images.edges.map(edge => edge.node);
  const selectedImage = images[selectedImageIndex];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              {selectedImage ? (
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
          </Card>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-blue-600'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">(4.0) 128 reviews</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </span>
              
              {selectedVariant.availableForSale ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Variant Selection */}
          {product.variants.edges.length > 1 && (
            <div>
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.edges.map(({ node: variant }) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      selectedVariant.id === variant.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant.title}
                    <br />
                    <span className="font-semibold">
                      {formatPrice(variant.price.amount, variant.price.currencyCode)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || isLoading}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <Separator />

          {/* Product Description */}
          {product.description && (
            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <div 
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Premium quality materials</li>
                <li>• 30-day return policy</li>
                <li>• Free shipping on orders over $50</li>
                <li>• 1-year manufacturer warranty</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}