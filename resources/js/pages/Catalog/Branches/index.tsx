import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
import { MoreHorizontal, Plus, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
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
import BranchesController from '@/actions/App/Http/Controllers/Catalog/BranchesController';
import { useState } from 'react';
import { Branch } from '@/types';



export default function Branches({ data }: { data: Branch[]; }) {
    const handleDelete = (id: number) => {
        if(data.length === 1){
            setErrorModal(true);
            return
        }
        router.delete(`/dashboard/branches/${id}`, {
            preserveScroll: true,
        });
    };


    const [errorModal, setErrorModal] = useState(false);



    return (
        <DashboardLayout>
            <Head title="الفروع" />

            <div className="space-y-6" dir="rtl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">الفروع</h1>
                        <p className="text-muted-foreground">
                            إدارة فروع المطعم وتحديث معلوماتها
                        </p>
                    </div>
                    <Link href="/dashboard/branches/create">
                        <Button>
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة فرع جديد
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>قائمة الفروع</CardTitle>
                        <CardDescription>
                            عرض جميع فروع المطعم وإدارتها
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {data.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-muted-foreground">
                                    لا توجد فروع حالياً
                                </div>
                                <Link href="/dashboard/branches/create" className="mt-4 inline-block">
                                    <Button>
                                        <Plus className="h-4 w-4 ml-2" />
                                        إضافة أول فرع
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">اسم الفرع</TableHead>
                                        <TableHead className="text-right">العنوان</TableHead>
                                        <TableHead className="text-right">الهاتف</TableHead>
                                        <TableHead className="text-right">البريد الإلكتروني</TableHead>
                                        <TableHead className="text-right">الحالة</TableHead>
                                        <TableHead className="text-right">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((branch) => (
                                        <TableRow key={branch.id}>
                                            <TableCell className="font-medium text-right">
                                                {branch.name}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-start">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    {branch.address}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {branch.phone ? (
                                                    <div className="flex items-center justify-start">
                                                        <Phone className="h-4 w-4 mr-2" />
                                                        {branch.phone}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {branch.email ? (
                                                    <div className="flex items-center justify-start">
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        {branch.email}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-start">
                                                    <Badge
                                                        variant={branch.is_open ? "default" : "secondary"}
                                                    >
                                                        {branch.is_open ? "مفتوح" : "مغلق"}
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
                                                            <Link href={BranchesController.edit(branch.id)}>
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
                                                                        هل أنت متأكد من حذف فرع "{branch.name}"؟
                                                                        هذا الإجراء لا يمكن التراجع عنه.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(branch.id)}
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
                    </CardContent>
                </Card>
            </div>
            <AlertDialog open={errorModal} onOpenChange={setErrorModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>خطأ في الحذف</AlertDialogTitle>
                        <AlertDialogDescription>
                            يجب أن يكون هناك فرع واحد على الأقل للمطعم. لا يمكنك حذف هذا الفرع.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setErrorModal(false)}>
                            فهمت
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </DashboardLayout>
    );
}
















