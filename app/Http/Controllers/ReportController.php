<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->input('period', 'monthly');
        $year = (int) $request->input('year', now()->year);

        $data = match ($period) {
            'weekly' => $this->getWeeklyData($year),
            'yearly' => $this->getYearlyData(),
            default => $this->getMonthlyData($year),
        };

        $availableYears = range(now()->year, now()->year - 4);

        return Inertia::render('Dashboard/Reports/Index', [
            'reportData' => $data,
            'period' => $period,
            'year' => $year,
            'availableYears' => $availableYears,
            'summary' => [
                'total_bookings' => Booking::count(),
                'total_revenue' => round((float) Payment::where('status', 'paid')->sum('amount'), 2),
                'total_users' => User::count(),
                'total_reviews' => Review::count(),
                'total_hotels' => Hotel::count(),
                'total_rooms' => Room::count(),
                'avg_booking_value' => round((float) Booking::avg('total_price'), 2),
                'cancellation_rate' => Booking::count() > 0
                    ? round(Booking::where('status', 'cancelled')->count() / Booking::count() * 100, 1)
                    : 0,
            ],
            'top_hotels' => Hotel::withCount('rooms')
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->orderByDesc('reviews_avg_rating')
                ->take(10)
                ->get(),
            'recent_bookings' => Booking::with(['user', 'room.hotel', 'room.roomType', 'payment'])
                ->latest()->take(10)->get(),
            'recent_users' => User::withCount('bookings')->latest()->take(10)->get(),
            'recent_reviews' => Review::with(['user', 'hotel'])->latest()->take(10)->get(),
            'top_payments' => Payment::with(['booking.user', 'booking.room.hotel'])
                ->where('status', 'paid')
                ->orderByDesc('amount')
                ->take(10)
                ->get(),
            'booking_statuses' => [
                ['name' => 'Pending', 'value' => Booking::where('status', 'pending')->count()],
                ['name' => 'Confirmed', 'value' => Booking::where('status', 'confirmed')->count()],
                ['name' => 'Completed', 'value' => Booking::where('status', 'completed')->count()],
                ['name' => 'Cancelled', 'value' => Booking::where('status', 'cancelled')->count()],
            ],
            'payment_statuses' => [
                ['name' => 'Pending', 'value' => Payment::where('status', 'pending')->count()],
                ['name' => 'Paid', 'value' => Payment::where('status', 'paid')->count()],
                ['name' => 'Failed', 'value' => Payment::where('status', 'failed')->count()],
                ['name' => 'Refunded', 'value' => Payment::where('status', 'refunded')->count()],
            ],
            'payment_methods' => [
                ['name' => 'Card', 'value' => Payment::where('method', 'card')->count()],
                ['name' => 'Cash', 'value' => Payment::where('method', 'cash')->count()],
                ['name' => 'PayPal', 'value' => Payment::where('method', 'paypal')->count()],
            ],
        ]);
    }

    private function getMonthlyData(int $year): array
    {
        $data = [];
        for ($m = 1; $m <= 12; $m++) {
            $date = Carbon::create($year, $m, 1);
            $data[] = [
                'label' => $date->format('M'),
                'bookings' => Booking::whereYear('created_at', $year)->whereMonth('created_at', $m)->count(),
                'revenue' => round((float) Payment::where('status', 'paid')
                    ->whereYear('created_at', $year)->whereMonth('created_at', $m)->sum('amount'), 2),
                'users' => User::whereYear('created_at', $year)->whereMonth('created_at', $m)->count(),
                'reviews' => Review::whereYear('created_at', $year)->whereMonth('created_at', $m)->count(),
                'hotels' => Hotel::whereYear('created_at', $year)->whereMonth('created_at', $m)->count(),
                'cancelled' => Booking::where('status', 'cancelled')
                    ->whereYear('created_at', $year)->whereMonth('created_at', $m)->count(),
            ];
        }
        return $data;
    }

    private function getWeeklyData(int $year): array
    {
        $data = [];
        $start = Carbon::create($year)->startOfYear();
        $now = Carbon::now();

        for ($w = 0; $w < 52; $w++) {
            $weekStart = $start->copy()->addWeeks($w)->startOfWeek();
            $weekEnd = $weekStart->copy()->endOfWeek();
            if ($weekStart->year > $year || $weekStart->gt($now)) break;

            $data[] = [
                'label' => 'W' . ($w + 1),
                'bookings' => Booking::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                'revenue' => round((float) Payment::where('status', 'paid')
                    ->whereBetween('created_at', [$weekStart, $weekEnd])->sum('amount'), 2),
                'users' => User::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                'reviews' => Review::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                'hotels' => Hotel::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                'cancelled' => Booking::where('status', 'cancelled')
                    ->whereBetween('created_at', [$weekStart, $weekEnd])->count(),
            ];
        }
        return $data;
    }

    private function getYearlyData(): array
    {
        $data = [];
        $currentYear = now()->year;
        for ($y = $currentYear - 4; $y <= $currentYear; $y++) {
            $data[] = [
                'label' => (string) $y,
                'bookings' => Booking::whereYear('created_at', $y)->count(),
                'revenue' => round((float) Payment::where('status', 'paid')
                    ->whereYear('created_at', $y)->sum('amount'), 2),
                'users' => User::whereYear('created_at', $y)->count(),
                'reviews' => Review::whereYear('created_at', $y)->count(),
                'hotels' => Hotel::whereYear('created_at', $y)->count(),
                'cancelled' => Booking::where('status', 'cancelled')
                    ->whereYear('created_at', $y)->count(),
            ];
        }
        return $data;
    }
}
