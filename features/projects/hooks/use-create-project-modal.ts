import { create } from "zustand"

interface UseCreateProjectModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateProjectModal = create<UseCreateProjectModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))