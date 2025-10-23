<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BranchesController extends Controller
{
    public function index()
    {
        $branches = Branch::all();
        return inertia('Catalog/Branches/index', [
            'data' => $branches,
        ]);
    }

    public function create()
    {
        if(auth()->user()->Tenant->checkBranchesLimit())
        {
            return redirect()->intended(route('branches.index', absolute: false))
                ->withErrors([
                    'limitError' => true
                ]);
        }
        return inertia('Catalog/Branches/form');
    }

    public function edit(string $id)
    {
        $branch = Branch::findOrFail($id);
        return inertia('Catalog/Branches/form', [
            'branch' => $branch,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'is_open' => 'required|boolean',
        ]);

        if(auth()->user()->Tenant->checkBranchesLimit())
        {
            return redirect()->intended(route('branches.index', absolute: false))
                ->withErrors([
                    'limitError' => true
                ]);
        }

        DB::transaction(function () use ($validated) {

            $tenant = auth()->user()->Tenant;

            $usage = $tenant->usage ?? [];
            $usage['branches'] = ($usage['branches'] ?? 0) + 1;
            $tenant->usage = $usage;
            $tenant->save();

            $branch = Branch::create([
                'name' => $validated['name'],
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'is_open' => $validated['is_open'],
            ]);

        });

        return redirect()->route('branches.index');
    }

    public function update(string $id, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'is_open' => 'required|boolean',
        ]);

        $branch = Branch::findOrFail($id);

        $branch->update([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'is_open' => $validated['is_open'],
        ]);

        return redirect()->route('branches.index');
    }

    public function destroy(string $id)
    {
        $branch = Branch::findOrFail($id);

        $tenant = auth()->user()->Tenant;

        if($tenant->usage['branches'] <= 1)
        {
            return redirect()->intended(route('branches.index', absolute: false))
                ->with([
                    'oneBranchRequired' => true
                ]);
        }

        Db::transaction(function () use ($branch, $tenant) {
            $branch->delete();

            $usage = $tenant->usage ?? [];
            $usage['branches'] = max(0, ($usage['branches'] ?? 1) - 1);
            $tenant->usage = $usage;
            $tenant->save();
        });

        return redirect()->route('branches.index');
    }
}










