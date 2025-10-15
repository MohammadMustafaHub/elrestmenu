"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, ShoppingBag, MapPin, Phone, User, FileText, Tag, Plus, Minus, Trash2, AlertTriangle } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { useTenantStore } from "@/stores/tenant-store"
import { useBranchStore } from "@/stores/branch-store"
import { useUserDataStore } from "@/stores/user-data-store"
import { useBranchesCacheStore } from "@/stores/branches-cache"
import { Link } from '@inertiajs/react';
import BranchSelectionModal from "@/components/client-ui/branch-selection-modal"

interface OrderForm {
    name: string
    phone: string
    location: string
    notes: string
    coupon: string
}

export default function CartPage() {
    const { items, updateItemQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore()
    const { tenant } = useTenantStore()
    const { selectedBranch, setSelectedBranch } = useBranchStore()
    const { userData, setUserData } = useUserDataStore()
    const [orderForm, setOrderForm] = useState<OrderForm>({
        name: userData.name || "",
        phone: userData.phone || "",
        location: userData.address || "",
        notes: "",
        coupon: "",
    })

    const [couponApplied, setCouponApplied] = useState(false)
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showBranchModal, setShowBranchModal] = useState(false)
    const [unavailableItems, setUnavailableItems] = useState<string[]>([])

    const { branches } = useBranchesCacheStore();
    // Get branches from tenant (assuming it's available)
    
    // Update user data when form changes
    useEffect(() => {
        setUserData({
            name: orderForm.name,
            phone: orderForm.phone,
            address: orderForm.location,
        })
    }, [orderForm.name, orderForm.phone, orderForm.location, setUserData])

    // Check for unavailable items when branch changes
    useEffect(() => {
        if (selectedBranch && items.length > 0) {
            const unavailable = items.filter(item => 
                item.product.branches_unavailable?.includes(selectedBranch.id.toString())
            ).map(item => item.name)
            setUnavailableItems(unavailable)
        } else {
            setUnavailableItems([])
        }
    }, [selectedBranch, items])

    // Handle cart item quantity update
    const handleQuantityUpdate = (itemKey: string, change: number) => {
        const item = items.find(item => item.key === itemKey)
        if (item) {
            const newQuantity = item.quantity + change
            if (newQuantity <= 0) {
                removeItem(itemKey)
            } else {
                updateItemQuantity(itemKey, newQuantity)
            }
        }
    }

    // Handle removing item from cart
    const handleRemoveItem = (itemKey: string) => {
        removeItem(itemKey)
    }

    // Handle branch selection
    const handleBranchSelection = (branch: any) => {
        setSelectedBranch(branch)
        setShowBranchModal(false)
    }

    // Remove unavailable items from cart
    const removeUnavailableItems = () => {
        unavailableItems.forEach(itemName => {
            const item = items.find(i => i.name === itemName)
            if (item) {
                removeItem(item.key)
            }
        })
        setUnavailableItems([])
    }

    // Check if order can be placed
    const canPlaceOrder = () => {
        return selectedBranch && 
               selectedBranch.is_open && 
               unavailableItems.length === 0 &&
               orderForm.name.trim() && 
               orderForm.phone.trim() && 
               orderForm.location.trim() &&
               items.length > 0
    }


    // Calculate subtotal using cart store's method
    const calculateSubtotal = () => {
        return getTotalPrice()
    }

    // Calculate final total
    const calculateTotal = () => {
        const subtotal = Number(calculateSubtotal()) || 0
        const deliveryFee = Number(tenant?.delivery_settings?.delivery_fee) || 0
        const additionalFees = tenant?.delivery_settings?.additional_delivery_fee?.reduce(
            (total, fee) => total + (Number(fee.amount) || 0), 0
        ) || 0
        const discount = Number(couponDiscount) || 0
        return Math.max(0, subtotal + deliveryFee + additionalFees - discount)
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!orderForm.name.trim() || !orderForm.phone.trim() || !orderForm.location.trim()) {
            alert("يرجى ملء جميع الحقول المطلوبة")
            return
        }

        if (items.length === 0) {
            alert("السلة فارغة")
            return
        }

        if (!selectedBranch) {
            alert("يرجى اختيار فرع")
            return
        }

        setIsSubmitting(true)

        // Format cart items for WhatsApp message
        const itemsList = items.map((item, index) => {
            let itemText = `${index + 1}. ${item.name}`
            
            // Add option if exists
            if (item.options.length > 0) {
                itemText += ` (${item.options[0].name})`
            }
            
            // Add addons if exist
            if (item.addons.length > 0) {
                const addonsText = item.addons.map(addon => `${addon.name} (+${addon.price.toLocaleString()} د.ع)`).join(', ')
                itemText += `\n   إضافات: ${addonsText}`
            }
            
            itemText += `\n   الكمية: ${item.quantity} × ${item.price.toLocaleString()} د.ع = ${(item.quantity * item.price).toLocaleString()} د.ع`
            
            return itemText
        }).join('\n\n')

        // Calculate totals
        const subtotal = calculateSubtotal()
        const deliveryFee = Number(tenant?.delivery_settings?.delivery_fee) || 0
        const additionalFeesTotal = tenant?.delivery_settings?.additional_delivery_fee?.reduce(
            (total, fee) => total + (Number(fee.amount) || 0), 0
        ) || 0
        const total = calculateTotal()

        // Format WhatsApp message
        const message = `🛒 *طلب جديد من ${tenant?.name}*

👤 *معلومات العميل:*
الاسم: ${orderForm.name}
الهاتف: ${orderForm.phone}
العنوان: ${orderForm.location}

🏪 *الفرع المحدد:*
${selectedBranch.name}
${selectedBranch.address}

📦 *تفاصيل الطلب:*
${itemsList}

💰 *ملخص المبالغ:*
المجموع الفرعي: ${subtotal.toLocaleString()} د.ع
رسوم التوصيل: ${deliveryFee.toLocaleString()} د.ع${additionalFeesTotal > 0 ? `\nرسوم إضافية: ${additionalFeesTotal.toLocaleString()} د.ع` : ''}

💳 *المجموع النهائي: ${total.toLocaleString()} د.ع*${orderForm.notes.trim() ? `\n\n📝 *ملاحظات:*\n${orderForm.notes}` : ''}`

        // Get delivery phone number
        const deliveryPhone = tenant?.delivery_settings?.delivery_phone
        
        if (!deliveryPhone) {
            alert("رقم الهاتف غير متوفر")
            setIsSubmitting(false)
            return
        }

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${deliveryPhone}?text=${encodeURIComponent(message)}`
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank')
        
        // Clear cart after opening WhatsApp
        clearCart()
        setIsSubmitting(false)
        
        // Optional: Show success message
        alert("تم فتح واتساب لإرسال طلبك!")
    }

    // Handle input changes
    const handleInputChange = (field: keyof OrderForm, value: string) => {
        setOrderForm((prev) => ({ ...prev, [field]: value }))

        // Reset coupon if coupon field is changed
        if (field === "coupon" && couponApplied) {
            setCouponApplied(false)
            setCouponDiscount(0)
        }
    }

    const subtotal = calculateSubtotal()
    const deliveryFee = Number(tenant?.delivery_settings?.delivery_fee) || 0
    const additionalFees = tenant?.delivery_settings?.additional_delivery_fee || []

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="flex items-center gap-4 px-4 py-3">
                    <Link href='/' className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-orange-600" />
                        <h1 className="text-lg font-bold">السلة ({getTotalItems()})</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4">
                {/* Branch Selection */}
                {branches.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-orange-600" />
                            اختيار الفرع
                        </h3>
                        {selectedBranch ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{selectedBranch.name}</p>
                                    <p className="text-sm text-gray-600">{selectedBranch.address}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            selectedBranch.is_open 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {selectedBranch.is_open ? 'مفتوح' : 'مغلق'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowBranchModal(true)}
                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors"
                                >
                                    تغيير الفرع
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-gray-600 mb-3">يرجى اختيار فرع للمتابعة</p>
                                <button
                                    onClick={() => setShowBranchModal(true)}
                                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                                >
                                    اختيار فرع
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Unavailable Items Warning */}
                {unavailableItems.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <h4 className="font-medium text-red-800 mb-2">
                                    منتجات غير متوفرة في الفرع المحدد
                                </h4>
                                <p className="text-sm text-red-700 mb-3">
                                    المنتجات التالية غير متوفرة في فرع {selectedBranch?.name}:
                                </p>
                                <ul className="text-sm text-red-700 mb-3 list-disc list-inside">
                                    {unavailableItems.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <button
                                    onClick={removeUnavailableItems}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                                >
                                    إزالة المنتجات غير المتوفرة
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cart Items */}
                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-xl mb-2">السلة فارغة</p>
                        <p className="text-gray-400 mb-6">أضف بعض المنتجات لتبدأ الطلب</p>
                        <Link
                            href='/'
                            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            تصفح المنتجات
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Items List */}
                        <div className="space-y-3 mb-6">
                            {items.map((item) => (
                                <div key={item.key} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`https://images.elrestmenu.com/${item.product.image}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-1">
                                                {item.name}
                                                {item.options.length > 0 && (
                                                    <span className="text-gray-600 font-medium">
                                                        {" "}({item.options[0].name})
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-gray-600 mb-2">{item.price.toLocaleString()} د.ع</p>

                                            {/* Addons */}
                                            {item.addons.length > 0 && (
                                                <div className="text-sm text-gray-500 mb-2">
                                                    <span className="font-medium">إضافات: </span>
                                                    {item.addons.map((addon, index) => (
                                                        <span key={index}>
                              {addon.name} (+{addon.price.toLocaleString()} د.ع)
                                                            {index < item.addons.length - 1 && ", "}
                            </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Quantity controls */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleQuantityUpdate(item.key, -1)}
                                                        className="p-1 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-bold text-lg min-w-[3ch] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityUpdate(item.key, 1)}
                                                        className="p-1 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(item.key)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Form */}
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                            <h3 className="font-bold text-lg mb-4">معلومات الطلب</h3>

                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="w-4 h-4 inline ml-1" />
                                        الاسم *
                                    </label>
                                    <input
                                        type="text"
                                        value={orderForm.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="أدخل اسمك الكامل"
                                        required
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4 inline ml-1" />
                                        رقم الهاتف *
                                    </label>
                                    <input
                                        type="tel"
                                        value={orderForm.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="05xxxxxxxx"
                                        required
                                    />
                                </div>

                                {/* Location Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 inline ml-1" />
                                        العنوان *
                                    </label>
                                    <textarea
                                        value={orderForm.location}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="أدخل عنوانك بالتفصيل"
                                        rows={3}
                                        required
                                    />
                                </div>

                                {/* Notes Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FileText className="w-4 h-4 inline ml-1" />
                                        ملاحظات إضافية
                                    </label>
                                    <textarea
                                        value={orderForm.notes}
                                        onChange={(e) => handleInputChange("notes", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="أي ملاحظات خاصة بالطلب (اختياري)"
                                        rows={2}
                                    />
                                </div>

                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6 mt-7">
                                <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>المجموع الفرعي:</span>
                                        <span>{subtotal.toLocaleString()} د.ع</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>رسوم التوصيل:</span>
                                        <span>{deliveryFee.toLocaleString()} د.ع</span>
                                    </div>
                                    {/* Additional delivery fees */}
                                    {additionalFees.map((fee, index) => (
                                        <div key={index} className="flex justify-between text-sm text-gray-600">
                                            <span>{fee.description}:</span>
                                            <span>{Number(fee.amount).toLocaleString()} د.ع</span>
                                        </div>
                                    ))}
                                    {couponApplied && (
                                        <div className="flex justify-between text-green-600">
                                            <span>خصم الكوبون:</span>
                                            <span>-{couponDiscount.toLocaleString()} د.ع</span>
                                        </div>
                                    )}
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>المجموع النهائي:</span>
                                        <span className="text-orange-600">{calculateTotal().toLocaleString()} د.ع</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !canPlaceOrder()}
                                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-bold transition-colors"
                            >
                                {!selectedBranch ? "يرجى اختيار فرع" :
                                 !selectedBranch.is_open ? "الفرع مغلق حالياً" :
                                 unavailableItems.length > 0 ? "يرجى إزالة المنتجات غير المتوفرة" :
                                 isSubmitting ? "جاري تأكيد الطلب..." : 
                                 `تأكيد الطلب - ${calculateTotal().toLocaleString()} د.ع`}
                            </button>
                        </form>
                    </>
                )}
            </div>

            {/* Branch Selection Modal */}
            <BranchSelectionModal
                isOpen={showBranchModal}
                branches={branches}
                onSelectBranch={handleBranchSelection}
                onClose={() => setShowBranchModal(false)}
            />
        </div>
    )
}
