<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [\App\Http\Controllers\UserDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/my-bookings', [\App\Http\Controllers\GuestBookingController::class, 'index'])->name('bookings.index');
    Route::get('/my-bookings/{booking}', [\App\Http\Controllers\GuestBookingController::class, 'show'])->name('bookings.show');
    Route::get('/hotels', [\App\Http\Controllers\GuestHotelController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/{hotel}', [\App\Http\Controllers\GuestHotelController::class, 'show'])->name('hotels.show');
    Route::get('/favorites', function () { return \Inertia\Inertia::render('Favorites/Index'); })->name('favorites.index');
    Route::get('/my-reviews', function (Illuminate\Http\Request $request) {
        $reviews = $request->user()->reviews ?? collect();
        return \Inertia\Inertia::render('Reviews/Index', ['reviews' => \App\Models\Review::where('user_id', $request->user()->id)->with(['hotel', 'booking'])->latest()->paginate(10)]);
    })->name('reviews.index');
    Route::get('/notifications', function () { return \Inertia\Inertia::render('Notifications/Index'); })->name('notifications.index');
    Route::get('/settings', function () { return redirect()->route('profile.edit'); })->name('settings.index.guest');
});

// Social Auth
Route::get('/auth/google', [\App\Http\Controllers\SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [\App\Http\Controllers\SocialAuthController::class, 'handleGoogleCallback']);
Route::get('/auth/facebook', [\App\Http\Controllers\SocialAuthController::class, 'redirectToFacebook'])->name('auth.facebook');
Route::get('/auth/facebook/callback', [\App\Http\Controllers\SocialAuthController::class, 'handleFacebookCallback']);

// Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('hotels', \App\Http\Controllers\HotelController::class);
    Route::resource('room-types', \App\Http\Controllers\RoomTypeController::class);
    Route::resource('rooms', \App\Http\Controllers\RoomController::class);
    Route::resource('bookings', \App\Http\Controllers\BookingController::class);
    Route::resource('payments', \App\Http\Controllers\PaymentController::class);
    Route::resource('users', \App\Http\Controllers\UserController::class);
    Route::resource('amenities', \App\Http\Controllers\AmenityController::class);
    Route::resource('reviews', \App\Http\Controllers\ReviewController::class);
    Route::resource('coupons', \App\Http\Controllers\CouponController::class);
    Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    Route::get('/settings', [\App\Http\Controllers\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');
});

// Notification API (web session auth)
Route::middleware('auth')->prefix('api/v1')->group(function () {
    Route::get('/notifications', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::patch('/notifications/{id}/read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/read-all', [\App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead']);
});

require __DIR__.'/auth.php';
