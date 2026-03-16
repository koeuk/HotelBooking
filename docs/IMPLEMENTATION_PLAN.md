# Hotel Booking System - Comprehensive Implementation Plan

## Project Overview & Technical Specification

(Copied from BOOKING_FLOW.md)

Build a Hotel Booking System with Admin Dashboard, REST API, Notifications, and Social Authentication using Laravel, Inertia.js, React, and shadcn/ui.

---

### STACK

- Backend: Laravel
- Frontend: React (via Inertia.js)
- Styling: Tailwind CSS + shadcn/ui
- Auth Web: Laravel Breeze (React)
- Auth API: Laravel Sanctum
- Social Auth: Laravel Socialite
- Notifications: Laravel Notifications + Telegram Bot
- UI Components: shadcn/ui

---

### INSTALL DEPENDENCIES

#### Backend

composer require laravel/breeze
php artisan breeze:install react --ssr
composer require laravel/sanctum
composer require laravel/socialite
composer require laravel-notification-channels/telegram
php artisan migrate

#### Frontend

npm install
npx shadcn@latest init

#### shadcn/ui Components to Install

npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add skeleton
npx shadcn@latest add toast
npx shadcn@latest add tooltip
npx shadcn@latest add alert
npx shadcn@latest add popover
npx shadcn@latest add scroll-area
npx shadcn@latest add tabs

---

### ENVIRONMENT VARIABLES (.env)

# App

ADMIN_EMAIL=admin@yourhotel.com

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

# Google

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URL=https://yourdomain.com/auth/google/callback

# Facebook

FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_REDIRECT_URL=https://yourdomain.com/auth/facebook/callback

# Queue

QUEUE_CONNECTION=database

---

### config/services.php

'google' => [
'client_id' => env('GOOGLE_CLIENT_ID'),
'client_secret' => env('GOOGLE_CLIENT_SECRET'),
'redirect' => env('GOOGLE_REDIRECT_URL'),
],
'facebook' => [
'client_id' => env('FACEBOOK_CLIENT_ID'),
'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
'redirect' => env('FACEBOOK_REDIRECT_URL'),
],
'telegram-bot-api' => [
'token' => env('TELEGRAM_BOT_TOKEN'),
],

---

### DATABASE MIGRATIONS

#### 1. users

Schema::create('users', function (Blueprint $table) {
$table->id();
$table->string('name');
$table->string('email')->unique();
$table->string('password')->nullable();
$table->string('phone')->nullable();
$table->enum('role', ['guest', 'admin'])->default('guest');
$table->string('google_id')->nullable()->unique();
$table->string('facebook_id')->nullable()->unique();
$table->string('avatar')->nullable();
$table->timestamps();
});

#### 2. hotels

Schema::create('hotels', function (Blueprint $table) {
$table->id();
$table->string('name');
$table->text('description')->nullable();
$table->string('address')->nullable();
$table->string('city');
$table->string('country');
$table->decimal('latitude', 10, 7)->nullable();
$table->decimal('longitude', 10, 7)->nullable();
$table->decimal('rating', 2, 1)->default(0);
$table->json('images')->nullable();
$table->timestamps();
});

#### 3. room_types

Schema::create('room_types', function (Blueprint $table) {
$table->id();
$table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
$table->string('name');
$table->text('description')->nullable();
$table->integer('max_guests')->default(1);
$table->decimal('price_per_night', 10, 2);
$table->json('images')->nullable();
$table->timestamps();
});

#### 4. rooms

Schema::create('rooms', function (Blueprint $table) {
$table->id();
$table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
$table->foreignId('room_type_id')->constrained()->cascadeOnDelete();
$table->string('room_number');
$table->integer('floor')->nullable();
$table->enum('status', ['available', 'booked', 'maintenance'])->default('available');
$table->timestamps();
});

#### 5. bookings

Schema::create('bookings', function (Blueprint $table) {
$table->id();
$table->foreignId('user_id')->constrained()->cascadeOnDelete();
$table->foreignId('room_id')->constrained()->cascadeOnDelete();
$table->date('check_in_date');
$table->date('check_out_date');
$table->decimal('total_price', 10, 2);
$table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
$table->timestamps();
});

#### 6. payments

