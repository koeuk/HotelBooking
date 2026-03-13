# Hotel Booking Website - Implementation Plan

## Project Overview

A full-stack Hotel Booking System with Admin Dashboard, REST API, Notification System, and Social Authentication.

**Live Stack:**
- **Backend:** Laravel 12 + MySQL
- **Frontend:** React 18 (via Inertia.js 2.0 SSR)
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI)
- **Auth:** Laravel Breeze (web), Laravel Sanctum (API), Laravel Socialite (Google/Facebook)
- **Notifications:** Email + Database + Telegram Bot
- **Queue:** Database driver

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Auth    │  │ User Dashboard│  │ Admin Dashboard│  │
│  │  Pages   │  │ (Guest)      │  │ (Admin)        │  │
│  └──────────┘  └──────────────┘  └───────────────┘  │
├─────────────────────────────────────────────────────┤
│              Inertia.js (SSR Bridge)                │
├─────────────────────────────────────────────────────┤
│                  Laravel Backend                     │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Web     │  │  API v1      │  │ Notifications  │  │
│  │  Routes  │  │  (Sanctum)   │  │ (Mail/DB/TG)   │  │
│  └──────────┘  └──────────────┘  └───────────────┘  │
├─────────────────────────────────────────────────────┤
│                  MySQL Database                      │
│  Users, Hotels, RoomTypes, Rooms, Bookings,          │
│  Payments, Reviews, Amenities, Coupons               │
└─────────────────────────────────────────────────────┘
```

---

## Database Schema

### Tables & Relationships

| Table | Key Fields | Relationships |
|-------|-----------|---------------|
| **users** | id, uuid, name, email, password, phone, role (guest/admin), google_id, facebook_id, avatar | hasMany: bookings |
| **hotels** | id, uuid, name, description, address, city, country, rating, images (json) | hasMany: roomTypes, rooms, reviews; belongsToMany: amenities |
| **room_types** | id, uuid, hotel_id, name, description, max_guests, price_per_night, images | belongsTo: hotel; hasMany: rooms |
| **rooms** | id, uuid, hotel_id, room_type_id, room_number, floor, status (available/booked/maintenance) | belongsTo: hotel, roomType; hasMany: bookings |
| **bookings** | id, uuid, user_id, room_id, check_in_date, check_out_date, total_price, status (pending/confirmed/cancelled/completed) | belongsTo: user, room; hasOne: payment, review |
| **payments** | id, uuid, booking_id, amount, method (card/cash/paypal), status (pending/paid/failed/refunded), transaction_id, paid_at | belongsTo: booking |
| **reviews** | id, uuid, user_id, hotel_id, booking_id, rating (1-5), comment | belongsTo: user, hotel, booking |
| **amenities** | id, uuid, name, icon | belongsToMany: hotels |
| **hotel_amenities** | hotel_id, amenity_id | Pivot table |
| **coupons** | id, uuid, code, discount_percent, valid_from, valid_until, max_uses, used_count | isValid() method |

**Note:** All models use a `HasUuid` trait for UUID-based route binding.

---

## Authentication System

### Web Authentication (Breeze + Inertia)
- Login (email or username), Register, Password Reset, Email Verification
- Role-based redirect: admin → `/admin/dashboard`, guest → `/dashboard`

### Social Authentication (Socialite)
- Google OAuth2 and Facebook OAuth2
- Auto-register if email not found, link if exists
- Both web and API token-based flows

### API Authentication (Sanctum)
- Token-based for mobile/third-party clients
- Session-based for SPA (same-origin)
- Endpoints: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`

---

## Admin Dashboard (10 Modules)

All admin routes are protected by `auth` + `admin` middleware under `/admin/*` prefix.

