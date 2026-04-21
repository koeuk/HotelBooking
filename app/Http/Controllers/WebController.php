<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use App\Models\Amenity;
use App\Models\Hotel;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class WebController extends Controller
{
    public function home()
    {
        return Inertia::render('Web/Home', [
            'featuredHotels' => Hotel::withCount('rooms')
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->orderByDesc('rating')
                ->take(6)
                ->get(),
            'totalHotels' => Hotel::count(),
            'totalReviews' => Review::count(),
            'amenities' => Amenity::withCount('hotels')->take(8)->get(),
            'latestReviews' => Review::with(['user', 'hotel'])
                ->latest()
                ->take(4)
                ->get(),
        ]);
    }

    public function hotels(Request $request)
    {
        $query = Hotel::withCount('rooms')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        if ($city = $request->input('city')) {
            $query->where('city', $city);
        }

        $perPage = $request->input('all') ? 1000 : 6;
        $hotels = $query->orderByDesc('rating')->paginate($perPage);
        $cities = Hotel::distinct()->pluck('city');

        return Inertia::render('Web/Hotels', [
            'hotels' => $hotels,
            'cities' => $cities,
            'filters' => $request->only(['search', 'city']),
        ]);
    }

    public function hotelShow(Hotel $hotel)
    {
        $hotel->load(['roomTypes.rooms', 'amenities', 'reviews.user']);
        return Inertia::render('Web/HotelDetail', [
            'hotel' => $hotel,
        ]);
    }

    public function about()
    {
        return Inertia::render('Web/About');
    }

    public function contact()
    {
        return Inertia::render('Web/Contact');
    }

    public function sendContact(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:160',
            'subject' => 'required|string|max:160',
            'message' => 'required|string|max:4000',
        ]);

        $recipient = config('mail.contact_to')
            ?? env('CONTACT_TO')
            ?? config('mail.from.address');

        try {
            Mail::to($recipient)->send(new ContactMessage(
                senderName: $data['name'],
                senderEmail: $data['email'],
                subjectLine: $data['subject'],
                body: $data['message'],
            ));
        } catch (\Throwable $e) {
            Log::error('Contact form mail failed', [
                'error' => $e->getMessage(),
                'recipient' => $recipient,
            ]);

            return back()->with(
                'error',
                "We couldn't send your message right now. Please try again later.",
            );
        }

        return back()->with(
            'success',
            "Thanks {$data['name']} — your message is on its way. We'll reply within 24 hours.",
        );
    }

    public function help()
    {
        return Inertia::render('Web/Help');
    }

    public function privacy()
    {
        return Inertia::render('Web/Privacy');
    }

    public function terms()
    {
        return Inertia::render('Web/Terms');
    }
}
