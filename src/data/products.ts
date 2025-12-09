// Product data for ezhomes store
import sofaCream1 from "@/assets/products/sofa-cream-1.jpg";
import sofaCream2 from "@/assets/products/sofa-cream-2.jpg";
import sofaCream3 from "@/assets/products/sofa-cream-3.jpg";
import sofaCream4 from "@/assets/products/sofa-cream-4.jpg";

export interface Product {
  id: string;
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

export const products: Product[] = [
  {
    id: "1",
    title: "Corduroy & Flannel Sofa Cream",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort, designed to elevate any space with ease. Built for flexibility, comfort, and style that fits effortlessly into any room or moment. Our modular sofa can split and transform in numerous ways to suit your needs.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.49_56cd566d.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.50_ddfab61a.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.51_0d155823.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.51_b7784514.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/sofa1.0.webp",
      "https://ezhomes.co/wp-content/uploads/2025/09/sofa2.0.webp",
      "https://ezhomes.co/wp-content/uploads/2025/09/微信图片_20250905151436.webp",
      "https://ezhomes.co/wp-content/uploads/2025/09/微信图片_20250905151454.webp",
      "https://ezhomes.co/wp-content/uploads/2025/09/微信图片_20250905151457.webp",
    ],
    rating: 4.8,
    reviewCount: 156,
    variants: [
      { color: "Cream", colorCode: "#F5F5DC", size: "180cm" },
      { color: "Cream", colorCode: "#F5F5DC", size: "200cm" },
    ],
    badges: ["Best Seller"],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", productId: "3" },
      { color: "Terracotta Brown", colorCode: "#A0522D", productId: "5" },
      { color: "Maroon Red", colorCode: "#7B1F1F", productId: "7" },
      { color: "Light Pink", colorCode: "#F4C2C2", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-cream/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-21.20.50_ddfab61a.jpg",
  },
  {
    id: "2",
    title: "Corduroy & Flannel Sofa Space Grey",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort, designed to elevate any space with ease. Built for flexibility, comfort, and style that fits effortlessly into any room or moment.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/10/Grey-1-1-e1760623498860.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/Greyyy.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/greyyyyy.jpg",
    ],
    rating: 4.9,
    reviewCount: 203,
    variants: [
      { color: "Space Grey", colorCode: "#4A4A4A", size: "180cm" },
      { color: "Space Grey", colorCode: "#4A4A4A", size: "200cm" },
    ],
    badges: ["New"],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#4682B4", productId: "3" },
      { color: "Terracotta", colorCode: "#E07856", productId: "5" },
      { color: "Maroon", colorCode: "#800020", productId: "7" },
      { color: "Light Pink", colorCode: "#FFB6C1", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-space-grey/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/10/Grey-1-1-e1760623498860.jpg",
  },
  {
    id: "3",
    title: "Corduroy & Flannel Sofa Ocean Blue",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort, designed to elevate any space with ease. Built for flexibility, comfort, and style.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/10/Navy-blue-3-e1760622950677.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/Navy-4-1.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/navy5-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/10/Navy-Blue-.jpg",
    ],
    rating: 4.7,
    reviewCount: 89,
    variants: [
      { color: "Ocean Blue", colorCode: "#1E5F8A", size: "180cm" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", size: "200cm" },
    ],
    badges: [],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", productId: "3" },
      { color: "Terracotta Brown", colorCode: "#A0522D", productId: "5" },
      { color: "Maroon Red", colorCode: "#7B1F1F", productId: "7" },
      { color: "Light Pink", colorCode: "#F4C2C2", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-ocean-blue/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/10/Navy-blue-3-e1760622950677.jpg",
  },
  {
    id: "4",
    title: "Compression Bed Beige",
    description: "Our premium compression bed delivers exceptional comfort and convenience. Ships in a compact box and expands to full size. Features high-density foam and durable frame.",
    price: 799,
    compareAtPrice: 999,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/1-min.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/2-min.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/3-min.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/4-min.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/5-min.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/6-min.png",
    ],
    rating: 4.8,
    reviewCount: 312,
    variants: [
      { color: "Beige", colorCode: "#F5F5DC", size: "Queen" },
      { color: "Beige", colorCode: "#F5F5DC", size: "King" },
    ],
    badges: ["Best Seller"],
    category: "Compression Bed",
    dimensions: {
      threeSeater: "Queen: 1.6m x 2m",
      fourSeater: "King: 1.8m x 2m",
      seatedThreeSeater: "",
      seatedFourSeater: "",
    },
    weight: "38kg (Queen), 42kg (King)",
    material: ["Premium Fabric Upholstery", "High Density Memory Foam", "Solid Wood Frame"],
    whatsIncluded: [
      "1x Compression Bed Frame",
      "1x Headboard",
      "Assembly Hardware Kit",
    ],
    externalUrl: "https://ezhomes.co/shop/compression-bed/compression-bed-7-beige/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/7-min.png",
  },
  {
    id: "5",
    title: "Corduroy & Flannel Sofa Terracotta Brown",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort. The warm terracotta brown color adds a cozy touch to any living space.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/tb5-e1760623051764.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/Terracotta-Brown-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/tb3.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/tb4.jpg",
    ],
    rating: 4.9,
    reviewCount: 178,
    variants: [
      { color: "Terracotta Brown", colorCode: "#A0522D", size: "180cm" },
      { color: "Terracotta Brown", colorCode: "#A0522D", size: "200cm" },
    ],
    badges: ["New"],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", productId: "3" },
      { color: "Terracotta Brown", colorCode: "#A0522D", productId: "5" },
      { color: "Maroon Red", colorCode: "#7B1F1F", productId: "7" },
      { color: "Light Pink", colorCode: "#F4C2C2", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-terracotta-brown/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/tb5-e1760623051764.jpg",
  },
  {
    id: "6",
    title: "Corduroy & Flannel Sofa Sage Green",
    description: "Introducing our Corduroy & Flannel sofa – This sleek, ready-to-use sofa blends soft strength with adaptable comfort. The calming sage green brings nature indoors.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/10/SG3-1-e1760622441290.png",
      "https://ezhomes.co/wp-content/uploads/2025/10/SG1.png",
      "https://ezhomes.co/wp-content/uploads/2025/10/SG2.png",
      "https://ezhomes.co/wp-content/uploads/2025/10/SG4.png",
    ],
    rating: 4.8,
    reviewCount: 134,
    variants: [
      { color: "Sage Green", colorCode: "#9CAF88", size: "180cm" },
      { color: "Sage Green", colorCode: "#9CAF88", size: "200cm" },
    ],
    badges: ["New"],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", productId: "3" },
      { color: "Terracotta Brown", colorCode: "#A0522D", productId: "5" },
      { color: "Maroon Red", colorCode: "#7B1F1F", productId: "7" },
      { color: "Light Pink", colorCode: "#F4C2C2", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-sage-green/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/10/SG3-1-e1760622441290.png",
  },
  {
    id: "7",
    title: "Corduroy & Flannel Sofa Maroon Red",
    description: "Maroon red variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/Maroon-2.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/微信图片_20250905152358.webp",
      "https://ezhomes.co/wp-content/uploads/2025/09/微信图片_20250905152418.webp",
      "https://ezhomes.co/wp-content/uploads/2025/09/微信图片_20250905152424.webp",
    ],
    rating: 4.7,
    reviewCount: 12,
    variants: [
      { color: "Maroon Red", colorCode: "#7B1F1F", size: "180cm" },
      { color: "Maroon Red", colorCode: "#7B1F1F", size: "200cm" },
    ],
    badges: [],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", productId: "3" },
      { color: "Terracotta Brown", colorCode: "#A0522D", productId: "5" },
      { color: "Maroon Red", colorCode: "#7B1F1F", productId: "7" },
      { color: "Light Pink", colorCode: "#F4C2C2", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-maroon-red/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/m5-e1760623007718.jpg",
  },
  {
    id: "8",
    title: "Corduroy & Flannel Sofa Light Pink",
    description: "Light pink variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: ["https://ezhomes.co/wp-content/uploads/2025/09/Pink-1.jpg"],
    rating: 4.6,
    reviewCount: 8,
    variants: [
      { color: "Light Pink", colorCode: "#F4C2C2", size: "180cm" },
      { color: "Light Pink", colorCode: "#F4C2C2", size: "200cm" },
    ],
    badges: [],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Cream", colorCode: "#F5F5DC", productId: "1" },
      { color: "Space Grey", colorCode: "#4A4A4A", productId: "2" },
      { color: "Ocean Blue", colorCode: "#1E5F8A", productId: "3" },
      { color: "Terracotta Brown", colorCode: "#A0522D", productId: "5" },
      { color: "Maroon Red", colorCode: "#7B1F1F", productId: "7" },
      { color: "Light Pink", colorCode: "#F4C2C2", productId: "8" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-light-pink/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/Pink-1.jpg",
  },
  {
    id: "9",
    title: "Corduroy & Flannel Sofa Light Green",
    description: "Light green variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: ["https://ezhomes.co/wp-content/uploads/2025/10/Green-2.png"],
    rating: 4.6,
    reviewCount: 9,
    variants: [
      { color: "Light Green", colorCode: "#8FBF7F", size: "180cm" },
      { color: "Light Green", colorCode: "#8FBF7F", size: "200cm" },
    ],
    badges: [],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Sage Green", colorCode: "#9CAF88", productId: "6" },
      { color: "Light Green", colorCode: "#8FBF7F", productId: "9" },
      { color: "Matcha Green", colorCode: "#7BB07B", productId: "10" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-light-green/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/10/Green-2.png",
  },
  {
    id: "10",
    title: "Corduroy & Flannel Sofa Matcha Green",
    description: "Matcha green variant of the Corduroy & Flannel sofa.",
    price: 899,
    compareAtPrice: 1199,
    images: ["https://ezhomes.co/wp-content/uploads/2025/09/Matcha-Green-3.jpg"],
    rating: 4.7,
    reviewCount: 11,
    variants: [
      { color: "Matcha Green", colorCode: "#7BB07B", size: "180cm" },
      { color: "Matcha Green", colorCode: "#7BB07B", size: "200cm" },
    ],
    badges: [],
    category: "Corduroy & Flannel Compression Sofa",
    colorVariants: [
      { color: "Sage Green", colorCode: "#9CAF88", productId: "6" },
      { color: "Light Green", colorCode: "#8FBF7F", productId: "9" },
      { color: "Matcha Green", colorCode: "#7BB07B", productId: "10" },
    ],
    dimensions: {
      threeSeater: "1.8m x 1m x 0.70m",
      fourSeater: "2m x 1m x 0.70m",
      seatedThreeSeater: "1.2m x 0.65m x 0.36m",
      seatedFourSeater: "1.3m x 0.65m x 0.36m",
    },
    weight: "44kg (3-seater), 46kg (4-seater)",
    material: ["Removable Corduroy Fabric Lining Covers", "High Density Foam"],
    whatsIncluded: [
      "2x Corduroy & Flannel Sofa bed",
      "2x Corduroy & Flannel Cushions",
      "3x Chrome-Plated Iron Bars (For stability)",
    ],
    externalUrl: "https://ezhomes.co/shop/latest/corduroy-flannel-sofa-matcha-green/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/Matcha-Green-3.jpg",
  },
  {
    id: "11",
    title: "Compression Bed Grey",
    description: "Grey variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/1-min-1.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/2-min-1.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/3-min-1.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/4-min-1.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/5-min-1.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/6-min-1.png",
      "https://ezhomes.co/wp-content/uploads/2025/09/7-min.png",
    ],
    rating: 4.5,
    reviewCount: 42,
    variants: [
      { color: "Grey", colorCode: "#9E9E9E", size: "Queen" },
      { color: "Grey", colorCode: "#9E9E9E", size: "King" },
    ],
    badges: [],
    category: "Compression Bed",
    dimensions: {
      threeSeater: "Queen: 1.6m x 2m",
      fourSeater: "King: 1.8m x 2m",
      seatedThreeSeater: "",
      seatedFourSeater: "",
    },
    weight: "55kg (Queen), 58kg (King)",
    material: ["Pressure resistant high polymer compressible sponge", "180T Aerobic Cotton"],
    whatsIncluded: ["1x Compression Bed Frame", "1x Headboard"],
    externalUrl: "https://ezhomes.co/shop/compression-bed/compression-bed-grey/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/3-600x600.webp",
  },
  {
    id: "12",
    title: "Compression Bed Slate",
    description: "Slate variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/1.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/3.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/4.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/5.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/6.jpg",
    ],
    rating: 4.5,
    reviewCount: 28,
    variants: [
      { color: "Slate", colorCode: "#6E6E6E", size: "Queen" },
      { color: "Slate", colorCode: "#6E6E6E", size: "King" },
    ],
    badges: [],
    category: "Compression Bed",
    dimensions: {
      threeSeater: "Queen: 1.6m x 2m",
      fourSeater: "King: 1.8m x 2m",
      seatedThreeSeater: "",
      seatedFourSeater: "",
    },
    weight: "55kg (Queen), 58kg (King)",
    material: ["Pressure resistant high polymer compressible sponge", "180T Aerobic Cotton"],
    whatsIncluded: ["1x Compression Bed Frame", "1x Headboard"],
    externalUrl: "https://ezhomes.co/shop/compression-bed/compression-bed-slate/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/7-min.png",
  },
  {
    id: "13",
    title: "Compression Bed Cream",
    description: "Cream variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/1-1.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/2-1.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/3-1.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/4-1.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/5-1.jpg",
    ],
    rating: 4.5,
    reviewCount: 20,
    variants: [
      { color: "Cream", colorCode: "#F5F5DC", size: "Queen" },
      { color: "Cream", colorCode: "#F5F5DC", size: "King" },
    ],
    badges: [],
    category: "Compression Bed",
    dimensions: {
      threeSeater: "Queen: 1.6m x 2m",
      fourSeater: "King: 1.8m x 2m",
      seatedThreeSeater: "",
      seatedFourSeater: "",
    },
    weight: "55kg (Queen), 58kg (King)",
    material: ["Pressure resistant high polymer compressible sponge", "180T Aerobic Cotton"],
    whatsIncluded: ["1x Compression Bed Frame", "1x Headboard"],
    externalUrl: "https://ezhomes.co/shop/compression-bed/compression-bed-cream/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/1-2.jpg",
  },
  {
    id: "14",
    title: "Compression Bed Navy",
    description: "Navy variant of the Compression Bed series.",
    price: 799,
    compareAtPrice: 899,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/1-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/2-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/3-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/4-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/5-2.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/6-1.jpg",
    ],
    rating: 4.5,
    reviewCount: 18,
    variants: [
      { color: "Navy", colorCode: "#1E3A5F", size: "Queen" },
      { color: "Navy", colorCode: "#1E3A5F", size: "King" },
    ],
    badges: [],
    category: "Compression Bed",
    dimensions: {
      threeSeater: "Queen: 1.6m x 2m",
      fourSeater: "King: 1.8m x 2m",
      seatedThreeSeater: "",
      seatedFourSeater: "",
    },
    weight: "55kg (Queen), 58kg (King)",
    material: ["Pressure resistant high polymer compressible sponge", "180T Aerobic Cotton"],
    whatsIncluded: ["1x Compression Bed Frame", "1x Headboard"],
    externalUrl: "https://ezhomes.co/shop/compression-bed/compression-bed-navy/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/1-3.jpg",
  },
  {
    id: "15",
    title: "Single Compression Bed Terracotta Brown",
    description: "Single compression bed in terracotta brown.",
    price: 699,
    compareAtPrice: 0,
    images: [
      "https://ezhomes.co/wp-content/uploads/2025/09/1-3.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/2-3.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/3-3.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/4-3.jpg",
      "https://ezhomes.co/wp-content/uploads/2025/09/5-3.jpg",
    ],
    rating: 4.4,
    reviewCount: 6,
    variants: [
      { color: "Terracotta Brown", colorCode: "#A0522D", size: "Single" },
    ],
    badges: [],
    category: "Compression Bed",
    dimensions: {
      threeSeater: "Single: 0.9m x 2m",
      fourSeater: "",
      seatedThreeSeater: "",
      seatedFourSeater: "",
    },
    weight: "55kg (Single)",
    material: ["Pressure resistant high polymer compressible sponge", "180T Aerobic Cotton"],
    whatsIncluded: ["1x Compression Bed Frame"],
    externalUrl: "https://ezhomes.co/shop/compression-bed/single-compression-bed-terracotta-brown/",
    externalImage: "https://ezhomes.co/wp-content/uploads/2025/09/1-3.jpg",
  },
];

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
