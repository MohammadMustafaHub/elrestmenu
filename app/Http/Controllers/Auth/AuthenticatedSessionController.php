<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {

        $validated = $request->validate([
            'phone' => 'required|string|regex:/^9647\d{9}$/',
            'password' => 'string|required',
        ]);

        $user = User::query()->where('phone', $validated['phone'])->first();
        if($user == null)
        {
            return back()->withErrors(['phone' => 'رقم الهاتف أو كلمة المرور غير صحيحة']);
        }

        if(Carbon::parse($user->locked_until) > Carbon::now())
        {
            return back()->withErrors(['phone' => 'حسابك مقفل مؤقتا , الرجاء المحاولة لاحقا']);
        }

        if(!Hash::check($validated['password'], $user->password))
        {
            $user->IncrementLoginFailedAttempts();
            return back()->withErrors(['phone' => 'رقم الهاتف أو كلمة المرور غير صحيحة']);
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->intended(route('login', absolute: false));
    }
}
