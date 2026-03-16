<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WebBookingController extends Controller
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

    public function create(Request $request, \App\Models\Hotel $hotel)
    {
        $hotel->load(['roomTypes.rooms' => function ($q) {
            $q->where('status', 'available');
        }, 'amenities']);

        return Inertia::render('Bookings/Create', [
            'hotel' => $hotel,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        $room = \App\Models\Room::with('roomType')->findOrFail($validated['room_id']);

        // Check room is available
        if ($room->status !== 'available') {
            return back()->with('error', 'This room is no longer available.');
        }

        // Check for overlapping bookings
        $overlap = \App\Models\Booking::where('room_id', $room->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function ($q) use ($validated) {
                $q->whereBetween('check_in_date', [$validated['check_in_date'], $validated['check_out_date']])
                  ->orWhereBetween('check_out_date', [$validated['check_in_date'], $validated['check_out_date']])
                  ->orWhere(function ($q2) use ($validated) {
                      $q2->where('check_in_date', '<=', $validated['check_in_date'])
                         ->where('check_out_date', '>=', $validated['check_out_date']);
                  });
            })->exists();

        if ($overlap) {
            return back()->with('error', 'These dates are already booked. Please choose different dates.');
        }

        // Calculate price
        $checkIn = new \DateTime($validated['check_in_date']);
        $checkOut = new \DateTime($validated['check_out_date']);
        $nights = $checkIn->diff($checkOut)->days;
        $totalPrice = $nights * $room->roomType->price_per_night;

        $booking = \App\Models\Booking::create([
            'user_id' => $request->user()->id,
            'room_id' => $room->id,
            'check_in_date' => $validated['check_in_date'],
            'check_out_date' => $validated['check_out_date'],
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        // Notify admin
        try {
            $admin = \App\Models\User::where('role', 'admin')->first();
            if ($admin) {
                $admin->notify(new \App\Notifications\BookingCreatedAdminNotification($booking));
            }
        } catch (\Exception $e) {}

        return redirect()->route('bookings.show', $booking->uuid)->with('success', "Booking confirmed! {$nights} nights for \${$totalPrice}.");
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

    public function cancel(Request $request, \App\Models\Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id) {
            abort(403);
        }
        if ($booking->status !== 'pending') {
            return back()->with('error', 'Only pending bookings can be cancelled.');
        }

        $booking->update(['status' => 'cancelled']);

        try {
            $request->user()->notify(new \App\Notifications\BookingStatusUpdatedUserNotification($booking, 'cancelled'));
        } catch (\Exception $e) {}

        return back()->with('success', 'Booking cancelled successfully.');
    }

    public function pay(Request $request, \App\Models\Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id) {
            abort(403);
        }
        if ($booking->payment) {
            return back()->with('error', 'Payment already exists for this booking.');
        }
        if ($booking->status === 'cancelled') {
            return back()->with('error', 'Cannot pay for a cancelled booking.');
        }

        $validated = $request->validate([
            'method' => 'required|in:card,cash,paypal',
        ]);

        $payment = \App\Models\Payment::create([
            'booking_id' => $booking->id,
            'amount' => $booking->total_price,
            'method' => $validated['method'],
            'status' => 'paid',
            'transaction_id' => 'TXN-' . strtoupper(\Illuminate\Support\Str::random(12)),
            'paid_at' => now(),
        ]);

        $booking->update(['status' => 'confirmed']);

        try {
            $request->user()->notify(new \App\Notifications\PaymentReceivedNotification(
                $booking->fresh(['user', 'room.hotel', 'room.roomType', 'payment'])
            ));
        } catch (\Exception $e) {}

        return back()->with('success', 'Payment successful! Your booking is confirmed.');
    }
}
