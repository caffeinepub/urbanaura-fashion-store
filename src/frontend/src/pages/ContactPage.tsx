import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12" data-ocid="contact.page">
      <div className="text-center mb-12">
        <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-3">
          Say Hello
        </p>
        <h1 className="font-display text-4xl text-ink mb-4">Get in Touch</h1>
        <p className="text-ink-muted">
          We'd love to hear from you! Reach out through any of the channels
          below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-xl text-ink mb-6">Find Us Here</h2>
          <div className="space-y-4">
            <a
              href="https://instagram.com/trendystyle"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-rose-50 rounded-2xl p-4 hover:shadow-soft transition-shadow"
              data-ocid="contact.instagram.link"
            >
              <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center">
                <Instagram size={22} className="text-cream-50" />
              </div>
              <div>
                <p className="font-semibold text-ink">Instagram</p>
                <p className="text-sm text-ink-muted">
                  @trendystyle — DM us anytime!
                </p>
              </div>
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-green-50 rounded-2xl p-4 hover:shadow-soft transition-shadow"
              data-ocid="contact.whatsapp.link"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-ink">WhatsApp</p>
                <p className="text-sm text-ink-muted">
                  Chat with us for quick help
                </p>
              </div>
            </a>
            <div className="flex items-center gap-4 bg-cream-200 rounded-2xl p-4">
              <div className="w-12 h-12 bg-ink rounded-full flex items-center justify-center">
                <Mail size={22} className="text-cream-50" />
              </div>
              <div>
                <p className="font-semibold text-ink">Email</p>
                <p className="text-sm text-ink-muted">hello@trendystyle.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-xs">
          <h2 className="font-display text-xl text-ink mb-6">Send a Message</h2>
          {submitted && (
            <p
              className="text-green-600 text-sm mb-4"
              data-ocid="contact.form.success_state"
            >
              Message sent! We'll get back to you soon. ✨
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Your name"
              required
              className="w-full border border-cream-300 rounded-xl px-4 py-2.5 text-sm bg-cream-50 focus:outline-none focus:border-ink"
              data-ocid="contact.name.input"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="Email address"
              required
              className="w-full border border-cream-300 rounded-xl px-4 py-2.5 text-sm bg-cream-50 focus:outline-none focus:border-ink"
              data-ocid="contact.email.input"
            />
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              placeholder="Your message..."
              rows={4}
              required
              className="w-full border border-cream-300 rounded-xl px-4 py-2.5 text-sm bg-cream-50 focus:outline-none focus:border-ink resize-none"
              data-ocid="contact.message.textarea"
            />
            <button
              type="submit"
              className="w-full bg-ink text-cream-50 py-3 rounded-full font-semibold hover:bg-ink/90 transition-colors"
              data-ocid="contact.form.submit_button"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
