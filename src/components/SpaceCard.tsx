import { StudySpace } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Shield, Zap } from "lucide-react";

interface SpaceCardProps {
  space: StudySpace;
  index: number;
  isBest?: boolean;
}

export default function SpaceCard({ space, index, isBest }: SpaceCardProps) {
  const navigate = useNavigate();
  const totalAvailable = space.zones.reduce((s, z) => s + z.availableSeats, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      onClick={() => navigate(`/space/${space.id}`)}
      className={`bg-card rounded-lg p-4 transition-shadow duration-200 ease-studi cursor-pointer active:scale-[0.98] ${
        isBest ? "shadow-card-hover ring-1 ring-primary/20" : "shadow-card hover:shadow-card-hover"
      }`}
    >
      {isBest && (
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary">Best Option Right Now</span>
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{space.name}</h3>
            {space.hasFocusGuarantee && (
              <Shield className="w-4 h-4 text-accent flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{space.distance}</span>
            <span className="mx-1">·</span>
            <span className="capitalize">{space.type}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-3">
          <p className="text-data text-foreground">{totalAvailable}</p>
          <p className="text-xs text-muted-foreground">seats</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-success/10 text-success text-xs font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
            {space.confidenceScore}% sure
          </span>
          {space.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted text-muted-foreground text-xs">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm font-semibold text-foreground flex-shrink-0 ml-2" style={{ fontVariantNumeric: "tabular-nums" }}>
          {space.pricePerHour === 0 ? "Free" : `₹${space.pricePerHour}/hr`}
        </p>
      </div>
    </motion.div>
  );
}
