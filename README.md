# Hotel Booking System

A full-featured Hotel Booking System with Admin Dashboard, REST API, multi-channel notifications, and social authentication built with Laravel, Inertia.js, React, and shadcn/ui.

## Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 18 + Inertia.js
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Auth (Web):** Laravel Breeze (session-based)
- **Auth (API):** Laravel Sanctum (token-based)
- **Social Auth:** Laravel Socialite (Google, Facebook)
- **Notifications:** Mail, Database, Telegram
- **Icons:** Lucide React
- **Build Tool:** Vite

## Features

- **Authentication** — Email/password registration and login, Google & Facebook OAuth, role-based access (guest/admin)
- **Hotel Management** — CRUD for hotels, room types, rooms, and amenities with image support
- **Booking System** — Date-based reservations with availability checking, overlap detection, and automatic price calculation
- **Payments** — Record payments (card, cash, PayPal) with transaction tracking; auto-confirms bookings on successful payment
- **Reviews & Ratings** — 1–5 star ratings tied to completed bookings (one review per booking)
- **Coupons** — Percentage-based discount codes with date ranges and usage limits
- **Notifications** — Queue-based multi-channel notifications (email, in-app, Telegram) for booking events and payments
- **Admin Dashboard** — Stats overview, recent bookings, system health metrics, and full CRUD for all resources
- **User Dashboard** — Booking stats, upcoming stays, recent bookings, featured hotels
- **REST API** — 23+ endpoints under `/api/v1/` with Sanctum auth for mobile/public clients
- **UUID Routing** — All models use UUID for route binding

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ & npm
- SQLite (default) or MySQL/PostgreSQL

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd HotelBooking

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# Run database migrations and seed sample data
php artisan migrate --seed
```

## Environment Configuration

Add the following to your `.env` file:

```env
# Admin
ADMIN_EMAIL=admin@yourhotel.com

# Mail (for email notifications)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@yourhotel.com
MAIL_FROM_NAME="Hotel Booking"

# Telegram Bot (for admin alerts)
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

# Queue (required for notifications)
QUEUE_CONNECTION=database
```

## Running the Application

```bash
# Development (runs Vite dev server + Laravel concurrently)
composer run dev

# Or run separately:
php artisan serve        # Backend at http://localhost:8000
npm run dev              # Vite dev server

# Process queued notifications
php artisan queue:work

# Production build
npm run build
```

## API Endpoints

All API routes are prefixed with `/api/v1/`.

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get Sanctum token |
| POST | `/auth/google` | Google OAuth token exchange |
| POST | `/auth/facebook` | Facebook OAuth token exchange |
| GET | `/hotels` | List hotels (filter by city, country, search) |
| GET | `/hotels/{id}` | Hotel details with room types |
| GET | `/hotels/{id}/room-types` | Room types for a hotel |
| GET | `/hotels/{id}/rooms` | Rooms for a hotel |
| GET | `/room-types/{id}` | Room type details |
| GET | `/rooms/{id}` | Room details |
| GET | `/amenities` | List amenities |

### Authenticated (Bearer token required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/logout` | Revoke token |
| GET | `/bookings` | List user's bookings |
| POST | `/bookings` | Create a booking |
| GET | `/bookings/{id}` | Booking details |
| PATCH | `/bookings/{id}/cancel` | Cancel a pending booking |
| POST | `/payments` | Record a payment |
| GET | `/payments/{id}` | Payment details |
| GET | `/profile` | Get user profile |
| PATCH | `/profile` | Update profile |
| PATCH | `/profile/set-password` | Set/change password |
| GET | `/reviews` | List user's reviews |
| POST | `/reviews` | Create a review |
| PATCH | `/reviews/{id}` | Update a review |
| DELETE | `/reviews/{id}` | Delete a review |
| POST | `/coupons/validate` | Validate a coupon code |
| GET | `/notifications` | List notifications |
| PATCH | `/notifications/{id}/read` | Mark notification as read |
| PATCH | `/notifications/read-all` | Mark all as read |

## Admin Panel

Access the admin dashboard at `/admin/dashboard` (requires a user with `role = admin`).

Admin features include full CRUD management for:

- Hotels, Room Types, Rooms
- Bookings (with status workflow: pending → confirmed → completed/cancelled)
- Payments (record and update payment status)
- Users
- Amenities
- Reviews
- Coupons
- Settings (Telegram bot configuration)

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | User accounts with OAuth fields and role |
| `hotels` | Hotel records with images (JSON) |
| `room_types` | Room categories with pricing |
| `rooms` | Individual rooms with status tracking |
| `bookings` | Reservations with date ranges and pricing |
| `payments` | Payment records with transaction IDs |
| `reviews` | Guest ratings and comments |
| `amenities` | Hotel amenities/features |
| `hotel_amenities` | Hotel–amenity pivot table |
| `coupons` | Discount codes with validity periods |
| `settings` | Key-value app settings |
| `notifications` | Laravel database notifications |
| `personal_access_tokens` | Sanctum API tokens |

## Project Structure

```
app/
├── Http/
│   ├── Controllers/         # Web controllers (admin CRUD, auth, dashboard)
│   │   └── Api/             # API controllers (REST endpoints)
│   └── Middleware/           # AdminMiddleware, HandleInertiaRequests
├── Models/                  # Eloquent models with UUID trait
├── Notifications/           # Multi-channel notification classes
└── Traits/                  # HasUuid trait

resources/js/
├── Components/              # Reusable UI components (shadcn/ui)
├── Layouts/                 # AdminLayout, AuthenticatedLayout, GuestLayout
└── Pages/
    ├── Admin/               # Admin CRUD pages (Hotels, Rooms, Bookings, etc.)
    ├── Auth/                # Login, Register, Password Reset
    ├── Profile/             # User profile management
    └── Dashboard.jsx        # User dashboard

routes/
├── web.php                  # Web routes (admin, auth, dashboard)
└── api.php                  # API v1 routes
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
