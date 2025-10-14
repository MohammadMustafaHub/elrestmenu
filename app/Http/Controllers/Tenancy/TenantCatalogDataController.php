<?php

namespace App\Http\Controllers\Tenancy;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class TenantCatalogDataController extends Controller
{
    public function getCategories(Request $request)
    {
        $categories = Category::query()->paginate(150)->toArray();
        return response()->json($categories);
    }

    public function getBranches(Request $request)
    {
        $branches = Branch::query()->paginate(100)->toArray();
        return response()->json($branches);
    }

    public function getProducts(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $products = Product::query()
            ->when($request->query('category_id'), function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->paginate(150);

        return response()->json($products);
    }

}
