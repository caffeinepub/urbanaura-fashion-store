import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../data/products";
import { useParams, useSearchParams } from "../router";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase();

  let products = SAMPLE_PRODUCTS;
  if (category && category !== "all") {
    products = products.filter(
      (p) => p.category === decodeURIComponent(category),
    );
  }
  if (query) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    );
  }

  const title = query
    ? `Search: "${query}"`
    : category
      ? decodeURIComponent(category)
      : "All Products";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="category.page">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        <p className="text-sm text-ink-muted mt-1">
          {products.length} products
        </p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-20" data-ocid="category.empty_state">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-ink-muted">
            No products found. Try a different search.
          </p>
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
