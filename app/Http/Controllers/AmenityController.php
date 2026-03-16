<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmenityController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Amenities/Index', [
            'amenities' => Amenity::withCount('hotels')->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Amenities/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:amenities',
            'icon' => 'nullable|string|max:50',
        ]);

        Amenity::create($validated);

        return redirect()->route('admin.amenities.index')->with('success', 'Amenity created successfully.');
    }

    public function show(Amenity $amenity)
    {
        $amenity->load('hotels');
        return Inertia::render('Dashboard/Amenities/Show', [
            'amenity' => $amenity
        ]);
    }

    public function edit(Amenity $amenity)
    {
        return Inertia::render('Dashboard/Amenities/Edit', [
            'amenity' => $amenity
        ]);
    }

    public function update(Request $request, Amenity $amenity)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:amenities,name,' . $amenity->id,
            'icon' => 'nullable|string|max:50',
        ]);

        $amenity->update($validated);

        return redirect()->route('admin.amenities.index')->with('success', 'Amenity updated successfully.');
    }

    public function destroy(Amenity $amenity)
    {
        $amenity->delete();
        return redirect()->route('admin.amenities.index')->with('success', 'Amenity deleted successfully.');
    }
}
