<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Monthly bookings & revenue for the last 12 months
        $monthlyData = collect();
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $month = $date->format('Y-m');
            $label = $date->format('M');

            $bookings = Booking::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $revenue = Payment::where('status', 'paid')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('amount');

            $monthlyData->push([
                'month' => $label,
                'bookings' => $bookings,
                'revenue' => round((float) $revenue, 2),
            ]);
        }

        // Booking status breakdown
        $statusBreakdown = [
            'pending' => Booking::where('status', 'pending')->count(),
            'confirmed' => Booking::where('status', 'confirmed')->count(),
            'completed' => Booking::where('status', 'completed')->count(),
            'cancelled' => Booking::where('status', 'cancelled')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_hotels'     => Hotel::count(),
                'total_rooms'      => Room::count(),
                'total_bookings'   => Booking::count(),
                'total_revenue'    => Payment::where('status', 'paid')->sum('amount'),
                'pending_bookings' => Booking::where('status', 'pending')->count(),
            ],
            'recent_bookings' => Booking::with('user', 'room.hotel', 'room.roomType')->latest()->take(5)->get(),
            'monthly_data' => $monthlyData,
            'status_breakdown' => $statusBreakdown,
        ]);
    }
}
