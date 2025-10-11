import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
    Crown, 
    MessageCircle, 
    Calendar, 
    Users, 
    Package, 
    Tags, 
    Building2,
    CheckCircle,
    Clock,
    ExternalLink
} from 'lucide-react';

const WHATSAPP_NUMBER = "9647820157415"; // Replace with your actual WhatsApp support number

const planFeatures = {
    free: [
        "5 أيام تجريبية",
        "حتى 200 منتج",
        "حتى 50 فئة",
        "فرع واحد فقط",
        "دعم أساسي"
    ],
    pro: [
        "سنة كاملة",
        "حتى 200 منتج", 
        "حتى 50 فئة",
        "فرع واحد فقط",
        "دعم متقدم"
    ],
    premium: [
        "سنة كاملة",
        "حتى 10,000 منتج",
        "حتى 2,000 فئة", 
        "حتى 50 فرع",
        "دعم مخصص"
    ]
};

const planPrices = {
    free: "مجاني",
    pro: "150,000IQD/السنة",
    premium: "300,000IQD/السنة"
};

export default function Subscription() {
    const { tenant } = usePage<SharedData>().props;

    const getSubscriptionBadgeVariant = (subscription: string) => {
        switch (subscription) {
            case 'free':
                return 'secondary';
            case 'pro':
                return 'default';
            case 'premium':
                return 'default';
            default:
                return 'secondary';
        }
    };

    const getSubscriptionIcon = (subscription: string) => {
        switch (subscription) {
            case 'premium':
                return <Crown className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const getSubscriptionDisplayName = (subscription: string) => {
        switch (subscription) {
            case 'free':
                return 'مجاني';
            case 'pro':
                return 'احترافي';
            case 'premium':
                return 'متميز';
            default:
                return subscription;
        }
    };

    const calculateUsagePercentage = (used: number, limit: number) => {
        return Math.min((used / limit) * 100, 100);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isSubscriptionExpired = () => {
        if (!tenant?.subscription_ends_at) return false;
        return new Date(tenant.subscription_ends_at) < new Date();
    };

    const getDaysUntilExpiry = () => {
        if (!tenant?.subscription_ends_at) return 0;
        const today = new Date();
        const expiryDate = new Date(tenant.subscription_ends_at);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    };

    const handleWhatsAppContact = (plan: string) => {
        const message = `مرحباً، أريد الترقية إلى خطة ${getSubscriptionDisplayName(plan)} لمطعم ${tenant?.name}`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <DashboardLayout>
            <Head title="الاشتراك" />

            <div className="space-y-6" dir="rtl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Crown className="h-8 w-8" />
                        إدارة الاشتراك
                    </h1>
                    <p className="text-muted-foreground">
                        عرض وإدارة خطة الاشتراك الحالية والترقية للحصول على المزيد من المزايا
                    </p>
                </div>

                {/* Current Subscription Status */}
                <Card className={isSubscriptionExpired() ? "border-red-200 bg-red-50" : ""}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CardTitle>الاشتراك الحالي</CardTitle>
                                <Badge 
                                    variant={getSubscriptionBadgeVariant(tenant?.subscription || 'free')}
                                    className="flex items-center gap-1"
                                >
                                    {getSubscriptionIcon(tenant?.subscription || 'free')}
                                    {getSubscriptionDisplayName(tenant?.subscription || 'free')}
                                </Badge>
                            </div>
                            {isSubscriptionExpired() && (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    منتهي الصلاحية
                                </Badge>
                            )}
                        </div>
                        <CardDescription>
                            {tenant?.subscription_ends_at && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {isSubscriptionExpired() 
                                        ? `انتهت صلاحية الاشتراك في ${formatDate(tenant.subscription_ends_at)}`
                                        : `ينتهي في ${formatDate(tenant.subscription_ends_at)} (${getDaysUntilExpiry()} يوم متبقي)`
                                    }
                                </div>
                            )}
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Usage Statistics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            إحصائيات الاستخدام
                        </CardTitle>
                        <CardDescription>
                            مراقبة استخدامك الحالي مقارنة بحدود خطتك
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Products Usage */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    <span className="font-medium">المنتجات</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {tenant?.usage?.products || 0} / {tenant?.limits?.products || 0}
                                </span>
                            </div>
                            <Progress 
                                value={calculateUsagePercentage(tenant?.usage?.products || 0, tenant?.limits?.products || 1)} 
                                className="h-2"
                            />
                        </div>

                        {/* Categories Usage */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tags className="h-4 w-4" />
                                    <span className="font-medium">الفئات</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {tenant?.usage?.categories || 0} / {tenant?.limits?.categories || 0}
                                </span>
                            </div>
                            <Progress 
                                value={calculateUsagePercentage(tenant?.usage?.categories || 0, tenant?.limits?.categories || 1)} 
                                className="h-2"
                            />
                        </div>

                        {/* Branches Usage */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    <span className="font-medium">الفروع</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {tenant?.usage?.branches || 0} / {tenant?.limits?.branches || 0}
                                </span>
                            </div>
                            <Progress 
                                value={calculateUsagePercentage(tenant?.usage?.branches || 0, tenant?.limits?.branches || 1)} 
                                className="h-2"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Available Plans */}
                {(tenant?.subscription as string) !== 'premium' && (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold">خطط الاشتراك المتاحة</h2>
                            <p className="text-muted-foreground">
                                اختر الخطة التي تناسب احتياجات مطعمك
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Free Plan */}
                            {(tenant?.subscription as string) !== 'free' && (
                                <Card className="relative">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>الخطة المجانية</CardTitle>
                                            <Badge variant="secondary">مجاني</Badge>
                                        </div>
                                        <CardDescription>
                                            <span className="text-2xl font-bold">{planPrices.free}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2">
                                            {planFeatures.free.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => handleWhatsAppContact('free')}
                                        >
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            تواصل معنا
                                            <ExternalLink className="h-3 w-3 mr-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Pro Plan */}
                            {(tenant?.subscription as string) !== 'pro' && (
                                <Card className="relative">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>الخطة الاحترافية</CardTitle>
                                            <Badge>احترافي</Badge>
                                        </div>
                                        <CardDescription>
                                            <span className="text-2xl font-bold">{planPrices.pro}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2">
                                            {planFeatures.pro.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className="w-full"
                                            onClick={() => handleWhatsAppContact('pro')}
                                        >
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            اشترك الآن
                                            <ExternalLink className="h-3 w-3 mr-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Premium Plan */}
                            <Card className="relative border-yellow-200 bg-yellow-50">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Badge className="bg-yellow-500 text-white">الأكثر شعبية</Badge>
                                </div>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Crown className="h-5 w-5 text-yellow-500" />
                                            الخطة المتميزة
                                        </CardTitle>
                                        <Badge className="bg-yellow-500">متميز</Badge>
                                    </div>
                                    <CardDescription>
                                        <span className="text-2xl font-bold">{planPrices.premium}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="space-y-2">
                                        {planFeatures.premium.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {(tenant?.subscription as string) === 'premium' ? (
                                        <Button variant="outline" className="w-full" disabled>
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            الخطة الحالية
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full bg-yellow-500 hover:bg-yellow-600"
                                            onClick={() => handleWhatsAppContact('premium')}
                                        >
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            ترقية الآن
                                            <ExternalLink className="h-3 w-3 mr-1" />
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Support Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            تحتاج مساعدة؟
                        </CardTitle>
                        <CardDescription>
                            فريقنا متاح للمساعدة في أي استفسار حول الاشتراكات
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="outline"
                            onClick={() => {
                                const message = `مرحباً، أحتاج مساعدة حول اشتراك مطعم ${tenant?.name}`;
                                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                        >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            تواصل عبر الواتساب
                            <ExternalLink className="h-3 w-3 mr-1" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
