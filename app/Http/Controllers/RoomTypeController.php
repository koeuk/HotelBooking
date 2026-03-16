<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/RoomTypes/Index', [
            'roomTypes' => RoomType::with('hotel')->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/RoomTypes/Create', [
            'hotels' => Hotel::all(['id', 'name'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'max_guests' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'nullable|string',
            'new_images' => 'nullable|array',
            'new_images.*' => 'nullable|image|max:2048',
        ]);

        $images = $validated['existing_images'] ?? [];

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $images[] = '/storage/' . $file->store('room-types', 'public');
            }
        }

        $validated['images'] = array_values(array_filter($images));
        unset($validated['existing_images'], $validated['new_images']);

        RoomType::create($validated);

        return redirect()->route('admin.room-types.index')->with('success', 'Room type created successfully.');
    }

    public function show(RoomType $roomType)
    {
        $roomType->load(['hotel', 'rooms']);
        return Inertia::render('Admin/RoomTypes/Show', [
            'roomType' => $roomType
        ]);
    }

    public function edit(RoomType $roomType)
    {
        return Inertia::render('Admin/RoomTypes/Edit', [
            'roomType' => $roomType,
            'hotels' => Hotel::all(['id', 'name'])
        ]);
    }

    public function update(Request $request, RoomType $roomType)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'max_guests' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'nullable|string',
            'new_images' => 'nullable|array',
            'new_images.*' => 'nullable|image|max:2048',
        ]);

        $images = $validated['existing_images'] ?? [];

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $images[] = '/storage/' . $file->store('room-types', 'public');
            }
        }

        $validated['images'] = array_values(array_filter($images));
        unset($validated['existing_images'], $validated['new_images']);

        $roomType->update($validated);

        return redirect()->route('admin.room-types.index')->with('success', 'Room type updated successfully.');
    }

    public function destroy(RoomType $roomType)
    {
        $roomType->delete();
        return redirect()->route('admin.room-types.index')->with('success', 'Room type deleted successfully.');
    }
}
