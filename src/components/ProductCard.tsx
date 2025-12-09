import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useEffect, useRef, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [hoverIndex, setHoverIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(product.id);
  const cycleRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (cycleRef.current) window.clearInterval(cycleRef.current);
    };
  }, []);
  const discount = product.compareAtPrice 
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  // Use all available images
  const images = product.images.length > 0 ? product.images : [product.externalImage || ''];

  return (
    <div className="group cursor-pointer block active:scale-[0.98] transition-transform">{/* Removed Link wrapper */}
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] md:aspect-[4/5] bg-muted mb-4 md:mb-6 overflow-hidden rounded-lg md:rounded-none"
        onMouseEnter={() => {
          if (images.length > 1) {
            setHoverIndex(1);
          }
        }}
        onMouseLeave={() => {
          setHoverIndex(0);
        }}
      >
        {/* Image with zoom effect */}
        <img
          src={images[hoverIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1.5 md:gap-2 z-10">
            {product.badges.map((badge, index) => (
              <span 
                key={index}
                className={`px-2.5 md:px-3 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wide ${
                  badge === 'Best Seller' 
                    ? 'bg-accent text-accent-foreground' 
                    : badge === 'New'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-destructive text-destructive-foreground'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-destructive text-destructive-foreground px-2.5 md:px-3 py-1 text-[10px] md:text-xs font-bold z-10">
            -{discount}%
          </div>
        )}

        {/* Shop Now Button - Shows on hover */}
        <Link to={`/product/${selectedVariantId}`} className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="block w-full bg-primary text-primary-foreground py-3 font-semibold text-center hover:bg-primary/90 transition-colors rounded">
            Shop Now
          </span>
        </Link>
      </div>

      {/* Product Info */}
      <div>
        {/* Color Swatches - only show if product has multiple color variants */}
        {product.colorVariants && product.colorVariants.length > 1 && (
          <div className="flex items-center gap-2 mb-3">
            {product.colorVariants.slice(0, 6).map((variant, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariantId(variant.productId);
                }}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedVariantId === variant.productId 
                    ? 'border-primary ring-2 ring-primary/30' 
                    : 'border-transparent hover:border-primary'
                }`}
                style={{ backgroundColor: variant.colorCode }}
                title={variant.color}
              />
            ))}
            {product.colorVariants.length > 6 && (
              <span className="text-xs text-muted-foreground">+{product.colorVariants.length - 6}</span>
            )}
          </div>
        )}

        {/* Title */}
        <Link to={`/product/${selectedVariantId}`}>
          <h3 className="text-base md:text-lg font-semibold text-primary mb-1.5 md:mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 md:h-3.5 w-3 md:w-3.5 ${
                  i < Math.floor(product.rating) 
                    ? 'text-accent fill-accent' 
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price with Anchoring */}
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            {product.compareAtPrice && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                RRP ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs md:text-sm font-semibold text-destructive">
                Save ${(product.compareAtPrice! - product.price).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">
              or ${Math.round(product.price / 4).toLocaleString()}/wk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
