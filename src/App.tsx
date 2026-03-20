import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingProvider } from "@/lib/booking-context";
import HomePage from "./pages/HomePage";
import SpaceDetailsPage from "./pages/SpaceDetailsPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import CheckInPage from "./pages/CheckInPage";
import ActiveSessionPage from "./pages/ActiveSessionPage";
import BookingsPage from "./pages/BookingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/space/:id" element={<SpaceDetailsPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/checkin" element={<CheckInPage />} />
            <Route path="/session" element={<ActiveSessionPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
