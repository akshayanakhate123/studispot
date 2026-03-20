import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const banners = [
  {
    emoji: "🔥",
    text: "Exam Week Rush – Book early & save 20%",
    color: "from-primary/10 to-accent/10",
    filter: "high-demand",
  },
  {
    emoji: "💎",
    text: "Premium Quiet Spaces Available",
    color: "from-accent/10 to-primary/10",
    filter: "quiet-premium",
  },
  {
    emoji: "⚡",
    text: "Seats Filling Fast Nearby",
    color: "from-success/10 to-primary/10",
    filter: "low-availability",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent(next);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % banners.length, 1), 4000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((current + 1) % banners.length, 1);
      else goTo((current - 1 + banners.length) % banners.length, -1);
    }
    setTouchStart(null);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg mb-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`p-4 bg-gradient-to-r ${banners[current].color} rounded-lg`}
        >
          <p className="text-lg font-semibold text-foreground leading-snug">
            {banners[current].emoji} {banners[current].text}
          </p>
          <button
            onClick={() => navigate(`/?filter=${banners[current].filter}`)}
            className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-transform duration-200 ease-studi active:scale-95"
          >
            Explore
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 pb-3 pt-1">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-4" : "bg-muted-foreground/30 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
