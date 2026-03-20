import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const banners = [
  { emoji: "🔥", text: "Exam Week Rush – Book early & save 20%", color: "from-primary/10 to-accent/10" },
  { emoji: "💎", text: "Premium Quiet Spaces Available", color: "from-accent/10 to-primary/10" },
  { emoji: "⚡", text: "High Demand Areas Filling Fast", color: "from-success/10 to-primary/10" },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`p-4 bg-gradient-to-r ${banners[current].color} rounded-lg`}
        >
          <p className="text-lg font-semibold text-foreground leading-snug">
            {banners[current].emoji} {banners[current].text}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-transform duration-200 ease-studi active:scale-95"
          >
            Explore Now
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 pb-3 pt-1">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-4" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
