import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save, Tags } from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface FormPageProps {
    data?: Category;
}

export default function CategoriesForm({ data }: FormPageProps) {
    const isEdit = !!data;

    return (
        <DashboardLayout>
            <Head title={isEdit ? 'تعديل الفئة' : 'إضافة فئة جديدة'} />

            <div className="space-y-6" dir="rtl">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/categories">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Tags className="h-8 w-8" />
                            {isEdit ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? 'قم بتحديث معلومات الفئة'
                                : 'أضف فئة جديدة لتنظيم المنتجات'}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>معلومات الفئة</CardTitle>
                        <CardDescription>
                            أدخل اسم الفئة المناسب لتصنيف المنتجات
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method={isEdit ? 'put' : 'post'}
                            action={isEdit ? `/dashboard/categories/${data.id}` : '/dashboard/categories'}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <div className="grid gap-4">
                                    {/* Category Name */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            اسم الفئة{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            defaultValue={
                                                isEdit ? data.name : ''
                                            }
                                            placeholder="أدخل اسم الفئة"
                                            required
                                            className="text-right"
                                        />
                                        <InputError message={errors.name} />
                                        <p className="text-sm text-muted-foreground">
                                            مثال: المشروبات، الأطباق الرئيسية، الحلويات
                                        </p>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="flex items-center gap-2"
                                        >
                                            {processing ? (
                                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Save className="h-4 w-4" />
                                            )}
                                            {processing
                                                ? 'جاري الحفظ...'
                                                : isEdit
                                                  ? 'تحديث الفئة'
                                                  : 'إضافة الفئة'}
                                        </Button>
                                        <Link href="/dashboard/categories">
                                            <Button
                                                variant="outline"
                                                type="button"
                                            >
                                                إلغاء
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
