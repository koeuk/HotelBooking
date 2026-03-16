# Hotel Booking System — API Implementation Plan

This document serves as a step-by-step guide for implementing the REST API.
Each phase builds on the previous one. Check off tasks as you complete them.

---

## Phase 1: Authentication & User Management

### 1.1 Auth Controller (`Api/AuthController.php`)

- [ ] **POST `/api/v1/auth/register`** — Register a new user
  - Validate: `name` (required|string|max:255), `email` (required|email|unique), `password` (required|confirmed|min:8), `phone` (nullable|string|max:20)
  - Hash password, create user with `role: user`
  - Generate Sanctum token via `$user->createToken('auth_token')`
  - Return: `{ success, message, data: { user: UserResource, token } }` — Status `201`

- [ ] **POST `/api/v1/auth/login`** — Login with email/password
  - Validate: `email` (required|email), `password` (required|string)
  - Check credentials with `Auth::attempt()`
  - Return token on success — Status `200`
  - Return `{ success: false, message: "Invalid credentials." }` — Status `401`

- [ ] **POST `/api/v1/auth/logout`** — Logout (revoke token)
  - Middleware: `auth:sanctum`
  - Delete current access token: `$request->user()->currentAccessToken()->delete()`
  - Return: `{ success, message }` — Status `200`

### 1.2 Social Auth Controller (`Api/SocialAuthApiController.php`)

- [ ] **POST `/api/v1/auth/google`** — Google OAuth token exchange
  - Validate: `token` (required|string)
  - Use Google API to validate token and get user info
  - Find or create user by `google_id`
  - Generate Sanctum token
  - Return: same as login response — Status `200`

- [ ] **POST `/api/v1/auth/facebook`** — Facebook OAuth token exchange
  - Same flow as Google but with Facebook API
  - Require email from Facebook response
  - Find or create user by `facebook_id`

### 1.3 Profile Controller (`Api/ProfileApiController.php`)

- [ ] **GET `/api/v1/profile`** — Get authenticated user profile
  - Middleware: `auth:sanctum`
  - Return: `{ success, data: UserResource }` — Status `200`

- [ ] **PATCH `/api/v1/profile`** — Update profile
  - Validate: `name` (sometimes|string|max:255), `phone` (sometimes|nullable|string|max:20)
  - Update user fields
  - Return: `{ success, message, data: UserResource }` — Status `200`

- [ ] **PATCH `/api/v1/profile/set-password`** — Set password for social auth users
  - Validate: `password` (required|confirmed|min:8)
  - Check user doesn't already have password (optional)
  - Hash and save password
  - Return: `{ success, message }` — Status `200`

### 1.4 API Resource

- [ ] **Create `UserResource`** — Returns: `id`, `name`, `email`, `phone`, `role`, `avatar`

### 1.5 Routes

```php
Route::prefix('v1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/google', [SocialAuthApiController::class, 'loginWithGoogle']);
    Route::post('/auth/facebook', [SocialAuthApiController::class, 'loginWithFacebook']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [ProfileApiController::class, 'show']);
        Route::patch('/profile', [ProfileApiController::class, 'update']);
        Route::patch('/profile/set-password', [ProfileApiController::class, 'setPassword']);
    });
});
```

### 1.6 Testing Checklist
- [ ] Register returns token and user
- [ ] Login with valid credentials returns token
- [ ] Login with invalid credentials returns 401
- [ ] Logout revokes token
- [ ] Profile endpoints require auth
- [ ] Social auth creates/finds user correctly

---

## Phase 2: Hotels, Room Types & Rooms (Public)

### 2.1 Hotel API Controller (`Api/HotelApiController.php`)

- [ ] **GET `/api/v1/hotels`** — List hotels with filters
  - Query params: `city`, `country`, `search`, `per_page` (default: 15)
  - Search: `WHERE name/city/country LIKE %search%`
  - Eager load: room types (for show)
  - Return: paginated `HotelResource` collection with `meta`

- [ ] **GET `/api/v1/hotels/{id}`** — Get single hotel
  - Eager load: `roomTypes`
  - Return: `{ success, data: HotelResource }`

### 2.2 Room Type API Controller (`Api/RoomTypeApiController.php`)

- [ ] **GET `/api/v1/hotels/{hotelId}/room-types`** — List room types by hotel
  - Query: `per_page` (default: 15)
  - Filter by `hotel_id`
  - Return: paginated `RoomTypeResource` collection

- [ ] **GET `/api/v1/room-types/{id}`** — Get single room type
  - Eager load: `hotel`
  - Return: `{ success, data: RoomTypeResource }`

