# Hotel Booking System

A full-featured Hotel Booking System with Admin Dashboard, REST API, reports, dark mode, multi-channel notifications, and social authentication built with Laravel, Inertia.js, React, and shadcn/ui.

## Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 18 + Inertia.js
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **Maps:** Leaflet + OpenStreetMap (free, no API key)
- **Auth (Web):** Laravel Breeze (session-based)
- **Auth (API):** Laravel Sanctum (token-based)
- **Social Auth:** Laravel Socialite (Google, Facebook)
- **Notifications:** Mail, Database, Telegram
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Export:** jsPDF + SheetJS (PDF/Excel reports)

## Features

- **Authentication** — Email/password login, Google & Facebook OAuth, role-based access (user/admin)
- **Hotel Management** — CRUD for hotels, room types, rooms, and amenities with image upload + URL support + map location (Leaflet)
- **Booking System** — Date-based reservations with availability checking, overlap detection, auto price calculation, hotel location map
- **Payments** — Record payments (card, cash, PayPal) with transaction tracking; auto-confirms bookings
- **Reviews & Ratings** — 1–5 star ratings tied to completed bookings (one review per booking)
- **Coupons** — Percentage-based discount codes with date ranges and usage limits
- **Notifications** — Queue-based multi-channel (email, in-app, Telegram) for booking events and payments
- **Admin Dashboard** — Stats cards, booking/revenue/user/review/hotel charts, status breakdowns, recent bookings
- **Reports** — Weekly/monthly/yearly analytics with charts + data tables, PDF & Excel export per section
- **User Dashboard** — Booking stats, upcoming stays, hotel browsing, favorites, reviews, notifications
- **Settings** — Unified settings page with profile, security, Telegram integration, danger zone (sidebar nav)
- **Dark Mode** — Full dark/light theme toggle with persistent preference
- **Avatar Upload** — Profile photo upload for users and admin user management
- **REST API** — 34 endpoints under `/api/v1/` with Sanctum auth for mobile/public clients
- **UUID Routing** — All models use UUID for route binding

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ & npm
- MySQL or SQLite

## Installation

```bash
git clone <repository-url>
cd HotelBooking

composer install
npm install

cp .env.example .env
php artisan key:generate
php artisan storage:link

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
# Development
composer run dev

# Or run separately:
php artisan serve        # Backend at http://localhost:8000
npm run dev              # Vite dev server

# Process queued notifications
php artisan queue:work

# Production build
npm run build
```

## Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | 12345678 |
| User | koeuk@gmail.com | 12345678 |

## API Documentation

