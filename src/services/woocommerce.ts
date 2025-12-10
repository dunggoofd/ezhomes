// WooCommerce API Service
const WC_API_URL = 'https://wp.ezhomes.co/wp-json/wc/v3';
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Helper function to add auth params to URL
function addAuthParams(url: string): string {
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

// Create order with authentication
export async function createOrder(orderData: WCOrderData): Promise<WCOrder | null> {
  try {
    const authenticatedUrl = addAuthParams(`${WC_API_URL}/orders`);
    
    console.log('Creating order with data:', orderData);
    console.log('API URL:', authenticatedUrl.replace(/consumer_(key|secret)=[^&]+/g, 'consumer_$1=***'));
    
    const response = await fetch(authenticatedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

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
