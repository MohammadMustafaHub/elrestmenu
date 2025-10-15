"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import ProductAddonModal from "./product-addon-modal"
import { useCartStore } from "@/stores/cart-store"
import { useBranchStore } from "@/stores/branch-store"
import { Product } from '@/types';
import { useTenantStore } from '@/stores/tenant-store';

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [showAddonModal, setShowAddonModal] = useState(false)
    const { addItem } = useCartStore()
    const { selectedBranch } = useBranchStore()
    const { tenant } = useTenantStore()

    const isUnavailable = !product.is_active ||
        (selectedBranch ? product.branches_unavailable.includes(selectedBranch.id.toString()) : false)

    const isDeliveryAllowed = tenant?.delivery_settings?.allow_delivery ?? false

    const openAddonModal = () => setShowAddonModal(true)
    const closeAddonModal = () => setShowAddonModal(false)

    const handleAddToCart = (quantity: number, selectedAddons: any[], selectedOptions: any[]) => {
        if (isUnavailable) return

        const addonString = selectedAddons.map(a => `${a.name}:1`).sort().join(",")
        const optionString = selectedOptions.map(o => `${o.name}:1`).sort().join(",")
        const cartItemKey = `${product.id}-${addonString}-${optionString}`

        const cartAddons = selectedAddons.map(addon => ({ name: addon.name, price: Number(addon.price) || 0 }))
        const cartOptions = selectedOptions.map(option => ({ name: option.name, price: Number(option.price) || 0 }))

        addItem({
            productId: product.id,
            addons: cartAddons,
            options: cartOptions,
            name: product.name,
            price: Number(product.discounted_price || product.price) || 0,
            quantity,
            key: cartItemKey,
            product: product,
        })

        closeAddonModal()
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg flex flex-col h-full">
                {/* Image */}
                <div className="relative flex-shrink-0">
                    <img
                        src={`https://images.elrestmenu.com/${product.image}`}
                        alt={product.name}
                        className="w-full h-36 object-contain"
                    />
                    {product.discounted_price && product.discounted_price < product.price && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {Math.round(((product.price - product.discounted_price) / product.price) * 100)}% خصم
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold mb-1">{product.name}</h3>


                        <div className="flex items-center justify-between mb-3">
                            {product.discounted_price && product.discounted_price < product.price ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-orange-600">{product.discounted_price.toLocaleString()} د.ع</span>
                                    <span className="text-sm text-gray-500 line-through">{product.price.toLocaleString()} د.ع</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold text-orange-600">{product.price.toLocaleString()} د.ع</span>
                            )}
                        </div>
                    </div>

                    {/* Button */}
                    <div>
                        {isDeliveryAllowed ? (
                            <button
                                className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                    isUnavailable
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                                }`}
                                onClick={openAddonModal}
                                disabled={isUnavailable}
                            >
                                <Plus className="w-4 h-4" />
                                {isUnavailable ? 'غير متوفر' : 'إضافة للسلة'}
                            </button>
                        ) : (
                            <button
                                className="w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                                onClick={openAddonModal}
                            >
                                <Plus className="w-4 h-4" />
                                عرض التفاصيل
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Addon Modal */}
            <ProductAddonModal
                isOpen={showAddonModal}
                onClose={closeAddonModal}
                product={product}
                onAddToCart={handleAddToCart}
            />
        </>
    )
}
