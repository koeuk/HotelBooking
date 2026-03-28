<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->input('period', 'year');

        // Determine date range based on period
        switch ($period) {
            case 'week':
                $startDate = Carbon::now()->subWeek();
                $labels = collect();
                for ($i = 6; $i >= 0; $i--) {
                    $date = Carbon::now()->subDays($i);
                    $labels->push([
                        'label' => $date->format('D'),
                        'start' => $date->copy()->startOfDay(),
                        'end' => $date->copy()->endOfDay(),
                    ]);
                }
                break;
            case 'month':
                $startDate = Carbon::now()->subMonth();
                $labels = collect();
                for ($i = 29; $i >= 0; $i--) {
                    $date = Carbon::now()->subDays($i);
                    $labels->push([
                        'label' => $date->format('M d'),
                        'start' => $date->copy()->startOfDay(),
                        'end' => $date->copy()->endOfDay(),
                    ]);
                }
                // Group into ~10 segments for readability
                $labels = $labels->chunk(3)->map(function ($chunk) {
                    return [
                        'label' => $chunk->first()['label'],
                        'start' => $chunk->first()['start'],
                        'end' => $chunk->last()['end'],
                    ];
                })->values();
                break;
            default: // year
                $startDate = Carbon::now()->subYear();
                $labels = collect();
                for ($i = 11; $i >= 0; $i--) {
                    $date = Carbon::now()->subMonths($i);
                    $labels->push([
                        'label' => $date->format('M'),
                        'start' => $date->copy()->startOfMonth(),
                        'end' => $date->copy()->endOfMonth(),
                    ]);
                }
                break;
        }

        $monthlyData = $labels->map(function ($item) {
            return [
                'month' => $item['label'],
                'bookings' => Booking::whereBetween('created_at', [$item['start'], $item['end']])->count(),
                'revenue' => round((float) Payment::where('status', 'paid')
                    ->whereBetween('created_at', [$item['start'], $item['end']])->sum('amount'), 2),
                'users' => User::whereBetween('created_at', [$item['start'], $item['end']])->count(),
                'reviews' => Review::whereBetween('created_at', [$item['start'], $item['end']])->count(),
                'hotels' => Hotel::whereBetween('created_at', [$item['start'], $item['end']])->count(),
            ];
        });

        // Filter stats by period
        $periodRevenue = Payment::where('status', 'paid')->where('created_at', '>=', $startDate)->sum('amount');
        $periodBookings = Booking::where('created_at', '>=', $startDate)->count();
        $periodUsers = User::where('created_at', '>=', $startDate)->count();
        $periodReviews = Review::where('created_at', '>=', $startDate)->count();

        $statusBreakdown = [
            'pending' => Booking::where('status', 'pending')->where('created_at', '>=', $startDate)->count(),
            'confirmed' => Booking::where('status', 'confirmed')->where('created_at', '>=', $startDate)->count(),
            'completed' => Booking::where('status', 'completed')->where('created_at', '>=', $startDate)->count(),
            'cancelled' => Booking::where('status', 'cancelled')->where('created_at', '>=', $startDate)->count(),
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
                'total_bookings'   => $periodBookings,
                'total_revenue'    => $periodRevenue,
                'pending_bookings' => Booking::where('status', 'pending')->count(),
                'total_users'      => $periodUsers,
                'total_reviews'    => $periodReviews,
            ],
            'recent_bookings' => Booking::with('user', 'room.hotel', 'room.roomType')->latest()->take(5)->get(),
            'monthly_data' => $monthlyData,
            'status_breakdown' => $statusBreakdown,
            'user_roles' => $userRoles,
            'review_ratings' => $reviewRatings,
            'period' => $period,
        ]);
    }
}
