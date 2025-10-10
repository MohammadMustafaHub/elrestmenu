import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import { DashboardLayout } from '@/layouts/app/dashboard-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'إعدادات المظهر',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <DashboardLayout>
            <Head title="إعدادات المظهر" />

            <SettingsLayout>
                <div className="space-y-6" dir="rtl">
                    <HeadingSmall
                        title="إعدادات المظهر"
                        description="قم بتحديث إعدادات مظهر حسابك"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </DashboardLayout>
    );
}
