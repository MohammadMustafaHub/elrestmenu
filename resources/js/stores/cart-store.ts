import { create } from 'zustand'
import { Product } from '@/types';

interface Addon {
    name: string
    price: number
}

interface Option {
    name: string
    price: number
}

interface CartItem {
    product: Product
    productId: string
    addons: Addon[]
    options: Option[]
    name: string
    price: number
    quantity: number
    key: string // Unique key for the cart item using productId and selected addons/options
}

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (key: string) => void
    updateItemQuantity: (key: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    addItem: (item: CartItem) => set((state) => {
        const existingItemIndex = state.items.findIndex(i => i.key === item.key);
        if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { items: updatedItems };
        }
        return { items: [...state.items, item] };
    }),
    removeItem: (key: string) => set((state) => ({
        items: state.items.filter(item => item.key !== key)
    })),
    updateItemQuantity: (key: string, quantity: number) => set((state) => {
        if (quantity <= 0) {
            return { items: state.items.filter(item => item.key !== key) };
        }
        const updatedItems = state.items.map(item =>
            item.key === key ? { ...item, quantity } : item
        );
        return { items: updatedItems };
    }),
    clearCart: () => set({ items: [] }),
    getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => {
            const itemPrice = Number(item.price) || 0;
            const addonsPrice = item.addons.reduce((addonTotal, addon) => addonTotal + (Number(addon.price) || 0), 0);
            const optionsPrice = item.options.reduce((optionTotal, option) => optionTotal + (Number(option.price) || 0), 0);
            const itemTotal = itemPrice + addonsPrice + optionsPrice;
            return total + (itemTotal * item.quantity);
        }, 0);
    }
}))