| Module | Routes | Pages | Features |
|--------|--------|-------|----------|
| **Dashboard** | GET /admin/dashboard | Dashboard.jsx | Stats cards (revenue, hotels, rooms, bookings), recent bookings, quick actions |
| **Hotels** | Resource CRUD | Index, Create, Edit | Manage hotel properties with images, ratings |
| **Room Types** | Resource CRUD | Index, Create, Edit | Define room categories per hotel with pricing |
| **Rooms** | Resource CRUD | Index, Create, Edit | Individual room management with status tracking |
| **Bookings** | Resource CRUD | Index, Create, Show | Inline status updates, payment recording, delete |
| **Payments** | Index + Update | Index | View payments, update payment status |
| **Users** | Resource CRUD | Index, Create, Edit | User management with role assignment |
| **Amenities** | Resource CRUD | Index, Create, Edit | Hotel amenities catalog (WiFi, Pool, Gym, etc.) |
| **Reviews** | Resource CRUD | Index, Create, Edit | Guest review moderation |
| **Coupons** | Resource CRUD | Index, Create, Edit | Discount coupon management with validity tracking |

### Admin Layout
- Collapsible dark sidebar (w-72 desktop, Sheet drawer mobile)
- Top navbar with search, notification bell, avatar dropdown
- Sidebar items: Dashboard, Hotels, Room Types, Rooms, Bookings, Payments, Users, Amenities, Reviews, Coupons

---

## User Dashboard

| Feature | Description |
|---------|-------------|
| **Welcome Banner** | Blue gradient with user greeting |
| **Stats Cards** | Total bookings, upcoming stays, completed, total spent |
| **Upcoming Stays** | Next check-in dates with hotel details |
| **Recent Bookings** | Table with status, dates, amounts |
| **Featured Hotels** | Top-rated hotels sidebar |

### User Layout
- Collapsible dark sidebar: Dashboard, My Bookings, Hotels, Favorites
- Top navbar with notifications and profile dropdown

---

## REST API (v1)

All endpoints under `/api/v1/` prefix.

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, returns Sanctum token |
| POST | /auth/google | Google token exchange |
| POST | /auth/facebook | Facebook token exchange |
| GET | /hotels | List all hotels |
| GET | /hotels/{id} | Hotel details |
| GET | /hotels/{id}/room-types | Room types for hotel |
| GET | /room-types/{id} | Room type details |
| GET | /hotels/{id}/rooms | Available rooms for hotel |
| GET | /rooms/{id} | Room details |
| GET | /amenities | List all amenities |
| GET | /amenities/{id} | Amenity details |

### Protected Endpoints (auth:sanctum)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/logout | Logout, revoke token |
| GET | /bookings | User's bookings |
| POST | /bookings | Create booking (with availability check) |
| GET | /bookings/{id} | Booking details |
| PATCH | /bookings/{id}/cancel | Cancel booking |
| POST | /payments | Record payment |
| GET | /payments/{id} | Payment details |
| GET | /profile | User profile |
| PATCH | /profile | Update profile |
| PATCH | /profile/set-password | Set password (social users) |
| GET | /reviews | List reviews (filter by hotel_id) |
| POST | /reviews | Submit review |
| GET | /reviews/{id} | Review details |
| PATCH | /reviews/{id} | Update own review |
| DELETE | /reviews/{id} | Delete own review |
| POST | /coupons/validate | Validate coupon code |
| GET | /notifications | Unread notifications |
| PATCH | /notifications/{id}/read | Mark notification read |
| PATCH | /notifications/read-all | Mark all read |

### API Resources
- UserResource, HotelResource, RoomTypeResource, RoomResource, BookingResource, PaymentResource

---

## Notification System

### 3 Notification Classes

| Notification | Trigger | Channels | Recipient |
|-------------|---------|----------|-----------|
| **BookingCreatedAdminNotification** | New booking created | Mail, Database, Telegram | Admin |
| **BookingStatusUpdatedUserNotification** | Status changed to confirmed/cancelled/completed | Mail, Database | Guest |
| **PaymentReceivedNotification** | Payment recorded as paid | Mail, Database, Telegram | Guest |

