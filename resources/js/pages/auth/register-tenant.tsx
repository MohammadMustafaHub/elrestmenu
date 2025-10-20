import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import TenantRegistrationController from '@/actions/App/Http/Controllers/Tenant/TenantRegistrationController';

export default function RegisterTenant() {
    return (
        <AuthLayout
            title="إنشاء مطعم جديد"
            description="أدخل اسم المطعم لإنشاء موقعك الخاص"
        >
            <Head title="Register Tenant" />
            <Form
                {...TenantRegistrationController.store()}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div>
                                <Label htmlFor="name">اسم المطعم</Label>
                                <div className="flex" dir='ltr'>
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        https://
                                    </span>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        name="name"
                                        placeholder="اسم-المطعم"
                                        className="rounded-l-none"
                                    />
                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        .elrestmenu.com
                                    </span>
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                                <p className="text-xs text-muted-foreground flex flex-col">
                                    سيكون رابط مطعمك:
                                    <span dir='ltr' className='text-right'>https://اسم-المطعم.elrestmenu.com</span>
                                    يجب ان يتكون الاسم من احرف و ارقام انكليزية فقط و - (لايمكن للاسم ان يبدا ب - او ينتهي ب -)
                                </p>


                            </div>
                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={2}
                                data-test="register-tenant-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                إنشاء المطعم
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            لديك مطعم بالفعل؟{' '}
                            <TextLink href="/login" tabIndex={3}>
                                تسجيل الدخول
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
