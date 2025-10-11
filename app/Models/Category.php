<?php

namespace App\Models;

use App\Traits\HasTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasTenant, HasUuids;
    protected $fillable = [
        'name',
        'tenant_id',
    ];


}
