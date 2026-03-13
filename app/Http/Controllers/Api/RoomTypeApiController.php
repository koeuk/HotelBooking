<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeApiController extends Controller
{
    public function index(Request $request, $hotelId)
    {
        $roomTypes = RoomType::with('hotel')
            ->where('hotel_id', $hotelId)
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => RoomTypeResource::collection($roomTypes),
            'meta' => [
                'current_page' => $roomTypes->currentPage(),
                'last_page' => $roomTypes->lastPage(),
                'per_page' => $roomTypes->perPage(),
                'total' => $roomTypes->total(),
            ],
        ]);
    }

    public function show($id)
    {
        $roomType = RoomType::with('hotel')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new RoomTypeResource($roomType),
        ]);
    }
}
