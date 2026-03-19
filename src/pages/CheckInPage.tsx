import { useNavigate } from "react-router-dom";
import { useBooking } from "@/lib/booking-context";
import { motion } from "framer-motion";
import { QrCode, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CheckInPage() {
  const navigate = useNavigate();
  const { currentBooking, checkIn } = useBooking();
  const [checking, setChecking] = useState(false);
  const [done, setDone] = useState(false);

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

  const handleCheckIn = () => {
    setChecking(true);
    setTimeout(() => {
      checkIn();
      setDone(true);
      setTimeout(() => navigate("/session"), 1200);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {done ? (
            <>
              <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-4" strokeWidth={1.5} />
              <h1 className="text-display text-foreground mb-2">Checked In!</h1>
              <p className="text-sm text-muted-foreground">Starting your session...</p>
            </>
          ) : (
            <>
              <div className="w-48 h-48 mx-auto bg-card shadow-card rounded-lg flex items-center justify-center mb-6">
                <QrCode className="w-24 h-24 text-foreground/30" strokeWidth={1} />
              </div>
              <h1 className="text-display text-foreground mb-2">Scan & Check In</h1>
              <p className="text-sm text-muted-foreground mb-8">
                Scan the QR at the venue, or tap below
              </p>
              <button
                onClick={handleCheckIn}
                disabled={checking}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-semibold text-sm transition-all duration-200 ease-studi active:scale-95 min-h-[44px] disabled:opacity-70"
              >
                {checking ? "Verifying..." : "I'm Here"}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
