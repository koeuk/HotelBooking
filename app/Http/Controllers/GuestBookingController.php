<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestBookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()->bookings()
            ->with(['room.hotel', 'room.roomType', 'payment'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function show(Request $request, \App\Models\Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id) {
            abort(403);
        }
        $booking->load(['room.hotel', 'room.roomType', 'payment', 'review']);
        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
        ]);
    }
}
