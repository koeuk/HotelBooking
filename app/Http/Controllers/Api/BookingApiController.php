<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use App\Notifications\BookingCreatedAdminNotification;
use App\Notifications\BookingStatusUpdatedUserNotification;
use Illuminate\Http\Request;

class BookingApiController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['room.hotel', 'room.roomType', 'payment'])
            ->latest()
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => BookingResource::collection($bookings),
            'meta' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
        ]);

        $room = Room::with('roomType')->findOrFail($validated['room_id']);

        if ($room->status !== 'available') {
            return response()->json([
                'success' => false,
                'message' => 'Room is not available.',
            ], 422);
        }

        // Check for overlapping bookings
        $overlap = Booking::where('room_id', $room->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('check_in_date', [$validated['check_in_date'], $validated['check_out_date']])
                    ->orWhereBetween('check_out_date', [$validated['check_in_date'], $validated['check_out_date']])
                    ->orWhere(function ($q) use ($validated) {
                        $q->where('check_in_date', '<=', $validated['check_in_date'])
                          ->where('check_out_date', '>=', $validated['check_out_date']);
                    });
            })
            ->exists();

        if ($overlap) {
            return response()->json([
                'success' => false,
                'message' => 'Room is already booked for the selected dates.',
            ], 422);
        }

        // Calculate total price
        $checkIn = new \DateTime($validated['check_in_date']);
        $checkOut = new \DateTime($validated['check_out_date']);
        $nights = $checkIn->diff($checkOut)->days;
        $totalPrice = $nights * $room->roomType->price_per_night;

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'room_id' => $room->id,
            'check_in_date' => $validated['check_in_date'],
            'check_out_date' => $validated['check_out_date'],
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        $booking->load(['user', 'room.hotel', 'room.roomType', 'payment']);

        // Notify admin (email + database + telegram)
        try {
            $admin = User::where('role', 'admin')->first();
            if ($admin) {
                $admin->notify(new BookingCreatedAdminNotification($booking));
            }
        } catch (\Exception $e) {
            // Don't break booking flow on notification failure
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully.',
            'data' => new BookingResource($booking),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $booking = $request->user()
            ->bookings()
            ->with(['room.hotel', 'room.roomType', 'payment'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new BookingResource($booking),
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $booking = $request->user()
            ->bookings()
            ->findOrFail($id);

        if ($booking->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending bookings can be cancelled.',
            ], 422);
        }

        $booking->update(['status' => 'cancelled']);
        $booking->load(['user', 'room.hotel', 'room.roomType']);

        // Notify user (email + database)
        try {
            $booking->user->notify(new BookingStatusUpdatedUserNotification($booking, 'cancelled'));
        } catch (\Exception $e) {
            // Don't break flow
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully.',
            'data' => new BookingResource($booking),
        ]);
    }
}
