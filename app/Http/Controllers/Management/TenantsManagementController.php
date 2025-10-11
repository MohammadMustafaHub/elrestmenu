<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantsManagementController extends Controller
{
    public function index()
    {
        if(!auth()->user()->is_system_admin){
            abort(404);
        }

        $tenants = Tenant::query()->paginate(10);

        return Inertia::render('management/index', [
            'data' => $tenants,
        ]);
    }


    public function upgradeTenant(Request $request, string $id)
    {
        if(!auth()->user()->is_system_admin){;
            abort(404);
        }

        $validated = $request->validate([
            'plan' => 'required|in:pro,premium'
        ]);

        $tenant = Tenant::findOrFail($id);

        match($validated['plan']) {
            'pro' => $tenant->subscripe(Subscription::Pro),
            'premium' => $tenant->subscripe(Subscription::Premium),
        };

        $tenant->save();

        return redirect()->back()->with('success', 'Tenant upgraded successfully.');
    }

}














