import { create } from "zustand"

interface UseTaskDetailModalProps {
  id?: string;
  isOpen: boolean;
  open: (id: string) => void;
  close: () => void;
}

export const useTaskDetailModal = create<UseTaskDetailModalProps>((set) => ({
  id: undefined,
  isOpen: false,
  open: (id: string) => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: undefined })
}))