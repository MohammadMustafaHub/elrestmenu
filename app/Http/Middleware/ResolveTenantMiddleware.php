<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenantMiddleware
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

        // resolve from subdomain
        $host = $request->getHost();
        $subdomain = $this->getSubdomain($host);
        if ($subdomain) {
            $tenant = Tenant::where('name', $subdomain)->first();
            if ($tenant) {
                app()->instance(Tenant::class, $tenant);
                Inertia::share([
                    'tenant' => $tenant->makeHidden(['created_at', 'updated_at', 'subscription', 'subscription_ends_at', 'limits'])
                ]);
            }
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
