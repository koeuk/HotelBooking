<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Dashboard Routes
|--------------------------------------------------------------------------
|
| All routes here are prefixed with /admin and use the admin.* name prefix.
| They require authentication + admin role middleware.
|
*/

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

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
