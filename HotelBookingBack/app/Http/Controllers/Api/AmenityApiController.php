<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityApiController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Amenity::withCount('hotels')->get()
        ]);
    }

    public function show($id)
    {
        $amenity = Amenity::withCount('hotels')->with('hotels:id,name')->findOrFail($id);
        return response()->json(['data' => $amenity]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:amenities',
            'icon' => 'nullable|string|max:50',
        ]);

        $amenity = Amenity::create($validated);
        return response()->json(['data' => $amenity], 201);
    }

    public function update(Request $request, $id)
    {
        $amenity = Amenity::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:amenities,name,' . $amenity->id,
            'icon' => 'nullable|string|max:50',
        ]);

        $amenity->update($validated);
        return response()->json(['data' => $amenity]);
    }

    public function destroy($id)
    {
        Amenity::findOrFail($id)->delete();
        return response()->json(['message' => 'Amenity deleted successfully.']);
    }
}
