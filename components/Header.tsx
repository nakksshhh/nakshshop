'use client';

import { ShoppingCart, Search, Store, Heart } from 'lucide-react';
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
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-foreground">NakshShop</span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 w-full"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Wishlist */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWishlistOpen(true)}
                className="relative"
              >
                <Heart className="h-4 w-4" />
                {wishlistItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {wishlistItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden sm:inline">Wishlist</span>
              </Button>

              {/* Cart */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCart}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden sm:inline">Cart</span>
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