# Hotel Booking System — API Documentation

**Base URL:** `http://your-domain.com/api/v1`

**Authentication:** Bearer Token (Laravel Sanctum)

All authenticated endpoints require the header:
```
Authorization: Bearer {token}
```

**Standard Response Format:**
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": { "field": ["validation error"] }
}
```

---

## Authentication

### Register

```
POST /auth/register
```

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | string | Yes | max:255 |
| `email` | string | Yes | email, unique |
| `password` | string | Yes | min:8, confirmed |
| `password_confirmation` | string | Yes | must match password |
| `phone` | string | No | max:20 |

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "user",
      "avatar": null
    },
    "token": "1|abc123..."
  }
}
```

---

### Login

```
POST /auth/login
```

| Field | Type | Required |
|-------|------|----------|
| `email` | string | Yes |
| `password` | string | Yes |

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": { ... },
    "token": "2|xyz789..."
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials."
}
```

---

### Logout

```
POST /auth/logout
```
**Auth Required**

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

### Google OAuth

```
POST /auth/google
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | Google OAuth access token |

**Response (200):** Same as login response.

---

### Facebook OAuth

```
POST /auth/facebook
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | Facebook OAuth access token |

**Response (200):** Same as login response.

---

## Hotels

### List Hotels

```
GET /hotels
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `city` | string | Filter by city (partial match) |
| `country` | string | Filter by country (partial match) |
| `search` | string | Search name, city, or country |
| `per_page` | int | Results per page (default: 15) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Grand Plaza Hotel",
      "description": "Luxury hotel...",
      "address": "123 Main St",
      "city": "New York",
      "country": "USA",
      "latitude": 13.3633,
      "longitude": 103.8560,
      "rating": 4.5,
      "images": ["https://..."]
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 15,
    "total": 42
  }
}
```

---

### Get Hotel

```
GET /hotels/{id}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Grand Plaza Hotel",
    "description": "...",
    "address": "123 Main St",
    "city": "New York",
    "country": "USA",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "rating": 4.5,
    "images": ["https://..."],
    "room_types": [
      {
        "id": 1,
        "name": "Deluxe Double",
        "description": "...",
        "max_guests": 2,
        "price_per_night": 150.00,
        "images": []
      }
    ]
  }
}
```

---

## Room Types

### List Room Types by Hotel

```
GET /hotels/{hotelId}/room-types
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `per_page` | int | Results per page (default: 15) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hotel": "Grand Plaza Hotel",
      "name": "Deluxe Double",
      "description": "Spacious room...",
      "max_guests": 2,
      "price_per_night": 150.00,
      "images": []
    }
  ],
  "meta": { ... }
}
```

---

### Get Room Type

```
GET /room-types/{id}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "hotel": "Grand Plaza Hotel",
    "name": "Deluxe Double",
    "description": "...",
    "max_guests": 2,
    "price_per_night": 150.00,
    "images": []
  }
}
```

---

## Rooms

### List Rooms by Hotel

```
GET /hotels/{hotelId}/rooms
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `status` | string | Filter: `available`, `booked`, `maintenance` |
| `room_type_id` | int | Filter by room type ID |
| `per_page` | int | Results per page (default: 15) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hotel": "Grand Plaza Hotel",
      "room_type": {
        "id": 1,
        "name": "Deluxe Double",
        "max_guests": 2,
        "price_per_night": 150.00
      },
      "room_number": "101",
      "floor": 1,
      "status": "available"
    }
  ],
  "meta": { ... }
}
```

---

### Get Room

```
GET /rooms/{id}
```

**Response (200):** Same structure as list item.

---

## Bookings

### List My Bookings

```
GET /bookings
```
**Auth Required**

| Query Param | Type | Description |
|-------------|------|-------------|
| `per_page` | int | Results per page (default: 15) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user": { "id": 1, "name": "John", "email": "..." },
      "room": {
        "id": 1,
        "hotel": "Grand Plaza",
        "room_type": { "name": "Deluxe", "price_per_night": 150 },
        "room_number": "101",
        "floor": 1,
        "status": "booked"
      },
      "check_in_date": "2026-04-01",
      "check_out_date": "2026-04-05",
      "total_price": 600.00,
      "status": "confirmed",
      "payment": {
        "id": 1,
        "amount": 600.00,
        "method": "card",
        "status": "paid",
        "transaction_id": "TXN-ABC123",
        "paid_at": "2026-03-15T10:00:00Z"
      },
      "created_at": "2026-03-15T09:00:00Z"
    }
  ],
  "meta": { ... }
}
```

---

### Create Booking

```
POST /bookings
```
**Auth Required**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `room_id` | int | Yes | must exist, room must be available |
| `check_in_date` | date | Yes | format: Y-m-d, must be today or later |
| `check_out_date` | date | Yes | format: Y-m-d, must be after check_in_date |

**Validation:**
- Room must have `status = available`
- No overlapping bookings (pending/confirmed) for the selected dates

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully.",
  "data": {
    "id": 5,
    "check_in_date": "2026-04-01",
    "check_out_date": "2026-04-05",
    "total_price": 600.00,
    "status": "pending",
    ...
  }
}
```

**Side effects:** Sends notification to admin (email + database + Telegram).

---

### Get Booking

```
GET /bookings/{id}
```
**Auth Required** — Only returns bookings owned by the authenticated user.

**Response (200):** Same structure as list item.

---

### Cancel Booking

```
PATCH /bookings/{id}/cancel
```
**Auth Required**

**Validation:** Only bookings with `status = pending` can be cancelled.

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully.",
  "data": { ... }
}
```

**Side effects:** Sends status update notification to user (email + database).

---

## Payments

### Create Payment

