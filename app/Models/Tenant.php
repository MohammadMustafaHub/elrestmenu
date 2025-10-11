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
        'limits'
    ];

    protected $casts = [
        'subscription_ends_at' => 'datetime',
        'subscription' => 'string',
        'settings' => 'array',
        'delivery_settings' => 'array',
        'limits' => 'array',
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

        $this->subscription = $subscription;
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

}













