<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        $product = Product::query()->paginate(10);
        return inertia('Catalog/products/index', [
            'data' => $product,
        ]);
    }

    public function create()
    {
        if(auth()->user()->Tenant->checkProductsLimit())
        {
            return redirect()->intended(route('products.index', absolute: false))
                ->withErrors([
                    'limitError' => true
                ]);
        }

        $categories = Category::all();
        $branches = Branch::all();

        return inertia('Catalog/products/form', [
            'categories' => $categories,
            'branches' => $branches,
        ]);
    }

    public function edit(string $id)
    {
        $product = Product::query()->with('category')->findOrFail($id);
        $categories = Category::all();
        $branches = Branch::all();

        return inertia('Catalog/products/form', [
            'data' => $product,
            'categories' => $categories,
            'branches' => $branches,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric',
            'discounted_price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'required|boolean',
            'addons' => 'nullable|array',
            'addons.*.name' => 'required|string|max:255',
            'addons.*.price' => 'required|numeric|min:0',
            'options' => 'nullable|array',
            'options.*.name' => 'required|string|max:255',
            'options.*.price' => 'required|numeric',
            'branches_unavailable' => 'nullable|array',
        ]);

        if(auth()->user()->Tenant->checkProductsLimit())
        {
            return redirect()->intended(route('products.index', absolute: false))
                ->withErrors([
                    'limitError' => true
                ]);
        }

        $branches = Branch::all();
        // validate if branches are available if not return bad request
        if (isset($validated['branches_unavailable'])) {
            foreach ($validated['branches_unavailable'] as $branchId) {
                if (!$branches->contains('id', $branchId)) {
                    return redirect()->back()->withErrors(['branches_unavailable' => 'One or more selected branches are invalid.'])->withInput();
                }
            }
        }


        DB::transaction(function () use ($validated) {
            $tenant = auth()->user()->Tenant;
            $usage = $tenant->usage ?? [];
            $usage['products'] = ($usage['products'] ?? 0) + 1;
            $tenant->usage = $usage;
            $tenant->save();
            $product = Product::query()->create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'discounted_price' => $validated['discounted_price'],
                'image' => $validated['image']->store('products', 'public'),
                'is_active' => $validated['is_active'],
                'addons' => $validated['addons'] ?? [],
                'options' => $validated['options'] ?? [],
                'category_id' => $validated['category_id'],
                'branches_unavailable' => $validated['branches_unavailable'] ?? [],
            ]);
        });

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function update(string $id, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric',
            'discounted_price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'required|boolean',
            'addons' => 'nullable|array',
            'addons.*.name' => 'required|string|max:255',
            'addons.*.price' => 'required|numeric|min:0',
            'options' => 'nullable|array',
            'options.*.name' => 'required|string|max:255',
            'options.*.price' => 'required|numeric',
            'branches_unavailable' => 'nullable|array',
        ]);

        $product = Product::query()->findOrFail($id);

        $product->name = $validated['name'];
        $product->description = $validated['description'];
        $product->price = $validated['price'];
        $product->discounted_price = $validated['discounted_price'];
        if (isset($validated['image'])) {
            $product->image = $validated['image']->store('products', 'public');
        }
        $product->is_active = $validated['is_active'];
        $product->addons = $validated['addons'];
        $product->options = $validated['options'];
        $product->category_id = $validated['category_id'];
        $product->branches_unavailable = $validated['branches_unavailable'];
        $product->save();

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');

    }

    public function destroy(string $id)
    {
        $product = Product::query()->findOrFail($id);

        DB::transaction(function () use ($product) {
            $tenant = auth()->user()->Tenant;
            $usage = $tenant->usage ?? [];
            $usage['products'] = max(0, ($usage['products'] ?? 1) - 1);
            $tenant->usage = $usage;
            $tenant->save();
            $product->delete();
        });

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
