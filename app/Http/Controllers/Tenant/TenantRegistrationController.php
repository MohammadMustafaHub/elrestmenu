<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Tenant;
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
            'name' => 'unique:tenants,name|string|max:255|regex:/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/',
        ]);

        if(Tenant::isReservedName($validated['name'])) {
            return back()->withErrors([
                'name' => 'الاسم مستخدم بالفعل'
            ])->withInput();
        }

        DB::transaction(function () use ($validated) {
            $t = new Tenant();
            $t->name = $validated['name'];
            $t->subscription = Subscription::Free;
            $t->subscripe(Subscription::Free);
            $t->save();

            auth()->user()->update(['tenant_id' => $t->id]);
        });

        return redirect()->intended(route('dashboard', absolute: false));
    }
}














