// Fetch WooCommerce product by slug
export async function fetchProductBySlug(slug: string): Promise<WCProduct | null> {
  try {
    let response;
    if (isDevelopment) {
      // Direct API call in development
      const url = addAuthParams(`${WC_API_URL}/products?slug=${slug}`);
      response = await fetch(url);
    } else {
      // Use proxy in production
      response = await fetch(API_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: `/products?slug=${slug}`,
          method: 'GET',
        }),
      });
    }
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}
// WooCommerce API Service
// Using serverless function proxy to keep API keys secure
const API_PROXY = '/api/woocommerce';
// Using HTTP temporarily due to SSL certificate issues on subdomain
const WC_API_URL = 'http://wp.ezhomes.co/wp-json/wc/v3';

// Development fallback - only use direct API in development
const isDevelopment = process.env.NODE_ENV === 'development';
const WC_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || '';

// Helper for dev mode direct API calls
function addAuthParams(url: string): string {
  if (!isDevelopment) return url;
  const urlObj = new URL(url);
  urlObj.searchParams.append('consumer_key', WC_CONSUMER_KEY);
  urlObj.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);
  return urlObj.toString();
}

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
    let response;
    
    if (isDevelopment) {
      // Direct API call in development
      console.log('Fetching products (dev mode)');
      response = await fetch(addAuthParams(`${WC_API_URL}/products?per_page=100`));
    } else {
      // Use proxy in production
      console.log('Fetching products via proxy');
      response = await fetch(API_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: '/products?per_page=100',
          method: 'GET',
        }),
      });
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Product fetch failed:', response.status, errorText);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${data.length} products`);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<WCProduct | null> {
  try {
    console.log(`[WC Service] Fetching product ${id}, isDevelopment:`, isDevelopment);
    let response;
    
    if (isDevelopment) {
      // Direct API call in development
      const url = addAuthParams(`${WC_API_URL}/products/${id}`);
      console.log('[WC Service] Dev mode - Direct API call');
      response = await fetch(url);
    } else {
      // Use proxy in production
      console.log('[WC Service] Production mode - Using proxy');
      response = await fetch(API_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: `/products/${id}`,
          method: 'GET',
        }),
      });
    }
    
    console.log('[WC Service] Response status:', response.status, response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[WC Service] Failed to fetch product:', response.status, errorText);
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('[WC Service] Product fetched successfully:', data.name);
    return data;
  } catch (error) {
    console.error('[WC Service] Error fetching product:', error);
    return null;
  }
}

// Order creation interfaces
export interface WCOrderLineItem {
  product_id: number;
  quantity: number;
  variant_id?: number;
}

export interface WCOrderBilling {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface WCOrderShipping {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface WCOrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: WCOrderBilling;
  shipping: WCOrderShipping;
  line_items: WCOrderLineItem[];
  shipping_lines?: Array<{
    method_id: string;
    method_title: string;
    total: string;
  }>;
  customer_note?: string;
}

export interface WCOrder {
  id: number;
  order_key: string;
  status: string;
  total: string;
  date_created: string;
}

// Create order with authentication (via secure proxy)
export async function createOrder(orderData: WCOrderData): Promise<WCOrder | null> {
  try {
    console.log(isDevelopment ? 'Creating order (dev mode)' : 'Creating order via secure proxy');
    
    let response;
    
    if (isDevelopment) {
      // Direct API call in development
      response = await fetch(addAuthParams(`${WC_API_URL}/orders`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } else {
      // Use proxy in production
      response = await fetch(API_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: '/orders',
          method: 'POST',
          body: orderData,
        }),
      });
    }

    if (!response.ok) {
      const error = await response.json();
      console.error('Order creation failed:', {
        status: response.status,
        statusText: response.statusText,
        error: error
      });
      throw new Error(error.message || `Failed to create order: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
