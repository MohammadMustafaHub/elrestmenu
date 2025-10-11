import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Edit, Trash2, Package, Image as ImageIcon } from 'lucide-react';
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

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    discounted_price: number;
    image?: string;
    is_active: boolean;
    category?: {
        id: number;
        name: string;
    };
    addons?: Array<{
        name: string;
        price: number;
    }>;
    options?: Array<{
        name: string;
        price: number;
    }>;
    branches_unavailable?: string[];
    created_at: string;
    updated_at: string;
}

interface PaginatedData {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Products({ data }: { data: PaginatedData }) {
    const handleDelete = (id: number) => {
        router.delete(`/products/${id}`, {
            preserveScroll: true,
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ar-IQ', {
            style: 'currency',
            currency: 'IQD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <DashboardLayout>
            <Head title="المنتجات" />
            
            <div className="space-y-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Package className="h-8 w-8" />
                            المنتجات
                        </h1>
                        <p className="text-muted-foreground">
                            إدارة منتجات المطعم وتحديث أسعارها ومعلوماتها
                        </p>
                    </div>
                    <Link href="/products/create">
                        <Button>
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة منتج جديد
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>قائمة المنتجات</CardTitle>
                        <CardDescription>
                            عرض جميع منتجات المطعم وإدارتها
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {data.data.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-muted-foreground">
                                    لا توجد منتجات حالياً
                                </div>
                                <Link href="/products/create" className="mt-4 inline-block">
                                    <Button>
                                        <Plus className="h-4 w-4 ml-2" />
                                        إضافة أول منتج
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">الصورة</TableHead>
                                        <TableHead className="text-right">اسم المنتج</TableHead>
                                        <TableHead className="text-right">السعر</TableHead>
                                        <TableHead className="text-right">السعر المخفض</TableHead>
                                        <TableHead className="text-right">الحالة</TableHead>
                                        <TableHead className="text-right">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.data.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="text-right">
                                                <div className="flex justify-start">
                                                    {product.image ? (
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="h-12 w-12 rounded-lg object-cover border"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                                                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div>
                                                    <div className="font-medium">{product.name}</div>
                                                    {product.description && (
                                                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                            {product.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatPrice(product.price)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {product.discounted_price !== product.price ? (
                                                    <span className="text-green-600 font-medium">
                                                        {formatPrice(product.discounted_price)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">نفس السعر</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-start">
                                                    <Badge
                                                        variant={product.is_active ? "default" : "secondary"}
                                                    >
                                                        {product.is_active ? "متاح" : "غير متاح"}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-start">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">فتح القائمة</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/products/edit/${product.id}`}>
                                                                    <Edit className="h-4 w-4 ml-2" />
                                                                    تعديل
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                        <Trash2 className="h-4 w-4 ml-2" />
                                                                        حذف
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            هل أنت متأكد من حذف منتج "{product.name}"؟ 
                                                                            هذا الإجراء لا يمكن التراجع عنه.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(product.id)}
                                                                            className="bg-destructive hover:bg-destructive/90"
                                                                        >
                                                                            حذف
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        
                        {/* Pagination */}
                        {data.last_page > 1 && (
                            <div className="flex items-center justify-between px-2 py-4">
                                <div className="text-sm text-muted-foreground">
                                    عرض {((data.current_page - 1) * data.per_page) + 1} إلى {Math.min(data.current_page * data.per_page, data.total)} من {data.total} منتج
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    {data.current_page > 1 && (
                                        <Link href={`/products?page=${data.current_page - 1}`}>
                                            <Button variant="outline" size="sm">
                                                السابق
                                            </Button>
                                        </Link>
                                    )}
                                    {data.current_page < data.last_page && (
                                        <Link href={`/products?page=${data.current_page + 1}`}>
                                            <Button variant="outline" size="sm">
                                                التالي
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
