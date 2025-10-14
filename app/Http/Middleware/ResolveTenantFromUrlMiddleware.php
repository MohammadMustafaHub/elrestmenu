<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenantFromUrlMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $tenant = Tenant::where('name', $request->tenant)->first();
        if(!$tenant || !$tenant->isActive()){
            return response()->json(['message' => 'Tenant not found'], 404);
        }

        app()->instance(Tenant::class, $tenant);

        return $next($request);
    }
}