Schema::create('payments', function (Blueprint $table) {
$table->id();
$table->foreignId('booking_id')->constrained()->cascadeOnDelete();
$table->decimal('amount', 10, 2);
$table->enum('method', ['card', 'cash', 'paypal'])->default('card');
$table->enum('status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
$table->string('transaction_id')->nullable();
$table->timestamp('paid_at')->nullable();
$table->timestamps();
});

---

### MODELS & RELATIONSHIPS

(Refer to BOOKING_FLOW.md for full model definitions)

---

## Implementation Phases

### Phase 1: Project Initialization & Base Setup ✅ DONE

1.  **Initialize Laravel**: Install Laravel in the current directory. (DONE)
2.  **Auth & Frontend Setup**:
    - Install `laravel/breeze` with React and Inertia.js (SSR enabled). (DONE)
    - Initialize `shadcn/ui` and install all required components listed above. (DONE)
3.  **Dependency Installation**:
    - Install `laravel/socialite` for Google and Facebook login. (DONE)
    - Install `laravel-notification-channels/telegram` for admin alerts. (DONE)
    - Install `laravel/sanctum` for API authentication. (DONE)
4.  **Environment Configuration**:
    - Configure `.env` with Database, Mail, Telegram, and Social Auth credentials. (DONE)

### Phase 2: Database Layer & Models ✅ DONE

1.  **Migrations**: Create migrations for `users`, `hotels`, `room_types`, `rooms`, `bookings`, and `payments`. (DONE)
2.  **Models & Relationships**:
    - Implement Eloquent models with fillable properties and relationships. (DONE)
    - Add the `Notifiable` trait to the `User` model. (DONE)
3.  **Database Seeding**: Create seeders for initial hotel and room data for development. (DONE)

### Phase 3: Authentication & Authorization ✅ DONE

1.  **Web Authenticaion**: Standard Breeze setup for login/register. (DONE)
2.  **Social Auth (Socialite)**:
    - Implement `SocialAuthController` for Google and Facebook flow. (DONE)
3.  **Admin Protection**:
    - Create `AdminMiddleware` and register it in `bootstrap/app.php`. (DONE)

### Phase 4: Admin Dashboard & Core CRUD (Web) ✅ DONE

1.  **Layout**: Build `AdminLayout.jsx` with a responsive sidebar using shadcn's `<Sheet>`. (DONE)
2.  **Dashboard**: Implement `DashboardController` with stats using shadcn `<Card>`. (DONE)
3.  **CRUD Implementation**: Hotels, Room Types, Rooms, Bookings, Payments, and Users management pages using shadcn `<Table>`. (DONE)

### Phase 5: Booking Logic & Notifications ✅ DONE

1.  **Notification System**:
    - Create `BookingNotification` class. (DONE)
    - Set up Mail, Database, and Telegram channels. (DONE)
2.  **Triggers**:
    - Trigger notifications on booking creation, status update (admin), and successful payment. (DONE)
3.  **Telegram Bot**:
    - Verify Telegram webhook and admin chat ID configuration. (DONE)
    - **UI**: Integrated `NotificationBell.jsx` into Layouts. (DONE)

### Phase 6: REST API (Mobile/Public) ✅ DONE

1.  **Endpoints**: Public listings and personal booking history. (DONE)
    - Created API Resources: UserResource, HotelResource, RoomTypeResource, RoomResource, BookingResource, PaymentResource
    - Created API Controllers: AuthController, SocialAuthApiController, HotelApiController, RoomTypeApiController, RoomApiController, BookingApiController, PaymentApiController, ProfileApiController, NotificationController
    - 23 API routes registered under `/api/v1/`
2.  **API Auth**: Implement Sanctum token authentication. (DONE)
    - Added HasApiTokens trait to User model
    - Published Sanctum config and migrations
    - Register/login endpoints return Sanctum tokens
    - Social auth API (Google/Facebook) via stateless token exchange
    - Protected routes use `auth:sanctum` middleware

### Phase 7: Payment & Quality of Life ✅ DONE

1.  **Payment Integration**: Record payments and unlock "Proceed to Payment" UI. (DONE)
    - Added `store` method to PaymentController for admin payment recording
    - Added "Proceed to Payment" dialog in Booking Show page with method selection
    - Payment API endpoint for mobile/public clients
    - Auto-confirms booking on successful payment
2.  **UI Refinement**: Toast notifications already in place via sonner. (DONE)
    - NotificationBell now fetches real notifications from `/api/v1/notifications`
    - Polling every 30 seconds for new notifications
    - Mark as read / Mark all as read functionality
    - Time ago display for notification timestamps
3.  **Queue**: `QUEUE_CONNECTION=database` already configured. Notifications table created. (DONE)

### Phase 8: Testing & Final Polish ✅ DONE

1.  **Validation**: All role-based access verified (admin middleware, Sanctum guards). (DONE)
2.  **Responsiveness**: Mobile and desktop layouts verified (AdminLayout with Sheet sidebar). (DONE)
3.  **Build**: Frontend builds successfully with no errors. (DONE)
