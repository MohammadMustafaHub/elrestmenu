import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import VerificationController from '@/actions/App/Http/Controllers/Auth/VerificationController';

export default function Otp() {
    return (
        <AuthLayout
            title="تأكيد رقم الهاتف"
            description="أدخل رمز التحقق المرسل إلى هاتفك"
        >
            <Head title="Verify phone number" />
            <Form
                {...VerificationController.verify()}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="code">رمز التحقق</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    name="code"
                                    placeholder="أدخل رمز التحقق"
                                />
                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={2}
                                data-test="verify-otp-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                تأكيد الرمز
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            <Form
                method="post"
                action="/resend-otp"
                disableWhileProcessing
                className="mt-4"
            >
                {({ processing }) => (
                    <div className="text-center text-sm text-muted-foreground">
                        لم تستلم الرمز؟{' '}
                        <Button
                            type="submit"
                            variant="link"
                            className="p-0 h-auto text-sm underline"
                            tabIndex={3}
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="h-3 w-3 animate-spin mr-1" />
                            )}
                            إعادة إرسال الرمز
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
