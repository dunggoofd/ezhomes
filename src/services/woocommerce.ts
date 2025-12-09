// WooCommerce API Service
const WC_API_URL = 'https://ezhomes.co/wp-json/wc/v3';

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  average_rating: string;
  rating_count: number;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  variations: number[];
}

export async function fetchProducts(): Promise<WCProduct[]> {
  try {
    const response = await fetch(`${WC_API_URL}/products?per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<WCProduct | null> {
  try {
    const response = await fetch(`${WC_API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
