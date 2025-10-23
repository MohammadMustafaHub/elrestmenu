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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Edit, Trash2, Tags } from 'lucide-react';
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

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedData {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Categories({ data }: { data: PaginatedData }) {
    const handleDelete = (id: number) => {
        router.delete(`/dashboard/categories/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout>
            <Head title="الفئات" />

            <div className="space-y-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Tags className="h-8 w-8" />
                            الفئات
                        </h1>
                        <p className="text-muted-foreground">
                            إدارة فئات المنتجات وتنظيم القائمة
                        </p>
                    </div>
                    <Link href="/dashboard/categories/create">
                        <Button>
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة فئة جديدة
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>قائمة الفئات</CardTitle>
                        <CardDescription>
                            عرض جميع فئات المنتجات وإدارتها
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {data.data.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-muted-foreground">
                                    لا توجد فئات حالياً
                                </div>
                                <Link href="/dashboard/categories/create" className="mt-4 inline-block">
                                    <Button>
                                        <Plus className="h-4 w-4 ml-2" />
                                        إضافة أول فئة
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">اسم الفئة</TableHead>
                                        <TableHead className="text-right">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.data.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium text-right">
                                                <div className="flex items-center justify-start">
                                                    <Tags className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    {category.name}
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
                                                                <Link href={`/dashboard/categories/edit/${category.id}`}>
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
                                                                            هل أنت متأكد من حذف فئة "{category.name}"؟
                                                                            هذا الإجراء لا يمكن التراجع عنه.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(category.id)}
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
                                    عرض {((data.current_page - 1) * data.per_page) + 1} إلى {Math.min(data.current_page * data.per_page, data.total)} من {data.total} فئة
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    {data.current_page > 1 && (
                                        <Link href={`/dashboard/categories?page=${data.current_page - 1}`}>
                                            <Button variant="outline" size="sm">
                                                السابق
                                            </Button>
                                        </Link>
                                    )}
                                    {data.current_page < data.last_page && (
                                        <Link href={`/dashboard/categories?page=${data.current_page + 1}`}>
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
