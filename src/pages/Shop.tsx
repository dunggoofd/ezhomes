import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import VirtualTourSection from '@/components/VirtualTourSection';
import { ShopProductCard } from '@/components/ShopProductCard';
import { fetchProducts } from '@/services/woocommerce';
import { transformWCProduct } from '@/utils/productTransformer';
import { products as fallbackProducts } from '@/data/products';
import type { Product } from '@/data/products';

const categories = [
  { id: 'sofas', label: 'Sofas' },
  { id: 'compression-bed', label: 'Compression Bed' },
  { id: 'all', label: 'All Products' },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('sofas');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const wcProducts = await fetchProducts();
        
        // Use WooCommerce products if available, otherwise use fallback
        if (wcProducts && wcProducts.length > 0) {
          const transformedProducts = wcProducts.map(transformWCProduct);
          setProducts(transformedProducts);
        } else {
          console.log('No WooCommerce products found, using fallback products');
          setProducts(fallbackProducts);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to load products:', err);
        console.log('Using fallback products due to error');
        setProducts(fallbackProducts);
        setError(null); // Don't show error, just use fallback
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  return (
    <Layout>
      {/* Promo Banner */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground text-sm md:text-base">
            Enjoy <span className="font-bold">35% OFF</span> for a limited time — 
            <span className="text-accent font-bold"> Order now</span> for delivery before Christmas!
          </p>
        </div>
      </div>


      <main className="flex-1 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6 md:py-8 lg:py-12">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] active:scale-95 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background text-foreground border-2 border-border hover:border-primary/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {loading ? (
              // Loading state
              <div className="col-span-full text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading products...</p>
              </div>
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              // Products
              (() => {
                const normalized = (s?: string) => (s || '').toLowerCase();
                let filtered = products;
                if (activeCategory === 'sofas') {
                  filtered = products.filter(p => normalized(p.category).includes('sofa'));
                } else if (activeCategory === 'compression-bed') {
                  filtered = products.filter(p => normalized(p.category).includes('compression bed'));
                }
                
                if (filtered.length === 0) {
                  return (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No products found in this category.</p>
                    </div>
                  );
                }
                
                return filtered.map((product) => (
                  <ShopProductCard key={product.slug} product={product} />
                ));
              })()
            )}
          </div>
          </div>

          {/* Virtual Tour Section moved below products */}
          <VirtualTourSection />
      </main>
    </Layout>
  );
}
