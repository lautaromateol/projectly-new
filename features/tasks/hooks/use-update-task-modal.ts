import { create } from "zustand"

interface UseUpdateTaskModalProps {
  id?: string;
  isOpen: boolean;
  open: (id: string) => void;
  close: () => void;
}

export const useUpdateTaskModal = create<UseUpdateTaskModalProps>((set) => ({
  id: undefined,
  isOpen: false,
  open: (id) => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: undefined })
}))