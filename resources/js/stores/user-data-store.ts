import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface UserData {
    name: string
    phone: string
    address: string
}

interface UserDataStore {
    userData: UserData
    setUserData: (userData: UserData) => void
    clearUserData: () => void
}

export const useUserDataStore = create<UserDataStore>()(
    persist(
        (set) => ({
            userData: {
                name: '',
                phone: '',
                address: '',
            },
            setUserData: (userData) => set({ userData }),
            clearUserData: () => set({ userData: { name: '', phone: '', address: '' } }),
        }),
        {
            name: 'user-data-store',
        }
    )
);









