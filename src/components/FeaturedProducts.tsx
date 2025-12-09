import { ProductCard } from './ProductCard';
import { products } from '@/data/products';

export const FeaturedProducts = () => {
  const featured = products.slice(0, 4);

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-2">Featured</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Customer Favorites</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
