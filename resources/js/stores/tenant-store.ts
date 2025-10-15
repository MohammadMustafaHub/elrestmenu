import { create } from 'zustand'
import { Tenant } from '@/types';


interface TenantStore {
    tenant: Tenant | null;
    setTenant: (tenant: Tenant) => void;
    clearTenant: () => void;
}


export const useTenantStore = create<TenantStore>()((set) => ({
    tenant: null,
    setTenant: (tenant) => set({ tenant }),
    clearTenant: () => set({ tenant: null }),
}));



