<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Hotel;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Reviews/Index', [
            'reviews' => Review::with(['user', 'hotel', 'booking'])->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Reviews/Create', [
            'users' => User::where('role', 'user')->get(['id', 'name', 'email']),
            'hotels' => Hotel::all(['id', 'name']),
            'bookings' => Booking::with('user')->whereDoesntHave('review')->get(['id', 'user_id', 'room_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'hotel_id' => 'required|exists:hotels,id',
            'booking_id' => 'required|exists:bookings,id|unique:reviews,booking_id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Review::create($validated);

        return redirect()->route('admin.reviews.index')->with('success', 'Review created successfully.');
    }

    public function show(Review $review)
    {
        $review->load(['user', 'hotel', 'booking.room']);
        return Inertia::render('Dashboard/Reviews/Show', [
            'review' => $review
        ]);
    }

    public function edit(Review $review)
    {
        $review->load(['user', 'hotel', 'booking']);
        return Inertia::render('Dashboard/Reviews/Edit', [
            'review' => $review,
            'users' => User::where('role', 'user')->get(['id', 'name', 'email']),
            'hotels' => Hotel::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Review $review)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update($validated);

        return redirect()->route('admin.reviews.index')->with('success', 'Review updated successfully.');
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return redirect()->route('admin.reviews.index')->with('success', 'Review deleted successfully.');
    }
}
