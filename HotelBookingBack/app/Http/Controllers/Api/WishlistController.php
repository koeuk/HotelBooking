<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $roomTypes = $request->user()->wishlist()->with('amenities')->get();

        return response()->json([
            'success' => true,
            'data'    => RoomTypeResource::collection($roomTypes),
        ]);
    }

    public function store(Request $request, $roomTypeId)
    {
        $roomType = RoomType::findOrFail($roomTypeId);
        $request->user()->wishlist()->syncWithoutDetaching([$roomType->id]);

        return response()->json(['success' => true, 'message' => 'Added to wishlist.']);
    }

    public function destroy(Request $request, $roomTypeId)
    {
        $roomType = RoomType::findOrFail($roomTypeId);
        $request->user()->wishlist()->detach($roomType->id);

        return response()->json(['success' => true, 'message' => 'Removed from wishlist.']);
    }
}
