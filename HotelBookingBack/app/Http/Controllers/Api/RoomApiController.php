<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomApiController extends Controller
{
    public function index(Request $request, $hotelId)
    {
        $query = Room::with(['hotel', 'roomType'])
            ->where('hotel_id', $hotelId);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('room_type_id')) {
            $query->where('room_type_id', $request->room_type_id);
        }

        $rooms = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => RoomResource::collection($rooms),
            'meta' => [
                'current_page' => $rooms->currentPage(),
                'last_page' => $rooms->lastPage(),
                'per_page' => $rooms->perPage(),
                'total' => $rooms->total(),
            ],
        ]);
    }

    public function show($id)
    {
        $room = Room::with(['hotel', 'roomType'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new RoomResource($room),
        ]);
    }
}
