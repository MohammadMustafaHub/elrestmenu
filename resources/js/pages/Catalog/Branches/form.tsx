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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';

interface Branch {
    id: string;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    is_open: boolean;
}

interface FormPageProps {
    branch?: Branch;
}

export default function BranchesForm({ branch }: FormPageProps) {
    const isEdit = !!branch;

    return (
        <DashboardLayout>
            <Head title={isEdit ? 'تعديل الفرع' : 'إضافة فرع جديد'} />

            <div className="space-y-6" dir="rtl">
                <div className="flex items-center gap-4">
                    <Link href="/branches">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'تعديل الفرع' : 'إضافة فرع جديد'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? 'قم بتحديث معلومات الفرع'
                                : 'أضف فرع جديد للمطعم'}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>معلومات الفرع</CardTitle>
                        <CardDescription>
                            أدخل جميع المعلومات المطلوبة للفرع
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method={isEdit ? 'put' : 'post'}
                            action={isEdit ? `/branches/${branch.id}` : '/branches'}
                            className="space-y-6"
                            transform={(data) => {
                                return {
                                    ...data,
                                    is_open: data.is_open === "on" ? true : false,
                                }
                            }}
                        >
                            {({ processing, errors }) => (
                                <div className="grid gap-4">
                                    {/* Branch Name */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            اسم الفرع{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            defaultValue={
                                                isEdit ? branch.name : ''
                                            }
                                            placeholder="أدخل اسم الفرع"
                                            required
                                            className="text-right"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Address */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">
                                            العنوان{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="address"
                                            name="address"
                                            defaultValue={
                                                isEdit ? branch.address : ''
                                            }
                                            placeholder="أدخل عنوان الفرع"
                                            required
                                            className="min-h-[80px] text-right"
                                        />
                                        <InputError message={errors.address} />
                                    </div>

                                    {/* Phone */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">
                                            رقم الهاتف
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            defaultValue={
                                                isEdit ? branch.phone : ''
                                            }
                                            placeholder="أدخل رقم الهاتف"
                                            className="text-right"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    {/* Email */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            البريد الإلكتروني
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            defaultValue={
                                                isEdit ? branch.email : ''
                                            }
                                            placeholder="أدخل البريد الإلكتروني"
                                            className="text-right"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Is Open Status */}
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">
                                                حالة الفرع
                                            </Label>
                                            <div className="text-sm text-muted-foreground">
                                                هل الفرع مفتوح حالياً؟
                                            </div>
                                        </div>
                                        <Switch
                                            dir="ltr"
                                            name="is_open"
                                            defaultChecked={
                                                isEdit ? branch.is_open : false
                                            }
                                        />
                                    </div>
                                    <InputError message={errors.is_open} />

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
                                                  ? 'تحديث الفرع'
                                                  : 'إضافة الفرع'}
                                        </Button>
                                        <Link href="/branches">
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
