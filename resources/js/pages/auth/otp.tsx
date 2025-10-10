import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import VerificationController from '@/actions/App/Http/Controllers/Auth/VerificationController';

export default function Otp() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Verify phone number" />
            <Form
                {...VerificationController.verify()}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <div>
                        <Input
                            name='code'
                            placeholder="enter otp code"></Input>
                        <InputError message={errors.code}></InputError>
                        <Button type="submit" disabled={processing} >Click</Button>
                    </div>
                )}
            </Form>

            <Form method='post' action='/resend-otp'
            disableWhileProcessing
            className="flex flex-col gap-6">
                <Button type="submit">Resend otp</Button>
            </Form>
        </AuthLayout>
    );
}
