import { useNavigate } from "react-router-dom";
import { useBooking } from "@/lib/booking-context";
import { motion } from "framer-motion";
import { CheckCircle2, QrCode, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { currentBooking } = useBooking();
  const [holdTime, setHoldTime] = useState(20 * 60); // 20 min in seconds

  useEffect(() => {
    if (holdTime <= 0) return;
    const timer = setInterval(() => setHoldTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [holdTime]);

  if (!currentBooking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No active booking</p>
          <button onClick={() => navigate("/")} className="text-primary font-medium">Go Home</button>
        </div>
      </div>
    );
  }

  const mins = Math.floor(holdTime / 60);
  const secs = holdTime % 60;

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-4 pt-12 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-success" strokeWidth={1.5} />
          </div>
          <h1 className="text-display text-foreground mb-2">Booking Confirmed</h1>
          <p className="text-sm text-muted-foreground mb-8">Your seat is held for 20 minutes</p>

          {/* QR Code */}
          <div className="bg-card rounded-lg shadow-card p-6 mb-6 inline-block">
            <div className="w-48 h-48 mx-auto bg-foreground/5 rounded-md flex items-center justify-center border border-primary/20">
              <QrCode className="w-24 h-24 text-foreground/30" strokeWidth={1} />
            </div>
            <p className="text-xs text-muted-foreground mt-3">Show this at the venue</p>
          </div>

          {/* Timer */}
          <div className="bg-card rounded-lg shadow-card p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Seat held for</p>
            <p className="text-3xl font-semibold text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </p>
          </div>

          {/* Details */}
          <div className="bg-card rounded-lg shadow-card p-4 text-left space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{currentBooking.space.name}</p>
                <p className="text-sm text-muted-foreground">{currentBooking.space.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <p className="text-sm text-foreground capitalize">{currentBooking.zone} zone · {currentBooking.duration}h</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed CTAs */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-card safe-bottom z-50">
        <div className="px-4 py-3 max-w-lg mx-auto flex gap-3">
          <button
            onClick={() => window.open("https://maps.google.com", "_blank")}
            className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-md font-medium text-sm min-h-[44px]"
          >
            Directions
          </button>
          <button
            onClick={() => navigate("/checkin")}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm transition-transform duration-200 ease-studi active:scale-95 min-h-[44px]"
          >
            Check In
          </button>
        </div>
      </div>
    </div>
  );
}
