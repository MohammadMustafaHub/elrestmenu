<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    Use HasUuids;
    protected $fillable = [
        'name',
        'subscription',
        'subscription_ends_at',
    ];

    protected $casts = [
        'subscription_ends_at' => 'datetime',
        'subscription' => 'array',
    ];

    public function isReservedName(string $name){
        $reservedNames = ['www', 'admin', 'mail', 'ftp', 'api', 'test', 'demo', 'management'];
        return in_array(strtolower($name), $reservedNames);
    }

}
