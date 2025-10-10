<?php

namespace App\Models;

use App\Traits\HasTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasUuids, HasTenant;
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'is_open',
        'tenant_id',
    ];

    protected $casts = [
        'is_open' => 'boolean',
    ];
}
