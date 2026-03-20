import { useBooking } from "@/lib/booking-context";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Clock, MapPin, QrCode, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pastBookings = [
  { id: "h1", name: "The Quiet Bean", date: "15 Mar 2026, 2:00 PM", duration: "4 hours", amount: "₹320", status: "Completed" },
  { id: "h2", name: "StudyNest", date: "12 Mar 2026, 10:00 AM", duration: "2 hours", amount: "₹120", status: "Completed" },
  { id: "h3", name: "WorkHub Co.", date: "8 Mar 2026, 9:00 AM", duration: "8 hours", amount: "₹1,200", status: "Completed" },
];

export default function BookingsPage() {
  const { currentBooking } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-12 pb-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="text-label text-primary mb-1">STUDI SPOT</p>
          <h1 className="text-display text-foreground">Your Bookings</h1>
        </motion.div>
      </div>

      <div className="px-4 max-w-lg mx-auto space-y-6">
        {/* Current Booking */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="text-label text-muted-foreground mb-3">CURRENT BOOKING</p>
          {currentBooking && (currentBooking.status === "confirmed" || currentBooking.status === "checked-in") ? (
            <div className="bg-card rounded-lg p-4 shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{currentBooking.space.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentBooking.space.distance}</span>
                    <span className="mx-1">·</span>
                    <span className="capitalize">{currentBooking.zone} zone</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${
                  currentBooking.status === "checked-in"
                    ? "bg-success/10 text-success"
                    : "bg-primary/10 text-primary"
                }`}>
                  {currentBooking.status === "checked-in" ? "Active" : "Confirmed"}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentBooking.duration}h session</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR Ready</span>
                </div>
              </div>

              <button
                onClick={() => navigate(currentBooking.status === "checked-in" ? "/session" : "/checkin")}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold transition-transform duration-200 ease-studi active:scale-95"
              >
                {currentBooking.status === "checked-in" ? "View Session" : "Check In"}
              </button>
            </div>
          ) : (
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <CalendarCheck className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No active booking</p>
              <button
                onClick={() => navigate("/")}
                className="mt-3 text-sm font-medium text-primary"
              >
                Find a space →
              </button>
            </div>
          )}
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="text-label text-muted-foreground mb-3">BOOKING HISTORY</p>
          <div className="space-y-2">
            {pastBookings.map((b) => (
              <div key={b.id} className="bg-card rounded-lg p-4 shadow-card">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{b.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.date}</p>
                  </div>
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-sm">
                    {b.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{b.duration}</span>
                  <span>·</span>
                  <span className="font-semibold text-foreground">{b.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
}