### 2.3 Room API Controller (`Api/RoomApiController.php`)

- [ ] **GET `/api/v1/hotels/{hotelId}/rooms`** — List rooms by hotel
  - Query params: `status` (available/booked/maintenance), `room_type_id`, `per_page`
  - Eager load: `roomType`
  - Return: paginated `RoomResource` collection

- [ ] **GET `/api/v1/rooms/{id}`** — Get single room
  - Eager load: `hotel`, `roomType`
  - Return: `{ success, data: RoomResource }`

### 2.4 API Resources

- [ ] **Create `HotelResource`** — Returns: `id`, `name`, `description`, `address`, `city`, `country`, `rating`, `images`
- [ ] **Create `RoomTypeResource`** — Returns: `id`, `hotel` (name, conditional), `name`, `description`, `max_guests`, `price_per_night`, `images`
- [ ] **Create `RoomResource`** — Returns: `id`, `hotel` (name, conditional), `room_type` (RoomTypeResource), `room_number`, `floor`, `status`

### 2.5 Routes

```php
// Inside v1 prefix, public group
Route::get('/hotels', [HotelApiController::class, 'index']);
Route::get('/hotels/{id}', [HotelApiController::class, 'show']);
Route::get('/hotels/{id}/room-types', [RoomTypeApiController::class, 'index']);
Route::get('/room-types/{id}', [RoomTypeApiController::class, 'show']);
Route::get('/hotels/{id}/rooms', [RoomApiController::class, 'index']);
Route::get('/rooms/{id}', [RoomApiController::class, 'show']);
```

### 2.6 Testing Checklist
- [ ] Hotels list returns paginated results
- [ ] City/country/search filters work
- [ ] Hotel show includes room types
- [ ] Room types filtered by hotel
- [ ] Rooms filtered by status and room_type_id
- [ ] All endpoints work without authentication

---

## Phase 3: Bookings (Authenticated)

### 3.1 Booking API Controller (`Api/BookingApiController.php`)

- [ ] **GET `/api/v1/bookings`** — List user's bookings
  - Middleware: `auth:sanctum`
  - Filter: only authenticated user's bookings
  - Eager load: `room.hotel`, `room.roomType`, `payment`
  - Query: `per_page` (default: 15)
  - Return: paginated `BookingResource` collection

- [ ] **POST `/api/v1/bookings`** — Create a booking
  - Validate: `room_id` (required|exists), `check_in_date` (required|date|after_or_equal:today), `check_out_date` (required|date|after:check_in_date)
  - **Business Logic:**
    1. Check room exists and has `status = available`
    2. Check no overlapping bookings (pending/confirmed) for the date range
    3. Calculate `total_price = nights × room.roomType.price_per_night`
    4. Create booking with `status = pending`
    5. Send `BookingCreatedAdminNotification` to admin (email + database + Telegram)
  - Return: `BookingResource` — Status `201`

- [ ] **GET `/api/v1/bookings/{id}`** — Get booking details
  - Must belong to authenticated user
  - Eager load: `user`, `room.hotel`, `room.roomType`, `payment`
  - Return: `BookingResource`

- [ ] **PATCH `/api/v1/bookings/{id}/cancel`** — Cancel a booking
  - Must belong to authenticated user
  - Booking must have `status = pending`
  - Update status to `cancelled`
  - Send `BookingStatusUpdatedUserNotification`
  - Return: updated `BookingResource`

### 3.2 API Resource

- [ ] **Create `BookingResource`** — Returns: `id`, `user` (UserResource), `room` (RoomResource), `check_in_date`, `check_out_date`, `total_price`, `status`, `payment` (PaymentResource, conditional), `created_at`

### 3.3 Routes

```php
// Inside auth:sanctum group
Route::get('/bookings', [BookingApiController::class, 'index']);
Route::post('/bookings', [BookingApiController::class, 'store']);
Route::get('/bookings/{id}', [BookingApiController::class, 'show']);
Route::patch('/bookings/{id}/cancel', [BookingApiController::class, 'cancel']);
```

### 3.4 Testing Checklist
- [ ] List returns only user's own bookings
- [ ] Cannot book unavailable room
- [ ] Cannot book overlapping dates
- [ ] Price calculation is correct (nights × price_per_night)
- [ ] Admin notification sent on create
- [ ] Only pending bookings can be cancelled
- [ ] User notification sent on cancel

---

## Phase 4: Payments (Authenticated)

### 4.1 Payment API Controller (`Api/PaymentApiController.php`)

