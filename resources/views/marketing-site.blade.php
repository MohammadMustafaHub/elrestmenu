<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ElRestMenu - منصة القوائم الإلكترونية للمطاعم</title>
    <meta name="description" content="منصة شاملة لإنشاء وإدارة القوائم الإلكترونية للمطاعم مع نظام طلبات متقدم وإدارة الفروع">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    @vite(['resources/css/app.css'])
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        }
        .feature-card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
        }
        .hero-pattern {
            background-image: radial-gradient(circle, rgba(249, 115, 22, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
    </style>
</head>
<body class="font-sans antialiased bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <div class="text-2xl font-bold text-orange-600">
                            ElRestMenu
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="mr-10 flex items-baseline space-x-4 space-x-reverse">
                        <a href="#features" class="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">المميزات</a>
                        <a href="#pricing" class="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">الأسعار</a>
                        <a href="#contact" class="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">اتصل بنا</a>
                    </div>
                </div>
                <div class="flex items-center space-x-4 space-x-reverse">
                    <a href="/login" class="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">تسجيل الدخول</a>
                    <a href="/register" class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">ابدأ مجاناً</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 min-h-screen flex items-center">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.3"><circle cx="7" cy="7" r="2"/><circle cx="27" cy="7" r="2"/><circle cx="47" cy="7" r="2"/><circle cx="7" cy="27" r="2"/><circle cx="27" cy="27" r="2"/><circle cx="47" cy="27" r="2"/><circle cx="7" cy="47" r="2"/><circle cx="27" cy="47" r="2"/><circle cx="47" cy="47" r="2"/></g></svg>');"></div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left Content -->
                <div class="text-center lg:text-right space-y-8">
                    <div class="space-y-6">
                        <div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                            ✨ منصة القوائم الرقمية الأولى في العراق
                        </div>
                        
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            حوّل مطعمك إلى 
                            <span class="relative inline-block">
                                <span class="relative z-10 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">تجربة رقمية</span>
                                <span class="absolute bottom-2 left-0 w-full h-3 bg-yellow-300/30 -z-10 transform -skew-x-12"></span>
                            </span>
                            متميزة
                        </h1>
                        
                        <p class="text-xl lg:text-2xl text-orange-100 leading-relaxed max-w-2xl">
                            أنشئ قائمة طعام رقمية احترافية، واستقبل الطلبات مباشرة عبر واتساب، وأدر فروعك بكل سهولة
                        </p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="/register" class="group relative overflow-hidden bg-white text-orange-600 px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl">
                            <span class="relative z-10">🚀 ابدأ مجاناً الآن</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <a href="#features" class="group border-2 border-white/80 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-orange-600 transition-all duration-300 backdrop-blur-sm">
                            <span class="flex items-center justify-center gap-2">
                                📋 اكتشف المميزات
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </span>
                        </a>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-6 pt-8">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white">200+</div>
                            <div class="text-orange-200 text-sm">مطعم يثق بنا</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white">10K+</div>
                            <div class="text-orange-200 text-sm">طلب شهرياً</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white">99%</div>
                            <div class="text-orange-200 text-sm">رضا العملاء</div>
                        </div>
                    </div>
                </div>

                <!-- Right Content - Mockup -->
                <div class="relative lg:block hidden">
                    <div class="relative">
                        <!-- Phone Mockup -->
                        <div class="relative mx-auto w-80 h-96 bg-gray-900 rounded-[3rem] p-2 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                            <div class="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                                <!-- Phone Screen Content -->
                                <div class="absolute inset-0 bg-gradient-to-b from-orange-50 to-orange-100">
                                    <!-- Header -->
                                    <div class="bg-orange-600 p-4 text-white text-center">
                                        <h3 class="font-bold">مطعم الذوق العراقي</h3>
                                        <p class="text-sm opacity-90">القائمة الإلكترونية</p>
                                    </div>
                                    
                                    <!-- Menu Items -->
                                    <div class="p-4 space-y-3">
                                        <div class="bg-white rounded-lg p-3 shadow-sm border border-orange-100">
                                            <div class="flex items-center gap-3">
                                                <div class="w-12 h-12 bg-orange-200 rounded-lg"></div>
                                                <div class="flex-1">
                                                    <h4 class="font-semibold text-sm text-gray-800">كباب لحم</h4>
                                                    <p class="text-xs text-gray-600">مع الرز الأبيض</p>
                                                    <p class="font-bold text-orange-600 text-sm">25,000 د.ع</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="bg-white rounded-lg p-3 shadow-sm border border-orange-100">
                                            <div class="flex items-center gap-3">
                                                <div class="w-12 h-12 bg-yellow-200 rounded-lg"></div>
                                                <div class="flex-1">
                                                    <h4 class="font-semibold text-sm text-gray-800">دجاج مشوي</h4>
                                                    <p class="text-xs text-gray-600">مع البطاطس</p>
                                                    <p class="font-bold text-orange-600 text-sm">20,000 د.ع</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="bg-white rounded-lg p-3 shadow-sm border border-orange-100">
                                            <div class="flex items-center gap-3">
                                                <div class="w-12 h-12 bg-red-200 rounded-lg"></div>
                                                <div class="flex-1">
                                                    <h4 class="font-semibold text-sm text-gray-800">سمك مسكوف</h4>
                                                    <p class="text-xs text-gray-600">طازج من دجلة</p>
                                                    <p class="font-bold text-orange-600 text-sm">35,000 د.ع</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Cart Button -->
                                    <div class="absolute bottom-4 left-4 right-4">
                                        <button class="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold text-sm shadow-lg">
                                            🛒 إضافة إلى السلة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Cards -->
                        <div class="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                                <div>
                                    <p class="font-semibold text-sm text-gray-800">طلب جديد!</p>
                                    <p class="text-xs text-gray-600">كباب + عصير</p>
                                </div>
                            </div>
                        </div>

                        <div class="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">💬</div>
                                <div>
                                    <p class="font-semibold text-sm text-gray-800">واتساب</p>
                                    <p class="text-xs text-gray-600">تأكيد الطلب</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Wave -->
        <div class="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" class="w-full h-auto">
                <path fill="#f9fafb" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    مميزات تجعل مطعمك يتميز
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    كل ما تحتاجه لإدارة مطعمك بشكل احترافي وعصري
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="feature-card bg-white p-8 rounded-xl shadow-lg">
                    <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">قائمة طعام رقمية</h3>
                    <p class="text-gray-600">
                        أنشئ قائمة طعام تفاعلية وجذابة مع صور عالية الجودة ووصف مفصل للأطباق
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="feature-card bg-white p-8 rounded-xl shadow-lg">
                    <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">نظام طلبات متطور</h3>
                    <p class="text-gray-600">
                        نظام طلبات سهل ومتطور مع إمكانية اختيار الإضافات والخيارات المختلفة
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="feature-card bg-white p-8 rounded-xl shadow-lg">
                    <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">إدارة متعددة الفروع</h3>
                    <p class="text-gray-600">
                        أدر عدة فروع لمطعمك بسهولة مع إعدادات منفصلة لكل فرع وإدارة التوفر
                    </p>
                </div>

                <!-- Feature 4 -->
                <div class="feature-card bg-white p-8 rounded-xl shadow-lg">
                    <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">تكامل واتساب</h3>
                    <p class="text-gray-600">
                        استقبل الطلبات مباشرة عبر واتساب مع تفاصيل كاملة ومنسقة بشكل احترافي
                    </p>
                </div>

                <!-- Feature 5 -->
                <div class="feature-card bg-white p-8 rounded-xl shadow-lg">
                    <div class="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">متوافق مع الجوال</h3>
                    <p class="text-gray-600">
                        تصميم متجاوب 100% يعمل بشكل مثالي على جميع الأجهزة الذكية واللوحية
                    </p>
                </div>

                <!-- Feature 6 -->
                <div class="feature-card bg-white p-8 rounded-xl shadow-lg">
                    <div class="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">تقارير وإحصائيات</h3>
                    <p class="text-gray-600">
                        احصل على تقارير مفصلة حول الطلبات والمبيعات لاتخاذ قرارات أفضل
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    كيف يعمل ElRestMenu؟
                </h2>
                <p class="text-xl text-gray-600">
                    ثلاث خطوات بسيطة لإطلاق قائمتك الرقمية
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                        1
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">أنشئ حسابك</h3>
                    <p class="text-gray-600">
                        سجل مجاناً وأنشئ حساب مطعمك في دقائق معدودة
                    </p>
                </div>

                <div class="text-center">
                    <div class="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                        2
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">أضف منتجاتك</h3>
                    <p class="text-gray-600">
                        أضف أطباقك مع الصور والأسعار والوصف بواجهة سهلة
                    </p>
                </div>

                <div class="text-center">
                    <div class="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                        3
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">ابدأ الاستقبال</h3>
                    <p class="text-gray-600">
                        شارك رابط قائمتك واستقبل الطلبات فوراً
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    خطط تناسب جميع احتياجاتك
                </h2>
                <p class="text-xl text-gray-600">
                    اختر الخطة المناسبة لحجم مطعمك
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Free Plan -->
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="text-center">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">مجاني</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">0 د.ع</div>
                        <p class="text-gray-600 mb-6">5 أيام تجريبية</p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 200 منتج
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 50 فئة
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            فرع واحد فقط
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            دعم أساسي
                        </li>
                    </ul>
                    <a href="/register" class="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors">
                        ابدأ مجاناً
                    </a>
                </div>

                <!-- Pro Plan -->
                <div class="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-500 relative">
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">الأكثر شعبية</span>
                    </div>
                    <div class="text-center">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">احترافي</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">150,000 د.ع</div>
                        <p class="text-gray-600 mb-6">سنوياً</p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 200 منتج
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 50 فئة
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            فرع واحد فقط
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            دعم متقدم
                        </li>
                    </ul>
                    <a href="/register" class="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors">
                        اشترك الآن
                    </a>
                </div>

                <!-- Premium Plan -->
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="text-center">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">متميز</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">300,000 د.ع</div>
                        <p class="text-gray-600 mb-6">سنوياً</p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 10,000 منتج
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 2,000 فئة
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            حتى 50 فرع
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            دعم مخصص
                        </li>
                    </ul>
                    <a href="/register" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors">
                        ترقية الآن
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 gradient-bg">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                جاهز لتطوير مطعمك؟
            </h2>
            <p class="text-xl text-orange-100 mb-8">
                ابدأ رحلتك الرقمية اليوم واكتشف كيف يمكن لـ ElRestMenu أن يساعدك في زيادة مبيعاتك
            </p>
            <a href="/register" class="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block">
                ابدأ تجربتك المجانية الآن
            </a>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    تواصل معنا
                </h2>
                <p class="text-xl text-gray-300">
                    نحن هنا لمساعدتك في أي استفسار
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-4">البريد الإلكتروني</h3>
                    <p class="text-gray-300">support@elrestmenu.com</p>
                </div>

                <div>
                    <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-4">الهاتف</h3>
                    <p class="text-gray-300">+964 782 015 7415</p>
                </div>

                <div>
                    <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-4">واتساب</h3>
                    <p class="text-gray-300">+964 782 015 7415</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="text-2xl font-bold text-orange-600 mb-4">
                        ElRestMenu
                    </div>
                    <p class="text-gray-300 mb-4">
                        منصة شاملة لإنشاء وإدارة القوائم الإلكترونية للمطاعم مع نظام طلبات متقدم وإدارة الفروع
                    </p>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold mb-4">روابط سريعة</h3>
                    <ul class="space-y-2">
                        <li><a href="#features" class="text-gray-300 hover:text-white transition-colors">المميزات</a></li>
                        <li><a href="#pricing" class="text-gray-300 hover:text-white transition-colors">الأسعار</a></li>
                        <li><a href="/login" class="text-gray-300 hover:text-white transition-colors">تسجيل الدخول</a></li>
                        <li><a href="/register" class="text-gray-300 hover:text-white transition-colors">إنشاء حساب</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold mb-4">الدعم</h3>
                    <ul class="space-y-2">
                        <li><a href="#contact" class="text-gray-300 hover:text-white transition-colors">اتصل بنا</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-white transition-colors">شروط الاستخدام</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-white transition-colors">سياسة الخصوصية</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                <p class="text-gray-300">
                    © 2025 ElRestMenu. جميع الحقوق محفوظة.
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>