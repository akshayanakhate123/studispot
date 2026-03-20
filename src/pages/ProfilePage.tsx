import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Wallet, ChevronRight, LogOut, CreditCard, UserPen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const user = {
  name: "Arjun Mehta",
  age: 21,
  gender: "Male",
  dob: "14 Aug 2004",
  college: "Delhi University – Hansraj College",
  walletBalance: 480,
};

export default function ProfilePage() {
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
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.college}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Age", value: user.age },
              { label: "Gender", value: user.gender },
              { label: "DOB", value: user.dob },
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
                <p className="text-data text-foreground">₹{user.walletBalance}</p>
              </div>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-transform duration-200 ease-studi active:scale-95">
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
            { icon: UserPen, label: "Edit Profile" },
            { icon: CreditCard, label: "Payment History" },
            { icon: LogOut, label: "Logout", destructive: true },
          ].map((action, i) => (
            <button
              key={action.label}
              className={`w-full flex items-center justify-between px-5 py-4 transition-colors duration-150 active:bg-muted/50 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <action.icon className={`w-4.5 h-4.5 ${action.destructive ? "text-destructive" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${action.destructive ? "text-destructive" : "text-foreground"}`}>
                  {action.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          ))}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
