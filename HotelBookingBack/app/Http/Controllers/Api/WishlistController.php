<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HotelResource;
use App\Models\Hotel;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $hotels = $request->user()->wishlist()->get();

        return response()->json(['success' => true, 'data' => HotelResource::collection($hotels)]);
    }

    public function store(Request $request, $hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $request->user()->wishlist()->syncWithoutDetaching([$hotel->id]);

        return response()->json(['success' => true, 'message' => 'Added to cart.']);
    }

    public function destroy(Request $request, $hotelId)
    {
        $hotel = Hotel::findOrFail($hotelId);
        $request->user()->wishlist()->detach($hotel->id);

        return response()->json(['success' => true, 'message' => 'Removed from cart.']);
    }
}
