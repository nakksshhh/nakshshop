'use client'
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <br />
              <span className="text-blue-200">Products</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Shop the latest trends with our curated collection of premium products. 
              Fast shipping, easy returns, and exceptional customer service.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={scrollToProducts}
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure checkout</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Curated products</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the finest products, 
              carefully chosen for quality, style, and value.
            </p>
          </div>
          
          <ProductGrid />
        </div>
      </section>
    </div>
  );
}