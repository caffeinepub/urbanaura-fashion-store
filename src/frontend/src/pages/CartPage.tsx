import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "../router";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag size={64} className="mx-auto text-rose-200 mb-4" />
        <h2 className="font-display text-2xl text-ink mb-2">
          Your cart is empty
        </h2>
        <p className="text-ink-muted mb-6">
          Looks like you haven't added anything yet!
        </p>
        <Link
          to="/"
          className="bg-ink text-cream-50 px-6 py-3 rounded-full font-semibold hover:bg-ink/90 transition-colors"
          data-ocid="cart.shop.button"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-ocid="cart.page">
      <h1 className="font-display text-3xl text-ink mb-8">
        Your Cart ({totalItems})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item, i) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="bg-card rounded-2xl p-4 shadow-xs flex gap-4"
              data-ocid={`cart.item.${i + 1}`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-28 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-ink">{item.name}</h3>
                <p className="text-sm text-ink-muted mb-1">Size: {item.size}</p>
                <p className="text-rose-400 font-bold">₹{item.price}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity - 1,
                      )
                    }
                    className="p-1 rounded-full bg-cream-200 hover:bg-rose-100 transition-colors"
                    data-ocid={`cart.decrement.button.${i + 1}`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity + 1,
                      )
                    }
                    className="p-1 rounded-full bg-cream-200 hover:bg-rose-100 transition-colors"
                    data-ocid={`cart.increment.button.${i + 1}`}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="ml-auto text-rose-400 hover:text-rose-500 transition-colors"
                    data-ocid={`cart.remove.delete_button.${i + 1}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="bg-card rounded-2xl p-6 shadow-xs h-fit"
          data-ocid="cart.summary.panel"
        >
          <h3 className="font-semibold text-ink mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-ink-muted">Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t border-cream-300 pt-2 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="w-full bg-ink text-cream-50 py-3 rounded-full font-semibold hover:bg-ink/90 transition-colors"
            data-ocid="cart.checkout.button"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
