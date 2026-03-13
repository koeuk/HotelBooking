<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use App\Models\Room;
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

    public function show(Booking $booking)
    {
        $booking->load(['user', 'room.hotel', 'room.roomType', 'payment']);
        return Inertia::render('Admin/Bookings/Show', [
            'booking' => $booking
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        $booking->update($validated);

        // Notify user on status change
        if (in_array($validated['status'], ['confirmed', 'cancelled', 'completed'])) {
            try {
                $booking->user->notify(new BookingStatusUpdatedUserNotification($booking, $validated['status']));
            } catch (\Exception $e) {
                // Don't break flow on notification failure
            }
        }

        return redirect()->back()->with('success', 'Booking status updated successfully.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('admin.bookings.index')->with('success', 'Booking deleted successfully.');
    }
}
