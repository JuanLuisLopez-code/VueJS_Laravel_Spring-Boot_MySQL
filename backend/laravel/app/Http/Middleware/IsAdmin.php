<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{

    public function handle(Request $request, Closure $next)
    {
        try {
            if (auth()->user() == null || auth()->user()->type != "admin") {
                return response()->json([
                    "error" => "Unauthorized"
                ], 401);
            }
            return $next($request);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => "Unauthorized"
            ], 401);
        }
    }
}
