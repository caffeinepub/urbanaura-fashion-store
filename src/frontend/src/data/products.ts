export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: "Tops" | "Dresses" | "Co-ords" | "Casual Wear" | "New Arrivals";
  sizes: string[];
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Floral Puff Sleeve Top",
    description:
      "Dreamy floral print with puff sleeves. Perfect for brunch or a day out.",
    price: 849,
    originalPrice: 1299,
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/floraltop/400/500",
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "Lavender Mini Dress",
    description:
      "Soft lavender mini dress with ruffle hem. A wardrobe essential.",
    price: 1299,
    originalPrice: 1899,
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl: "https://picsum.photos/seed/lavenderdress/400/500",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 214,
  },
  {
    id: "3",
    name: "Pink Co-ord Set",
    description:
      "Matching crop top and wide-leg pants in dusty pink. Effortlessly chic.",
    price: 1699,
    originalPrice: 2499,
    category: "Co-ords",
    sizes: ["S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/pinkcoord/400/500",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "4",
    name: "Oversized Pastel Hoodie",
    description:
      "Ultra-soft oversized hoodie in baby blue. For cozy days and nights.",
    price: 999,
    originalPrice: 1499,
    category: "Casual Wear",
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "https://picsum.photos/seed/pasteloversized/400/500",
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 176,
  },
  {
    id: "5",
    name: "Butterfly Embroidered Top",
    description:
      "Delicate butterfly embroidery on a cream linen top. Fresh and feminine.",
    price: 749,
    originalPrice: 1099,
    category: "New Arrivals",
    sizes: ["XS", "S", "M"],
    imageUrl: "https://picsum.photos/seed/butterflytop/400/500",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 42,
  },
  {
    id: "6",
    name: "Peach Sundress",
    description:
      "Breezy peach sundress with adjustable straps. Summer made beautiful.",
    price: 1099,
    originalPrice: 1599,
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/peachsundress/400/500",
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 93,
  },
  {
    id: "7",
    name: "Lilac Linen Trousers",
    description:
      "High-waist lilac linen trousers. Pair with anything and look amazing.",
    price: 1149,
    originalPrice: 1699,
    category: "Casual Wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl: "https://picsum.photos/seed/lilaclinen/400/500",
    inStock: true,
    featured: false,
    rating: 4.3,
    reviewCount: 61,
  },
  {
    id: "8",
    name: "Rose Gold Co-ord",
    description: "Shimmer rose gold co-ord set for that perfect party look.",
    price: 1899,
    originalPrice: 2799,
    category: "Co-ords",
    sizes: ["S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/rosegoldcoord/400/500",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 55,
  },
  {
    id: "9",
    name: "Striped Tie-Front Top",
    description:
      "Classic pastel stripes with a cute tie-front detail. Casual and trendy.",
    price: 699,
    originalPrice: 999,
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/stripedtie/400/500",
    inStock: true,
    featured: false,
    rating: 4.2,
    reviewCount: 38,
  },
  {
    id: "10",
    name: "Cloud Print Midi Dress",
    description:
      "Whimsical cloud print midi dress. Soft, flowy, and absolutely adorable.",
    price: 1399,
    originalPrice: 1999,
    category: "New Arrivals",
    sizes: ["XS", "S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/cloudmidi/400/500",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 27,
  },
  {
    id: "11",
    name: "Mint Cargo Pants",
    description: "Y2K-inspired mint green cargo pants. Edgy meets cute.",
    price: 1249,
    originalPrice: 1799,
    category: "Casual Wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl: "https://picsum.photos/seed/mintcargo/400/500",
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 74,
  },
  {
    id: "12",
    name: "Blush Blazer Set",
    description:
      "Power meets pretty. Blush pink blazer co-ord for the boss babe.",
    price: 2199,
    originalPrice: 3199,
    category: "New Arrivals",
    sizes: ["S", "M", "L"],
    imageUrl: "https://picsum.photos/seed/blushblazer/400/500",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 19,
  },
];

export const CATEGORIES = [
  "Tops",
  "Dresses",
  "Co-ords",
  "Casual Wear",
  "New Arrivals",
] as const;
