import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: Date;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  dob: string;
  college: string;
}

interface WalletState {
  balance: number;
  transactions: Transaction[];
  profile: UserProfile;
  addMoney: (amount: number) => void;
  deductMoney: (amount: number, description: string) => boolean;
  updateProfile: (profile: UserProfile) => void;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

const initialTransactions: Transaction[] = [
  { id: "t1", type: "credit", amount: 500, description: "Wallet Top-up", date: new Date("2026-03-10") },
  { id: "t2", type: "debit", amount: 320, description: "The Quiet Bean – 4h session", date: new Date("2026-03-15") },
  { id: "t3", type: "debit", amount: 120, description: "StudyNest – 2h session", date: new Date("2026-03-12") },
  { id: "t4", type: "credit", amount: 1000, description: "Wallet Top-up", date: new Date("2026-03-08") },
  { id: "t5", type: "debit", amount: 1200, description: "WorkHub Co. – 8h session", date: new Date("2026-03-08") },
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(480);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Arjun Mehta",
    age: 21,
    gender: "Male",
    dob: "2004-08-14",
    college: "Delhi University – Hansraj College",
  });

  const addMoney = (amount: number) => {
    setBalance((b) => b + amount);
    setTransactions((t) => [
      { id: `t${Date.now()}`, type: "credit", amount, description: "Wallet Top-up", date: new Date() },
      ...t,
    ]);
  };

  const deductMoney = (amount: number, description: string): boolean => {
    if (balance < amount) return false;
    setBalance((b) => b - amount);
    setTransactions((t) => [
      { id: `t${Date.now()}`, type: "debit", amount, description, date: new Date() },
      ...t,
    ]);
    return true;
  };

  const updateProfile = (p: UserProfile) => setProfile(p);

  return (
    <WalletContext.Provider value={{ balance, transactions, profile, addMoney, deductMoney, updateProfile }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