Full API documentation with request/response examples is available in [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

See also:
- [API Implementation Plan](docs/API_IMPLEMENTATION_PLAN.md)
- [System Implementation Plan](docs/IMPLEMENTATION_PLAN.md)
- [Booking Flow](docs/BOOKING_FLOW.md)

**Quick overview — 34 endpoints under `/api/v1/`:**

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get Sanctum token |
| POST | `/auth/google` | Google OAuth token exchange |
| POST | `/auth/facebook` | Facebook OAuth token exchange |
| GET | `/hotels` | List hotels (filter by city, country, search) |
| GET | `/hotels/{id}` | Hotel details with room types |
| GET | `/hotels/{id}/room-types` | Room types for a hotel |
| GET | `/hotels/{id}/rooms` | Rooms for a hotel (filter by status, type) |
| GET | `/room-types/{id}` | Room type details |
| GET | `/rooms/{id}` | Room details |
| GET | `/amenities` | List all amenities |
| GET | `/amenities/{id}` | Amenity details with hotels |

### Authenticated Endpoints (Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/logout` | Revoke token |
| GET | `/bookings` | List user's bookings |
| POST | `/bookings` | Create a booking (with availability check) |
| GET | `/bookings/{id}` | Booking details |
| PATCH | `/bookings/{id}/cancel` | Cancel a pending booking |
| POST | `/payments` | Process payment (auto-confirms booking) |
| GET | `/payments/{id}` | Payment details |
| GET | `/profile` | Get user profile |
| PATCH | `/profile` | Update profile (name, phone) |
| PATCH | `/profile/set-password` | Set password (social auth users) |
| GET | `/reviews` | List reviews (filter by hotel_id) |
| GET | `/reviews/{id}` | Review details |
| POST | `/reviews` | Create a review |
| PATCH | `/reviews/{id}` | Update own review |
| DELETE | `/reviews/{id}` | Delete own review |
| POST | `/coupons/validate` | Validate a coupon code |
| GET | `/notifications` | List unread notifications |
| PATCH | `/notifications/{id}/read` | Mark notification as read |
| PATCH | `/notifications/read-all` | Mark all as read |

## Admin Panel

Access at `/admin/dashboard` (requires `role = admin`).

| Section | Features |
|---------|----------|
| **Dashboard** | Revenue/bookings/users/reviews/hotels charts, status breakdowns, recent bookings |
| **Hotels** | Full CRUD with image upload, show page with room types/amenities/reviews |
| **Room Types** | CRUD with hotel association and image upload |
| **Rooms** | CRUD with hotel/type association, status management |
| **Bookings** | CRUD with status workflow, payment recording, guest notifications |
| **Payments** | Full CRUD with inline status updates, transaction tracking |
| **Users** | CRUD with avatar upload, inline role switching (admin/user) |
| **Amenities** | CRUD with icon support |
| **Reviews** | CRUD with star ratings |
| **Coupons** | CRUD with validity dates and usage tracking |
| **Reports** | Weekly/monthly/yearly analytics, charts + data tables, PDF & Excel export |
| **Settings** | Profile, security (password), Telegram integration, danger zone (delete account) |

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | Accounts with OAuth fields, role (user/admin), avatar |
| `hotels` | Properties with images (JSON), rating, latitude/longitude |
| `room_types` | Room categories with pricing and images |
| `rooms` | Individual rooms with status tracking |
| `bookings` | Reservations with dates, pricing, status workflow |
| `payments` | Payment records with transaction IDs, method, status |
| `reviews` | Star ratings and comments (unique per booking) |
| `amenities` | Hotel features (WiFi, Pool, etc.) |
| `hotel_amenities` | Hotel-amenity pivot table |
| `coupons` | Discount codes with validity and usage limits |
| `settings` | Key-value app configuration |
| `notifications` | Laravel database notifications |
| `personal_access_tokens` | Sanctum API tokens |

## Project Structure

```
app/
├── Http/
│   ├── Controllers/           # Web controllers (admin CRUD, auth, dashboard, reports)
│   │   └── Api/               # REST API controllers (12 controllers, 34 methods)
│   ├── Middleware/             # AdminMiddleware, HandleInertiaRequests
│   ├── Requests/              # Form request validation
│   └── Resources/             # API resources (User, Hotel, Room, Booking, Payment, RoomType)
├── Models/                    # Eloquent models with UUID trait
├── Notifications/             # Multi-channel notification classes (4)
└── Traits/                    # HasUuid trait

resources/js/
├── components/                # Reusable: ImageUploader, FilterTabs, ThemeToggle, ThemeProvider, NotificationBell, HotelMap
├── components/ui/             # shadcn/ui components
├── lib/                       # Utilities: utils.js, exportUtils.js (PDF/Excel)
├── Layouts/                   # AdminLayout, AuthenticatedLayout, AppLayout, GuestLayout
└── Pages/
    ├── Admin/                 # Dashboard, Hotels, RoomTypes, Rooms, Bookings, Payments,
    │                          # Users, Amenities, Reviews, Coupons, Reports, Settings
    ├── Auth/                  # Login, Register, ForgotPassword, ResetPassword
    ├── Bookings/              # Guest booking list and details
    ├── Hotels/                # Guest hotel browsing and details
    ├── Favorites/             # Guest favorites
    ├── Reviews/               # Guest reviews
    ├── Notifications/         # Guest notification center
    ├── Profile/               # Profile management (with AppLayout auto-detection)
    └── Dashboard.jsx          # User dashboard

routes/
├── web.php                    # Web routes (admin, guest, auth)
└── api.php                    # API v1 routes (34 endpoints)
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
