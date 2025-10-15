<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenantFromSubdomainMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $subdomain = $this->getSubdomain($request->getHost());
        if(!$subdomain){
            return response()->json(['message' => 'Tenant not found'], 404);
        };

        $tenant= Tenant::query()->where('name', $subdomain)->first();
        if(!$tenant){
            return response()->json(['message' => 'Tenant not found'], 404);
        }

        app()->instance(Tenant::class, $tenant);

        Inertia::share('tenant', app(Tenant::class)
            ->except('limits', 'usage', 'subscription', 'subscription_ends_at'));

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
