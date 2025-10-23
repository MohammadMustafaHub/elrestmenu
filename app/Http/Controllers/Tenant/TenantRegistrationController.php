<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\TenantSettings;
use App\Models\TenantUsage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TenantRegistrationController extends Controller
{
    public function register()
    {
        if(Str::isUuid(auth()->user()->tenant_id)) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        return Inertia::render('auth/register-tenant');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'unique:tenants,name|string|max:255|regex:/^(?!-)[a-z0-9-]{1,63}(?<!-)$/',
        ]);

        if(Tenant::isReservedName($validated['name'])) {
            return back()->withErrors([
                'name' => 'الاسم مستخدم بالفعل'
            ])->withInput();
        }

        DB::transaction(function () use ($validated) {
            $t = new Tenant();
            $t->name = Str::lower($validated['name']);
            $t->subscription = Subscription::Free;
            $t->setTenantUsage(new TenantUsage(branches: 1));
            $t->subscripe(Subscription::Free);
            $t->save();

            auth()->user()->update(['tenant_id' => $t->id]);

            $branch = Branch::create([
                'name' => 'الرايسي',
                'address' => 'الموقع'
            ]);

        });

        return redirect()->intended(route('dashboard', absolute: false));
    }
}














