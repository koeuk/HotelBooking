<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use App\Notifications\BookingCreatedDashboardNotification;
use App\Notifications\BookingStatusUpdatedUserNotification;
use Illuminate\Http\Request;

class BookingApiController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['room.roomType.amenities', 'payment'])
            ->latest()
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => BookingResource::collection($bookings),
            'meta' => [
                'current_page' => $bookings->currentPage(),
                'last_page'    => $bookings->lastPage(),
                'per_page'     => $bookings->perPage(),
                'total'        => $bookings->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_uuid'        => 'required|exists:rooms,uuid',
            'check_in_date'    => 'required|date|after_or_equal:today',
            'check_out_date'   => 'required|date|after:check_in_date',
            'guests'           => 'nullable|integer|min:1',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $room = Room::with('roomType')->where('uuid', $validated['room_uuid'])->firstOrFail();

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
        $checkIn  = new \DateTime($validated['check_in_date']);
        $checkOut = new \DateTime($validated['check_out_date']);
        $nights   = $checkIn->diff($checkOut)->days;
        $pricePerNight = $room->roomType->price_per_night;
        $totalPrice    = $nights * $pricePerNight;

        $booking = Booking::create([
            'uuid'             => \Illuminate\Support\Str::uuid(),
            'user_id'          => $request->user()->id,
            'room_id'          => $room->id,
            'check_in_date'    => $validated['check_in_date'],
            'check_out_date'   => $validated['check_out_date'],
            'guests'           => $validated['guests'] ?? 1,
            'price_per_night'  => $pricePerNight,
            'total_price'      => $totalPrice,
            'discount_amount'  => 0,
            'special_requests' => $validated['special_requests'] ?? null,
            'status'           => 'pending',
        ]);

        $booking->load(['user', 'room.roomType.amenities', 'payment']);

        // Notify admin
        try {
            $admin = User::where('role', 'admin')->first();
            if ($admin) {
                $admin->notify(new BookingCreatedDashboardNotification($booking));
            }
        } catch (\Exception $e) {
            // Don't break booking flow on notification failure
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully.',
            'data'    => new BookingResource($booking),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $booking = $request->user()
            ->bookings()
            ->with(['room.roomType.amenities', 'payment'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => new BookingResource($booking),
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $validated = $request->validate([
            'cancellation_reason' => 'nullable|string|max:1000',
        ]);

        $booking = $request->user()
            ->bookings()
            ->findOrFail($id);

        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return response()->json([
                'success' => false,
                'message' => 'Only pending or confirmed bookings can be cancelled.',
            ], 422);
        }

        $booking->update([
            'status'              => 'cancelled',
            'cancelled_at'        => now(),
            'cancellation_reason' => $validated['cancellation_reason'] ?? null,
        ]);

        $booking->load(['user', 'room.roomType.amenities']);

        // Notify user
        try {
            $booking->user->notify(new BookingStatusUpdatedUserNotification($booking, 'cancelled'));
        } catch (\Exception $e) {
            // Don't break flow
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully.',
            'data'    => new BookingResource($booking),
        ]);
    }
}
