import { CheckCircle } from "lucide-react";
import { Link } from "../router";

export default function OrderConfirmationPage() {
  return (
    <div
      className="max-w-lg mx-auto px-4 py-20 text-center"
      data-ocid="orderconfirm.page"
    >
      <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
      <h1 className="font-display text-3xl text-ink mb-3">Order Placed! 🎉</h1>
      <p className="text-ink-muted mb-2">
        Thank you for shopping with Trendy Style!
      </p>
      <p className="text-ink-muted text-sm mb-8">
        Your order has been confirmed and will be delivered within 5–7 business
        days.
      </p>
      <div className="bg-rose-50 rounded-2xl p-5 mb-8">
        <p className="text-sm text-ink-muted mb-2">
          Questions about your order? Reach us on
        </p>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          className="text-green-600 font-semibold hover:underline"
        >
          WhatsApp
        </a>
      </div>
      <Link
        to="/"
        className="bg-ink text-cream-50 px-8 py-3 rounded-full font-semibold hover:bg-ink/90 transition-colors"
        data-ocid="orderconfirm.shoppingmore.button"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
