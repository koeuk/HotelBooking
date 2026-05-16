<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Booking;
use App\Models\Payment;
use App\Notifications\PaymentReceivedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentApiController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'method' => 'required|in:card,cash,paypal',
        ]);

        $booking = Booking::with(['user', 'room.hotel', 'room.roomType'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($validated['booking_id']);

        if ($booking->payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment already exists for this booking.',
            ], 422);
        }

        if ($booking->status === 'cancelled') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot pay for a cancelled booking.',
            ], 422);
        }

        $payment = Payment::create([
            'booking_id' => $booking->id,
            'amount' => $booking->total_price,
            'method' => $validated['method'],
            'status' => 'paid',
            'transaction_id' => 'TXN-' . strtoupper(Str::random(12)),
            'paid_at' => now(),
        ]);

        // Update booking status to confirmed
        $booking->update(['status' => 'confirmed']);

        // Notify user (email + database + telegram)
        try {
            $booking->user->notify(new PaymentReceivedNotification($booking->fresh(['user', 'room.hotel', 'room.roomType', 'payment'])));
        } catch (\Exception $e) {
            // Don't break flow
        }

        return response()->json([
            'success' => true,
            'message' => 'Payment processed successfully.',
            'data' => new PaymentResource($payment),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $payment = Payment::with('booking')
            ->whereHas('booking', fn ($q) => $q->where('user_id', $request->user()->id))
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new PaymentResource($payment),
        ]);
    }
}
