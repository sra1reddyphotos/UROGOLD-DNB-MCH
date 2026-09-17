import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  read: Record<string, number>;
  saved: string[];
  notes: Record<string, string>;
  markRead: (id: string) => void;
  toggleSaved: (id: string) => void;
  setNote: (id: string, note: string) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      read: {},
      saved: [],
      notes: {},
      markRead: (id) =>
        set({
          read: { ...get().read, [id]: Date.now() },
        }),
      toggleSaved: (id) => {
        const saved = get().saved;
        set({
          saved: saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id],
        });
      },
      setNote: (id, note) =>
        set({
          notes: { ...get().notes, [id]: note },
        }),
    }),
    { name: "uroatlas-progress-v1" },
  ),
);
