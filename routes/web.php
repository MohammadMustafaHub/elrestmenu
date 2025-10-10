<?php

use App\Http\Controllers\Catalog\BranchesController;
use App\Http\Middleware\MustBeVerifiedMiddleware;
use App\Http\Middleware\MustHaveTenantMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', MustBeVerifiedMiddleware::class, MustHaveTenantMiddleware::class])
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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
