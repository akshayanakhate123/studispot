import { useParams, useNavigate } from "react-router-dom";
import { studySpaces } from "@/lib/mock-data";
import { ZoneType } from "@/lib/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, EarOff, Users, Wifi, Zap, Wind, Coffee, MapPin, Clock, Shield } from "lucide-react";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Charging: Zap,
  AC: Wind,
  Coffee: Coffee,
};

const durations = [
  { label: "2 Hours", value: 2 },
  { label: "4 Hours", value: 4 },
  { label: "Full Session", value: 8 },
];

export default function SpaceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const space = studySpaces.find((s) => s.id === id);
  const [selectedZone, setSelectedZone] = useState<ZoneType>("quiet");
  const [selectedDuration, setSelectedDuration] = useState(2);

  if (!space) return <div className="p-4 text-center text-muted-foreground">Space not found</div>;

  const handleBook = () => {
    navigate(`/booking/${space.id}?zone=${selectedZone}&duration=${selectedDuration}`);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-4 pt-6 max-w-lg mx-auto">
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-4 min-h-[44px]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="flex items-start justify-between mb-1">
            <h1 className="text-display text-foreground">{space.name}</h1>
            {space.hasFocusGuarantee && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-accent/10 text-accent text-xs font-semibold flex-shrink-0 ml-2">
                <Shield className="w-3.5 h-3.5" />
                Focus Guarantee
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{space.distance}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{space.openingHours}</span>
          </div>

          {/* Confidence */}
          <div className="bg-success/5 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Seat Confidence</p>
                <p className="text-xs text-muted-foreground mt-0.5">Based on time, noise, and past data</p>
              </div>
              <span className="text-data text-success">{space.confidenceScore}%</span>
            </div>
          </div>

          {/* Zone Selector */}
          <p className="text-label text-muted-foreground mb-3">SELECT ZONE</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {space.zones.map((zone) => (
              <button
                key={zone.type}
                onClick={() => setSelectedZone(zone.type)}
                className={`rounded-md p-4 text-left transition-all duration-200 ease-studi min-h-[88px] ${
                  selectedZone === zone.type
                    ? "shadow-card-hover bg-primary/5 ring-1 ring-primary/20"
                    : "shadow-card bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {zone.type === "quiet" ? (
                    <EarOff className={`w-5 h-5 ${selectedZone === zone.type ? "text-primary" : "text-muted-foreground"}`} />
                  ) : (
                    <Users className={`w-5 h-5 ${selectedZone === zone.type ? "text-primary" : "text-muted-foreground"}`} />
                  )}
                  <span className="font-medium text-sm text-foreground capitalize">{zone.type} Zone</span>
                </div>
                <p className="text-data text-foreground">{zone.availableSeats} <span className="text-xs text-muted-foreground font-normal">/ {zone.totalSeats} seats</span></p>
              </button>
            ))}
          </div>

          {/* Amenities */}
          <p className="text-label text-muted-foreground mb-3">AMENITIES</p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {space.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <div key={amenity} className="flex items-center gap-2 py-2 px-3 rounded-md bg-card shadow-card">
                  {Icon ? <Icon className="w-4 h-4 text-muted-foreground" /> : null}
                  <span className="text-sm text-foreground">{amenity}</span>
                </div>
              );
            })}
          </div>

          {/* Duration */}
          <p className="text-label text-muted-foreground mb-3">DURATION</p>
          <div className="flex gap-2 mb-6">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className={`flex-1 py-3 rounded-md text-sm font-medium transition-all duration-200 ease-studi min-h-[44px] ${
                  selectedDuration === d.value
                    ? "bg-primary text-primary-foreground shadow-card-hover"
                    : "bg-card text-foreground shadow-card"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-card safe-bottom z-50">
        <div className="px-4 py-3 max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="text-data text-foreground">
              {space.pricePerHour === 0 ? "Free" : `₹${space.pricePerHour * selectedDuration}`}
            </p>
            <p className="text-xs text-muted-foreground">{selectedDuration}h · {selectedZone} zone</p>
          </div>
          <button
            onClick={handleBook}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm transition-transform duration-200 ease-studi active:scale-95 min-h-[44px]"
          >
            Book Seat
          </button>
        </div>
      </div>
    </div>
  );
}