- [ ] **POST `/api/v1/payments`** — Process a payment
  - Validate: `booking_id` (required|exists), `method` (required|in:card,cash,paypal)
  - **Business Logic:**
    1. Verify booking belongs to authenticated user
    2. Verify no existing payment for this booking
    3. Verify booking is not cancelled
    4. Create payment with `status = paid`, `paid_at = now()`
    5. Generate `transaction_id`: `'TXN-' + strtoupper(Str::random(12))`
    6. Update booking status to `confirmed`
    7. Send `PaymentReceivedNotification` (email + database + Telegram)
  - Return: `PaymentResource` — Status `201`

- [ ] **GET `/api/v1/payments/{id}`** — Get payment details
  - Must belong to authenticated user (via booking)
  - Eager load: `booking`
  - Return: `PaymentResource`

### 4.2 API Resource

- [ ] **Create `PaymentResource`** — Returns: `id`, `booking_id`, `amount`, `method`, `status`, `transaction_id`, `paid_at`

### 4.3 Routes

```php
// Inside auth:sanctum group
Route::post('/payments', [PaymentApiController::class, 'store']);
Route::get('/payments/{id}', [PaymentApiController::class, 'show']);
```

### 4.4 Testing Checklist
- [ ] Cannot pay for another user's booking
- [ ] Cannot pay twice for same booking
- [ ] Cannot pay for cancelled booking
- [ ] Booking status updates to confirmed
- [ ] Transaction ID is generated
- [ ] Notification sent on payment

---

## Phase 5: Reviews (Mixed Auth)

### 5.1 Review API Controller (`Api/ReviewApiController.php`)

- [ ] **GET `/api/v1/reviews`** — List reviews (public)
  - Query: `hotel_id` (optional filter), paginated (15/page)
  - Eager load: `user`, `hotel`, `booking`
  - Return: paginated review collection

- [ ] **GET `/api/v1/reviews/{id}`** — Get single review (public)
  - Eager load: `user`, `hotel`, `booking`

- [ ] **POST `/api/v1/reviews`** — Create review (auth required)
  - Validate: `hotel_id` (required|exists), `booking_id` (required|exists|unique:reviews), `rating` (required|int|1-5), `comment` (nullable|string|max:1000)
  - Constraint: one review per booking (`unique:reviews,booking_id`)
  - Auto-set `user_id` from auth
  - Return: review — Status `201`

- [ ] **PATCH `/api/v1/reviews/{id}`** — Update review (auth required, own only)
  - Validate: `rating` (required|int|1-5), `comment` (nullable|string|max:1000)
  - Check `review.user_id === auth.id`

- [ ] **DELETE `/api/v1/reviews/{id}`** — Delete review (auth required, own only)
  - Check ownership
  - Return: `{ message }` — Status `200`

### 5.2 Routes

```php
// Public (or inside auth group — depends on design)
Route::get('/reviews', [ReviewApiController::class, 'index']);
Route::get('/reviews/{id}', [ReviewApiController::class, 'show']);

// Inside auth:sanctum group
Route::post('/reviews', [ReviewApiController::class, 'store']);
Route::patch('/reviews/{id}', [ReviewApiController::class, 'update']);
Route::delete('/reviews/{id}', [ReviewApiController::class, 'destroy']);
```

### 5.3 Testing Checklist
- [ ] Can list reviews without auth
- [ ] Can filter by hotel_id
- [ ] Cannot create duplicate review for same booking
- [ ] Rating must be 1-5
- [ ] Cannot update/delete another user's review

---

## Phase 6: Amenities & Coupons

### 6.1 Amenity API Controller (`Api/AmenityApiController.php`)

- [ ] **GET `/api/v1/amenities`** — List all amenities (public)
  - Include `hotels_count`
  - Return: amenity collection

- [ ] **GET `/api/v1/amenities/{id}`** — Get amenity with hotels (public)
  - Eager load: associated hotels

- [ ] **POST `/api/v1/amenities`** — Create amenity
  - Validate: `name` (required|string|max:255|unique:amenities), `icon` (nullable|string|max:50)
  - Return: amenity — Status `201`

- [ ] **PUT `/api/v1/amenities/{id}`** — Update amenity
  - Same validation (unique ignoring self)

- [ ] **DELETE `/api/v1/amenities/{id}`** — Delete amenity

### 6.2 Coupon API Controller (`Api/CouponApiController.php`)

