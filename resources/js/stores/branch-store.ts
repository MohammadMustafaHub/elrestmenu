import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Branch {
  id: number
  name: string
  address: string
  phone: string
  is_open: boolean
}

interface BranchStore {
  selectedBranch: Branch | null
  setSelectedBranch: (branch: Branch) => void
  clearSelectedBranch: () => void
}

export const useBranchStore = create<BranchStore>()(
  persist(
    (set) => ({
      selectedBranch: null,
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
      clearSelectedBranch: () => set({ selectedBranch: null }),
    }),
    {
      name: 'branch-store',
    }
  )
)