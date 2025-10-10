<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class MustHaveTenantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if(auth()->check() && empty(auth()->user()->tenant_id) || ! Str::isUuid(auth()->user()->tenant_id)) {
            return redirect()->intended(route('tenant.register', absolute: false));
        }
        return $next($request);
    }
}
