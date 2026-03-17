import { Edit2, Image, LogOut, Package, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES, type Product, SAMPLE_PRODUCTS } from "../data/products";

const ADMIN_PASSWORD = "admin123";
type Tab = "products" | "banners";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("ts_admin") === "1",
  );
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("ts_admin_products") || "null") ||
        SAMPLE_PRODUCTS
      );
    } catch {
      return SAMPLE_PRODUCTS;
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Tops" as Product["category"],
    sizes: "S,M,L",
    imageUrl: "",
  });

  useEffect(() => {
    localStorage.setItem("ts_admin_products", JSON.stringify(products));
  }, [products]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("ts_admin", "1");
      setAuthenticated(true);
    } else {
      setLoginError("Incorrect password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ts_admin");
    setAuthenticated(false);
  };

  const openAddForm = () => {
    setEditProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "Tops",
      sizes: "S,M,L",
      imageUrl: "",
    });
    setShowForm(true);
  };

  const openEditForm = (p: Product) => {
    setEditProduct(p);
    setFormData({
      name: p.name,
      description: p.description,
      price: String(p.price),
      originalPrice: String(p.originalPrice),
      category: p.category,
      sizes: p.sizes.join(","),
      imageUrl: p.imageUrl,
    });
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: editProduct?.id || String(Date.now()),
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      category: formData.category,
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      imageUrl:
        formData.imageUrl ||
        `https://picsum.photos/seed/${encodeURIComponent(formData.name)}/400/500`,
      inStock: true,
      featured: false,
      rating: 4.5,
      reviewCount: 0,
    };
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? product : p)),
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        data-ocid="admin.login.page"
      >
        <div className="bg-card rounded-3xl p-8 shadow-soft w-full max-w-sm">
          <h1 className="font-display text-2xl text-ink mb-2 text-center">
            Admin Panel
          </h1>
          <p className="text-ink-muted text-sm text-center mb-6">
            Trendy Style Management
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-cream-300 rounded-xl px-4 py-3 bg-cream-50 focus:outline-none focus:border-ink"
              data-ocid="admin.login.input"
            />
            {loginError && (
              <p
                className="text-rose-400 text-sm"
                data-ocid="admin.login.error_state"
              >
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-ink text-cream-50 py-3 rounded-full font-semibold hover:bg-ink/90 transition-colors"
              data-ocid="admin.login.submit_button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="admin.page">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Admin Panel</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-ink-muted hover:text-rose-400 transition-colors"
          data-ocid="admin.logout.button"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTab("products")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tab === "products"
              ? "bg-ink text-cream-50"
              : "bg-card text-ink-muted hover:bg-cream-200"
          }`}
          data-ocid="admin.products.tab"
        >
          <Package size={14} /> Products
        </button>
        <button
          type="button"
          onClick={() => setTab("banners")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tab === "banners"
              ? "bg-ink text-cream-50"
              : "bg-card text-ink-muted hover:bg-cream-200"
          }`}
          data-ocid="admin.banners.tab"
        >
          <Image size={14} /> Banners
        </button>
      </div>

      {tab === "products" && (
        <div data-ocid="admin.products.panel">
          <div className="flex justify-between items-center mb-4">
            <p className="text-ink-muted text-sm">{products.length} products</p>
            <button
              type="button"
              onClick={openAddForm}
              className="flex items-center gap-2 bg-ink text-cream-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-ink/90 transition-colors"
              data-ocid="admin.addproduct.button"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>

          {showForm && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
              data-ocid="admin.product.modal"
            >
              <div className="bg-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h3 className="font-semibold text-ink mb-4">
                  {editProduct ? "Edit Product" : "Add Product"}
                </h3>
                <form onSubmit={handleSave} className="space-y-4">
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Product Name"
                    required
                    className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink"
                    data-ocid="admin.product.name.input"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Description"
                    rows={2}
                    className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink resize-none"
                    data-ocid="admin.product.description.textarea"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, price: e.target.value }))
                      }
                      placeholder="Price (₹)"
                      type="number"
                      required
                      className="border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink"
                      data-ocid="admin.product.price.input"
                    />
                    <input
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          originalPrice: e.target.value,
                        }))
                      }
                      placeholder="Original Price (₹)"
                      type="number"
                      required
                      className="border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink"
                      data-ocid="admin.product.originalprice.input"
                    />
                  </div>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        category: e.target.value as Product["category"],
                      }))
                    }
                    className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink"
                    data-ocid="admin.product.category.select"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    value={formData.sizes}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, sizes: e.target.value }))
                    }
                    placeholder="Sizes (comma separated: XS,S,M,L)"
                    className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink"
                    data-ocid="admin.product.sizes.input"
                  />
                  <input
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, imageUrl: e.target.value }))
                    }
                    placeholder="Image URL (leave blank for auto)"
                    className="w-full border border-cream-300 rounded-xl px-4 py-2 text-sm bg-cream-50 focus:outline-none focus:border-ink"
                    data-ocid="admin.product.imageurl.input"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-ink text-cream-50 py-2 rounded-full font-semibold hover:bg-ink/90 transition-colors"
                      data-ocid="admin.product.save.button"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-cream-200 text-ink-muted py-2 rounded-full font-semibold hover:bg-cream-300 transition-colors"
                      data-ocid="admin.product.cancel.button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {products.map((p, i) => (
              <div
                key={p.id}
                className="bg-card rounded-xl p-4 shadow-xs flex items-center gap-4"
                data-ocid={`admin.product.item.${i + 1}`}
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-14 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-sm text-ink-muted">
                    {p.category} · ₹{p.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(p)}
                    className="p-2 text-ink-muted hover:text-ink transition-colors"
                    data-ocid={`admin.product.edit.button.${i + 1}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-ink-muted hover:text-rose-400 transition-colors"
                    data-ocid={`admin.product.delete_button.${i + 1}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "banners" && (
        <div
          className="text-center py-16 text-ink-muted"
          data-ocid="admin.banners.panel"
        >
          <Image size={48} className="mx-auto mb-3 opacity-40" />
          <p>Banner management coming soon!</p>
        </div>
      )}
    </div>
  );
}
