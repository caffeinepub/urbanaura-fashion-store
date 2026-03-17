import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "../router";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI" | "CARD">(
    "COD",
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    upiId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Required";
    if (!form.phone || form.phone.length < 10) e.phone = "Enter valid phone";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.pincode || form.pincode.length < 6)
      e.pincode = "Enter valid pincode";
    if (paymentMethod === "UPI" && !form.upiId) e.upiId = "Enter UPI ID";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    clearCart();
    navigate("/order-confirmation");
  };

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm bg-cream-50 focus:outline-none transition-colors ${
      errors[field]
        ? "border-rose-300 focus:border-rose-400"
        : "border-cream-300 focus:border-ink"
    }`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-ocid="checkout.page">
      <h1 className="font-display text-3xl text-ink mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-xs">
            <h2 className="font-semibold text-ink mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Full Name"
                  className={inputClass("name")}
                  data-ocid="checkout.name.input"
                />
                {errors.name && (
                  <p className="text-rose-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="Phone Number"
                  className={inputClass("phone")}
                  data-ocid="checkout.phone.input"
                />
                {errors.phone && (
                  <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <input
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="Full Address"
                  className={inputClass("address")}
                  data-ocid="checkout.address.input"
                />
                {errors.address && (
                  <p className="text-rose-400 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="City"
                  className={inputClass("city")}
                  data-ocid="checkout.city.input"
                />
                {errors.city && (
                  <p className="text-rose-400 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <input
                  value={form.pincode}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, pincode: e.target.value }))
                  }
                  placeholder="Pincode"
                  className={inputClass("pincode")}
                  data-ocid="checkout.pincode.input"
                />
                {errors.pincode && (
                  <p className="text-rose-400 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-xs">
            <h2 className="font-semibold text-ink mb-4">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">
              {(["COD", "UPI", "CARD"] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3 rounded-xl border-2 font-semibold text-xs transition-colors ${
                    paymentMethod === method
                      ? "border-ink bg-ink text-cream-50"
                      : "border-cream-300 text-ink-muted hover:border-ink"
                  }`}
                  data-ocid={`checkout.${method.toLowerCase()}.toggle`}
                >
                  {method === "COD"
                    ? "💵 Cash on Delivery"
                    : method === "UPI"
                      ? "📱 UPI"
                      : "💳 Card"}
                </button>
              ))}
            </div>
            {paymentMethod === "UPI" && (
              <div className="mt-4">
                <input
                  value={form.upiId}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, upiId: e.target.value }))
                  }
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className={inputClass("upiId")}
                  data-ocid="checkout.upiid.input"
                />
                {errors.upiId && (
                  <p className="text-rose-400 text-xs mt-1">{errors.upiId}</p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-ink text-cream-50 py-4 rounded-full font-bold text-base hover:bg-ink/90 transition-colors"
            data-ocid="checkout.placeorder.submit_button"
          >
            Place Order
          </button>
        </form>

        <div
          className="bg-card rounded-2xl p-6 shadow-xs h-fit"
          data-ocid="checkout.summary.panel"
        >
          <h3 className="font-semibold text-ink mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-14 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-ink line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-ink-muted">
                    Size: {item.size} ×{item.quantity}
                  </p>
                  <p className="text-rose-400 font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-cream-300 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
