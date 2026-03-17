import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CATEGORIES } from "../data/products";
import { Link, useNavigate } from "../router";

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-200 border-b border-cream-300 shadow-xs">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            className="md:hidden p-2 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.menu.toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/"
            className="font-display text-2xl font-bold text-ink tracking-tight"
            data-ocid="nav.logo.link"
          >
            Trendy Style
          </Link>

          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.desktop.panel"
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="text-sm text-ink-muted hover:text-ink transition-colors font-medium tracking-wide"
                data-ocid={`nav.${cat.toLowerCase().replace(/[^a-z]/g, "")}.link`}
              >
                {cat}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              data-ocid="nav.search.toggle"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              data-ocid="nav.wishlist.link"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 text-ink-muted hover:text-ink transition-colors"
              data-ocid="nav.cart.link"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-ink text-cream-50 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-cream-300 rounded-full px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-rose-400"
              data-ocid="nav.search.input"
            />
          </form>
        )}
      </div>

      {menuOpen && (
        <div
          className="md:hidden bg-cream-200 border-t border-cream-300 px-4 py-4 space-y-3"
          data-ocid="nav.mobile.panel"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${encodeURIComponent(cat)}`}
              className="block text-ink-muted hover:text-ink font-medium py-1"
              onClick={() => setMenuOpen(false)}
              data-ocid={`nav.mobile.${cat.toLowerCase().replace(/[^a-z]/g, "")}.link`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
