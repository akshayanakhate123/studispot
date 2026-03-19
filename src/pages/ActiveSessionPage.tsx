import { useNavigate } from "react-router-dom";
import { useBooking } from "@/lib/booking-context";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function ActiveSessionPage() {
  const navigate = useNavigate();
  const { currentBooking, endSession, extendSession } = useBooking();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!currentBooking || currentBooking.status === "completed") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No active session</p>
          <button onClick={() => navigate("/")} className="text-primary font-medium">Go Home</button>
        </div>
      </div>
    );
  }

  const totalSeconds = currentBooking.duration * 3600;
  const remaining = Math.max(totalSeconds - elapsed, 0);
  const hours = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;
  const progress = ((totalSeconds - remaining) / totalSeconds) * 100;

  const handleEnd = () => {
    endSession();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-4 pt-6 max-w-lg mx-auto">
        {/* Session banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-primary rounded-lg p-4 mb-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-primary-foreground/70" />
            <p className="text-xs text-primary-foreground/70 font-medium">SESSION ACTIVE</p>
          </div>
          <p className="text-3xl font-semibold text-primary-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>
            {String(hours).padStart(2, "0")}:{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </p>
          <div className="mt-3 h-1 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary-foreground/60 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>

        {/* Location info */}
        <div className="bg-card rounded-lg shadow-card p-4 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">{currentBooking.space.name}</p>
              <p className="text-sm text-muted-foreground capitalize">{currentBooking.zone} zone · {currentBooking.duration}h booked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTAs */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-card safe-bottom z-50">
        <div className="px-4 py-3 max-w-lg mx-auto flex gap-3">
          <button
            onClick={() => extendSession(1)}
            className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-md font-medium text-sm min-h-[44px]"
          >
            Extend +1h
          </button>
          <button
            onClick={handleEnd}
            className="flex-1 bg-destructive/10 text-destructive py-3 rounded-md font-medium text-sm min-h-[44px]"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  );
}
