import { studySpaces } from "@/lib/mock-data";
import SpaceCard from "@/components/SpaceCard";
import BottomNav from "@/components/BottomNav";
import HeroBanner from "@/components/HeroBanner";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  let sorted = [...studySpaces].sort((a, b) => a.distanceMeters - b.distanceMeters);

  // Apply banner filters
  if (filter === "high-demand") {
    sorted = sorted.filter((s) => s.confidenceScore >= 80);
  } else if (filter === "quiet-premium") {
    sorted = sorted.filter(
      (s) => s.hasFocusGuarantee || s.zones.some((z) => z.type === "quiet" && z.availableSeats > 5)
    );
  } else if (filter === "low-availability") {
    sorted = sorted.filter(
      (s) => s.zones.reduce((a, z) => a + z.availableSeats, 0) <= 10
    );
  }

  const bestId = sorted.length
    ? sorted.reduce((best, s) => (s.confidenceScore > best.confidenceScore ? s : best), sorted[0]).id
    : "";

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-10 pb-2 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="text-label text-primary mb-1">STUDI SPOT</p>
        </motion.div>

        <HeroBanner />

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-display text-foreground">
              {filter ? "Filtered Results" : <>Available in<br />the next 10 mins</>}
            </h1>
            {filter && (
              <a href="/" className="text-sm font-medium text-primary">
                Clear
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            {sorted.reduce((s, sp) => s + sp.zones.reduce((a, z) => a + z.availableSeats, 0), 0)} seats nearby right now
          </p>
        </motion.div>
      </div>

      <div className="px-4 space-y-3 max-w-lg mx-auto">
        {sorted.length === 0 ? (
          <div className="bg-card rounded-lg p-6 shadow-card text-center">
            <p className="text-sm text-muted-foreground">No spaces match this filter</p>
            <a href="/" className="mt-2 inline-block text-sm font-medium text-primary">
              View all spaces
            </a>
          </div>
        ) : (
          sorted.map((space, i) => (
            <SpaceCard key={space.id} space={space} index={i} isBest={space.id === bestId} />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
