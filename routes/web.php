<?php

use App\Http\Controllers\Catalog\BranchesController;
use App\Http\Controllers\Catalog\CategoriesController;
use App\Http\Controllers\Catalog\ProductsController;
use App\Http\Controllers\Tenant\TenantSettingsController;
use App\Http\Middleware\MustBeVerifiedMiddleware;
use App\Http\Middleware\MustHaveTenantMiddleware;
use App\Http\Middleware\RootDomainAccessMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', RootDomainAccessMiddleware::class,
    MustBeVerifiedMiddleware::class,
    MustHaveTenantMiddleware::class])
    ->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::get('branches', [BranchesController::class, 'index'])
    ->name('branches.index');
    Route::get('branches/create', [BranchesController::class, 'create'])
    ->name('branches.create');
    Route::get('branches/edit/{id}', [BranchesController::class, 'edit'])
        ->name('branches.edit');

    Route::post('branches', [BranchesController::class, 'store'])
        ->name('branches.store');

    Route::put('branches/{id}', [BranchesController::class, 'update'])
    ->name('branches.update');

    Route::delete('branches/{id}', [BranchesController::class, 'destroy'])
        ->name('branches.destroy');


        Route::get('categories', [CategoriesController::class, 'index'])
            ->name('categories.index');
        Route::get('categories/create', [CategoriesController::class, 'create'])
            ->name('categories.create');
        Route::get('categories/edit/{id}', [CategoriesController::class, 'edit'])
            ->name('categories.edit');

        Route::post('categories', [CategoriesController::class, 'store'])
            ->name('categories.store');

        Route::put('categories/{id}', [CategoriesController::class, 'update'])
            ->name('categories.update');

        Route::delete('categories/{id}', [CategoriesController::class, 'destroy'])
            ->name('categories.destroy');


        Route::get('products', [ProductsController::class, 'index'])
            ->name('products.index');
        Route::get('products/create', [ProductsController::class, 'create'])
            ->name('products.create');
        Route::get('products/edit/{id}', [ProductsController::class, 'edit'])
            ->name('products.edit');

        Route::post('products', [ProductsController::class, 'store'])
            ->name('products.store');

        Route::put('products/{id}', [ProductsController::class, 'update'])
            ->name('products.update');

        Route::delete('products/{id}', [ProductsController::class, 'destroy'])
            ->name('products.destroy');


        Route::get('settings', [TenantSettingsController::class, 'index'])
        ->name('tenant.settings');

    Route::post('settings', [TenantSettingsController::class, 'updateUiSettings'])
        ->name('tenant.settings.ui');

    Route::get('delivery', [TenantSettingsController::class, 'getDeliverySettings'])
        ->name('tenant.delivery.settings');

    Route::post('delivery', [TenantSettingsController::class, 'updateDeliverySettings'])
        ->name('tenant.delivery.settings');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
