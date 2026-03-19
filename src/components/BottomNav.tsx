import { useNavigate, useLocation } from "react-router-dom";
import { Search, CalendarCheck, User } from "lucide-react";

const tabs = [
  { label: "Search", icon: Search, path: "/" },
  { label: "Bookings", icon: CalendarCheck, path: "/bookings" },
  { label: "Profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card shadow-card safe-bottom z-50">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 min-w-[64px] py-2 transition-colors duration-200 ease-studi ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
