import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ChevronLeft, ZoomIn, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { ProductSpecsAccordion } from "@/components/ProductSpecsAccordion";
import { ProductReviews } from "@/components/ProductReviews";
import { products, formatPrice, calculateDiscount } from "@/data/products";
import type { Product } from "@/data/products";
import { fetchProduct } from "@/services/woocommerce";
import { transformWCProduct } from "@/utils/productTransformer";
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});
  const [isImageSticky, setIsImageSticky] = useState(true);

  // Fetch product from WooCommerce
  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      
      try {
        setLoading(true);
        const wcProduct = await fetchProduct(parseInt(id));
        
        if (wcProduct) {
          const transformedProduct = transformWCProduct(wcProduct);
          setProduct(transformedProduct);
        } else {
          // Fallback to hardcoded products
          const fallbackProduct = products.find(p => p.id === id) || products[0];
          setProduct(fallbackProduct);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        // Fallback to hardcoded products
        const fallbackProduct = products.find(p => p.id === id) || products[0];
        setProduct(fallbackProduct);
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Prefer externalImage when available, fall back to local images
  const primaryImage = product.externalImage ?? product.images[0] ?? 'https://placehold.co/600x800?text=No+Image';
  // Use full product.images array as gallery (which now contains external images)
  const galleryImages = product.images.length > 0 ? product.images : [primaryImage];

  // Size selector
  const sizes = product.variants ? [...new Set(product.variants.map(v => v.size).filter(Boolean))] : [];
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "180cm");

  // Addons data
  const addons = [
    {
      id: "addon-1",
      title: "Matching Cushion Set",
      image: primaryImage,
      price: 149,
      compareAtPrice: 199,
    },
    {
      id: "addon-2", 
      title: "Fabric Protection Spray",
      image: galleryImages[1] || galleryImages[0],
      price: 49,
      compareAtPrice: 69,
    },
  ];

  // What's included - use product data if available
  const includedItems = product.whatsIncluded?.map((item, idx) => ({
    title: item,
    image: galleryImages[idx % galleryImages.length],
    price: idx === 0 ? product.price : 0,
    compareAtPrice: idx === 0 ? product.compareAtPrice : 49,
  })) || [
    {
      title: product.title,
      image: galleryImages[0],
      price: product.price,
      compareAtPrice: product.compareAtPrice,
    },
  ];

  const discount = product.compareAtPrice ? calculateDiscount(product.price, product.compareAtPrice) : 0;

  const handleAddonQuantity = (addonId: string, delta: number) => {
    setAddonQuantities(prev => ({
      ...prev,
      [addonId]: Math.max(0, (prev[addonId] || 0) + delta),
    }));
  };

  const { addToCart } = useCart();

  // Add scroll listener to detect when to release sticky image
  useEffect(() => {
    const handleScroll = () => {
      // Get the add-to-cart button position
      const addToCartSection = document.getElementById('add-to-cart-section');
      if (addToCartSection) {
        const rect = addToCartSection.getBoundingClientRect();
        // If add-to-cart section is visible (not below viewport), release sticky
        setIsImageSticky(rect.top > window.innerHeight / 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Original addToCart
  // const { addToCart } = useCart();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-3 md:py-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] -ml-2 px-2 active:scale-95">
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <main className="container mx-auto px-6 sm:px-8 lg:px-12 pb-16">
        <div className="grid gap-6 md:gap-8 lg:gap-12 lg:grid-cols-[3fr_1fr] items-start lg:items-stretch">
          {/* Left: Image Gallery (larger) */}
          <div className={`flex flex-col md:flex-row gap-3 md:gap-4 ${
            isImageSticky ? 'lg:sticky lg:top-20 lg:max-h-screen' : ''
          }`}>
            {/* Thumbnails - horizontal on mobile, vertical on desktop */}
              <div className="flex md:flex-col gap-2 md:gap-3 md:w-20 shrink-0 overflow-x-auto md:overflow-y-auto md:max-h-[70vh] pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 active:scale-95 ${
                      selectedImage === idx 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-muted-foreground"
                    }`}
                    style={{ width: 64, height: 64, minWidth: 64 }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 3 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                {discount > 0 && (
                  <span className="absolute top-3 md:top-4 left-3 md:left-4 z-10 bg-primary text-primary-foreground text-xs md:text-sm font-semibold px-2.5 md:px-3 py-1 md:py-1.5 rounded-full">
                    {discount}% OFF
                  </span>
                )}
                <img
                  src={galleryImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] object-cover"
                  style={{ display: 'block' }}
                />
                <button className="absolute bottom-3 md:bottom-4 right-3 md:right-4 p-2.5 md:p-3 bg-background/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-background transition-colors active:scale-95">
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
          </div>

            {/* Right: Product Info (narrower/tighter) */}
            <div className="space-y-5 md:space-y-6 w-full lg:max-w-[420px] lg:pl-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 md:w-5 h-4 md:h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm md:text-base text-muted-foreground">
                  {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Color Selector */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                  COLOR <span className="text-foreground font-medium">{product.colorVariants.find(v => v.productId === product.id)?.color || product.variants[0].color}</span>
                </p>
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  {product.colorVariants.map((variant) => (
                    <Tooltip key={variant.productId}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            if (variant.productId !== product.id) {
                              navigate(`/product/${variant.productId}`);
                            }
                          }}
                          className={`w-14 md:w-16 h-10 md:h-12 rounded-lg border-2 transition-all active:scale-95 ${
                            variant.productId === product.id
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-muted-foreground cursor-pointer"
                          }`}
                          style={{ backgroundColor: variant.colorCode }}
                          aria-label={variant.color}
                          title={variant.color}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-center">
                        <div className="font-semibold text-sm">{variant.color}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {product.material && product.material.length > 0
                            ? product.material.join(' • ')
                            : 'Premium Fabric'}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatPrice(products.find(p => p.id === variant.productId)?.price || product.price)}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Size: <span className="text-foreground font-medium">{selectedSize}</span>
                </p>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size!)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Finish Selector */}

            {/* Stock Status */}
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
              <span className="font-medium">Almost sold out</span>
              <span className="text-destructive/60">|</span>
              <span>Ready to Ship</span>
            </div>

            {/* What's Included */}
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">WHAT'S INCLUDED</h3>
              <div className="space-y-4">
                {includedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                    </div>
                    <div className="text-right">
                      {item.compareAtPrice && item.compareAtPrice > item.price && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.compareAtPrice)}
                        </p>
                      )}
                      <p className="font-semibold text-primary">
                        {item.price === 0 ? "FREE" : formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addons */}
            <div className="border-t border-border pt-6">
              <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">ADDONS:</h3>
                <span className="text-sm font-semibold text-primary">SAVE UP TO 35% OFF ADD-ONS</span>
              </div>
              <div className="space-y-4">
                {addons.map((addon) => (
                  <div key={addon.id} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img src={addon.image} alt={addon.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground whitespace-normal break-words">{addon.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(addon.compareAtPrice)}
                        </span>
                        <span className="font-semibold text-primary">
                          {formatPrice(addon.price)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border border-border rounded-lg">
                      <button 
                        onClick={() => handleAddonQuantity(addon.id, -1)}
                        className="px-3 py-2 hover:bg-muted transition-colors rounded-l-lg"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">
                        {addonQuantities[addon.id] || 0}
                      </span>
                      <button 
                        onClick={() => handleAddonQuantity(addon.id, 1)}
                        className="px-3 py-2 hover:bg-muted transition-colors rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div id="add-to-cart-section" className="border-t border-border pt-6 space-y-4">
              <div className="flex items-baseline gap-3">
                {product.compareAtPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {discount > 0 && (
                  <span className="text-sm font-medium text-primary">
                    Save {formatPrice(product.compareAtPrice! - product.price)}
                  </span>
                )}
              </div>
              
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold"
                onClick={() => {
                  // add base product
                  addToCart(product, { quantity: 1, variant: product.variants[selectedVariant]?.color, size: selectedSize, imageIndex: selectedImage });

                  // add selected addons
                  Object.entries(addonQuantities).forEach(([addonId, qty]) => {
                    if (qty > 0) {
                      // create a lightweight product-like object for addons
                      const addonProduct = {
                        id: `${product.id}-${addonId}`,
                        title: `${product.title} — ${addonId}`,
                        price: 0,
                        images: [primaryImage],
                      } as any;
                      for (let i = 0; i < qty; i++) {
                        addToCart(addonProduct, { quantity: 1, imageIndex: 0 });
                      }
                    }
                  });
                }}
              >
                Add to Cart
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                or 4 interest-free payments of {formatPrice(product.price / 4)} with Afterpay
              </p>
            </div>
          </div>
        </div>

        {/* Product Specs Accordion */}
        <ProductSpecsAccordion product={product} />

        {/* Reviews Section */}
        <ProductReviews />
      </main>
    </Layout>
  );
};

export default ProductDetail;
