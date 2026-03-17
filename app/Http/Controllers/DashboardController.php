<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $monthlyData = collect();
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $label = $date->format('M');

            $monthlyData->push([
                'month' => $label,
                'bookings' => Booking::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)->count(),
                'revenue' => round((float) Payment::where('status', 'paid')
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)->sum('amount'), 2),
                'users' => User::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)->count(),
                'reviews' => Review::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)->count(),
                'hotels' => Hotel::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)->count(),
            ]);
        }

        $statusBreakdown = [
            'pending' => Booking::where('status', 'pending')->count(),
            'confirmed' => Booking::where('status', 'confirmed')->count(),
            'completed' => Booking::where('status', 'completed')->count(),
            'cancelled' => Booking::where('status', 'cancelled')->count(),
        ];

        $userRoles = [
            'admin' => User::where('role', 'admin')->count(),
            'user' => User::where('role', 'user')->count(),
        ];

        $reviewRatings = [
            '5 Stars' => Review::where('rating', 5)->count(),
            '4 Stars' => Review::where('rating', 4)->count(),
            '3 Stars' => Review::where('rating', 3)->count(),
            '2 Stars' => Review::where('rating', 2)->count(),
            '1 Star' => Review::where('rating', 1)->count(),
        ];

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'total_hotels'     => Hotel::count(),
                'total_rooms'      => Room::count(),
                'total_bookings'   => Booking::count(),
                'total_revenue'    => Payment::where('status', 'paid')->sum('amount'),
                'pending_bookings' => Booking::where('status', 'pending')->count(),
                'total_users'      => User::count(),
                'total_reviews'    => Review::count(),
            ],
            'recent_bookings' => Booking::with('user', 'room.hotel', 'room.roomType')->latest()->take(5)->get(),
            'monthly_data' => $monthlyData,
            'status_breakdown' => $statusBreakdown,
            'user_roles' => $userRoles,
            'review_ratings' => $reviewRatings,
        ]);
    }
}
