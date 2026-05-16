<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $ids = $request->user()->favorites()->pluck('hotels.id');

        return response()->json(['success' => true, 'data' => $ids]);
    }

    public function store(Request $request, $hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $request->user()->favorites()->syncWithoutDetaching([$hotel->id]);

        return response()->json(['success' => true, 'message' => 'Added to favorites.']);
    }

    public function destroy(Request $request, $hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $request->user()->favorites()->detach($hotel->id);

        return response()->json(['success' => true, 'message' => 'Removed from favorites.']);
    }
}
