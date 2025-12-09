import { useState } from 'react';
import Layout from '@/components/Layout';
import VirtualTourSection from '@/components/VirtualTourSection';
import { ShopProductCard } from '@/components/ShopProductCard';
import { products } from '@/data/products';

const categories = [
  { id: 'sofas', label: 'Sofas' },
  { id: 'compression-bed', label: 'Compression Bed' },
  { id: 'all', label: 'All Products' },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground border border-border hover:border-primary/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(() => {
              const normalized = (s?: string) => (s || '').toLowerCase();
              let filtered = products;
              if (activeCategory === 'sofas') {
                filtered = products.filter(p => normalized(p.category).includes('sofa'));
              } else if (activeCategory === 'compression-bed') {
                filtered = products.filter(p => normalized(p.category).includes('compression bed'));
              }
              return filtered.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ));
            })()}
          </div>
          </div>

          {/* Virtual Tour Section moved below products */}
          <VirtualTourSection />
      </main>
    </Layout>
  );
}