### Features
- All notifications implement `ShouldQueue` for async processing
- Telegram channel is conditional (only if bot token configured)
- NotificationBell component polls `/api/v1/notifications` every 30 seconds
- Mark as read / Mark all as read functionality

---

## Booking Flow

```
Guest selects hotel → Chooses room type → Picks dates
    → System checks availability (overlap detection)
    → Calculates price (nights × price_per_night)
    → Creates booking (status: pending)
    → Admin notified (email + database + telegram)

Admin reviews booking → Updates status
    → confirmed: Guest notified, proceeds to payment
    → cancelled: Guest notified
    → completed: Guest notified

Payment recorded → Status: paid
    → Booking auto-confirmed
    → Guest notified (email + database + telegram)
```

---

## Theme & Styling

- **Primary Color:** Bright blue (`oklch(0.6 0.18 260)`)
- **Design System:** shadcn/ui components (Button, Card, Table, Badge, Dialog, Select, etc.)
- **Admin Sidebar:** Dark zinc-950 background
- **Responsive:** Mobile-first with collapsible sidebar

---

## Environment Variables

```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hotelBooking
DB_USERNAME=root
DB_PASSWORD=

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@yourhotel.com
MAIL_FROM_NAME="Hotel Booking"

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URL=https://yourdomain.com/auth/google/callback

# Facebook OAuth
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_REDIRECT_URL=https://yourdomain.com/auth/facebook/callback

# Queue
QUEUE_CONNECTION=database
```

---

## Seed Data

| Model | Count | Details |
|-------|-------|---------|
| Admin User | 1 | admin@gmail.com / 12345678 |
| Guest User | 1 + 10 | koeuk@gmail.com + 10 factory guests |
| Hotels | 3 | Factory generated with random amenities |
| Room Types | 9 | 3 per hotel |
| Rooms | 45 | 5 per room type |
| Bookings | 10 | Random guest + room, 2-night stays |
| Payments | 10 | One per booking |
| Reviews | ~5 | Random for some bookings |
| Amenities | 8 | WiFi, Pool, Gym, Spa, Restaurant, Parking, AC, Bar |
| Coupons | 3 | WELCOME10 (10%), SUMMER25 (25%), VIP50 (50%) |

---

## File Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/                    # 12 API controllers
│   │   │   ├── AuthController.php
│   │   │   ├── HotelApiController.php
│   │   │   ├── RoomTypeApiController.php
│   │   │   ├── RoomApiController.php
│   │   │   ├── BookingApiController.php
│   │   │   ├── PaymentApiController.php
│   │   │   ├── ProfileApiController.php
│   │   │   ├── NotificationController.php
│   │   │   ├── AmenityApiController.php
│   │   │   ├── ReviewApiController.php
│   │   │   ├── CouponApiController.php
│   │   │   └── SocialAuthApiController.php
│   │   ├── DashboardController.php
│   │   ├── UserDashboardController.php
│   │   ├── HotelController.php
│   │   ├── RoomTypeController.php
│   │   ├── RoomController.php
│   │   ├── BookingController.php
│   │   ├── PaymentController.php
│   │   ├── UserController.php
│   │   ├── AmenityController.php
│   │   ├── ReviewController.php
│   │   ├── CouponController.php
│   │   └── SocialAuthController.php
│   ├── Middleware/
│   │   └── AdminMiddleware.php
│   └── Resources/                  # 6 API resources
├── Models/                         # 9 models (all with HasUuid)
├── Notifications/                  # 3 notification classes
└── Traits/
    └── HasUuid.php

