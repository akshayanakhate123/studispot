import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Wallet, ChevronRight, LogOut, CreditCard, UserPen, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWallet } from "@/lib/wallet-context";
import AddMoneyModal from "@/components/AddMoneyModal";
import EditProfileModal from "@/components/EditProfileModal";
import { format } from "date-fns";

export default function ProfilePage() {
  const { profile, balance, transactions } = useWallet();
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const displayDob = (() => {
    try {
      return format(new Date(profile.dob), "dd MMM yyyy");
    } catch {
      return profile.dob;
    }
  })();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-12 pb-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="text-label text-primary mb-1">STUDI SPOT</p>
          <h1 className="text-display text-foreground">Profile</h1>
        </motion.div>
      </div>

      <div className="px-4 max-w-lg mx-auto space-y-6">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-card rounded-lg p-5 shadow-card"
        >
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.college}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Age", value: profile.age },
              { label: "Gender", value: profile.gender },
              { label: "DOB", value: displayDob },
            ].map((item) => (
              <div key={item.label} className="bg-muted/50 rounded-md p-2.5 text-center">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-card rounded-lg p-5 shadow-card"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-success/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wallet Balance</p>
                <p className="text-data text-foreground">₹{balance}</p>
              </div>
            </div>
            <button
              onClick={() => setAddMoneyOpen(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-transform duration-200 ease-studi active:scale-95"
            >
              Add Money
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-card rounded-lg shadow-card overflow-hidden"
        >
          {[
            { icon: UserPen, label: "Edit Profile", action: () => setEditOpen(true) },
            { icon: CreditCard, label: "Payment History", action: () => setShowHistory(!showHistory) },
            { icon: LogOut, label: "Logout", destructive: true, action: () => {} },
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center justify-between px-5 py-4 transition-colors duration-150 active:bg-muted/50 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`w-4.5 h-4.5 ${item.destructive ? "text-destructive" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-sm font-medium ${item.destructive ? "text-destructive" : "text-foreground"}`}
                >
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          ))}
        </motion.div>

        {/* Payment History */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label text-muted-foreground mb-3">PAYMENT HISTORY</p>
            <div className="space-y-2">
              {transactions.map((t) => (
                <div key={t.id} className="bg-card rounded-lg p-4 shadow-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        t.type === "credit" ? "bg-success/10" : "bg-destructive/10"
                      }`}
                    >
                      {t.type === "credit" ? (
                        <ArrowDownLeft className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.description}</p>
                      <p className="text-xs text-muted-foreground">{format(t.date, "dd MMM yyyy")}</p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      t.type === "credit" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {t.type === "credit" ? "+" : "−"}₹{t.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AddMoneyModal open={addMoneyOpen} onOpenChange={setAddMoneyOpen} />
      <EditProfileModal open={editOpen} onOpenChange={setEditOpen} />
      <BottomNav />
    </div>
  );
}