```
POST /payments
```
**Auth Required**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `booking_id` | int | Yes | must exist, must belong to user |
| `method` | string | Yes | `card`, `cash`, or `paypal` |

**Validation:**
- Booking must belong to the authenticated user
- Booking must not already have a payment
- Booking must not be cancelled

**Response (201):**
```json
{
  "success": true,
  "message": "Payment processed successfully.",
  "data": {
    "id": 1,
    "booking_id": 5,
    "amount": 600.00,
    "method": "card",
    "status": "paid",
    "transaction_id": "TXN-XYZ789ABC",
    "paid_at": "2026-03-15T10:30:00Z"
  }
}
```

**Side effects:**
- Sets booking status to `confirmed`
- Generates a `TXN-` prefixed transaction ID
- Sends payment notification to user (email + database + Telegram)

---

### Get Payment

```
GET /payments/{id}
```
**Auth Required** — Only returns payments for bookings owned by the authenticated user.

**Response (200):** Same structure as create response.

---

## Profile

### Get Profile

```
GET /profile
```
**Auth Required**

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "avatar": "/storage/avatars/abc.jpg"
  }
}
```

---

### Update Profile

```
PATCH /profile
```
**Auth Required**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | string | No | max:255 |
| `phone` | string | No | max:20, nullable |

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "data": { ... }
}
```

---

### Set Password

```
PATCH /profile/set-password
```
**Auth Required**

For social login users who don't have a password yet.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `password` | string | Yes | min:8, confirmed |
| `password_confirmation` | string | Yes | must match password |

**Response (200):**
```json
{
  "success": true,
  "message": "Password set successfully."
}
```

---

## Reviews

### List Reviews

```
GET /reviews
```

| Query Param | Type | Description |
|-------------|------|-------------|
| `hotel_id` | int | Filter reviews by hotel |

**Response (200):** Paginated list of reviews (15 per page).

```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "hotel_id": 1,
      "booking_id": 5,
      "rating": 5,
      "comment": "Amazing stay!",
      "created_at": "2026-03-15T12:00:00Z",
      "user": { "name": "John" },
      "hotel": { "name": "Grand Plaza" }
    }
  ]
}
```

---

### Get Review

```
GET /reviews/{id}
```

**Response (200):** Single review with user, hotel, and booking relations.

---

### Create Review

```
POST /reviews
```
**Auth Required**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `hotel_id` | int | Yes | must exist |
| `booking_id` | int | Yes | must exist, unique per review |
| `rating` | int | Yes | 1–5 |
| `comment` | string | No | max:1000 |

**Constraint:** One review per booking (unique `booking_id`).

**Response (201):**
```json
{
  "data": {
    "id": 1,
    "rating": 5,
    "comment": "Amazing stay!",
    ...
  }
}
```

---

### Update Review

```
PATCH /reviews/{id}
```
**Auth Required** — Must own the review.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `rating` | int | Yes | 1–5 |
| `comment` | string | No | max:1000 |

**Response (200):** Updated review object.

---

### Delete Review

```
DELETE /reviews/{id}
```
**Auth Required** — Must own the review.

**Response (200):**
```json
{
  "message": "Review deleted successfully."
}
```

---

## Amenities

### List Amenities

```
GET /amenities
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "WiFi",
      "icon": "wifi",
      "hotels_count": 3
    }
  ]
}
```

---

### Get Amenity

```
GET /amenities/{id}
```

**Response (200):** Amenity with associated hotels.

---

## Coupons

### Validate Coupon

```
POST /coupons/validate
```

| Field | Type | Required |
|-------|------|----------|
| `code` | string | Yes |

**Response (200):**
```json
{
  "data": {
    "code": "WELCOME10",
    "discount_percent": 10
  }
}
```

**Error (404):** Coupon not found.
**Error (422):** Coupon expired or usage limit reached.

---

## Notifications

### List Notifications

```
GET /notifications
```
**Auth Required**

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "type": "App\\Notifications\\BookingNotification",
      "data": {
        "type": "booking_created",
        "title": "New Booking",
        "message": "Your booking has been created.",
        "booking_id": 5,
        "hotel_name": "Grand Plaza"
      },
      "read_at": null,
      "created_at": "2026-03-15T10:00:00Z"
    }
  ],
  "unread_count": 3
}
```

Returns the last 10 unread notifications.

---

### Mark Notification as Read

```
PATCH /notifications/{id}/read
```
**Auth Required**

**Response (200):**
```json
{
  "success": true,
  "message": "Notification marked as read."
}
```

---

### Mark All as Read

```
PATCH /notifications/read-all
```
**Auth Required**

**Response (200):**
```json
{
  "success": true,
  "message": "All notifications marked as read."
}
```

---

## Status & Enum Values

### Booking Status
| Value | Description |
|-------|-------------|
| `pending` | Awaiting confirmation/payment |
| `confirmed` | Payment received, booking confirmed |
| `completed` | Guest has checked out |
| `cancelled` | Booking was cancelled |

### Payment Status
| Value | Description |
|-------|-------------|
| `pending` | Payment initiated |
| `paid` | Payment successful |
| `failed` | Payment failed |
| `refunded` | Payment refunded |

### Payment Method
| Value | Description |
|-------|-------------|
| `card` | Credit/Debit card |
| `cash` | Cash payment |
| `paypal` | PayPal |

### Room Status
| Value | Description |
|-------|-------------|
| `available` | Ready for booking |
| `booked` | Currently occupied |
| `maintenance` | Under maintenance |

### User Role
| Value | Description |
|-------|-------------|
| `user` | Regular user/guest |
| `admin` | Administrator |

---

## Rate Limiting

No rate limiting is configured by default. Consider adding throttle middleware for production.

## Pagination

Paginated endpoints return a `meta` object:

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

Use `?page=2` to navigate pages and `?per_page=25` to change page size.
