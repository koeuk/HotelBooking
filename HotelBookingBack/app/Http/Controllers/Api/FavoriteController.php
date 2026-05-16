<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomType;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $ids = $request->user()->favorites()->pluck('room_types.id');

        return response()->json(['success' => true, 'data' => $ids]);
    }

    public function store(Request $request, $roomTypeId)
    {
        $roomType = RoomType::findOrFail($roomTypeId);
        $request->user()->favorites()->syncWithoutDetaching([$roomType->id]);

        return response()->json(['success' => true, 'message' => 'Added to favorites.']);
    }

    public function destroy(Request $request, $roomTypeId)
    {
        $roomType = RoomType::findOrFail($roomTypeId);
        $request->user()->favorites()->detach($roomType->id);

        return response()->json(['success' => true, 'message' => 'Removed from favorites.']);
    }
}
