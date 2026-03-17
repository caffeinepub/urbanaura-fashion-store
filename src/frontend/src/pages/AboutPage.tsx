import { motion } from "motion/react";

const values = [
  {
    emoji: "💖",
    title: "Made with Love",
    desc: "Every piece is carefully curated for quality, style, and your confidence.",
  },
  {
    emoji: "🌸",
    title: "Sustainable Choices",
    desc: "We're committed to eco-conscious choices and ethical sourcing.",
  },
  {
    emoji: "✨",
    title: "Your Vibe, Your Rules",
    desc: "No rules, just vibes. Express yourself freely and fearlessly.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" data-ocid="about.page">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-3">
          Our Story
        </p>
        <h1 className="font-display text-5xl text-ink mb-4">
          About Trendy Style
        </h1>
        <p className="text-ink-muted text-lg italic">
          "Style that speaks, prices you love."
        </p>
      </motion.div>

      <div className="bg-cream-200 rounded-3xl p-8 mb-10">
        <h2 className="font-display text-2xl text-ink mb-4">How It Started</h2>
        <p className="text-ink-muted leading-relaxed mb-4">
          Trendy Style was born from a simple belief: fashion should be fun,
          expressive, and accessible to every young woman. We're a team of
          fashion-obsessed creators who wanted to build a brand that actually
          gets it — the aesthetic, the vibe, the attitude.
        </p>
        <p className="text-ink-muted leading-relaxed">
          From soft pastels to bold co-ords, every piece in our collection is
          handpicked to help you express your most authentic self. We believe
          clothes are more than fabric — they're your first impression, your
          mood board, your superpower. And they shouldn't cost a fortune.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            className="bg-card rounded-2xl p-6 shadow-xs text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <p className="text-4xl mb-3">{v.emoji}</p>
            <h3 className="font-display text-lg text-ink mb-2">{v.title}</h3>
            <p className="text-ink-muted text-sm">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center bg-rose-50 rounded-3xl p-8">
        <h3 className="font-display text-2xl text-ink mb-3">
          Join the Trendy Style Family
        </h3>
        <p className="text-ink-muted mb-5">
          Follow us on Instagram, tag us in your fits, and be part of our
          growing community of confident, stylish young women.
        </p>
        <a
          href="https://instagram.com/trendystyle"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-cream-50 px-7 py-3 rounded-full font-semibold text-sm hover:bg-ink/90 transition-colors"
          data-ocid="about.instagram.button"
        >
          @trendystyle on Instagram
        </a>
      </div>
    </div>
  );
}
