'use client';

import { ShoppingCart, Search, Store, Heart, Menu, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Wishlist from '@/components/Wishlist';

export default function Header() {
  const { getCartCount, toggleCart } = useCart();
  const { getWishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const router = useRouter();
  const cartItemCount = getCartCount();
  const wishlistItemCount = getWishlistCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-sage/20 shadow-warm transition-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-sage-gradient rounded-xl flex items-center justify-center shadow-warm group-hover:shadow-botanical transition-warm">
                  <Leaf className="h-6 w-6 text-white animate-gentle-sway" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-soft-blush rounded-full animate-float"></div>
              </div>
              <div>
                <span className="text-2xl font-serif font-semibold text-sage-dark group-hover:text-sage transition-warm">
                  NakshShop
                </span>
                <div className="text-xs text-warm-brown font-light tracking-wide">naturally curated</div>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-12 hidden md:block">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-sage/60 group-focus-within:text-sage transition-warm" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for natural treasures..."
                  className="pl-12 pr-4 w-full bg-white/80 backdrop-blur-sm border-sage/30 rounded-full focus:ring-2 focus:ring-sage/50 focus:border-sage transition-warm shadow-warm hover:shadow-botanical font-light"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <div className="text-xs text-sage/60 bg-sage/10 px-2 py-1 rounded-full">⌘K</div>
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-sage hover:text-sage-dark hover:bg-sage/10 transition-warm"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlistOpen(true)}
                className="relative text-sage hover:text-sage-dark hover:bg-sage/10 transition-warm hover-bloom group"
              >
                <Heart className="h-5 w-5 group-hover:scale-110 transition-warm" />
                {wishlistItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-terracotta border-0 animate-float"
                  >
                    {wishlistItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden lg:inline font-medium">Wishlist</span>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="relative text-sage hover:text-sage-dark hover:bg-sage/10 transition-warm hover-bloom group"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-warm" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-terracotta border-0 animate-float"
                    style={{animationDelay: '0.5s'}}
                  >
                    {cartItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden lg:inline font-medium">Cart</span>
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden text-sage hover:text-sage-dark hover:bg-sage/10 transition-warm"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Wishlist Sidebar */}
      <Wishlist 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />
    </>
  );
}