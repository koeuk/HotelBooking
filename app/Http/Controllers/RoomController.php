<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $query = Room::with(['hotel', 'roomType']);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }
        if ($hotel = $request->input('hotel')) {
            $query->where('hotel_id', $hotel);
        }
        if ($search = $request->input('search')) {
            $query->where('room_number', 'like', "%{$search}%");
        }

        return Inertia::render('Dashboard/Rooms/Index', [
            'rooms' => $query->latest()->paginate(10)->withQueryString(),
            'hotels' => Hotel::all(['id', 'name']),
            'filters' => $request->only(['status', 'hotel', 'search']),
            'counts' => [
                'all' => Room::count(),
                'available' => Room::where('status', 'available')->count(),
                'booked' => Room::where('status', 'booked')->count(),
                'maintenance' => Room::where('status', 'maintenance')->count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Rooms/Create', [
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

        return redirect()->route('dashboard.rooms.index')->with('success', 'Room created successfully.');
    }

    public function show(Room $room)
    {
        $room->load(['hotel', 'roomType', 'bookings.user']);
        return Inertia::render('Dashboard/Rooms/Show', [
            'room' => $room
        ]);
    }

    public function edit(Room $room)
    {
        return Inertia::render('Dashboard/Rooms/Edit', [
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

        return redirect()->route('dashboard.rooms.index')->with('success', 'Room updated successfully.');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('dashboard.rooms.index')->with('success', 'Room deleted successfully.');
    }
}
