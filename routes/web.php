<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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
});

require __DIR__.'/auth.php';
