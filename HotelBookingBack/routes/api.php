<?php

use App\Http\Controllers\Api\AmenityApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\CouponApiController;
use App\Http\Controllers\Api\HotelApiController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PaymentApiController;
use App\Http\Controllers\Api\ProfileApiController;
use App\Http\Controllers\Api\ReviewApiController;
use App\Http\Controllers\Api\RoomApiController;
use App\Http\Controllers\Api\RoomTypeApiController;
use App\Http\Controllers\Api\SocialAuthApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Public Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/google', [SocialAuthApiController::class, 'loginWithGoogle']);
    Route::post('/auth/facebook', [SocialAuthApiController::class, 'loginWithFacebook']);

    // Public
    Route::get('/hotels', [HotelApiController::class, 'index']);
    Route::get('/hotels/{id}', [HotelApiController::class, 'show']);
    Route::get('/hotels/{id}/room-types', [RoomTypeApiController::class, 'index']);
    Route::get('/room-types/{id}', [RoomTypeApiController::class, 'show']);
    Route::get('/hotels/{id}/rooms', [RoomApiController::class, 'index']);
    Route::get('/rooms/{id}', [RoomApiController::class, 'show']);

    // Public Amenities
    Route::get('/amenities', [AmenityApiController::class, 'index']);
    Route::get('/amenities/{id}', [AmenityApiController::class, 'show']);

    // Protected
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::get('/bookings', [BookingApiController::class, 'index']);
        Route::post('/bookings', [BookingApiController::class, 'store']);
        Route::get('/bookings/{id}', [BookingApiController::class, 'show']);
        Route::patch('/bookings/{id}/cancel', [BookingApiController::class, 'cancel']);

        Route::post('/payments', [PaymentApiController::class, 'store']);
        Route::get('/payments/{id}', [PaymentApiController::class, 'show']);

        Route::get('/profile', [ProfileApiController::class, 'show']);
        Route::patch('/profile', [ProfileApiController::class, 'update']);
        Route::patch('/profile/set-password', [ProfileApiController::class, 'setPassword']);

        // Reviews
        Route::get('/reviews', [ReviewApiController::class, 'index']);
        Route::get('/reviews/{id}', [ReviewApiController::class, 'show']);
        Route::post('/reviews', [ReviewApiController::class, 'store']);
        Route::patch('/reviews/{id}', [ReviewApiController::class, 'update']);
        Route::delete('/reviews/{id}', [ReviewApiController::class, 'destroy']);

        // Coupon validation
        Route::post('/coupons/validate', [CouponApiController::class, 'validate']);

        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    });
});
