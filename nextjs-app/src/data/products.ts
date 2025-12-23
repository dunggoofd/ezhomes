// Product data for ezhomes store
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  variants: {
    color: string;
    colorCode: string;
    size?: string;
  }[];
  badges?: string[];
  category?: string;
  externalUrl?: string;
  externalImage?: string;
  colorVariants?: {
    color: string;
    colorCode: string;
    productId: string;
  }[];
  dimensions?: {
    threeSeater: string;
    externalUrl?: string;
    fourSeater: string;
    seatedThreeSeater: string;
    seatedFourSeater: string;
  };
  weight?: string;
  material?: string[];
  whatsIncluded?: string[];
}

export const products: Product[] = [];

// Utility functions
export const formatPrice = (amount: number, currencyCode: string = 'AUD'): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const calculateDiscount = (price: number, compareAtPrice: number): number => {
  if (compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
};
