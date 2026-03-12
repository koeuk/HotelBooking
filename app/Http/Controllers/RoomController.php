<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => Room::with(['hotel', 'roomType'])->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Rooms/Create', [
            'hotels' => Hotel::all(['id', 'name']),
            'roomTypes' => RoomType::all(['id', 'name', 'hotel_id'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'room_number' => 'required|string|max:255',
            'floor' => 'nullable|integer',
            'status' => 'required|in:available,booked,maintenance',
        ]);

        Room::create($validated);

        return redirect()->route('admin.rooms.index')->with('success', 'Room created successfully.');
    }

    public function edit(Room $room)
    {
        return Inertia::render('Admin/Rooms/Edit', [
            'room' => $room,
            'hotels' => Hotel::all(['id', 'name']),
            'roomTypes' => RoomType::all(['id', 'name', 'hotel_id'])
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'room_number' => 'required|string|max:255',
            'floor' => 'nullable|integer',
            'status' => 'required|in:available,booked,maintenance',
        ]);

        $room->update($validated);

        return redirect()->route('admin.rooms.index')->with('success', 'Room updated successfully.');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('admin.rooms.index')->with('success', 'Room deleted successfully.');
    }
}