resources/js/
├── Layouts/
│   ├── AdminLayout.jsx             # Admin sidebar + navbar
│   ├── AuthenticatedLayout.jsx     # User sidebar + navbar
│   └── GuestLayout.jsx
├── Pages/
│   ├── Admin/
│   │   ├── Dashboard.jsx
│   │   ├── Hotels/        (Index, Create, Edit)
│   │   ├── RoomTypes/     (Index, Create, Edit)
│   │   ├── Rooms/         (Index, Create, Edit)
│   │   ├── Bookings/      (Index, Create, Show)
│   │   ├── Payments/      (Index)
│   │   ├── Users/         (Index, Create, Edit)
│   │   ├── Amenities/     (Index, Create, Edit)
│   │   ├── Reviews/       (Index, Create, Edit)
│   │   └── Coupons/       (Index, Create, Edit)
│   ├── Auth/               (Login, Register, ForgotPassword, etc.)
│   ├── Dashboard.jsx       # User dashboard
│   └── Profile/            (Edit + partials)
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── NotificationBell.jsx
└── lib/
    └── utils.js

routes/
├── web.php                 # Web + admin routes
├── api.php                 # API v1 routes
└── auth.php                # Breeze auth routes

database/
├── migrations/             # 14 migration files
├── seeders/
│   └── DatabaseSeeder.php
└── factories/              # Model factories
```

---

## Implementation Phases (Completed)

### Phase 1: Project Initialization & Base Setup
- Laravel + Breeze (React SSR) + shadcn/ui
- Sanctum, Socialite, Telegram channel installed
- Environment configured

### Phase 2: Database Layer & Models
- 14 migrations (users, hotels, room_types, rooms, bookings, payments, reviews, amenities, hotel_amenities, coupons + system tables)
- 9 Eloquent models with relationships and UUID trait
- Database seeder with realistic test data

### Phase 3: Authentication & Authorization
- Breeze login/register with email or username
- Google + Facebook OAuth (web + API)
- AdminMiddleware for role-based access
- Role-based login redirect

### Phase 4: Admin Dashboard & Core CRUD
- AdminLayout with collapsible sidebar (10 nav items)
- Dashboard with stats cards and recent bookings
- Full CRUD for all 10 modules (30+ admin pages)

### Phase 5: Booking Logic & Notifications
- 3 notification classes (BookingCreated, StatusUpdated, PaymentReceived)
- Mail + Database + Telegram channels
- NotificationBell with real-time polling
- Booking availability checking with overlap detection
- Auto price calculation

### Phase 6: REST API
- 30+ API endpoints under `/api/v1/`
- Sanctum token + session auth
- 6 API Resource classes
- 12 API controllers
- Public hotel/room listings + protected booking/payment/profile/review endpoints

### Phase 7: Payment & Quality of Life
- Admin payment recording with method selection
- Auto-confirm booking on payment
- Toast notifications (Sonner)
- Queue-based async notifications

### Phase 8: Testing & Final Polish
- All role-based access verified
- UUID route binding across all pages
- Responsive mobile + desktop layouts
- Frontend build passing with no errors
- Full-width admin layout

---

## Future Enhancements

| Feature | Priority | Description |
|---------|----------|-------------|
| Payment Gateway | High | Stripe/PayPal SDK integration for real payments |
| Image Upload | High | File upload for hotel/room images (S3/local storage) |
| Advanced Search | Medium | Filter hotels by city, price range, amenities, dates |
| Availability Calendar | Medium | Visual calendar for room availability |
| Coupon in Booking Flow | Medium | Apply coupon codes during checkout |
| User Review Submission | Medium | Allow guests to submit reviews from their dashboard |
| Email Templates | Medium | Custom Blade email templates instead of MailMessage |
| API Documentation | Medium | Swagger/OpenAPI spec for REST API |
| Analytics Dashboard | Low | Revenue charts, booking trends, occupancy rates |
| Multi-language | Low | i18n support for frontend |
| Rate Limiting | Low | Throttle API endpoints |
| Custom Error Pages | Low | Branded 403/404/500 pages |
| Export Data | Low | CSV/PDF export for bookings, payments, reports |
| Room Availability Status | Low | Auto-update room status based on bookings |
