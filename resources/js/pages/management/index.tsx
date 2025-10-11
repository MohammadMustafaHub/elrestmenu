import { usePage } from '@inertiajs/react';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Head, router } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
    Crown, 
    Calendar, 
    Users, 
    Package, 
    Tags, 
    Building2,
    MoreHorizontal,
    TrendingUp,
    Clock,
    AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

interface TenantLimits {
    products: number;
    categories: number;
    branches: number;
}

interface TenantUsage {
    products: number;
    categories: number;
    branches: number;
}

interface Tenant {
    id: string;
    name: string;
    subscription: 'free' | 'pro' | 'premium';
    subscription_ends_at: string;
    created_at: string;
    updated_at: string;
    limits: TenantLimits;
    usage: TenantUsage;
}

interface PaginatedData {
    data: Tenant[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ManagementPageProps {
    data: PaginatedData;
}

export default function TenantsManagement({ data }: ManagementPageProps) {
    const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<'pro' | 'premium'>('pro');

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
                return <Crown className="h-3 w-3" />;
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
        return new Date(dateString).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isSubscriptionExpired = (endDate: string) => {
        return new Date(endDate) < new Date();
    };

    const getDaysUntilExpiry = (endDate: string) => {
        const today = new Date();
        const expiryDate = new Date(endDate);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    };

    const handleUpgrade = () => {
        if (!selectedTenant || !selectedPlan) return;

        router.post(`/dashboard/management/upgrade/${selectedTenant.id}`, {
            plan: selectedPlan
        }, {
            onSuccess: () => {
                setUpgradeModalOpen(false);
                setSelectedTenant(null);
            },
            onError: (errors) => {
                console.error('Upgrade failed:', errors);
            }
        });
    };

    const openUpgradeModal = (tenant: Tenant, plan: 'pro' | 'premium') => {
        setSelectedTenant(tenant);
        setSelectedPlan(plan);
        setUpgradeModalOpen(true);
    };

    const getUsageStatus = (used: number, limit: number) => {
        const percentage = calculateUsagePercentage(used, limit);
        if (percentage >= 100) return 'danger';
        if (percentage >= 80) return 'warning';
        return 'normal';
    };

    const getProgressBarColor = (status: string) => {
        switch (status) {
            case 'danger':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            default:
                return 'bg-green-500';
        }
    };

    return (
        <DashboardLayout>
            <Head title="إدارة المستأجرين" />

            <div className="space-y-6" dir="rtl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        إدارة المستأجرين
                    </h1>
                    <p className="text-muted-foreground">
                        عرض وإدارة جميع المطاعم المسجلة في النظام
                    </p>
                </div>

                {/* Statistics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">إجمالي المطاعم</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الخطة المجانية</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data.data.filter(t => t.subscription === 'free').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الخطة الاحترافية</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data.data.filter(t => t.subscription === 'pro').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">الخطة المتميزة</CardTitle>
                            <Crown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data.data.filter(t => t.subscription === 'premium').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tenants Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>قائمة المطاعم</CardTitle>
                        <CardDescription>
                            جميع المطاعم المسجلة مع تفاصيل الاستخدام والاشتراك
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-right">اسم المطعم</TableHead>
                                    <TableHead className="text-right">الاشتراك</TableHead>
                                    <TableHead className="text-right">تاريخ الانتهاء</TableHead>
                                    <TableHead className="text-right">استخدام المنتجات</TableHead>
                                    <TableHead className="text-right">استخدام الفئات</TableHead>
                                    <TableHead className="text-right">استخدام الفروع</TableHead>
                                    <TableHead className="text-right">الإجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.data.map((tenant) => (
                                    <TableRow key={tenant.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{tenant.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {tenant.name}.elrestmenu.com
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge 
                                                    variant={getSubscriptionBadgeVariant(tenant.subscription)}
                                                    className="flex items-center gap-1 w-fit"
                                                >
                                                    {getSubscriptionIcon(tenant.subscription)}
                                                    {getSubscriptionDisplayName(tenant.subscription)}
                                                </Badge>
                                                {isSubscriptionExpired(tenant.subscription_ends_at) && (
                                                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                                                        <Clock className="h-3 w-3" />
                                                        منتهي
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm">{formatDate(tenant.subscription_ends_at)}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {isSubscriptionExpired(tenant.subscription_ends_at) 
                                                        ? 'منتهي الصلاحية'
                                                        : `${getDaysUntilExpiry(tenant.subscription_ends_at)} يوم متبقي`
                                                    }
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>{tenant.usage.products} / {tenant.limits.products}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.round(calculateUsagePercentage(tenant.usage.products, tenant.limits.products))}%
                                                    </span>
                                                </div>
                                                <Progress 
                                                    value={calculateUsagePercentage(tenant.usage.products, tenant.limits.products)} 
                                                    className="h-1.5"
                                                />
                                                {getUsageStatus(tenant.usage.products, tenant.limits.products) === 'danger' && (
                                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>{tenant.usage.categories} / {tenant.limits.categories}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.round(calculateUsagePercentage(tenant.usage.categories, tenant.limits.categories))}%
                                                    </span>
                                                </div>
                                                <Progress 
                                                    value={calculateUsagePercentage(tenant.usage.categories, tenant.limits.categories)} 
                                                    className="h-1.5"
                                                />
                                                {getUsageStatus(tenant.usage.categories, tenant.limits.categories) === 'danger' && (
                                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>{tenant.usage.branches} / {tenant.limits.branches}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.round(calculateUsagePercentage(tenant.usage.branches, tenant.limits.branches))}%
                                                    </span>
                                                </div>
                                                <Progress 
                                                    value={calculateUsagePercentage(tenant.usage.branches, tenant.limits.branches)} 
                                                    className="h-1.5"
                                                />
                                                {getUsageStatus(tenant.usage.branches, tenant.limits.branches) === 'danger' && (
                                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">فتح القائمة</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {tenant.subscription !== 'pro' && (
                                                        <DropdownMenuItem 
                                                            onClick={() => openUpgradeModal(tenant, 'pro')}
                                                        >
                                                            <TrendingUp className="h-4 w-4 ml-2" />
                                                            ترقية للاحترافية
                                                        </DropdownMenuItem>
                                                    )}
                                                    {tenant.subscription !== 'premium' && (
                                                        <DropdownMenuItem 
                                                            onClick={() => openUpgradeModal(tenant, 'premium')}
                                                        >
                                                            <Crown className="h-4 w-4 ml-2" />
                                                            ترقية للمتميزة
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Upgrade Confirmation Modal */}
                <AlertDialog open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد ترقية الاشتراك</AlertDialogTitle>
                            <AlertDialogDescription>
                                هل أنت متأكد من ترقية اشتراك مطعم "{selectedTenant?.name}" إلى 
                                {selectedPlan === 'pro' ? ' الخطة الاحترافية' : ' الخطة المتميزة'}؟
                                <br /><br />
                                سيتم تحديث حدود الاستخدام وتاريخ انتهاء الاشتراك تلقائياً.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={handleUpgrade}>
                                تأكيد الترقية
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </DashboardLayout>
    );
}
