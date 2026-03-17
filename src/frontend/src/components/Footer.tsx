import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "../router";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-cream-200 border-t border-cream-300 pt-10 pb-6 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-ink mb-3">
              Trendy Style
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Style that speaks, prices you love. Curating the chicest fits for
              the modern young woman.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com/trendystyle"
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-rose-400 transition-colors"
                data-ocid="footer.instagram.link"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-rose-400 transition-colors"
                data-ocid="footer.whatsapp.link"
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-3 tracking-wide text-sm uppercase">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              {[
                "Tops",
                "Dresses",
                "Co-ords",
                "Casual Wear",
                "New Arrivals",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${encodeURIComponent(cat)}`}
                    className="hover:text-ink transition-colors"
                    data-ocid={`footer.${cat.toLowerCase().replace(/[^a-z]/g, "")}.link`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-3 tracking-wide text-sm uppercase">
              Info
            </h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <Link
                  to="/about"
                  className="hover:text-ink transition-colors"
                  data-ocid="footer.about.link"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-ink transition-colors"
                  data-ocid="footer.contact.link"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-ink transition-colors"
                  data-ocid="footer.admin.link"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-300 pt-6 text-center text-xs text-ink-muted">
          <p className="mb-1">
            &copy; {year} Trendy Style. Style that speaks, prices you love.
          </p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-ink transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
