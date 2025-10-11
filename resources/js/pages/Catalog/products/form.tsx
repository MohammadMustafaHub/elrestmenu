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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Form, Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    LoaderCircle,
    Package,
    Plus,
    Save,
    Trash2,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface Addon {
    name: string;
    price: number;
}

interface Option {
    name: string;
    price: number;
}

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    discounted_price: number;
    image?: string;
    is_active: boolean;
    category_id?: string;
    addons?: Addon[];
    options?: Option[];
    branches_unavailable?: string[];
}

interface Category {
    id: string;
    name: string;
}

interface Branch {
    id: string;
    name: string;
}

interface FormPageProps {
    data?: Product;
    categories?: Category[];
    branches?: Branch[];
}

export default function ProductsForm({
    data,
    categories = [],
    branches = [],
}: FormPageProps) {
    const isEdit = !!data;

    const [isActive, setIsActive] = useState<boolean>(data?.is_active ?? true);
    const [imagePreview, setImagePreview] = useState<string | null>(
        data?.image ? `/storage/${data.image}` : null,
    );
    const [addons, setAddons] = useState<Addon[]>(
        data?.addons || [{ name: '', price: 0 }],
    );
    const [options, setOptions] = useState<Option[]>(
        data?.options || [{ name: '', price: 0 }],
    );
    const [unavailableBranches, setUnavailableBranches] = useState<string[]>(
        data?.branches_unavailable || [],
    );

    const imageRef = useRef<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            imageRef.current = file;
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addAddon = () => {
        setAddons([...addons, { name: '', price: 0 }]);
    };

    const removeAddon = (index: number) => {
        if (addons.length > 1) {
            setAddons(addons.filter((_, i) => i !== index));
        }
    };

    const updateAddon = (
        index: number,
        field: keyof Addon,
        value: string | number,
    ) => {
        const updatedAddons = [...addons];
        updatedAddons[index] = { ...updatedAddons[index], [field]: value };
        setAddons(updatedAddons);
    };

    const addOption = () => {
        setOptions([...options, { name: '', price: 0 }]);
    };

    const removeOption = (index: number) => {
        if (options.length > 1) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const updateOption = (
        index: number,
        field: keyof Option,
        value: string | number,
    ) => {
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], [field]: value };
        setOptions(updatedOptions);
    };

    const handleBranchToggle = (branchId: string, checked: boolean) => {
        if (checked) {
            setUnavailableBranches([...unavailableBranches, branchId]);
        } else {
            setUnavailableBranches(
                unavailableBranches.filter((id) => id !== branchId),
            );
        }
    };

    return (
        <DashboardLayout>
            <Head title={isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'} />

            <div className="space-y-6" dir="rtl">
                <div className="flex items-center gap-4">
                    <Link href="/products">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
                            <Package className="h-8 w-8" />
                            {isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEdit
                                ? 'قم بتحديث معلومات المنتج'
                                : 'أضف منتج جديد إلى قائمة المطعم'}
                        </p>
                    </div>
                </div>

                <Form
                    method={isEdit ? 'put' : 'post'}
                    action={isEdit ? `/products/${data.id}` : '/products'}
                    transform={(formData) => {
                        const price = Number(formData.price);
                        const discountedPrice = Number(
                            formData.discounted_price,
                        );

                        const result: Record<string, any> = {
                            name: formData.name,
                            description: formData.description,
                            price: price,
                            discounted_price: discountedPrice || price, // Use price if discounted_price is not set
                            category_id: formData.category_id,
                            is_active: isActive,
                            addons: addons.filter(
                                (addon) => addon.name.trim() !== '',
                            ),
                            options: options.filter(
                                (option) => option.name.trim() !== '',
                            ),
                            branches_unavailable: unavailableBranches,
                        };

                        if (imageRef.current) {
                            result.image = imageRef.current;
                        }

                        return result;
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>المعلومات الأساسية</CardTitle>
                                    <CardDescription>
                                        معلومات أساسية عن المنتج
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            اسم المنتج{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={data?.name}
                                            placeholder="أدخل اسم المنتج"
                                            required
                                            className="text-right"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            الوصف
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            defaultValue={data?.description}
                                            placeholder="أدخل وصف المنتج"
                                            className="resize-none text-right"
                                            rows={3}
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="price">
                                                السعر{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    min="0"
                                                    defaultValue={data?.price?.toString()}
                                                    placeholder="0000"
                                                    required
                                                    className="pl-12 text-right"
                                                />
                                                <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-muted-foreground">
                                                    دينار
                                                </span>
                                            </div>
                                            <InputError
                                                message={errors.price}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="discounted_price">
                                                السعر المخفض{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="discounted_price"
                                                    name="discounted_price"
                                                    type="number"
                                                    min="0"
                                                    defaultValue={data?.discounted_price?.toString()}
                                                    placeholder="0000"
                                                    className="pl-12 text-right"
                                                />
                                                <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-muted-foreground">
                                                    دينار
                                                </span>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.discounted_price
                                                }
                                            />
                                            <p className="mt-auto text-xs text-muted-foreground">
                                                إذا لم يتم تحديد سعر مخفض، سيتم
                                                استخدام السعر الأساسي
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="category_id">
                                            الفئة{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            name="category_id"
                                            defaultValue={data?.category_id}
                                            required
                                        >
                                            <SelectTrigger className="text-right">
                                                <SelectValue placeholder="اختر الفئة" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.category_id}
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">
                                            صورة المنتج{' '}
                                            {!isEdit && (
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            )}
                                        </Label>
                                        <div className="flex items-center gap-4">
                                            {imagePreview && (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-muted">
                                                    <img
                                                        src={imagePreview}
                                                        alt="صورة المنتج"
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <Input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="cursor-pointer"
                                                    required={!isEdit}
                                                />
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    PNG, JPG, GIF حتى 2MB
                                                </p>
                                            </div>
                                        </div>
                                        <InputError message={errors.image} />
                                    </div>

                                    {/* Status Toggle */}
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">
                                                حالة المنتج
                                            </Label>
                                            <div className="text-sm text-muted-foreground">
                                                هل المنتج متاح حالياً؟
                                            </div>
                                        </div>
                                        <Switch
                                            dir="ltr"
                                            checked={isActive}
                                            onCheckedChange={setIsActive}
                                        />
                                    </div>
                                    <InputError message={errors.is_active} />
                                </CardContent>
                            </Card>

                            {/* Addons */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>الإضافات</CardTitle>
                                    <CardDescription>
                                        إضافات اختيارية يمكن للعملاء طلبها مع
                                        المنتج
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {addons.map((addon, index) => (
                                        <div
                                            key={index}
                                            className="space-y-4 rounded-lg border p-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-semibold">
                                                    إضافة #{index + 1}
                                                </Label>
                                                {addons.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeAddon(index)
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label>اسم الإضافة</Label>
                                                    <Input
                                                        value={addon.name}
                                                        onChange={(e) =>
                                                            updateAddon(
                                                                index,
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="مثل: جبنة إضافية"
                                                        className="text-right"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>السعر</Label>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            value={addon.price}
                                                            onChange={(e) =>
                                                                updateAddon(
                                                                    index,
                                                                    'price',
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            placeholder="0.00"
                                                            className="pl-12 text-right"
                                                        />
                                                        <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-muted-foreground">
                                                            دينار
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addAddon}
                                        className="flex w-full items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        إضافة إضافة جديدة
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Options */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>الخيارات</CardTitle>
                                    <CardDescription>
                                        خيارات مختلفة للمنتج مثل الحجم أو النوع
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {options.map((option, optionIndex) => (
                                        <div
                                            key={optionIndex}
                                            className="space-y-4 rounded-lg border p-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-semibold">
                                                    خيار #{optionIndex + 1}
                                                </Label>
                                                {options.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeOption(
                                                                optionIndex,
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid gap-2">
                                                <Label>اسم الخيار</Label>
                                                <Input
                                                    value={option.name}
                                                    onChange={(e) =>
                                                        updateOption(
                                                            optionIndex,
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="مثل: الحجم"
                                                    className="text-right"
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label>السعر</Label>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={option.price}
                                                        onChange={(e) =>
                                                            updateOption(
                                                                optionIndex,
                                                                'price',
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        placeholder="0.00"
                                                        className="pl-12 text-right"
                                                    />
                                                    <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-muted-foreground">
                                                        دينار
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addOption}
                                        className="flex w-full items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        إضافة خيار جديد
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Branch Availability */}
                            {branches.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            توفر المنتج في الفروع
                                        </CardTitle>
                                        <CardDescription>
                                            اختر الفروع التي لا يتوفر فيها هذا
                                            المنتج
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            {branches.map((branch) => (
                                                <div
                                                    key={branch.id}
                                                    className="flex items-center space-x-2 space-x-reverse"
                                                >
                                                    <Checkbox
                                                        id={`branch-${branch.id}`}
                                                        checked={unavailableBranches.includes(
                                                            branch.id,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            handleBranchToggle(
                                                                branch.id,
                                                                checked as boolean,
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={`branch-${branch.id}`}
                                                        className="text-sm font-normal"
                                                    >
                                                        غير متوفر في{' '}
                                                        {branch.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <InputError
                                            message={
                                                errors.branches_unavailable
                                            }
                                        />
                                    </CardContent>
                                </Card>
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
                                                : isEdit
                                                  ? 'تحديث المنتج'
                                                  : 'إضافة المنتج'}
                                        </Button>
                                        <Link href="/products">
                                            <Button
                                                variant="outline"
                                                type="button"
                                            >
                                                إلغاء
                                            </Button>
                                        </Link>
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
