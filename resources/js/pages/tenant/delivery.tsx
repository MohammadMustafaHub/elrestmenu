import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Save, Truck, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AdditionalDeliveryFee {
    description: string;
    amount: number;
}

interface TenantDeliverySettings {
    delivery_fee?: number;
    additional_delivery_fee?: AdditionalDeliveryFee[];
    allow_delivery?: boolean;
}

interface DeliveryPageProps {
    settings?: TenantDeliverySettings;
}

export default function TenantDelivery({ settings }: DeliveryPageProps) {
    const [allowDelivery, setAllowDelivery] = useState<boolean>(
        settings?.allow_delivery || false,
    );

    const [additionalFees, setAdditionalFees] = useState<AdditionalDeliveryFee[]>(
        settings?.additional_delivery_fee || [{ description: '', amount: 0 }]
    );

    const addAdditionalFee = () => {
        setAdditionalFees([...additionalFees, { description: '', amount: 0 }]);
    };

    const removeAdditionalFee = (index: number) => {
        if (additionalFees.length > 1) {
            setAdditionalFees(additionalFees.filter((_, i) => i !== index));
        }
    };

    const updateAdditionalFee = (index: number, field: keyof AdditionalDeliveryFee, value: string | number) => {
        const updatedFees = [...additionalFees];
        updatedFees[index] = { ...updatedFees[index], [field]: value };
        setAdditionalFees(updatedFees);
    };

    console.log('delivery settings', settings);

    return (
        <DashboardLayout>
            <Head title="إعدادات التوصيل" />

            <div className="space-y-6" dir="rtl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Truck className="h-8 w-8" />
                        إعدادات التوصيل
                    </h1>
                    <p className="text-muted-foreground">
                        قم بتحديث إعدادات التوصيل الخاصة بمطعمك (العملة: الدينار العراقي)
                    </p>
                </div>

                {/* ✅ Inertia Form Component */}
                <Form
                    method="post"
                    transform={(data) => {
                        const result: Record<string, any> = {
                            delivery_fee: data.delivery_fee || 0,
                            allow_delivery: allowDelivery,
                            additional_delivery_fee: additionalFees
                        };
                        return result;
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors, reset }) => (
                        <>
                            {/* Delivery Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>حالة التوصيل</CardTitle>
                                    <CardDescription>
                                        تفعيل أو إلغاء خدمة التوصيل
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <Checkbox
                                            id="allow_delivery"
                                            name="allow_delivery"
                                            checked={allowDelivery}
                                            onCheckedChange={(checked) =>
                                                setAllowDelivery(checked as boolean)
                                            }
                                        />
                                        <Label
                                            htmlFor="allow_delivery"
                                            className="text-sm font-normal"
                                        >
                                            تفعيل خدمة التوصيل
                                        </Label>
                                    </div>
                                    <InputError message={errors.allow_delivery} />
                                </CardContent>
                            </Card>

                            {/* Delivery Fee Settings */}
                            {allowDelivery && (
                                <>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>رسوم التوصيل</CardTitle>
                                            <CardDescription>
                                                حدد رسوم التوصيل الأساسية
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="delivery_fee">
                                                    رسوم التوصيل الأساسية{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="delivery_fee"
                                                        name="delivery_fee"
                                                        type="number"
                                                        step="50"
                                                        min="0"
                                                        defaultValue={
                                                            settings?.delivery_fee?.toString() || "0"
                                                        }
                                                        placeholder="0.00"
                                                        required
                                                        className="text-right pl-12"
                                                    />
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                                                        دينار
                                                    </span>
                                                </div>
                                                <InputError message={errors.delivery_fee} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Additional Delivery Fee */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>رسوم توصيل إضافية</CardTitle>
                                            <CardDescription>
                                                رسوم إضافية اختيارية للمناطق البعيدة أو الظروف الخاصة
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {additionalFees.map((fee, index) => (
                                                <div key={index} className="p-4 border rounded-lg space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-base font-semibold">
                                                            رسوم إضافية #{index + 1}
                                                        </Label>
                                                        {additionalFees.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => removeAdditionalFee(index)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="grid gap-2">
                                                        <Label htmlFor={`additional_description_${index}`}>
                                                            وصف الرسوم الإضافية
                                                        </Label>
                                                        <Textarea
                                                            id={`additional_description_${index}`}
                                                            value={fee.description}
                                                            onChange={(e) => updateAdditionalFee(index, 'description', e.target.value)}
                                                            placeholder="مثال: رسوم إضافية للمناطق البعيدة"
                                                            className="text-right resize-none"
                                                            rows={3}
                                                        />
                                                        <InputError message={errors[`additional_delivery_fee.${index}.description`]} />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label htmlFor={`additional_amount_${index}`}>
                                                            مبلغ الرسوم الإضافية
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                id={`additional_amount_${index}`}
                                                                type="number"
                                                                step="50"
                                                                min="0"
                                                                value={fee.amount}
                                                                onChange={(e) => updateAdditionalFee(index, 'amount', Number(e.target.value))}
                                                                placeholder="0.00"
                                                                className="text-right pl-12"
                                                            />
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                                                                دينار
                                                            </span>
                                                        </div>
                                                        <InputError message={errors[`additional_delivery_fee.${index}.amount`]} />
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={addAdditionalFee}
                                                className="w-full flex items-center gap-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                إضافة رسوم إضافية جديدة
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </>
                            )}

                            {/* Form Actions */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
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
                                                : 'حفظ الإعدادات'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                reset();
                                                setAllowDelivery(settings?.allow_delivery || false);
                                                setAdditionalFees(settings?.additional_delivery_fee || [{ description: '', amount: 0 }]);
                                            }}
                                            disabled={processing}
                                        >
                                            إعادة تعيين
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </Form>
            </div>
        </DashboardLayout>
    );
}
