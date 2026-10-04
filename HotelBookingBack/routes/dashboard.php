<?php

use App\Http\Controllers\Dashboard\DashboardAuthenticatedSessionController;
use App\Http\Controllers\Dashboard\AmenityController;
use App\Http\Controllers\Dashboard\BookingController;
use App\Http\Controllers\Dashboard\CouponController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\HotelController;
use App\Http\Controllers\Dashboard\PaymentController;
use App\Http\Controllers\Dashboard\ReportController;
use App\Http\Controllers\Dashboard\ReviewController;
use App\Http\Controllers\Dashboard\RoomController;
use App\Http\Controllers\Dashboard\RoomTypeController;
use App\Http\Controllers\Dashboard\SettingController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

// Guest routes for Dashboard Management
Route::middleware('guest')->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('login', [DashboardAuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [DashboardAuthenticatedSessionController::class, 'store']);
});

Route::middleware(['auth', 'admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::post('logout', [DashboardAuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::resource('hotels', HotelController::class);
    Route::resource('room-types', RoomTypeController::class);
    Route::resource('rooms', RoomController::class);
    Route::resource('bookings', BookingController::class);
    Route::resource('payments', PaymentController::class);
    Route::resource('users', UserController::class);
    Route::resource('amenities', AmenityController::class);
    Route::resource('reviews', ReviewController::class);
    Route::resource('coupons', CouponController::class);

    Route::get('/notifications', function () {
        $notifications = auth()->user()->notifications()->paginate(20);
        return \Inertia\Inertia::render('Dashboard/Notifications/Index', [
            'notifications' => $notifications,
        ]);
    })->name('notifications.index');
    Route::patch('/notifications/{id}/read', function ($id) {
        auth()->user()->notifications()->findOrFail($id)->markAsRead();
        return back();
    })->name('notifications.read');
    Route::patch('/notifications/read-all', function () {
        auth()->user()->unreadNotifications->markAsRead();
        return back();
    })->name('notifications.readAll');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');
});
