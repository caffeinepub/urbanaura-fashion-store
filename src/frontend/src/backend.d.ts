import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    originalPrice: bigint;
    imageUrls: Array<string>;
    name: string;
    averageRating: number;
    stockCount: bigint;
    availableSizes: Array<string>;
    category: Category;
    isNew: boolean;
    price: bigint;
    reviewCount: bigint;
    isTrending: boolean;
}
export interface CartItem {
    size: string;
    productId: bigint;
    quantity: bigint;
}
export interface Order {
    id: bigint;
    deliveryAddress: string;
    paymentMethod: Variant_cod_upi;
    totalAmount: bigint;
    items: Array<CartItem>;
}
export interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface Review {
    productId: bigint;
    reviewerName: string;
    comment: string;
    rating: bigint;
}
export enum Category {
    casualWear = "casualWear",
    dresses = "dresses",
    tops = "tops",
    newArrivals = "newArrivals",
    coOrds = "coOrds",
    partyWear = "partyWear"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_cod_upi {
    cod = "cod",
    upi = "upi"
}
export interface backendInterface {
    addReview(review: Review): Promise<void>;
    addToCart(item: CartItem): Promise<void>;
    addToWishlist(productId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCartItems(): Promise<Array<CartItem>>;
    getOrders(): Promise<Array<Order>>;
    getProductById(productId: bigint): Promise<Product | null>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getReviews(productId: bigint): Promise<Array<Review>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<bigint>>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(items: Array<CartItem>, totalAmount: bigint, paymentMethod: Variant_cod_upi, deliveryAddress: string): Promise<void>;
    removeFromCart(productId: bigint, size: string): Promise<void>;
    removeFromWishlist(productId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCartItem(item: CartItem): Promise<void>;
}
