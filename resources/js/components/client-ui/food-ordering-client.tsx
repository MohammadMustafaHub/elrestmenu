import ProductCard from '@/components/client-ui/product-card';
import { Category, Product } from '@/types';
import { useState } from 'react';

interface FoodOrderingClientProps {
    products: Product[];
    categories: Category[];
}

export default function FoodOrderingClient({
    products,
    categories,
}: FoodOrderingClientProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredProducts = activeCategory
        ? products.filter(
              (product) => product.category_id === activeCategory, // assumes product.categoryId exists
          )
        : products;

    return (
        <>
            {/* Categories Chips */}
            <section className="mt-4 px-4 py-2">
                <div
                    className="scrollbar-hide flex gap-2 overflow-x-auto pb-2"
                    style={{
                        overflowX: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {/* Optional “All” Category */}
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                            activeCategory === null
                                ? 'bg-orange-600 text-white shadow-md'
                                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        الكل
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                                activeCategory === category.id
                                    ? 'bg-orange-600 text-white shadow-md'
                                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-4 py-6">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                            <svg
                                className="h-10 w-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8v2a1 1 0 01-1 1h-1m-2-3h2a2 2 0 012 2v1M4 5v2a1 1 0 001 1h1m2-3H6a2 2 0 00-2 2v1m2 8h2m6 0h2"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            لا توجد منتجات
                        </h3>
                        <p className="max-w-sm text-center text-gray-500">
                            لا توجد منتجات متاحة في هذه الفئة حالياً. يرجى
                            المحاولة مرة أخرى لاحقاً أو تصفح فئات أخرى.
                        </p>
                        <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700">
                            إعادة المحاولة
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
