import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { fetchProducts } from '@/services/woocommerce';
import { transformWCProduct } from '@/utils/productTransformer';
import type { Product } from '@/data/products';

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const wcProducts = await fetchProducts();
        const transformedProducts = wcProducts.map(transformWCProduct);
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  return (
    <section id="products" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
              Our Collection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Space-Saving Furniture
            </h2>
          </div>
          <a 
            href="/shop" 
            className="mt-6 md:mt-0 inline-flex items-center text-primary font-semibold hover:text-accent transition-colors group"
          >
            View All Products 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))
          ) : (
            products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a href="/shop" className="btn-primary px-10 py-4 text-base">
              Shop All Furniture
            </a>
            <a href="/how-it-works" className="btn-ghost px-10 py-4 text-base">
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
