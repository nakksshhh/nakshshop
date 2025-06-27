"use client";

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Minus, ShoppingBag, CreditCard, Leaf, Sparkles } from 'lucide-react';
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
        className="absolute inset-0 bg-sage-dark/20 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream/95 backdrop-blur-md shadow-botanical border-l border-sage/20">
        <Card className="h-full flex flex-col border-0 rounded-none bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-sage/20">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sage-gradient rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-serif text-xl text-sage-dark">Shopping Cart</span>
                <Badge variant="secondary" className="ml-2 bg-sage/10 text-sage border-0">
                  {getCartCount()}
                </Badge>
              </div>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeCart}
              className="text-sage hover:text-sage-dark hover:bg-sage/10 transition-warm"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto px-6 py-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-sage/60" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-sage animate-float" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-semibold text-sage-dark">Your cart is empty</h3>
                  <p className="text-warm-brown">Discover beautiful treasures waiting for you!</p>
                </div>
                <Button 
                  onClick={closeCart}
                  className="bg-sage hover:bg-sage-dark text-white rounded-full px-8 py-3 hover-bloom transition-warm"
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map((item, index) => {
                  const image = item.product.images.edges[0]?.node;
                  
                  return (
                    <div 
                      key={item.id} 
                      className="flex space-x-4 p-4 border border-sage/20 rounded-2xl hover:shadow-warm transition-all duration-300 bg-white/60 backdrop-blur-sm animate-fade-in-up"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 bg-warm-beige/50 rounded-xl overflow-hidden">
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
                      
                      <div className="flex-1 min-w-0 space-y-3">
                        <h4 className="font-serif text-lg font-medium text-sage-dark line-clamp-2 leading-tight">
                          {item.title}
                        </h4>
                        
                        {item.variant.selectedOptions && item.variant.selectedOptions.length > 0 && (
                          <p className="text-sm text-warm-brown">
                            {item.variant.selectedOptions.map(option => 
                              `${option.name}: ${option.value}`
                            ).join(', ')}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg font-semibold text-sage-dark">
                            {formatPrice(item.price.toString(), item.variant.price.currencyCode)}
                          </span>
                          
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border-sage/30 hover:bg-sage/10 transition-warm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="font-medium w-8 text-center text-sage-dark">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border-sage/30 hover:bg-sage/10 transition-warm"
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
                        className="h-8 w-8 text-warm-brown hover:text-terracotta hover:bg-terracotta/10 transition-warm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>

          {state.items.length > 0 && (
            <div className="border-t border-sage/20 p-6 space-y-6 bg-white/40 backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-warm-brown">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span>{formatPrice(getCartTotal().toString())}</span>
                </div>
                <div className="flex justify-between text-sm text-warm-brown">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="bg-sage/20" />
                <div className="flex justify-between font-serif text-lg font-semibold text-sage-dark">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal().toString())}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-sage hover:bg-sage-dark text-white rounded-full py-4 font-medium hover-bloom transition-warm shadow-warm"
                  size="lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isCheckingOut ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="w-full border-sage/30 text-sage hover:bg-sage/10 rounded-full transition-warm"
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