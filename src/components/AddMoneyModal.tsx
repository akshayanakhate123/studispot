import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWallet } from "@/lib/wallet-context";
import { toast } from "sonner";

const presets = [100, 200, 500];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddMoneyModal({ open, onOpenChange }: Props) {
  const { addMoney } = useWallet();
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    const val = typeof amount === "number" ? amount : 0;
    if (val < 10) return;
    setLoading(true);
    setTimeout(() => {
      addMoney(val);
      toast.success(`₹${val} added successfully`);
      setAmount("");
      setLoading(false);
      onOpenChange(false);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">Add Money</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-150 active:scale-95 ${
                  amount === p
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-foreground"
                }`}
              >
                ₹{p}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Custom Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
              min={10}
              className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={!amount || (typeof amount === "number" && amount < 10) || loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm transition-transform duration-200 ease-studi active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : `Add ₹${amount || 0}`}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
