"use client";

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { formatPrice, createShopifyCheckoutUrl } from '@/lib/shopify';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
  const { 
    state, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartCount,
    closeCart 
  } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (state.items.length === 0) return;

    setIsCheckingOut(true);
    
    try {
      const lineItems = state.items.map(item => ({
        variantId: item.variant.id,
        quantity: item.quantity,
      }));

      const checkoutUrl = await createShopifyCheckoutUrl({ lineItems });
      
      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "Unable to proceed to checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <Card className="h-full flex flex-col border-0 rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopping Cart</span>
              <Badge variant="secondary">{getCartCount()}</Badge>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto px-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add some products to get started!</p>
                <Button onClick={closeCart}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => {
                  const image = item.product.images.edges[0]?.node;
                  
                  return (
                    <div key={item.id} className="flex space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex-shrink-0">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          {image && (
                            <Image
                              src={image.url}
                              alt={image.altText || item.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.title}
                        </h4>
                        
                        {item.variant.selectedOptions && item.variant.selectedOptions.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.variant.selectedOptions.map(option => 
                              `${option.name}: ${option.value}`
                            ).join(', ')}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-sm">
                            {formatPrice(item.price.toString(), item.variant.price.currencyCode)}
                          </span>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
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
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span>{formatPrice(getCartTotal().toString())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal().toString())}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="w-full"
                  size="sm"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}