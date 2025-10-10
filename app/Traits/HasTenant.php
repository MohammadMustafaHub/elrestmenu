<?php

namespace App\Traits;

use App\Models\Tenant;

trait HasTenant
{
    public static function bootHasTenant()
    {
        static::creating(function ($model) {
            $tenant = app(Tenant::class);
            if (auth()->check() && auth()->user()->tenant_id) {
                $model->tenant_id = auth()->user()->tenant_id;
            }
        });

        static::addGlobalScope('tenant', function ($builder) {
            if (auth()->check() && auth()->user()->tenant_id) {
                $builder->where('tenant_id', auth()->user()->tenant_id);
            }
        });
    }
}
