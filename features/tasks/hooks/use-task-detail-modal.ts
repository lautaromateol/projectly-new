import { create } from "zustand"

interface UseTaskDetailModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useTaskDetailModal = create<UseTaskDetailModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))