import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, SAMPLE_PRODUCTS } from "../data/products";
import { Link } from "../router";

const CATEGORY_ICONS = ["👚", "👗", "👘", "🧥", "✨"];

export default function HomePage() {
  const featured = SAMPLE_PRODUCTS.filter((p) => p.featured);
  const trending = SAMPLE_PRODUCTS.filter((p) => p.rating >= 4.7);
  const newArrivals = SAMPLE_PRODUCTS.filter(
    (p) => p.category === "New Arrivals",
  );

  return (
    <div data-ocid="home.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-cream-200 px-6 py-16 md:py-28"
        data-ocid="home.hero.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-semibold uppercase tracking-widest mb-4 bg-rose-50 px-3 py-1.5 rounded-full">
                <Sparkles size={11} /> Spring / Summer 2026
              </span>
              <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-4">
                Style that
                <br />
                <span className="italic text-rose-400">speaks.</span>
              </h1>
              <p className="text-ink-muted text-lg mb-2">Prices you love.</p>
              <p className="text-ink-muted mb-8 max-w-md">
                Trendy, affordable fashion curated for the bold, the soft, and
                the expressive. New drops every week.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  to="/category/New Arrivals"
                  className="inline-flex items-center gap-2 bg-ink text-cream-50 px-7 py-3 rounded-full font-semibold text-sm hover:bg-ink/90 transition-colors"
                  data-ocid="home.shop_new.button"
                >
                  Shop New Arrivals <ArrowRight size={15} />
                </Link>
                <Link
                  to="/category/Dresses"
                  className="inline-flex items-center gap-2 border-2 border-ink text-ink px-7 py-3 rounded-full font-semibold text-sm hover:bg-ink hover:text-cream-50 transition-colors"
                  data-ocid="home.shop_dresses.button"
                >
                  Explore Dresses
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-8">
                {["Free Returns", "Under ₹999 Picks", "COD Available"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-xs text-ink-muted border border-cream-300 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            {/* Hero image grid */}
            <motion.div
              className="hidden md:grid grid-cols-2 gap-3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {featured.slice(0, 4).map((p, i) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className={`block rounded-2xl overflow-hidden ${
                    i === 0 ? "row-span-2" : ""
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    style={{ height: i === 0 ? "360px" : "170px" }}
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discount banner */}
      <div className="bg-ink text-cream-50 text-center text-sm font-semibold py-3 px-4 tracking-wide">
        🎀 FLAT 20% OFF — Use code{" "}
        <span className="underline underline-offset-2">TRENDY20</span> at
        checkout
      </div>

      {/* Categories */}
      <section
        className="max-w-6xl mx-auto px-4 py-12"
        data-ocid="home.categories.section"
      >
        <h2 className="font-display text-2xl text-ink mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              to={`/category/${encodeURIComponent(cat)}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-xs hover:shadow-soft transition-all text-center p-4 border border-transparent hover:border-rose-200"
              data-ocid={`home.category.${i + 1}`}
            >
              <div className="w-14 h-14 mx-auto mb-3 bg-cream-200 rounded-full flex items-center justify-center text-2xl">
                {CATEGORY_ICONS[i]}
              </div>
              <p className="text-sm font-semibold text-ink group-hover:text-rose-400 transition-colors">
                {cat}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="bg-cream-200 py-12" data-ocid="home.trending.section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ink flex items-center gap-2">
              <Zap size={20} className="text-rose-400" /> Trending Now
            </h2>
            <Link
              to="/category/all"
              className="text-rose-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              data-ocid="home.trending.viewall.link"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop the Look banner */}
      <section
        className="max-w-6xl mx-auto px-4 py-10"
        data-ocid="home.shopthelook.section"
      >
        <div className="bg-rose-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Curated For You
            </p>
            <h3 className="font-display text-3xl text-ink mb-3">
              Shop the Look 💕
            </h3>
            <p className="text-ink-muted mb-5">
              Complete outfits, zero guesswork. Mix and match our co-ord sets
              and top picks for that effortless 'gram-worthy look.
            </p>
            <Link
              to="/category/Co-ords"
              className="inline-flex items-center gap-2 bg-ink text-cream-50 px-6 py-3 rounded-full font-semibold text-sm hover:bg-ink/90 transition-colors"
              data-ocid="home.shopthelook.button"
            >
              Explore Co-ords <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-72">
            {featured.slice(2, 6).map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full aspect-square object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section
        className="max-w-6xl mx-auto px-4 py-8"
        data-ocid="home.newarrivals.section"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-ink">New Arrivals ✨</h2>
          <Link
            to="/category/New Arrivals"
            className="text-rose-400 text-sm font-medium flex items-center gap-1"
            data-ocid="home.newarrivals.viewall.link"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Instagram section */}
      <section
        className="bg-cream-200 py-12 px-4 text-center"
        data-ocid="home.instagram.section"
      >
        <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Follow the vibe
        </p>
        <h3 className="font-display text-3xl text-ink mb-3">
          @trendystyle on Instagram
        </h3>
        <p className="text-ink-muted mb-6 max-w-md mx-auto">
          Tag us in your fits for a chance to be featured. DM us for
          collaborations.
        </p>
        <a
          href="https://instagram.com/trendystyle"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-cream-50 px-7 py-3 rounded-full font-semibold text-sm hover:bg-ink/90 transition-colors"
          data-ocid="home.instagram.button"
        >
          Follow Us
        </a>
      </section>
    </div>
  );
}
