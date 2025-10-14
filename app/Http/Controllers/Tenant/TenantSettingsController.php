<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\TenantDeliverySettings;
use App\Models\TenantSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantSettingsController extends Controller
{

    public function index()
    {
        $tenant = auth()->user()->Tenant;
        return Inertia::render('tenant/settings', [
            'settings' => $tenant->settings,
        ]);
    }

    public function updateUiSettings(Request $request)
    {
        $validated = $request->validate([
            'logo' => 'nullable|image|max:2048|mimes:jpeg,png,jpg,gif,svg',
            'display_name' => 'required|string|max:255',
            'working_starts' => 'required|date_format:H:i',
            'working_ends' => 'required|date_format:H:i|after:working_starts',
            'working_days' => 'required|array',
            'working_days.*' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
        ]);

        $tenant = auth()->user()->Tenant;

        $logoUrl = data_get($tenant->settings, 'logo_url');
        // dd($logoUrl);
        if($request->hasFile('logo'))
        {
            $logoUrl = $request->file('logo')->store('logos', 'r2');
        }

        $tenant->setTenantSettings(new TenantSettings(
            $validated['display_name'],
            $logoUrl,
            $validated['working_days'],
            $validated['working_starts'],
            $validated['working_ends'],
        ));

        $tenant->save();

        return redirect()->back();
    }

    public function getDeliverySettings()
    {
        $settings = auth()->user()->Tenant->delivery_settings;
        return Inertia::render('tenant/delivery', [
            'settings' => $settings,
        ]);

    }

    public function updateDeliverySettings(Request $request)
    {
        $validated = $request->validate([
            'delivery_fee' => 'required|numeric|min:0',
            'additional_delivery_fee' => 'array',
            'additional_delivery_fee.*.description' => 'string|nullable|max:255',
            'additional_delivery_fee.*.amount' => 'numeric|nullable|min:0',
            'allow_delivery' => 'required|boolean',
        ]);

        // Filter out empty additional fees
        $additionalFees = collect($validated['additional_delivery_fee'] ?? [])
            ->filter(function ($fee) {
                return !empty($fee['description']) || ($fee['amount'] ?? 0) > 0;
            })
            ->values()
            ->toArray();

        $tenant = auth()->user()->Tenant;
        $tenant->setDeliverySettings(new TenantDeliverySettings(
            $validated['delivery_fee'],
            $additionalFees,
            $validated['allow_delivery'],
        ));
        $tenant->save();
        return redirect()->back();

    }

    public function subscription()
    {
        $tenant = auth()->user()->Tenant;
        return Inertia::render('tenant/subscription');
    }

}




















