import type { WCProduct } from '@/services/woocommerce';
import type { Product } from '@/data/products';

/**
 * Transform WooCommerce product to our app's product format
 */
export function transformWCProduct(wcProduct: WCProduct): Product {
  // Use HTTPS for WooCommerce images
  const fixImageUrl = (url: string) => {
    if (!url) return '';
    // Force HTTPS if the URL is HTTP
    return url.replace(/^http:/, 'https:');
  };
  
  // Assign consistent ratings based on product type
  const getProductRating = () => {
    const productName = wcProduct.name.toLowerCase();
    if (productName.includes('compression bed')) {
      return { rating: 4.8, reviewCount: 156 };
    } else if (productName.includes('corduroy') || productName.includes('flannel') || productName.includes('sofa')) {
      return { rating: 4.6, reviewCount: 203 };
    }
    return { rating: 4.5, reviewCount: 100 };
  };
  
  const { rating, reviewCount } = getProductRating();
  
  return {
    id: wcProduct.id.toString(),
    slug: wcProduct.slug || wcProduct.id.toString(),
    title: wcProduct.name,
    description: wcProduct.short_description || wcProduct.description,
    price: parseFloat(wcProduct.price) || 0,
    compareAtPrice: wcProduct.sale_price ? parseFloat(wcProduct.regular_price) : undefined,
    images: (() => {
      const imgArr = (wcProduct.images && wcProduct.images.length > 0)
        ? wcProduct.images.map(img => fixImageUrl(img.src))
        : ["https://placehold.co/600x800?text=No+Image"];
      // Always include externalImage as the first image if not already present
      const extImg = fixImageUrl(wcProduct.images?.[0]?.src || "");
      if (extImg && imgArr[0] !== extImg) {
        return [extImg, ...imgArr];
      }
      return imgArr;
    })(),
    rating,
    reviewCount,
    variants: extractVariants(wcProduct),
    badges: extractBadges(wcProduct),
    category: wcProduct.categories[0]?.name || 'Uncategorized',
    externalUrl: `https://ezhomes.co/product/${wcProduct.id}`,
    externalImage: fixImageUrl(wcProduct.images[0]?.src || ''),
    // Don't include colorVariants for WooCommerce products to avoid linking issues
    colorVariants: undefined,
  };
}

function extractVariants(wcProduct: WCProduct) {
  // Find color and size attributes
  const colorAttr = wcProduct.attributes.find(attr => 
    attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour')
  );
  
  const sizeAttr = wcProduct.attributes.find(attr => 
    attr.name.toLowerCase().includes('size')
  );

  const variants: Array<{ color: string; colorCode: string; size?: string }> = [];

  if (colorAttr && sizeAttr) {
    // Create variants for all color/size combinations
    colorAttr.options.forEach(color => {
      sizeAttr.options.forEach(size => {
        variants.push({
          color,
          colorCode: getColorCode(color),
          size,
        });
      });
    });
  } else if (colorAttr) {
    // Only colors
    colorAttr.options.forEach(color => {
      variants.push({
        color,
        colorCode: getColorCode(color),
      });
    });
  }

  return variants.length > 0 ? variants : [{ color: 'Default', colorCode: '#808080' }];
}

function extractBadges(wcProduct: WCProduct): string[] {
  const badges: string[] = [];
  
  if (wcProduct.sale_price) {
    badges.push('Sale');
  }
  
  // Check if product is new (you can add custom logic here)
  if (wcProduct.rating_count > 100) {
    badges.push('Best Seller');
  }
  
  return badges;
}

function getColorCode(colorName: string): string {
  const colors: Record<string, string> = {
    'cream': '#F5F5DC',
    'grey': '#808080',
    'gray': '#808080',
    'space grey': '#4A4A4A',
    'blue': '#0066cc',
    'ocean blue': '#1E5F8A',
    'navy': '#1e3a5f',
    'terracotta': '#E2725B',
    'terracotta brown': '#A0522D',
    'brown': '#8B4513',
    'maroon': '#800020',
    'maroon red': '#7B1F1F',
    'pink': '#FFC0CB',
    'light pink': '#F4C2C2',
    'green': '#228B22',
    'sage green': '#9CAF88',
    'light green': '#8FBF7F',
    'matcha green': '#7BB07B',
    'beige': '#F5F5DC',
    'slate': '#708090',
  };

  const key = colorName.toLowerCase();
  return colors[key] || '#808080';
}
