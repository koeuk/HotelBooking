<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeApiController extends Controller
{
    public function index(Request $request)
    {
        $query = RoomType::with('amenities')->where('is_active', true);

        if ($request->has('min_guests')) {
            $query->where('max_guests', '>=', (int) $request->min_guests);
        }

        if ($request->has('max_price')) {
            $query->where('price_per_night', '<=', (float) $request->max_price);
        }

        $roomTypes = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => RoomTypeResource::collection($roomTypes),
            'meta' => [
                'current_page' => $roomTypes->currentPage(),
                'last_page'    => $roomTypes->lastPage(),
                'per_page'     => $roomTypes->perPage(),
                'total'        => $roomTypes->total(),
            ],
        ]);
    }

    public function show($uuid)
    {
        $roomType = RoomType::with('amenities')->where('uuid', $uuid)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new RoomTypeResource($roomType),
        ]);
    }
}
