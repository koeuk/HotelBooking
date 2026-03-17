<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Website Routes (/)
|--------------------------------------------------------------------------
*/

Route::get('/', [WebController::class, 'home'])->name('home');
Route::get('/explore', [WebController::class, 'hotels'])->name('web.hotels');
Route::get('/explore/{hotel}', [WebController::class, 'hotelShow'])->name('web.hotel.show');
Route::get('/about', [WebController::class, 'about'])->name('web.about');
Route::get('/contact', [WebController::class, 'contact'])->name('web.contact');

/*
|--------------------------------------------------------------------------
| Social Auth
|--------------------------------------------------------------------------
*/

Route::get('/auth/google', [\App\Http\Controllers\SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [\App\Http\Controllers\SocialAuthController::class, 'handleGoogleCallback']);
Route::get('/auth/facebook', [\App\Http\Controllers\SocialAuthController::class, 'redirectToFacebook'])->name('auth.facebook');
Route::get('/auth/facebook/callback', [\App\Http\Controllers\SocialAuthController::class, 'handleFacebookCallback']);

/*
|--------------------------------------------------------------------------
| User Dashboard Routes (/web)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->prefix('web')->group(function () {
    // Dashboard (at /web)
    Route::get('/', [\App\Http\Controllers\WebDashboardController::class, 'index'])->name('user.dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Bookings
    Route::get('/my-bookings', [\App\Http\Controllers\WebBookingController::class, 'index'])->name('bookings.index');
    Route::get('/book/{hotel}', [\App\Http\Controllers\WebBookingController::class, 'create'])->name('bookings.create');
    Route::post('/book', [\App\Http\Controllers\WebBookingController::class, 'store'])->name('bookings.store');
    Route::get('/my-bookings/{booking}', [\App\Http\Controllers\WebBookingController::class, 'show'])->name('bookings.show');
    Route::post('/my-bookings/{booking}/cancel', [\App\Http\Controllers\WebBookingController::class, 'cancel'])->name('bookings.cancel');
    Route::post('/my-bookings/{booking}/pay', [\App\Http\Controllers\WebBookingController::class, 'pay'])->name('bookings.pay');

    // Hotels (user view)
    Route::get('/hotels', [\App\Http\Controllers\WebHotelController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/{hotel}', [\App\Http\Controllers\WebHotelController::class, 'show'])->name('hotels.show');

    // Favorites
    Route::get('/favorites', function (\Illuminate\Http\Request $request) {
        $hotels = $request->user()->favorites()
            ->withCount('rooms')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->latest('favorites.created_at')
            ->get();
        return \Inertia\Inertia::render('Favorites/Index', ['hotels' => $hotels]);
    })->name('favorites.index');
    Route::post('/favorites/{hotel}/toggle', function (\Illuminate\Http\Request $request, \App\Models\Hotel $hotel) {
        $user = $request->user();
        $user->favorites()->toggle($hotel->id);
        return back();
    })->name('favorites.toggle');
    Route::get('/my-reviews', function (\Illuminate\Http\Request $request) {
        return \Inertia\Inertia::render('Reviews/Index', ['reviews' => \App\Models\Review::where('user_id', $request->user()->id)->with(['hotel', 'booking'])->latest()->paginate(10)]);
    })->name('reviews.index');
    Route::get('/notifications', function () { return \Inertia\Inertia::render('Notifications/Index'); })->name('notifications.index');
    Route::get('/settings', function () { return redirect()->route('profile.edit'); })->name('settings.index.guest');
});

// Notification API (web session auth)
Route::middleware('auth')->prefix('api/v1')->group(function () {
    Route::get('/notifications', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::patch('/notifications/{id}/read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/read-all', [\App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead']);
});

require __DIR__.'/dashboard.php';
require __DIR__.'/auth.php';