- [ ] **POST `/api/v1/coupons/validate`** — Validate a coupon code
  - Validate: `code` (required|string)
  - **Business Logic:**
    1. Find coupon by code — return `404` if not found
    2. Check `valid_from <= today <= valid_until` — return `422` if expired
    3. Check `used_count < max_uses` (if `max_uses > 0`) — return `422` if limit reached
  - Return: `{ data: { code, discount_percent } }` — Status `200`

### 6.3 Routes

```php
// Public
Route::get('/amenities', [AmenityApiController::class, 'index']);
Route::get('/amenities/{id}', [AmenityApiController::class, 'show']);

// Inside auth:sanctum group
Route::post('/coupons/validate', [CouponApiController::class, 'validate']);
```

### 6.4 Testing Checklist
- [ ] Amenities list includes hotel count
- [ ] Invalid coupon returns 404
- [ ] Expired coupon returns 422
- [ ] Over-limit coupon returns 422
- [ ] Valid coupon returns discount_percent

---

## Phase 7: Notifications (Authenticated)

### 7.1 Notification Controller (`Api/NotificationController.php`)

- [ ] **GET `/api/v1/notifications`** — List unread notifications
  - Middleware: `auth:sanctum`
  - Return last 10 unread notifications
  - Include `unread_count`
  - Return: `{ success, data: [...], unread_count }`

- [ ] **PATCH `/api/v1/notifications/{id}/read`** — Mark single notification as read
  - Find notification by ID in user's notifications
  - Call `markAsRead()`

- [ ] **PATCH `/api/v1/notifications/read-all`** — Mark all as read
  - Call `$user->unreadNotifications->markAsRead()`

### 7.2 Routes

```php
// Inside auth:sanctum group
Route::get('/notifications', [NotificationController::class, 'index']);
Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
```

### 7.3 Notification Classes to Create
- [ ] `BookingCreatedAdminNotification` — channels: mail, database, telegram
- [ ] `BookingStatusUpdatedUserNotification` — channels: mail, database
- [ ] `PaymentReceivedNotification` — channels: mail, database, telegram
- [ ] `BookingNotification` — generic, channels: mail, database, telegram

### 7.4 Testing Checklist
- [ ] Notifications created on booking/payment events
- [ ] List returns only auth user's notifications
- [ ] Mark as read updates `read_at`
- [ ] Mark all clears all unread

---

## Phase 8: Testing & Finalization

### 8.1 Error Handling
- [ ] Consistent error response format across all controllers
- [ ] 401 for unauthenticated requests
- [ ] 403 for unauthorized access (wrong user)
- [ ] 404 for not found resources
- [ ] 422 for validation errors

### 8.2 API Response Wrapper
Ensure all responses follow the standard format:
```json
{
  "success": true|false,
  "message": "optional",
  "data": { ... },
  "errors": { ... }
}
```

### 8.3 Pagination Format
All paginated endpoints must return:
```json
{
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 72
  }
}
```
Support `?page=N` and `?per_page=N` query params.

### 8.4 Enum Reference

**Booking Status:** `pending` → `confirmed` → `completed` | `cancelled`

**Payment Status:** `pending`, `paid`, `failed`, `refunded`

**Payment Method:** `card`, `cash`, `paypal`

**Room Status:** `available`, `booked`, `maintenance`

**User Role:** `user`, `admin`

### 8.5 Security Checklist
- [ ] All sensitive endpoints require `auth:sanctum`
- [ ] Users can only access their own bookings/payments
- [ ] Users can only modify their own reviews
- [ ] Admin endpoints are separate from API (web middleware + admin check)
- [ ] Passwords are hashed with `Hash::make()`
- [ ] File uploads validate `image|max:2048`

### 8.6 Postman / API Client Testing
- [ ] Import all 34 endpoints
- [ ] Test full flow: Register → Login → Browse Hotels → Book → Pay → Review → Logout
- [ ] Test error cases: invalid data, unauthorized, duplicate booking dates
- [ ] Test pagination on all list endpoints
- [ ] Test all filters (city, country, search, status, hotel_id)

---

## Implementation Summary

| Phase | Endpoints | Status |
|-------|-----------|--------|
| 1. Auth & Profile | 8 endpoints | ✅ Done |
| 2. Hotels/Rooms/RoomTypes | 6 endpoints | ✅ Done |
| 3. Bookings | 4 endpoints | ✅ Done |
| 4. Payments | 2 endpoints | ✅ Done |
| 5. Reviews | 5 endpoints | ✅ Done |
| 6. Amenities & Coupons | 6 endpoints | ✅ Done |
| 7. Notifications | 3 endpoints | ✅ Done |
| 8. Testing & Finalization | — | ✅ Done |
| **Total** | **34 endpoints** | **✅ Complete** |
