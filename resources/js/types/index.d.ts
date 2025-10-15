import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    tenant: Tenant;
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
    phone_verified_at: string | null;
    two_factor_enabled?: boolean;
    is_system_admin?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Tenant {
    id: string;
    name: string;
    subscription?: 'free' | 'pro' | 'premium';
    subscription_ends_at?: string | null;
    created_at: string;
    updated_at: string;
    limits: TenantLimits;
    usage: TenantUsage;
    settings: TenantSettings;
    delivery_settings: TenantDelivery;
}

export interface TenantLimits {
    products: number;
    categories: number;
    branches: number;
}

export interface TenantUsage {
    products: number;
    categories: number;
    branches: number;
}

export interface TenantSettings {
    display_name: string;
    logo_url: string;
    working_days: string[];
    working_starts: string;
    working_ends: string;

}

export interface TenantDelivery {
    delivery_fee: number;
    additional_delivery_fee: { description: string; amount: number }[];
    allow_delivery: boolean;
}


export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discounted_price?: number;
    image: string;
    category_id: string;
    addons: Addon[];
    options: Option[];
    branches_unavailable: string[];
    is_active: boolean;
}

export interface Addon {
    name: string;
    price: number;
}

export interface Option {
    name: string;
    price: number;
}

export interface Category {
    id: string;
    name: string;
}

interface Branch {
    id: number
    name: string
    address: string
    phone: string
    is_open: boolean
}













