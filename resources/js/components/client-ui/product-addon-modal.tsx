"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, X } from "lucide-react"
import { useTenantStore } from "@/stores/tenant-store"
import { Addon, Option, Product } from '@/types';

interface ProductAddonModalProps {
    isOpen: boolean
    onClose: () => void
    product: Product
    onAddToCart: (quantity: number, selectedAddons: Addon[], selectedOptions: Option[]) => void
}

export default function ProductAddonModal({ isOpen, onClose, product, onAddToCart }: ProductAddonModalProps) {
    const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set())
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [productQuantity, setProductQuantity] = useState(1)
    const { tenant } = useTenantStore()

    const isDeliveryAllowed = tenant?.delivery_settings?.allow_delivery ?? false

    useEffect(() => {
        if (isOpen) {
            setSelectedAddons(new Set())
            setSelectedOption(null)
            setProductQuantity(1)
        }
    }, [isOpen])

    const toggleAddon = (addonName: string) => {
        setSelectedAddons(prev => {
            const newSet = new Set(prev)
            if (newSet.has(addonName)) newSet.delete(addonName)
            else newSet.add(addonName)
            return newSet
        })
    }

    const toggleOption = (optionName: string) => {
        setSelectedOption(prev => prev === optionName ? null : optionName)
    }

    const calculateTotalPrice = () => {
        const basePrice = (product.discounted_price || product.price) * productQuantity
        const addonsPrice = product.addons.filter(a => selectedAddons.has(a.name)).reduce((sum, a) => sum + a.price * productQuantity, 0)
        const optionsPrice = selectedOption ? (product.options.find(o => o.name === selectedOption)?.price || 0) * productQuantity : 0
        return basePrice + addonsPrice + optionsPrice
    }

    const handleAddToCart = () => {
        const addonsArray = product.addons.filter(a => selectedAddons.has(a.name))
        const optionsArray = selectedOption ? product.options.filter(o => o.name === selectedOption) : []
        onAddToCart(productQuantity, addonsArray, optionsArray)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
            <div className="bg-white w-full md:w-96 md:rounded-lg max-h-[90vh] overflow-y-auto">

                {/* Modal Header with only Close Button */}
                <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-end">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Product Image */}
                <div className="p-4">
                    <img
                        src={`https://images.elrestmenu.com/${product.image}`}
                        alt={product.name}
                        className="w-full h-48 object-contain rounded-lg mb-4"
                    />

                    <h3 className="text-lg font-bold">{product.name}</h3>
                    {/* The `break-words` class is added here */}
                    <p className="text-gray-600 text-sm mt-1 mb-4 break-words">
                        {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                        {product.discounted_price && product.discounted_price < product.price ? (
                            <>
                                <div className="text-xl font-bold text-orange-600">{product.discounted_price.toLocaleString()} د.ع</div>
                                <div className="text-sm text-gray-500 line-through">{product.price.toLocaleString()} د.ع</div>
                            </>
                        ) : (
                            <div className="text-xl font-bold text-orange-600">{product.price.toLocaleString()} د.ع</div>
                        )}
                    </div>
                </div>

                {/* Options */}
                {product.options.length > 0 && (
                    <div className="px-4 mb-4">
                        <h4 className="font-bold mb-3">الخيارات</h4>
                        <div className="space-y-3">
                            {product.options.map((option, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                    <div className="flex-1">
                                        <div className="font-medium">{option.name}</div>
                                        <div className="text-sm text-orange-600">+{option.price} د.ع</div>
                                    </div>
                                    {isDeliveryAllowed && (
                                        <button
                                            onClick={() => toggleOption(option.name)}
                                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                selectedOption === option.name
                                                    ? "bg-orange-600 text-white"
                                                    : "bg-white text-orange-600 border border-orange-600"
                                            }`}
                                        >
                                            {selectedOption === option.name ? "مُحدد" : "تحديد"}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity Selector */}
                {isDeliveryAllowed && (
                    <div className="px-4 mb-4">
                        <h4 className="font-bold mb-2">الكمية</h4>
                        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-2 w-32">
                            <button
                                onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                                className="text-orange-600 hover:bg-orange-100 p-1 rounded transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-orange-600 mx-4">{productQuantity}</span>
                            <button
                                onClick={() => setProductQuantity(productQuantity + 1)}
                                className="text-orange-600 hover:bg-orange-100 p-1 rounded transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Addons */}
                {product.addons.length > 0 && (
                    <div className="px-4 mb-4">
                        <h4 className="font-bold mb-3">الإضافات</h4>
                        <div className="space-y-3">
                            {product.addons.map((addon, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                    <div className="flex-1">
                                        <div className="font-medium">{addon.name}</div>
                                        <div className="text-sm text-orange-600">{addon.price} د.ع</div>
                                    </div>
                                    {isDeliveryAllowed && (
                                        <button
                                            onClick={() => toggleAddon(addon.name)}
                                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                selectedAddons.has(addon.name)
                                                    ? "bg-orange-600 text-white"
                                                    : "bg-white text-orange-600 border border-orange-600"
                                            }`}
                                        >
                                            {selectedAddons.has(addon.name) ? "تمت الإضافة" : "إضافة"}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add to Cart */}
                {isDeliveryAllowed && (
                    <div className="sticky bottom-0 bg-white border-t p-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition-colors"
                        >
                            إضافة للسلة - {calculateTotalPrice().toLocaleString()} د.ع
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
