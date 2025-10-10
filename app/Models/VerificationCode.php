<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    use HasUuids;

    protected $fillable = [
        'phone',
        'code',
        'expires_at',
    ];

}
