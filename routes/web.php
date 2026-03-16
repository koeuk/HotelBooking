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
    Route::get('/', [\App\Http\Controllers\WebDashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Bookings
    Route::get('/my-bookings', [\App\Http\Controllers\WebBookingController::class, 'index'])->name('bookings.index');
    Route::get('/my-bookings/{booking}', [\App\Http\Controllers\WebBookingController::class, 'show'])->name('bookings.show');

    // Hotels (user view)
    Route::get('/hotels', [\App\Http\Controllers\WebHotelController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/{hotel}', [\App\Http\Controllers\WebHotelController::class, 'show'])->name('hotels.show');

    // Other user pages
    Route::get('/favorites', function () { return \Inertia\Inertia::render('Favorites/Index'); })->name('favorites.index');
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

require __DIR__.'/auth.php';
