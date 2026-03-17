<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Management Dashboard Routes
|--------------------------------------------------------------------------
|
| All routes here are prefixed with /dashboard and use the dashboard.* name prefix.
| They require authentication + admin role middleware.
|
*/

// Guest routes for Dashboard Management
Route::middleware('guest')->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('login', [\App\Http\Controllers\Auth\AdminAuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [\App\Http\Controllers\Auth\AdminAuthenticatedSessionController::class, 'store']);
});

Route::middleware(['auth', 'admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
    // Logout
    Route::post('logout', [\App\Http\Controllers\Auth\AdminAuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Main Dashboard View
    Route::get('/', [\App\Http\Controllers\DashboardController::class, 'index'])->name('index');

    // CRUD Resources
    Route::resource('hotels', \App\Http\Controllers\HotelController::class);
    Route::resource('room-types', \App\Http\Controllers\RoomTypeController::class);
    Route::resource('rooms', \App\Http\Controllers\RoomController::class);
    Route::resource('bookings', \App\Http\Controllers\BookingController::class);
    Route::resource('payments', \App\Http\Controllers\PaymentController::class);
    Route::resource('users', \App\Http\Controllers\UserController::class);
    Route::resource('amenities', \App\Http\Controllers\AmenityController::class);
    Route::resource('reviews', \App\Http\Controllers\ReviewController::class);
    Route::resource('coupons', \App\Http\Controllers\CouponController::class);

    // Reports
    Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');

    // Settings
    Route::get('/settings', [\App\Http\Controllers\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');
});
