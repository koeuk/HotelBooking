<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HotelController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Hotels/Index', [
            'hotels' => Hotel::latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Hotels/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'rating' => 'nullable|numeric|min:0|max:5',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'nullable|string',
            'new_images' => 'nullable|array',
            'new_images.*' => 'nullable|image|max:2048',
        ]);

        $images = $validated['existing_images'] ?? [];

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $images[] = '/storage/' . $file->store('hotels', 'public');
            }
        }

        $validated['images'] = array_values(array_filter($images));
        unset($validated['existing_images'], $validated['new_images']);

        Hotel::create($validated);

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel created successfully.');
    }

    public function show(Hotel $hotel)
    {
        $hotel->load(['roomTypes', 'rooms', 'amenities', 'reviews.user']);
        return Inertia::render('Admin/Hotels/Show', [
            'hotel' => $hotel
        ]);
    }

    public function edit(Hotel $hotel)
    {
        return Inertia::render('Admin/Hotels/Edit', [
            'hotel' => $hotel
        ]);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'rating' => 'nullable|numeric|min:0|max:5',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'nullable|string',
            'new_images' => 'nullable|array',
            'new_images.*' => 'nullable|image|max:2048',
        ]);

        $images = $validated['existing_images'] ?? [];

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $images[] = '/storage/' . $file->store('hotels', 'public');
            }
        }

        $validated['images'] = array_values(array_filter($images));
        unset($validated['existing_images'], $validated['new_images']);

        $hotel->update($validated);

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel updated successfully.');
    }

    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return redirect()->route('admin.hotels.index')->with('success', 'Hotel deleted successfully.');
    }
}
