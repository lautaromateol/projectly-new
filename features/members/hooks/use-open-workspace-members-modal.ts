import { create } from "zustand"

interface UseOpenWorkspaceMembersModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useOpenWorkspaceMembersModal = create<UseOpenWorkspaceMembersModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))