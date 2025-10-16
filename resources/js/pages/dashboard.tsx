import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
    Crown, 
    Calendar, 
    Users, 
    Package, 
    Tags, 
    Building2,
    Settings,
    AlertTriangle,
    ExternalLink,
    Plus,
    Eye,
    Edit,
    Clock,
    CheckCircle,
    Phone,
    MapPin,
    Mail,
    Image,
    Truck,
    DollarSign,
    User
} from 'lucide-react';

export default function Dashboard() {
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

    // Check for missing settings
    const getMissingSettings = () => {
        const missing = [];
        
        // From settings.tsx - basic tenant settings
        if (!tenant?.settings?.display_name) missing.push('اسم المطعم');
        if (!tenant?.settings?.logo_url) missing.push('شعار المطعم');
        if (!tenant?.settings?.working_starts) missing.push('وقت بداية العمل');
        if (!tenant?.settings?.working_ends) missing.push('وقت نهاية العمل');
        if (!tenant?.settings?.working_days || tenant?.settings?.working_days.length === 0) missing.push('أيام العمل');
        
        // From delivery.tsx - delivery settings
        if (tenant?.delivery_settings?.allow_delivery === undefined) missing.push('حالة التوصيل');
        if (tenant?.delivery_settings?.allow_delivery && !tenant?.delivery_settings?.delivery_fee) missing.push('رسوم التوصيل');
        if (tenant?.delivery_settings?.allow_delivery && !tenant?.delivery_settings?.delivery_phone) missing.push('رقم التوصيل');
        
        return missing;
    };

    const missingSettings = getMissingSettings();
    const hasIncompleteSettings = missingSettings.length > 0;

    return (
        <DashboardLayout>
            <Head title="لوحة التحكم" />
            
            <div className="space-y-6" dir="rtl">
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        مرحباً بك
                    </h1>
                    <p className="text-muted-foreground">
                        نظرة سريعة على حالة مطعمك وإعداداتك
                    </p>
                </div>

                {/* Alerts Section */}
                {(isSubscriptionExpired() || hasIncompleteSettings) && (
                    <div className="space-y-4">
                        {/* Subscription Alert */}
                        {isSubscriptionExpired() && (
                            <Alert className="border-red-200 bg-red-50">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription className="flex items-center justify-between">
                                    <span>انتهت صلاحية اشتراكك! يرجى تجديد الاشتراك للمتابعة.</span>
                                    <Button size="sm" asChild>
                                        <Link href="/tenant/subscription">تجديد الاشتراك</Link>
                                    </Button>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Settings Alert */}
                        {hasIncompleteSettings && (
                            <Alert className="border-yellow-200 bg-yellow-50">
                                <Settings className="h-4 w-4" />
                                <AlertDescription className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">إعداداتك غير مكتملة</p>
                                        <p className="text-sm">المفقود: {missingSettings.join(', ')}</p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href="/tenant/settings">إكمال الإعدادات</Link>
                                    </Button>
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Subscription Status */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الاشتراك</CardTitle>
                            {getSubscriptionIcon(tenant?.subscription || 'free')}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {getSubscriptionDisplayName(tenant?.subscription || 'free')}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {tenant?.subscription_ends_at ? (
                                    isSubscriptionExpired() ? (
                                        <span className="text-red-600">منتهي الصلاحية</span>
                                    ) : (
                                        `${getDaysUntilExpiry()} يوم متبقي`
                                    )
                                ) : (
                                    'غير محدد'
                                )}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Products Count */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenant?.usage?.products || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                من أصل {tenant?.limits?.products || 0}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Categories Count */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الفئات</CardTitle>
                            <Tags className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenant?.usage?.categories || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                من أصل {tenant?.limits?.categories || 0}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Branches Count */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الفروع</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenant?.usage?.branches || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                من أصل {tenant?.limits?.branches || 0}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Subscription Details */}
                    <Card className={isSubscriptionExpired() ? "border-red-200 bg-red-50" : ""}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Crown className="h-5 w-5" />
                                    تفاصيل الاشتراك
                                </CardTitle>
                                <Badge 
                                    variant={getSubscriptionBadgeVariant(tenant?.subscription || 'free')}
                                    className="flex items-center gap-1"
                                >
                                    {getSubscriptionIcon(tenant?.subscription || 'free')}
                                    {getSubscriptionDisplayName(tenant?.subscription || 'free')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {tenant?.subscription_ends_at && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {isSubscriptionExpired() 
                                            ? `انتهت في ${formatDate(tenant.subscription_ends_at)}`
                                            : `ينتهي في ${formatDate(tenant.subscription_ends_at)}`
                                        }
                                    </span>
                                </div>
                            )}

                            {/* Usage Progress */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>المنتجات</span>
                                        <span>{tenant?.usage?.products || 0}/{tenant?.limits?.products || 0}</span>
                                    </div>
                                    <Progress 
                                        value={calculateUsagePercentage(tenant?.usage?.products || 0, tenant?.limits?.products || 1)} 
                                        className="h-2"
                                    />
                                </div>
                                
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>الفئات</span>
                                        <span>{tenant?.usage?.categories || 0}/{tenant?.limits?.categories || 0}</span>
                                    </div>
                                    <Progress 
                                        value={calculateUsagePercentage(tenant?.usage?.categories || 0, tenant?.limits?.categories || 1)} 
                                        className="h-2"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>الفروع</span>
                                        <span>{tenant?.usage?.branches || 0}/{tenant?.limits?.branches || 0}</span>
                                    </div>
                                    <Progress 
                                        value={calculateUsagePercentage(tenant?.usage?.branches || 0, tenant?.limits?.branches || 1)} 
                                        className="h-2"
                                    />
                                </div>
                            </div>

                            <Button asChild className="w-full">
                                <Link href="/tenant/subscription">
                                    <Crown className="h-4 w-4 mr-2" />
                                    إدارة الاشتراك
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                إجراءات سريعة
                            </CardTitle>
                            <CardDescription>
                                الإجراءات الأكثر استخداماً
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button asChild className="w-full justify-start">
                                <Link href="/catalog/products">
                                    <Plus className="h-4 w-4 mr-2" />
                                    إضافة منتج جديد
                                </Link>
                            </Button>
                            
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/catalog/categories">
                                    <Plus className="h-4 w-4 mr-2" />
                                    إضافة فئة جديدة
                                </Link>
                            </Button>
                            
                            <Button asChild variant="outline" className="w-full justify-start">
                                <Link href="/catalog/branches">
                                    <Plus className="h-4 w-4 mr-2" />
                                    إدارة الفروع
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Settings Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            نظرة على الإعدادات
                        </CardTitle>
                        <CardDescription>
                            حالة إعدادات مطعمك الأساسية
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Basic Settings */}
                            <div className="space-y-4">
                                <h4 className="font-medium">الإعدادات الأساسية</h4>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm">اسم المطعم</span>
                                        </div>
                                        {tenant?.settings?.display_name ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Image className="h-4 w-4" />
                                            <span className="text-sm">شعار المطعم</span>
                                        </div>
                                        {tenant?.settings?.logo_url ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">ساعات العمل</span>
                                        </div>
                                        {(tenant?.settings?.working_starts && tenant?.settings?.working_ends) ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">أيام العمل</span>
                                        </div>
                                        {(tenant?.settings?.working_days && tenant?.settings?.working_days.length > 0) ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Settings */}
                            <div className="space-y-4">
                                <h4 className="font-medium">إعدادات التوصيل</h4>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-4 w-4" />
                                            <span className="text-sm">حالة التوصيل</span>
                                        </div>
                                        {tenant?.delivery_settings?.allow_delivery !== undefined ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>

                                    {tenant?.delivery_settings?.allow_delivery && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span className="text-sm">رسوم التوصيل</span>
                                                </div>
                                                {tenant?.delivery_settings?.delivery_fee ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4" />
                                                    <span className="text-sm">رقم التوصيل</span>
                                                </div>
                                                {tenant?.delivery_settings?.delivery_phone ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {!tenant?.delivery_settings?.allow_delivery && tenant?.delivery_settings?.allow_delivery !== undefined && (
                                        <div className="text-sm text-muted-foreground">
                                            التوصيل غير مفعل
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-2 sm:grid-cols-2">
                            <Button asChild>
                                <Link href="/tenant/settings">
                                    <Edit className="h-4 w-4 mr-2" />
                                    إعدادات المطعم
                                </Link>
                            </Button>
                            
                            <Button asChild variant="outline">
                                <Link href="/tenant/delivery">
                                    <Truck className="h-4 w-4 mr-2" />
                                    إعدادات التوصيل
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
