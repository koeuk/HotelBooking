# Hotel Booking System

A full-featured hotel booking and management platform built with **Laravel 12** and **React 18**, using Inertia.js for seamless server-driven SPA behavior.

---

## Purpose

This application provides a complete hotel reservation system where:

- **Guests** can browse hotels, search by city/country, check room availability, make bookings, process payments, leave reviews, and manage their profiles.
- **Admins** can manage hotels, rooms, bookings, payments, users, coupons, and view analytics dashboards with exportable reports (PDF/Excel).

---

## Tech Stack

| Layer       | Technology                                              |
| ----------- | ------------------------------------------------------- |
| Backend     | Laravel 12 (PHP 8.2+), Inertia.js                      |
| Frontend    | React 18, Tailwind CSS, shadcn/ui (Radix UI)           |
| Auth        | Laravel Sanctum (API tokens), Breeze (sessions)         |
| Social Auth | Google & Facebook OAuth via Laravel Socialite            |
| Database    | SQLite (dev) / MySQL / PostgreSQL                       |
| Build       | Vite with Laravel Vite Plugin, SSR support              |
| Maps        | Leaflet + OpenStreetMap                                 |
| Charts      | Recharts                                                |
| Exports     | jsPDF (PDF), SheetJS (Excel)                            |
| Notifications | Email, Database (in-app), Telegram                    |
| Queue       | Database-driven async jobs                              |

---

## Features

### Guest / User Side

- **Hotel Browsing** - Search and filter hotels by city, country, or keyword
- **Room Availability** - Real-time overlap detection for check-in/check-out dates
- **Booking Workflow** - Create reservations with auto-calculated pricing based on room type and nights
- **Payment Processing** - Support for Card, Cash, and PayPal methods with transaction tracking
- **Coupon / Promotions** - Apply discount codes with percentage-based savings and date validity
- **Reviews & Ratings** - Rate hotels 1-5 stars after a completed booking
- **Favorites** - Bookmark hotels for later
- **User Dashboard** - View booking stats, upcoming stays, and notification center
- **Profile Management** - Update name, phone, avatar; set password for social-auth users
- **Social Login** - Sign in with Google or Facebook
- **Dark Mode** - Persistent theme toggle

### Admin Dashboard

- **Hotel Management** - Full CRUD for hotels with image uploads, amenities, and map coordinates
- **Room & Room Type Management** - Define room types with pricing; manage individual rooms with status (available/booked/maintenance)
- **Booking Management** - Status workflow: pending -> confirmed -> completed / cancelled
- **Payment Management** - Track payments, statuses, and transaction IDs
- **User Management** - Role assignment (user/admin), avatar management
- **Amenity Management** - Define amenities (WiFi, Pool, Gym, etc.)
- **Review Moderation** - View and manage user reviews
- **Coupon Management** - Create/edit discount codes with usage limits and validity periods
- **Notification Management** - In-app, email, and Telegram alerts for booking events
- **Analytics & Reports** - Weekly/monthly/yearly breakdowns for revenue, bookings, users, reviews, and hotel performance with PDF and Excel export
- **Settings** - Profile, security, Telegram integration, account deletion

### REST API (v1)

34 endpoints under `/api/v1/` covering:

- Authentication (register, login, logout, social OAuth)
- Hotels, Room Types, Rooms, Amenities (public read)
- Bookings (create, list, cancel)
- Payments (process, view)
- Reviews (CRUD)
- Coupon validation
- Notifications (list, mark read)
- Profile (view, update, set password)

---

## Database Schema

| Table            | Description                                       |
| ---------------- | ------------------------------------------------- |
| `users`          | UUID-based users with roles, OAuth IDs, avatar    |
| `hotels`         | Hotels with location (lat/lng), images (JSON), rating |
| `room_types`     | Room categories with pricing per night            |
| `rooms`          | Individual rooms with floor, number, status       |
| `bookings`       | Reservations linking users to rooms with dates    |
| `payments`       | Payment records with method, status, transaction  |
| `reviews`        | User ratings and comments per hotel/booking       |
| `amenities`      | Hotel amenities (WiFi, Pool, etc.)                |
| `hotel_amenities`| Many-to-many pivot for hotels and amenities       |
| `coupons`        | Discount codes with validity and usage tracking   |
| `settings`       | Key-value application settings                    |
| `notifications`  | Laravel polymorphic notification storage          |

All primary models use **UUID** for routing via a shared `HasUuid` trait.

---

## Project Structure

```
app/
├── Http/Controllers/         # Web controllers
│   ├── Api/                  # REST API controllers (13 files)
│   └── Auth/                 # Authentication controllers
├── Models/                   # Eloquent models with UUID
├── Notifications/            # Multi-channel notification classes
└── Traits/                   # HasUuid trait

routes/
├── web.php                   # Public & user web routes
├── api.php                   # RESTful API v1 (34 endpoints)
├── auth.php                  # Auth routes (register, login, reset)
└── dashboard.php             # Admin dashboard routes

resources/js/
├── Pages/                    # React pages (11 directories)
│   ├── Auth/                 # Login, Register, Password reset
│   ├── Hotels/               # Hotel browsing & details
│   ├── Bookings/             # Booking list, create, details
│   ├── Dashboard/            # Admin dashboard (10+ sub-pages)
│   └── User/                 # User dashboard
├── Layouts/                  # AdminLayout, AuthenticatedLayout, AppLayout
├── components/               # Reusable components + shadcn/ui
└── lib/                      # Utilities (exportUtils, etc.)

database/migrations/          # 16 migration files
```

---

## Default Accounts

| Role  | Email             | Password   |
| ----- | ----------------- | ---------- |
| Admin | admin@gmail.com   | 12345678   |
| User  | koeuk@gmail.com   | 12345678   |

---

## Integrations

- **Google OAuth** - Social login via `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- **Facebook OAuth** - Social login via `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET`
- **Telegram Bot** - Admin alerts via `TELEGRAM_BOT_TOKEN` / `TELEGRAM_ADMIN_CHAT_ID`
- **SMTP Email** - Configurable mail driver for booking/payment notifications
- **OpenStreetMap** - Hotel location maps (no API key required)
