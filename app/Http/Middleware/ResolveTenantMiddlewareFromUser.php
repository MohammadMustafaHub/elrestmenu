<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenantMiddlewareFromUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->check()){
            app()->instance(Tenant::class, auth()->user()->Tenant);
            Inertia::share([
                'tenant' => app(Tenant::class),
            ]);
            return $next($request);
        }

        return $next($request);
    }

    private function getSubdomain(string $host): ?string
    {
        $parts = explode('.', $host);
        if (count($parts) < 3) {
            return null; // No subdomain present
        }

        if(Tenant::isReservedName($parts[0])) {
            return null; // Reserved subdomain
        }

        return $parts[0];
    }

}
