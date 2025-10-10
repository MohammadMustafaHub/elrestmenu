<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;

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

        $branch = Branch::create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'is_open' => $validated['is_open'],
        ]);

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
        $branch->delete();

        return redirect()->route('branches.index');
    }
}










