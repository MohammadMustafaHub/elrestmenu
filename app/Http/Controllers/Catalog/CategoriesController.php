<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
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

        Category::query()->create(['name' => $validated['name']]);
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
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}











