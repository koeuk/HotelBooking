<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            return redirect()->route('dashboard.index');
        }

        $bookings = $user->bookings()
            ->with(['room.hotel', 'room.roomType', 'payment'])
            ->latest()
            ->get();

        $stats = [
            'total_bookings' => $bookings->count(),
            'confirmed_bookings' => $bookings->where('status', 'confirmed')->count(),
            'pending_bookings' => $bookings->where('status', 'pending')->count(),
            'total_spent' => $bookings->whereIn('status', ['confirmed', 'completed'])
                ->sum(fn ($b) => (float) $b->total_price),
        ];

        $upcomingBookings = $user->bookings()
            ->with(['room.hotel', 'room.roomType', 'payment'])
            ->whereIn('status', ['pending', 'confirmed'])
            ->where('check_in_date', '>=', now()->toDateString())
            ->orderBy('check_in_date')
            ->take(5)
            ->get();

        $recentBookings = $user->bookings()
            ->with(['room.hotel', 'room.roomType', 'payment'])
            ->latest()
            ->take(5)
            ->get();

        $featuredHotels = Hotel::withCount('rooms')
            ->orderByDesc('rating')
            ->take(4)
            ->get();

        return Inertia::render('User/Dashboard', [
            'stats' => $stats,
            'upcomingBookings' => $upcomingBookings,
            'recentBookings' => $recentBookings,
            'featuredHotels' => $featuredHotels,
        ]);
    }
}
