<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    Use HasUuids;
    protected $fillable = [
        'name',
        'subscription',
        'subscription_ends_at',
        'settings',
        'delivery_settings',
        'limits',
        'usage'
    ];

    protected $casts = [
        'subscription_ends_at' => 'datetime',
        'subscription' => 'string',
        'settings' => 'array',
        'delivery_settings' => 'array',
        'limits' => 'array',
        'usage' => 'array',
    ];

    public static function isReservedName(string $name){
        $reservedNames = ['www', 'admin', 'mail', 'ftp', 'api', 'test', 'demo', 'management'];
        return in_array(strtolower($name), $reservedNames);
    }


    public function subscripe(Subscription $subscription)
    {
        $limits = match ($subscription) {
            Subscription::Free, Subscription::Pro => [
                'products' => 200,
                'categories' => 50,
                'branches' => 1,
            ],
            Subscription::Premium => [
                'products' => 1000,
                'categories' => 200,
                'branches' => 50,
            ],
        };

        $sub_ends_at = match ($subscription) {
            Subscription::Free => Carbon::now()->addDays(5),
            Subscription::Pro, Subscription::Premium => Carbon::now()->addDays(365),
        };

        $this->subscription = $subscription->value;
        $this->subscription_ends_at = $sub_ends_at;
        $this->limits = $limits;
    }

    public function setDeliverySettings(TenantDeliverySettings $deliverySettings)
    {
        $this->delivery_settings = $deliverySettings->toArray();
    }

    public function setTenantSettings(TenantSettings $tenantSettings)
    {
        $this->settings = $tenantSettings->toArray();
    }

    public function setTenantUsage(TenantUsage $usage)
    {
        $this->usage = $usage->toArray();
    }

    public function checkBranchesLimit(): bool
    {
        $limits = $this->limits ?? [];
        $usage = $this->usage ?? [];

        $branchesLimit = $limits['branches'] ?? 0;
        $branchesUsage = $usage['branches'] ?? 0;

        return $branchesUsage >= $branchesLimit;
    }

    public function checkProductsLimit(): bool
    {
        $limits = $this->limits ?? [];
        $usage = $this->usage ?? [];

        $productsLimit = $limits['products'] ?? 0;
        $productsUsage = $usage['products'] ?? 0;

        return $productsUsage >= $productsLimit;
    }

    public function checkCategoriesLimit(): bool
    {
        $limits = $this->limits ?? [];
        $usage = $this->usage ?? [];

        $categoriesLimit = $limits['categories'] ?? 0;
        $categoriesUsage = $usage['categories'] ?? 0;

        return $categoriesUsage >= $categoriesLimit;
    }

}


class TenantUsage
{
    public int $products;
    public int $categories;
    public int $branches;

    public function __construct(int $products = 0, int $categories = 0, int $branches = 0)
    {
        $this->products = $products;
        $this->categories = $categories;
        $this->branches = $branches;
    }

    public function toArray(): array
    {
        return [
            'products' => $this->products,
            'categories' => $this->categories,
            'branches' => $this->branches,
        ];
    }
}










