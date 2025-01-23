import { create } from "zustand"

interface UseCreateTaskModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateTaskModal = create<UseCreateTaskModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))