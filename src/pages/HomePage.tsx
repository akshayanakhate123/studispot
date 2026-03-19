import { studySpaces } from "@/lib/mock-data";
import SpaceCard from "@/components/SpaceCard";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";

export default function HomePage() {
  const sorted = [...studySpaces].sort((a, b) => a.distanceMeters - b.distanceMeters);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-12 pb-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="text-label text-primary mb-1">STUDI</p>
          <h1 className="text-display text-foreground">Available in<br />the next 10 mins</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {sorted.reduce((s, sp) => s + sp.zones.reduce((a, z) => a + z.availableSeats, 0), 0)} seats nearby right now
          </p>
        </motion.div>
      </div>

      <div className="px-4 space-y-3 max-w-lg mx-auto">
        {sorted.map((space, i) => (
          <SpaceCard key={space.id} space={space} index={i} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
