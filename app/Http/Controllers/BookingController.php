<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use App\Models\Room;
use App\Notifications\BookingCreatedAdminNotification;
use App\Notifications\BookingStatusUpdatedUserNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::with(['user', 'room.hotel', 'room.roomType', 'payment'])
                ->latest()
                ->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Bookings/Create', [
            'users' => User::where('role', 'guest')->get(['id', 'name', 'email']),
            'rooms' => Room::with(['hotel', 'roomType'])
                ->where('status', 'available')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        $room = Room::with('roomType')->findOrFail($validated['room_id']);

        // Calculate total price
        $checkIn = new \DateTime($validated['check_in_date']);
        $checkOut = new \DateTime($validated['check_out_date']);
        $nights = $checkIn->diff($checkOut)->days;
        $totalPrice = $nights * $room->roomType->price_per_night;

        $booking = Booking::create([
            'user_id' => $validated['user_id'],
            'room_id' => $validated['room_id'],
            'check_in_date' => $validated['check_in_date'],
            'check_out_date' => $validated['check_out_date'],
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        // Notify admin
        try {
            $admin = User::where('role', 'admin')->first();
            if ($admin) {
                $admin->notify(new BookingCreatedAdminNotification($booking));
            }
        } catch (\Exception $e) {
            // Don't break flow
        }

        return redirect()->route('admin.bookings.index')->with('success', 'Booking created successfully.');
    }

    public function show(Booking $booking)
    {
        $booking->load(['user', 'room.hotel', 'room.roomType', 'payment']);
        return Inertia::render('Admin/Bookings/Show', [
            'booking' => $booking
        ]);
    }

    public function edit(Booking $booking)
    {
        $booking->load(['user', 'room.hotel', 'room.roomType']);
        return Inertia::render('Admin/Bookings/Edit', [
            'booking' => $booking,
            'users' => User::where('role', 'guest')->get(['id', 'name', 'email']),
            'rooms' => Room::with(['hotel', 'roomType'])->get(),
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'room_id' => 'sometimes|exists:rooms,id',
            'check_in_date' => 'sometimes|date',
            'check_out_date' => 'sometimes|date|after:check_in_date',
            'status' => 'sometimes|in:pending,confirmed,cancelled,completed',
        ]);

        // Recalculate price if dates or room changed
        if (isset($validated['room_id']) || isset($validated['check_in_date']) || isset($validated['check_out_date'])) {
            $roomId = $validated['room_id'] ?? $booking->room_id;
            $checkIn = new \DateTime($validated['check_in_date'] ?? $booking->check_in_date);
            $checkOut = new \DateTime($validated['check_out_date'] ?? $booking->check_out_date);
            $room = Room::with('roomType')->findOrFail($roomId);
            $nights = $checkIn->diff($checkOut)->days;
            $validated['total_price'] = $nights * $room->roomType->price_per_night;
        }

        $oldStatus = $booking->status;
        $booking->update($validated);

        if (isset($validated['status']) && $validated['status'] !== $oldStatus && in_array($validated['status'], ['confirmed', 'cancelled', 'completed'])) {
            try {
                $booking->user->notify(new BookingStatusUpdatedUserNotification($booking, $validated['status']));
            } catch (\Exception $e) {
                // Don't break flow
            }
        }

        return redirect()->route('admin.bookings.index')->with('success', 'Booking updated successfully.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('admin.bookings.index')->with('success', 'Booking deleted successfully.');
    }
}
