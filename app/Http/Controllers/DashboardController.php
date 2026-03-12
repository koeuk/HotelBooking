<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_hotels'     => Hotel::count(),
                'total_rooms'      => Room::count(),
                'total_bookings'   => Booking::count(),
                'total_revenue'    => Payment::where('status', 'paid')->sum('amount'),
                'pending_bookings' => Booking::where('status', 'pending')->count(),
            ],
            'recent_bookings' => Booking::with('user', 'room.hotel')->latest()->take(5)->get(),
        ]);
    }
}
