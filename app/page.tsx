'use client'
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Truck, Shield, Headphones, Leaf, Heart, Sparkles } from 'lucide-react';
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
      <section className="relative bg-sage-gradient overflow-hidden">
        {/* Decorative botanical elements */}
        <div className="absolute inset-0 botanical-pattern"></div>
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-gentle-sway">🌿</div>
        <div className="absolute top-20 right-20 text-4xl opacity-15 animate-float">🍃</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-10 animate-leaf-rustle">🌱</div>
        <div className="absolute bottom-10 right-1/3 text-3xl opacity-20 animate-gentle-sway" style={{animationDelay: '1s'}}>🌾</div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
                <Leaf className="h-5 w-5 text-white animate-gentle-sway" />
                <span className="text-white font-medium">Naturally Curated</span>
                <Sparkles className="h-4 w-4 text-white animate-float" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-semibold mb-8 text-white leading-tight">
              Discover Life's
              <br />
              <span className="text-cream italic relative">
                Simple Pleasures
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Thoughtfully sourced treasures for your home and heart. 
              Each piece tells a story of craftsmanship, sustainability, and timeless beauty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-sage-dark hover:bg-cream hover:scale-105 transition-all duration-300 shadow-warm px-8 py-4 text-lg font-medium rounded-full hover-bloom"
                onClick={scrollToProducts}
              >
                <Heart className="mr-2 h-5 w-5" />
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg rounded-full transition-warm"
              >
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-warm-gradient relative">
        <div className="absolute inset-0 botanical-pattern opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-sage-dark mb-6">
              Crafted with Care
            </h2>
            <p className="text-lg text-warm-brown max-w-2xl mx-auto">
              Every detail matters in creating experiences that nurture your well-being
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Mindful Delivery",
                description: "Carbon-neutral shipping on orders over $75",
                delay: "0s"
              },
              {
                icon: Shield,
                title: "Trusted Quality",
                description: "Ethically sourced, sustainably made",
                delay: "0.2s"
              },
              {
                icon: Star,
                title: "Artisan Crafted",
                description: "Supporting independent makers worldwide",
                delay: "0.4s"
              },
              {
                icon: Headphones,
                title: "Personal Touch",
                description: "Dedicated care team, always here",
                delay: "0.6s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up hover-lift"
                style={{animationDelay: feature.delay}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-blush rounded-2xl mb-6 shadow-warm group-hover:shadow-botanical transition-warm relative botanical-decoration">
                  <feature.icon className="h-8 w-8 text-sage-dark group-hover:scale-110 transition-warm" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-sage-dark">{feature.title}</h3>
                <p className="text-warm-brown leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-24 bg-cream relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-soft-blush-light to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-px bg-sage"></div>
                <Leaf className="h-6 w-6 text-sage animate-gentle-sway" />
                <div className="w-12 h-px bg-sage"></div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-semibold text-sage-dark mb-6">
              Curated with Love
            </h2>
            <p className="text-xl text-warm-brown max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked selection of beautiful, sustainable pieces 
              that bring warmth and character to your everyday moments.
            </p>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-earth-gradient relative overflow-hidden">
        <div className="absolute inset-0 botanical-pattern"></div>
        <div className="absolute top-10 right-10 text-8xl opacity-10 animate-float">🌸</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-15 animate-gentle-sway">🌿</div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-sage-dark mb-4">
              Stay Connected
            </h3>
            <p className="text-lg text-warm-brown mb-8 max-w-2xl mx-auto">
              Join our community for seasonal inspiration, mindful living tips, and early access to new collections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-full border border-sage/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-warm"
              />
              <Button className="bg-sage hover:bg-sage-dark text-white px-8 py-3 rounded-full hover-bloom transition-warm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}