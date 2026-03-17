import { Check, ChevronLeft, Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { SAMPLE_PRODUCTS } from "../data/products";
import { Link, useParams } from "../router";

const SAMPLE_REVIEWS = [
  {
    id: "1",
    name: "Priya S.",
    rating: 5,
    comment: "Absolutely love this! The quality is amazing and fits perfectly.",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Ananya M.",
    rating: 5,
    comment: "So cute!! Got so many compliments wearing this to college.",
    date: "1 week ago",
  },
  {
    id: "3",
    name: "Riya K.",
    rating: 4,
    comment:
      "Great quality and fast delivery. Size runs a little small so size up!",
    date: "2 weeks ago",
  },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 py-20 text-center"
        data-ocid="product.error_state"
      >
        <p className="text-5xl mb-4">😢</p>
        <p className="text-ink-muted">Product not found.</p>
        <Link to="/" className="text-rose-400 mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const related = SAMPLE_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    setReviews((prev) => [
      {
        id: String(Date.now()),
        name: reviewForm.name,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: "Just now",
      },
      ...prev,
    ]);
    setReviewForm({ name: "", rating: 5, comment: "" });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="product.page">
      <Link
        to="/"
        className="flex items-center gap-1 text-ink-muted hover:text-ink text-sm mb-6 transition-colors"
        data-ocid="product.back.link"
      >
        <ChevronLeft size={16} /> Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-ink text-cream-50 text-sm font-bold px-3 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-rose-400 font-medium text-sm mb-2 uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="font-display text-3xl text-ink mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={16}
                className={
                  n <= Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-cream-300"
                }
              />
            ))}
            <span className="text-sm text-ink-muted">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-ink">
              ₹{product.price}
            </span>
            <span className="text-lg text-ink-muted line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-green-600 text-sm font-semibold">
              {discount}% off
            </span>
          </div>

          <p className="text-ink-muted mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-ink mb-3">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                    selectedSize === size
                      ? "border-ink bg-ink text-cream-50"
                      : "border-cream-300 text-ink hover:border-ink"
                  }`}
                  data-ocid={`product.size.${size.toLowerCase()}.button`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-rose-400 mt-2">Please select a size</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all ${
                added
                  ? "bg-green-600 text-cream-50"
                  : selectedSize
                    ? "bg-ink text-cream-50 hover:bg-ink/90"
                    : "bg-cream-300 text-ink-muted cursor-not-allowed"
              }`}
              data-ocid="product.addtocart.button"
            >
              {added ? (
                <>
                  <Check size={16} /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Cart
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-full border-2 transition-colors ${
                isWishlisted(product.id)
                  ? "border-rose-400 bg-rose-50"
                  : "border-cream-300 hover:border-rose-300"
              }`}
              data-ocid="product.wishlist.button"
            >
              <Heart
                size={20}
                className={
                  isWishlisted(product.id)
                    ? "fill-rose-400 text-rose-400"
                    : "text-ink-muted"
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mb-16" data-ocid="product.reviews.section">
        <h2 className="font-display text-2xl text-ink mb-6">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className="bg-card rounded-2xl p-5 shadow-xs"
              data-ocid={`product.review.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-400 font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-ink-muted">{r.date}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={12}
                      className={
                        n <= r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-cream-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-ink-muted">{r.comment}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-xs">
          <h3 className="font-semibold text-ink mb-4">Write a Review</h3>
          {reviewSubmitted && (
            <p
              className="text-green-600 text-sm mb-3"
              data-ocid="product.review.success_state"
            >
              Thanks for your review!
            </p>
          )}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <input
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Your name"
              className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-rose-400"
              data-ocid="product.review.name.input"
            />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setReviewForm((p) => ({ ...p, rating: n }))}
                  data-ocid={`product.review.rating.${n}`}
                >
                  <Star
                    size={20}
                    className={
                      n <= reviewForm.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-cream-300"
                    }
                  />
                </button>
              ))}
            </div>
            <textarea
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm((p) => ({ ...p, comment: e.target.value }))
              }
              placeholder="Share your experience..."
              rows={3}
              className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-rose-400 resize-none"
              data-ocid="product.review.comment.textarea"
            />
            <button
              type="submit"
              className="bg-ink text-cream-50 px-6 py-2 rounded-full text-sm font-semibold hover:bg-ink/90 transition-colors"
              data-ocid="product.review.submit.button"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {related.length > 0 && (
        <section data-ocid="product.related.section">
          <h2 className="font-display text-2xl text-ink mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
