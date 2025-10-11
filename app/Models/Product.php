<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\HasTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Product extends Model
{
    use HasTenant, HasUuids;
    protected $fillable = [
        'name',
        'description',
        'price',
        'discounted_price',
        'image',
        'is_active',
        'addons',
        'options',
        'category_id',
        'branches_unavailable',
        'tenant_id',
    ];

    protected function casts(): array
    {
        return [
            'addons' => 'array',
            'options' => 'array',
            'branches_unavailable' => 'array',
            'is_active' => 'boolean',
            'price' => 'float',
            'discounted_price' => 'float',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

}
