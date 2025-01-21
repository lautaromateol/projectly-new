import { create } from "zustand"

interface UseUpdateProjectModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useUpdateProjectModal = create<UseUpdateProjectModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))