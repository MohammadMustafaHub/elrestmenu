<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TenantRegisterationController extends Controller
{
    public function register()
    {
        return Inertia::render('auth/register-tenant');
    }
}
