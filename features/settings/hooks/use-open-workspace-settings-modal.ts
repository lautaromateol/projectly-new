import { create } from "zustand"

interface UseOpenWorkspaceSettingsModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useOpenWorkspaceSettingsModal = create<UseOpenWorkspaceSettingsModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))