import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import type { Product } from "../data/products";
import { Link } from "../router";

export default function ProductCard({
  product,
  index,
}: { product: Product; index?: number }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const idx = index ?? 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: product.sizes[0] || "S",
      quantity: 1,
    });
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-xs hover:shadow-soft transition-all duration-300"
      data-ocid={`product.card.${idx}`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-ink text-cream-50 text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.rating >= 4.8 && (
            <span className="absolute top-3 left-3 bg-rose-400 text-cream-50 text-xs font-bold px-2 py-1 rounded-full mt-7">
              🔥 Trending
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-cream-50/80 rounded-full shadow-xs hover:bg-cream-50 transition-colors"
            data-ocid={`product.wishlist.toggle.${idx}`}
          >
            <Heart
              size={16}
              className={
                isWishlisted(product.id)
                  ? "fill-rose-400 text-rose-400"
                  : "text-ink-muted"
              }
            />
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-0 right-0 mx-3 bg-ink text-cream-50 text-xs font-semibold py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2"
            data-ocid={`product.quickadd.button.${idx}`}
          >
            <ShoppingBag size={13} /> Quick Add
          </button>
        </div>
        <div className="p-3">
          <p className="text-xs text-rose-400 font-medium mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-ink mb-1 line-clamp-1 font-body">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-ink-muted">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-ink">₹{product.price}</span>
            <span className="text-xs text-ink-muted line-through">
              ₹{product.originalPrice}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
