import React, { createContext, useContext, useState, ReactNode } from "react";
import { Booking, StudySpace, ZoneType } from "./types";

interface BookingState {
  currentBooking: Booking | null;
  setCurrentBooking: (booking: Booking | null) => void;
  createBooking: (space: StudySpace, zone: ZoneType, duration: number) => Booking;
  checkIn: () => void;
  endSession: () => void;
  extendSession: (hours: number) => void;
}

const BookingContext = createContext<BookingState | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const createBooking = (space: StudySpace, zone: ZoneType, duration: number): Booking => {
    const booking: Booking = {
      id: Math.random().toString(36).substring(7),
      space,
      zone,
      duration,
      totalPrice: space.pricePerHour * duration,
      startTime: new Date(),
      status: "confirmed",
    };
    setCurrentBooking(booking);
    return booking;
  };

  const checkIn = () => {
    if (currentBooking) {
      setCurrentBooking({ ...currentBooking, status: "checked-in" });
    }
  };

  const endSession = () => {
    if (currentBooking) {
      setCurrentBooking({ ...currentBooking, status: "completed" });
    }
  };

  const extendSession = (hours: number) => {
    if (currentBooking) {
      setCurrentBooking({
        ...currentBooking,
        duration: currentBooking.duration + hours,
        totalPrice: currentBooking.totalPrice + currentBooking.space.pricePerHour * hours,
      });
    }
  };

  return (
    <BookingContext.Provider value={{ currentBooking, setCurrentBooking, createBooking, checkIn, endSession, extendSession }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
