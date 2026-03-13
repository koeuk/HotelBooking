<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponApiController extends Controller
{
    public function validate(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $coupon = Coupon::where('code', $request->code)->first();

        if (!$coupon) {
            return response()->json(['message' => 'Coupon not found.'], 404);
        }

        if (!$coupon->isValid()) {
            return response()->json(['message' => 'Coupon has expired.'], 422);
        }

        if ($coupon->max_uses > 0 && $coupon->used_count >= $coupon->max_uses) {
            return response()->json(['message' => 'Coupon usage limit reached.'], 422);
        }

        return response()->json([
            'data' => [
                'code' => $coupon->code,
                'discount_percent' => $coupon->discount_percent,
            ]
        ]);
    }
}
