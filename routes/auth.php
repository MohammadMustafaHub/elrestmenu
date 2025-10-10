<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store'])
        ->name('register.store');

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('login.store');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::get('verify-phone', [\App\Http\Controllers\Auth\VerificationController::class, 'show'])
    ->name('verification.show');;
    Route::post('verify-phone', [\App\Http\Controllers\Auth\VerificationController::class, 'verify'])
    ->name('verification.verify');;
    Route::post('resend-otp', [\App\Http\Controllers\Auth\VerificationController::class, 'resend'])
    ->name('verification.resend');

    Route::get('register-tenant',
    [\App\Http\Controllers\Tenant\TenantRegistrationController::class, 'register'])
        ->name('tenant.register');

    Route::post('register-tenant',
    [\App\Http\Controllers\Tenant\TenantRegistrationController::class, 'store'])
        ->name('tenant.register.store');
});
