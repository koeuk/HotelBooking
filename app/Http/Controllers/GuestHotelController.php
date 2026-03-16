<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestHotelController extends Controller
{
    public function index(Request $request)
    {
        $query = Hotel::withCount('rooms');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        if ($city = $request->input('city')) {
            $query->where('city', $city);
        }

        $hotels = $query->orderByDesc('rating')->paginate(12);
        $cities = Hotel::distinct()->pluck('city');

        return Inertia::render('Hotels/Index', [
            'hotels' => $hotels,
            'cities' => $cities,
            'filters' => $request->only(['search', 'city']),
        ]);
    }

    public function show(Hotel $hotel)
    {
        $hotel->load(['roomTypes.rooms', 'amenities', 'reviews.user']);
        return Inertia::render('Hotels/Show', [
            'hotel' => $hotel,
        ]);
    }
}
