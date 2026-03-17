import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { SAMPLE_PRODUCTS } from "../data/products";
import { Link } from "../router";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const products = SAMPLE_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="wishlist.page">
      <h1 className="font-display text-3xl text-ink mb-2">Your Wishlist</h1>
      <p className="text-ink-muted mb-8">{products.length} saved items</p>
      {products.length === 0 ? (
        <div className="text-center py-20" data-ocid="wishlist.empty_state">
          <Heart size={64} className="mx-auto text-rose-200 mb-4" />
          <h2 className="font-display text-2xl text-ink mb-2">
            Nothing saved yet
          </h2>
          <p className="text-ink-muted mb-6">
            Heart your favorite items and they'll appear here!
          </p>
          <Link
            to="/"
            className="bg-ink text-cream-50 px-6 py-3 rounded-full font-semibold hover:bg-ink/90 transition-colors"
            data-ocid="wishlist.shop.button"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
