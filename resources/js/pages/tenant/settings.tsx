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
import { DashboardLayout } from '@/layouts/app/dashboard-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Save } from 'lucide-react';
import { use, useRef, useState } from 'react';

interface TenantSettings {
    display_name?: string;
    logo_url?: string;
    working_starts?: string;
    working_ends?: string;
    working_days?: string[];
}

interface SettingsPageProps {
    settings?: TenantSettings;
}

const workingDaysOptions = [
    { value: 'monday', label: 'الاثنين' },
    { value: 'tuesday', label: 'الثلاثاء' },
    { value: 'wednesday', label: 'الأربعاء' },
    { value: 'thursday', label: 'الخميس' },
    { value: 'friday', label: 'الجمعة' },
    { value: 'saturday', label: 'السبت' },
    { value: 'sunday', label: 'الأحد' },
];

export default function TenantSettings({ settings }: SettingsPageProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(
        settings?.logo_url ? `/storage/${settings.logo_url}` : null,
    );
    console.log('settings', settings);

    const workingDays = useRef<string[]>(settings?.working_days || []);
    const image = useRef<File | null>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            image.current = file;
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleWorkingDayChange = (day: string, checked: boolean) => {
        if (checked) {
            workingDays.current.push(day);
        } else {
            workingDays.current = workingDays.current.filter((d) => d !== day);
        }
    };

    return (
        <DashboardLayout>
            <Head title="إعدادات المطعم" />

            <div className="space-y-6" dir="rtl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        إعدادات المطعم
                    </h1>
                    <p className="text-muted-foreground">
                        قم بتحديث معلومات وإعدادات مطعمك
                    </p>
                </div>

                {/* ✅ Inertia Form Component */}
                <Form
                    method="post"
                    transform={(data) => {
                        const req : any =  {
                            'display_name': data.display_name,
                            'working_starts': data.working_starts,
                            'working_ends': data.working_ends,
                            'working_days': workingDays.current,
                        };

                        if (image.current) {
                            req['logo'] = image.current;
                        }

                        return req;
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors, reset }) => (
                        <>
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>المعلومات الأساسية</CardTitle>
                                    <CardDescription>
                                        معلومات أساسية عن المطعم
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="display_name">
                                            اسم المطعم{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="display_name"
                                            name="display_name"
                                            type="text"
                                            defaultValue={
                                                settings?.display_name
                                            }
                                            placeholder="أدخل اسم المطعم"
                                            required
                                            className="text-right"
                                        />
                                        <InputError message={errors.display_name} />
                                    </div>

                                    {/* Logo Upload */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="logo">
                                            شعار المطعم
                                        </Label>
                                        <div className="flex items-center gap-4">
                                            {logoPreview && (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-muted">
                                                    <img
                                                        src={logoPreview}
                                                        alt="Logo preview"
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <Input
                                                    id="logo"
                                                    name="logo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoChange}
                                                    className="cursor-pointer"
                                                />
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    PNG, JPG, GIF حتى 2MB
                                                </p>
                                            </div>
                                        </div>
                                        <InputError
                                            message={errors.logo_url}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Working Hours */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>ساعات العمل</CardTitle>
                                    <CardDescription>
                                        حدد أوقات عمل المطعم
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="working_starts">
                                                وقت البداية{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="working_starts"
                                                name="working_starts"
                                                type="time"
                                                defaultValue={settings?.working_starts}
                                                required
                                            />
                                            <InputError
                                                message={errors.working_starts}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="working_ends">
                                                وقت النهاية{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                
                                                id="working_ends"
                                                name="working_ends"
                                                type="time"
                                                defaultValue={settings?.working_ends}
                                                required
                                            />
                                            <InputError
                                                message={errors.working_ends}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>
                                            أيام العمل{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                            {workingDaysOptions.map(
                                                (option) => (
                                                    <div
                                                        key={option.value}
                                                        className="flex items-center space-x-2 space-x-reverse"
                                                    >
                                                        <Checkbox
                                                            name="working_days"
                                                            id={option.value}
                                                            value={option.value}
                                                            defaultChecked={settings?.working_days?.includes(option.value) ? true : false}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                handleWorkingDayChange(
                                                                    option.value,
                                                                    checked as boolean,
                                                                )
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={
                                                                option.value
                                                            }
                                                            className="text-sm font-normal"
                                                        >
                                                            {option.label}
                                                        </Label>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        
                                    </div>
                                </CardContent>
                            </Card>

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
                                            onClick={() => reset()}
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
