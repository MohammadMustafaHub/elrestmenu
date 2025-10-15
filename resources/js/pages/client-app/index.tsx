import FoodOrderingClient from '@/components/client-ui/food-ordering-client';
import { Branch, Category, Product, SharedData } from '@/types';
import { useAppearance } from '@/hooks/use-appearance';
import { useEffect } from 'react';
import MobileHeader from '@/components/client-ui/mobile-header';
import { usePage } from '@inertiajs/react';
import TenantFooter from '@/components/client-ui/tenant-footer';
import { useTenantStore } from '@/stores/tenant-store';
import { useBranchesCacheStore } from '@/stores/branches-cache';



export default function ClientAppPage({ products, categories, branches } :
{ products: Product[], categories: Category[], branches: Branch[] }) {
    const { updateAppearance } = useAppearance();
    const tenant = usePage<SharedData>().props.tenant;
    const { setTenant } = useTenantStore();
    const { setBranches } = useBranchesCacheStore();
    
    useEffect(() => {
        updateAppearance("light");
        setTenant(tenant);
        setBranches(branches);
        console.log(tenant);
    }, [setTenant, tenant, updateAppearance, setBranches, branches]);



    return (
        <>
            <MobileHeader branches={branches} tenant={tenant} />
            <FoodOrderingClient products={products}
                                categories={categories} />

            <TenantFooter />
        </>
    );
}
