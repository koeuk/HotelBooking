<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HotelResource;
use App\Models\Hotel;

class HotelApiController extends Controller
{
    public function show()
    {
        $hotel = Hotel::first();

        return response()->json([
            'success' => true,
            'data' => new HotelResource($hotel),
        ]);
    }
}
