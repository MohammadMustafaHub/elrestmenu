import { create } from 'zustand'
import { Branch } from '@/types';


interface BranchesStore {
    branches: Branch[] | [];
    setBranches: (branches: Branch[]) => void;
    clearBranches: () => void;
}


export const useBranchesCacheStore = create<BranchesStore>()((set) => ({
    branches: [],
    setBranches: (branches) => set({ branches }),
    clearBranches: () => set({ branches: [] }),
}));



