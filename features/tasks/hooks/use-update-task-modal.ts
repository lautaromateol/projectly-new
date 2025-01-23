import { create } from "zustand"

interface UseUpdateTaskModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useUpdateTaskModal = create<UseUpdateTaskModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))