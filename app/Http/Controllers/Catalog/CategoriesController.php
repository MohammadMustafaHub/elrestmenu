<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::query()->paginate(10);
        return Inertia::render('Catalog/categories/index',
            ['data' => $categories]
        );
    }

    public function create()
    {
        if(auth()->user()->Tenant->checkCategoriesLimit())
        {
            return redirect()->intended(route('categories.index', absolute: false))
                ->withErrors([
                    'limitError' => true
                ]);
        }
        return Inertia::render('Catalog/categories/form');
    }

    public function edit(string $id)
    {
        $category = Category::query()->findOrFail($id);
        return Inertia::render('Catalog/categories/form', ['data' => $category]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        if(auth()->user()->Tenant->checkCategoriesLimit())
        {

            return redirect()->intended(route('categories.index', absolute: false))
                ->withErrors([
                    'limitError' => true
                ]);
        }

        DB::transaction(function () use ($validated) {

            $tenant = auth()->user()->Tenant;

            $usage = $tenant->usage ?? [];
            $usage['categories'] = ($usage['categories'] ?? 0) + 1;
            $tenant->usage = $usage;
            $tenant->save();

            Category::create([
                'name' => $validated['name'],
            ]);
        });

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function update(string $id, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::query()->findOrFail($id);
        $category->update(['name' => $validated['name']]);
        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(string $id)
    {
        $category = Category::query()->findOrFail($id);

        DB::transaction(function () use ($category) {
            $tenant = auth()->user()->Tenant;

            $usage = $tenant->usage ?? [];
            $usage['categories'] = max(0, ($usage['categories'] ?? 1) - 1);
            $tenant->usage = $usage;
            $tenant->save();

            $category->delete();
        });

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}











