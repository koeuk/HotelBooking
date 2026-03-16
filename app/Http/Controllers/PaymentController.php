<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Booking;
use App\Notifications\PaymentReceivedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Payments/Index', [
            'payments' => Payment::with(['booking.user'])->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Payments/Create', [
            'bookings' => Booking::with(['user', 'room.hotel'])
                ->whereDoesntHave('payment')
                ->where('status', '!=', 'cancelled')
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|in:card,cash,paypal',
            'status' => 'required|in:pending,paid,failed,refunded',
        ]);

        $booking = Booking::with(['user', 'room.hotel', 'room.roomType'])->findOrFail($validated['booking_id']);

        if ($booking->payment) {
            return redirect()->back()->with('error', 'Payment already exists for this booking.');
        }

        $payment = Payment::create([
            'booking_id' => $booking->id,
            'amount' => $validated['amount'],
            'method' => $validated['method'],
            'status' => $validated['status'],
            'transaction_id' => 'TXN-' . strtoupper(Str::random(12)),
            'paid_at' => $validated['status'] === 'paid' ? now() : null,
        ]);

        if ($validated['status'] === 'paid') {
            $booking->update(['status' => 'confirmed']);

            try {
                $booking->user->notify(new PaymentReceivedNotification($booking->fresh(['user', 'room.hotel', 'room.roomType', 'payment'])));
            } catch (\Exception $e) {
                // Don't break flow
            }
        }

        return redirect()->route('admin.payments.index')->with('success', 'Payment recorded successfully.');
    }

    public function show(Payment $payment)
    {
        $payment->load(['booking.user', 'booking.room.hotel', 'booking.room.roomType']);
        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment
        ]);
    }

    public function edit(Payment $payment)
    {
        $payment->load(['booking.user', 'booking.room.hotel']);
        return Inertia::render('Admin/Payments/Edit', [
            'payment' => $payment
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'amount' => 'sometimes|numeric|min:0',
            'method' => 'sometimes|in:card,cash,paypal',
            'status' => 'required|in:pending,paid,failed,refunded',
        ]);

        $payment->update($validated);

        if ($validated['status'] === 'paid') {
            $payment->update(['paid_at' => now()]);

            try {
                $payment->booking->user->notify(new PaymentReceivedNotification($payment->booking->load(['user', 'room.hotel', 'room.roomType', 'payment'])));
            } catch (\Exception $e) {
                // Don't break flow
            }
        }

        return redirect()->back()->with('success', 'Payment status updated successfully.');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('admin.payments.index')->with('success', 'Payment deleted successfully.');
    }
}
