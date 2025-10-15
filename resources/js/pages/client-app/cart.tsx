"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, ShoppingBag, MapPin, Phone, User, FileText, Tag, Plus, Minus, Trash2 } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { useTenantStore } from "@/stores/tenant-store"
import { Link } from '@inertiajs/react';

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
    const [orderForm, setOrderForm] = useState<OrderForm>({
        name: "",
        phone: "",
        location: "",
        notes: "",
        coupon: "",
    })

    const [couponApplied, setCouponApplied] = useState(false)
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

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


    // Calculate subtotal using cart store's method
    const calculateSubtotal = () => {
        return getTotalPrice()
    }

    // Handle coupon application
    const handleApplyCoupon = () => {
        if (orderForm.coupon.toLowerCase() === "welcome10") {
            const subtotal = Number(calculateSubtotal()) || 0
            setCouponDiscount(subtotal * 0.1) // 10% discount
            setCouponApplied(true)
        } else if (orderForm.coupon.toLowerCase() === "save20") {
            setCouponDiscount(50000) // 50,000 IQD discount
            setCouponApplied(true)
        } else {
            alert("كود الخصم غير صحيح")
            setCouponDiscount(0)
            setCouponApplied(false)
        }
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

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Order placed:", { items, orderData: orderForm })
            alert(`تم تأكيد طلبك يا ${orderForm.name}! سيتم التواصل معك قريباً على ${orderForm.phone}`)

            // Clear cart after successful order
            clearCart()
            setIsSubmitting(false)
            // router.push("/")
        }, 2000)
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

                                {/* Coupon Field */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Tag className="w-4 h-4 inline ml-1" />
                                        كود الخصم
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            value={orderForm.coupon}
                                            onChange={(e) => handleInputChange("coupon", e.target.value.toUpperCase())}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="أدخل كود الخصم"
                                            disabled={couponApplied}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            disabled={!orderForm.coupon.trim() || couponApplied}
                                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg transition-colors whitespace-nowrap"
                                        >
                                            {couponApplied ? "مُطبق" : "تطبيق"}
                                        </button>
                                    </div>
                                    {couponApplied && <p className="text-green-600 text-sm mt-1">تم تطبيق كود الخصم بنجاح!</p>}
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
                                disabled={isSubmitting || items.length === 0}
                                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-bold transition-colors"
                            >
                                {isSubmitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب - ${calculateTotal().toLocaleString()} د.ع`}
                            </button>
                        </form>

                        {/* Sample Coupons Info */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800 font-medium mb-1">أكواد خصم متاحة:</p>
                            <p className="text-xs text-blue-600">WELCOME10 - خصم 10%</p>
                            <p className="text-xs text-blue-600">SAVE20 - خصم 50,000 دينار</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
