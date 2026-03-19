import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { studySpaces } from "@/lib/mock-data";
import { ZoneType } from "@/lib/types";
import { useBooking } from "@/lib/booking-context";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, CreditCard } from "lucide-react";

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  const space = studySpaces.find((s) => s.id === id);
  const zone = (searchParams.get("zone") as ZoneType) || "quiet";
  const duration = Number(searchParams.get("duration")) || 2;

  if (!space) return <div className="p-4 text-center text-muted-foreground">Space not found</div>;

  const totalPrice = space.pricePerHour * duration;

  const handleConfirm = () => {
    createBooking(space, zone, duration);
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-4 pt-6 max-w-lg mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-4 min-h-[44px]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}>
          <h1 className="text-display text-foreground mb-6">Confirm Booking</h1>

          <div className="bg-card rounded-lg shadow-card p-4 space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{space.name}</p>
                <p className="text-sm text-muted-foreground">{space.distance} · {space.type}</p>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground capitalize">{zone} Zone · {duration} Hours</p>
                <p className="text-sm text-muted-foreground">Starting now</p>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  {totalPrice === 0 ? "Free" : `₹${totalPrice}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {space.pricePerHour === 0 ? "No charge" : `₹${space.pricePerHour}/hr × ${duration}h`}
                </p>
              </div>
            </div>
          </div>

          {/* Mock Payment */}
          <div className="bg-card rounded-lg shadow-card p-4 mb-6">
            <p className="text-label text-muted-foreground mb-3">PAYMENT</p>
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
              <div className="w-10 h-7 rounded bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">UPI / Card</p>
                <p className="text-xs text-muted-foreground">Mock payment</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-card safe-bottom z-50">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <button
            onClick={handleConfirm}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-semibold text-sm transition-transform duration-200 ease-studi active:scale-95 min-h-[44px]"
          >
            {totalPrice === 0 ? "Confirm Booking" : `Pay ₹${totalPrice} & Confirm`}
          </button>
        </div>
      </div>
    </div>
  );
}
