<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::with(['user:id,name', 'hotel:id,name', 'booking:id']);

        if ($request->has('hotel_id')) {
            $query->where('hotel_id', $request->hotel_id);
        }

        return response()->json([
            'data' => $query->latest()->paginate(15)
        ]);
    }

    public function show($id)
    {
        $review = Review::with(['user:id,name', 'hotel:id,name', 'booking:id'])->findOrFail($id);
        return response()->json(['data' => $review]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'booking_id' => 'required|exists:bookings,id|unique:reviews,booking_id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $validated['user_id'] = $request->user()->id;

        $review = Review::create($validated);
        return response()->json(['data' => $review->load(['user:id,name', 'hotel:id,name'])], 201);
    }

    public function update(Request $request, $id)
    {
        $review = Review::where('user_id', $request->user()->id)->findOrFail($id);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update($validated);
        return response()->json(['data' => $review]);
    }

    public function destroy(Request $request, $id)
    {
        $review = Review::where('user_id', $request->user()->id)->findOrFail($id);
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully.']);
    }
}
