import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWallet, UserProfile } from "@/lib/wallet-context";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileModal({ open, onOpenChange }: Props) {
  const { profile, updateProfile } = useWallet();
  const [form, setForm] = useState<UserProfile>({ ...profile });

  const handleSave = () => {
    if (!form.name.trim() || !form.college.trim()) return;
    updateProfile(form);
    toast.success("Profile updated");
    onOpenChange(false);
  };

  const field = (label: string, key: keyof UserProfile, type = "text") => (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      {key === "gender" ? (
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      ) : (
        <input
          type={type}
          value={form[key] as string | number}
          onChange={(e) =>
            setForm({ ...form, [key]: key === "age" ? Number(e.target.value) : e.target.value })
          }
          className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          {field("Name", "name")}
          {field("Age", "age", "number")}
          {field("Gender", "gender")}
          {field("Date of Birth", "dob", "date")}
          {field("College", "college")}

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 py-2.5 rounded-md text-sm font-medium bg-muted/60 text-foreground transition-transform duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-md text-sm font-semibold bg-primary text-primary-foreground transition-transform duration-200 active:scale-95"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
