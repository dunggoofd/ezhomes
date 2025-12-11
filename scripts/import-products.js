// Script to import products from products.ts to WooCommerce
import https from 'https';

const WC_API_URL = 'https://wp.ezhomes.co/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_9c9fb9c1a37d7613ef7585fc978dbbe1f85bc49f';
const CONSUMER_SECRET = 'cs_47c29e8f1e3c9ed90543aae77a3b977ac546cc04';

// Products data from products.ts
const products = [
  {
    id: "1",
    title: "Corduroy & Flannel Sofa Cream",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort, designed to elevate any space with ease. Built for flexibility, comfort, and style that fits effortlessly into any room or moment. Our modular sofa can split and transform in numerous ways to suit your needs.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.49_56cd566d.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.50_ddfab61a.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.51_0d155823.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.51_b7784514.jpg",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "2",
    title: "Corduroy & Flannel Sofa Space Grey",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort, designed to elevate any space with ease. Built for flexibility, comfort, and style that fits effortlessly into any room or moment.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/Grey-1-1-e1760623498860.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/Greyyy.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/greyyyyy.jpg",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "3",
    title: "Corduroy & Flannel Sofa Ocean Blue",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort, designed to elevate any space with ease. Built for flexibility, comfort, and style.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/Navy-blue-3-e1760622950677.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/Navy-4-1.jpg",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "4",
    title: "Compression Bed Beige",
    description: "Our premium compression bed delivers exceptional comfort and convenience. Ships in a compact box and expands to full size. Features high-density foam and durable frame.",
    price: 799,
    compareAtPrice: 999,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/1-min.png",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/2-min.png",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/3-min.png",
    ],
    category: "Compression Bed",
  },
  {
    id: "5",
    title: "Corduroy & Flannel Sofa Terracotta Brown",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort. The warm terracotta brown color adds a cozy touch to any living space.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/tb5-e1760623051764.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/Terracotta-Brown-2.jpg",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "6",
    title: "Corduroy & Flannel Sofa Sage Green",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort. The calming sage green brings nature indoors.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/SG3-1-e1760622441290.png",
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/SG1.png",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "7",
    title: "Corduroy & Flannel Sofa Maroon Red",
    description: "Maroon red variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/Maroon-2.png",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "8",
    title: "Corduroy & Flannel Sofa Light Pink",
    description: "Light pink variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/Pink-1.jpg",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "9",
    title: "Corduroy & Flannel Sofa Light Green",
    description: "Light green variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/10/Green-2.png",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "10",
    title: "Corduroy & Flannel Sofa Matcha Green",
    description: "Matcha green variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/Matcha-Green-3.jpg",
    ],
    category: "Corduroy & Flannel Compression Sofa",
  },
  {
    id: "11",
    title: "Compression Bed Grey",
    description: "Grey variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/1-min-1.png",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/2-min-1.png",
    ],
    category: "Compression Bed",
  },
  {
    id: "12",
    title: "Compression Bed Slate",
    description: "Slate variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/1.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/2.jpg",
    ],
    category: "Compression Bed",
  },
  {
    id: "13",
    title: "Compression Bed Cream",
    description: "Cream variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/1-1.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/2-1.jpg",
    ],
    category: "Compression Bed",
  },
  {
    id: "14",
    title: "Compression Bed Navy",
    description: "Navy variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/1-2.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/2-2.jpg",
    ],
    category: "Compression Bed",
  },
  {
    id: "15",
    title: "Single Compression Bed Terracotta Brown",
    description: "Single compression bed in terracotta brown.",
    price: 699,
    compareAtPrice: 0,
    images: [
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/1-3.jpg",
      "https://wp.ezhomes.co/wp-content/uploads/2025/09/2-3.jpg",
    ],
    category: "Compression Bed",
  },
];

// Function to make API request
function apiRequest(endpoint, method, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${WC_API_URL}${endpoint}`);
    url.searchParams.append('consumer_key', CONSUMER_KEY);
    url.searchParams.append('consumer_secret', CONSUMER_SECRET);

    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(url.toString(), options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`API Error (${res.statusCode}): ${JSON.stringify(response)}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Function to create a product
async function createProduct(product) {
  console.log(`Creating product: ${product.title}...`);
  
  const productData = {
    name: product.title,
    type: 'simple',
    regular_price: product.compareAtPrice ? product.compareAtPrice.toString() : product.price.toString(),
    sale_price: product.compareAtPrice ? product.price.toString() : '',
    description: product.description,
    short_description: product.description.substring(0, 120) + '...',
    categories: [{ name: product.category }],
    images: product.images.map(url => ({ src: url })),
    manage_stock: false,
    status: 'publish',
  };

  try {
    const result = await apiRequest('/products', 'POST', productData);
    console.log(`✓ Created: ${product.title} (ID: ${result.id})`);
    return result;
  } catch (error) {
    console.error(`✗ Failed to create ${product.title}:`, error.message);
    return null;
  }
}

// Main function to import all products
async function importAllProducts() {
  console.log('Starting product import to WooCommerce...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    const result = await createProduct(product);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
    // Wait 1 second between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=================================');
  console.log(`Import Complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log('=================================');
}

// Run the import
importAllProducts();
