import { Link } from "react-router-dom";
import { Star } from 'lucide-react';
import { Product, formatPrice, products } from '@/data/products';
import { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ShopProductCardProps {
  product: Product;
}

export const ShopProductCard = ({ product }: ShopProductCardProps) => {
  const discount = product.compareAtPrice 
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;
  
  const monthlyPayment = (product.price / 36).toFixed(2);
  const [hoverIndex, setHoverIndex] = useState(0);
  const cycleRef = useRef<number | null>(null);
  const [previewColorId, setPreviewColorId] = useState<string | null>(null);

  // Get the product to display (preview or original)
  const displayProduct = previewColorId 
    ? products.find(p => p.id === previewColorId) || product
    : product;

  // Use all available images
  const images = displayProduct.images.length > 0 ? displayProduct.images : [displayProduct.externalImage || ''];

  useEffect(() => {
    return () => {
      if (cycleRef.current) window.clearInterval(cycleRef.current);
    };
  }, []);

  return (
    <Link 
      to={`/product/${displayProduct.slug}`}
      className="group cursor-pointer bg-card rounded-lg overflow-hidden border border-border hover:shadow-[var(--shadow-medium)] transition-all duration-300 block"
    >
      {/* Image Container */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-muted"
        onMouseEnter={() => {
          if (images.length > 1) {
            setHoverIndex(1);
          }
        }}
        onMouseLeave={() => {
          setHoverIndex(0);
        }}
      >
        <img
          src={images[hoverIndex]}
          alt={displayProduct.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Promo Badges - Top Left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Sale Badge */}
          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded">
            Summer Sale
          </span>
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Shop Now Button - Shows on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="block w-full bg-primary text-primary-foreground py-3 font-semibold text-center hover:bg-primary/90 transition-colors rounded">
            Shop Now
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5">
        {/* Color Swatches - Only show if product has color variants (related products) */}
        {product.colorVariants && product.colorVariants.length > 1 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colorVariants.slice(0, 6).map((variant, index) => (
                <div key={index} className="relative group/swatch">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const variantProduct = products.find(p => p.id === variant.productId);
                          if (variantProduct) setPreviewColorId(variantProduct.slug);
                        }}
                        className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer block ${
                          (() => {
                            const variantProduct = products.find(p => p.id === variant.productId);
                            return variantProduct && previewColorId === variantProduct.slug;
                          })()
                            ? 'border-primary ring-2 ring-primary' 
                            : 'border-transparent ring-1 ring-border hover:ring-2 hover:ring-primary'
                        }`}
                        style={{ backgroundColor: variant.colorCode }}
                        title={variant.color}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-center">
                      <div className="font-semibold text-sm">{variant.color}</div>
                      {product.material && product.material.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-1 max-w-xs">
                          {product.material.join(' • ')}
                        </div>
                      )}
                      <div className="text-xs font-semibold text-accent mt-2">Click to preview</div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Title & Price Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {product.title}
          </h3>
          <div className="text-right shrink-0">
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through block">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-destructive block">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Rating & Monthly Payment Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-accent fill-accent' 
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {product.reviewCount.toLocaleString()} reviews
            </span>
          </div>
          
          {/* Monthly Payment */}
          <span className="text-xs text-muted-foreground">
            ${monthlyPayment} /mo
          </span>
        </div>
      </div>
    </Link>
  );
};
