<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Payments/Index', [
            'payments' => Payment::with(['booking.user'])->latest()->paginate(10)
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,paid,failed,refunded',
        ]);

        $payment->update($validated);

        return redirect()->back()->with('success', 'Payment status updated successfully.');
    }
}
