'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShopifyProduct } from '@/types/shopify';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts(50); // Fetch more products for search
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please check your Shopify configuration.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && query) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput.trim())}`;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {query ? `Search Results for "${query}"` : 'All Products'}
        </h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-4 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        
        <p className="text-gray-600 mt-4">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {query ? 'No products found' : 'No products available'}
          </h3>
          <p className="text-gray-500">
            {query 
              ? `Try searching for something else or browse all products.`
              : 'Add some products to your Shopify store to see them here.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}