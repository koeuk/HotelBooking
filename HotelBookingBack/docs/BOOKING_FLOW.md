Build a Hotel Booking System with Admin Dashboard, REST API, Notifications, and Social Authentication using Laravel, Inertia.js, React, and shadcn/ui.

---

## STACK

- Backend: Laravel
- Frontend: React (via Inertia.js)
- Styling: Tailwind CSS + shadcn/ui
- Auth Web: Laravel Breeze (React)
- Auth API: Laravel Sanctum
- Social Auth: Laravel Socialite
- Notifications: Laravel Notifications + Telegram Bot
- UI Components: shadcn/ui

---

## INSTALL DEPENDENCIES

### Backend

composer require laravel/breeze
php artisan breeze:install react --ssr
composer require laravel/sanctum
composer require laravel/socialite
composer require laravel-notification-channels/telegram
php artisan migrate

### Frontend

npm install
npx shadcn@latest init

### shadcn/ui Components to Install

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

## ENVIRONMENT VARIABLES (.env)

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

## config/services.php

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

## DATABASE MIGRATIONS

### 1. users

Schema::create('users', function (Blueprint $table) {
$table->id();
$table->string('name');
$table->string('email')->unique();
$table->string('password')->nullable();
$table->string('phone')->nullable();
$table->enum('role', ['user', 'admin'])->default('user');
$table->string('google_id')->nullable()->unique();
$table->string('facebook_id')->nullable()->unique();
$table->string('avatar')->nullable();
$table->timestamps();
});

### 2. hotels

Schema::create('hotels', function (Blueprint $table) {
$table->id();
$table->string('name');
$table->text('description')->nullable();
$table->string('address')->nullable();
$table->string('city');
$table->string('country');
$table->decimal('rating', 2, 1)->default(0);
$table->json('images')->nullable();
$table->timestamps();
});

### 3. room_types

Schema::create('room_types', function (Blueprint $table) {
$table->id();
$table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
$table->string('name');
$table->text('description')->nullable();
$table->integer('max_users')->default(1);
$table->decimal('price_per_night', 10, 2);
$table->json('images')->nullable();
$table->timestamps();
});

### 4. rooms

Schema::create('rooms', function (Blueprint $table) {
$table->id();
$table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
$table->foreignId('room_type_id')->constrained()->cascadeOnDelete();
$table->string('room_number');
$table->integer('floor')->nullable();
$table->enum('status', ['available', 'booked', 'maintenance'])->default('available');
$table->timestamps();
});

### 5. bookings

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

### 6. payments

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

### 7. Queue + Notifications

php artisan notifications:table
php artisan queue:table
php artisan migrate

---

## MODELS & RELATIONSHIPS

### User.php

protected $fillable = [
'name', 'email', 'password', 'phone', 'role',
'google_id', 'facebook_id', 'avatar'
];
use Notifiable trait

- hasMany Bookings

### Hotel.php

protected $fillable = ['name', 'description', 'address', 'city', 'country', 'rating', 'images'];
protected $casts = ['images' => 'array'];

- hasMany RoomTypes
- hasMany Rooms

### RoomType.php

protected $fillable = ['hotel_id', 'name', 'description', 'max_users', 'price_per_night', 'images'];
protected $casts = ['images' => 'array'];

- belongsTo Hotel
- hasMany Rooms

### Room.php

protected $fillable = ['hotel_id', 'room_type_id', 'room_number', 'floor', 'status'];

- belongsTo Hotel
- belongsTo RoomType
- hasMany Bookings

### Booking.php

protected $fillable = ['user_id', 'room_id', 'check_in_date', 'check_out_date', 'total_price', 'status'];

- belongsTo User
- belongsTo Room
- hasOne Payment

### Payment.php

protected $fillable = ['booking_id', 'amount', 'method', 'status', 'transaction_id', 'paid_at'];

- belongsTo Booking

---

## MIDDLEWARE

### AdminMiddleware.php

public function handle(Request $request, Closure $next) {
    if (auth()->user()->role !== 'admin') {
        abort(403);
    }
    return $next($request);
}
Register alias 'admin' in bootstrap/app.php

---

## ROUTES

### routes/web.php

// Social Auth
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
Route::get('/auth/facebook', [SocialAuthController::class, 'redirectToFacebook'])->name('auth.facebook');
Route::get('/auth/facebook/callback', [SocialAuthController::class, 'handleFacebookCallback']);

// Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::resource('hotels', HotelController::class);
Route::resource('room-types', RoomTypeController::class);
Route::resource('rooms', RoomController::class);
Route::resource('bookings', BookingController::class);
Route::resource('payments', PaymentController::class);
Route::resource('users', UserController::class);
});

### routes/api.php

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
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    });

});

---

## WEB CONTROLLERS

### SocialAuthController.php

- handleGoogleCallback(): find user by email → link google_id or create new → Auth::login → redirect by role
- handleFacebookCallback(): same as Google but check for missing email first
- Redirect admin → /admin/dashboard, user → /

### DashboardController.php

public function index() {
return Inertia::render('Admin/Dashboard', [
'stats' => [
'total_hotels' => Hotel::count(),
'total_rooms' => Room::count(),
'total_bookings' => Booking::count(),
'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
'pending_bookings' => Booking::where('status', 'pending')->count(),
],
'recent_bookings' => Booking::with('user', 'room.hotel')->latest()->take(5)->get(),
]);
}

### HotelController.php — full CRUD, Inertia responses

### RoomTypeController.php — full CRUD, Inertia responses

### RoomController.php — full CRUD, Inertia responses

### BookingController.php

- index(): paginated + filter by status
- show(): detail with room, user, payment
- update(): status only → if confirmed or cancelled → notify user

### PaymentController.php — index, show

### UserController.php — index, show, update role only

---

## API CONTROLLERS

### AuthController.php

- register() → create user (role=user) → return token + UserResource
- login() → return token + UserResource
- logout() → revoke token

### SocialAuthApiController.php (mobile)

- loginWithGoogle(): stateless → userFromToken → find or create user → return Sanctum token
- loginWithFacebook(): same pattern with facebook driver

### BookingApiController.php

- store(): check availability → calculate total_price → create booking → notify admin
- cancel(): set cancelled if pending

### NotificationController.php

- index(): unread notifications (take 10) + unread_count
- markAsRead(): single notification
- markAllAsRead(): all unread

### ProfileApiController.php

- setPassword(): only if password is null (social account)

---

## API RESOURCES

- UserResource: id, name, email, phone, role, avatar
- HotelResource: id, name, description, address, city, country, rating, images
- RoomTypeResource: id, hotel (name), name, description, max_users, price_per_night, images
- RoomResource: id, hotel, room_type, room_number, floor, status
- BookingResource: id, user, room (with hotel), check_in_date, check_out_date, total_price, status, payment
- PaymentResource: id, booking_id, amount, method, status, transaction_id, paid_at

---

## API RESPONSE FORMAT

Success: { "success": true, "message": "...", "data": { ... } }
Paginated: { "success": true, "data": [...], "meta": { "current_page": 1, "last_page": 5, "per_page": 15, "total": 75 } }
Error: { "success": false, "message": "...", "errors": { ... } }

---

## NOTIFICATIONS

### BookingCreatedAdminNotification.php

- implements ShouldQueue
- via: ['mail', 'database', TelegramChannel::class]
- Email to admin: user info, room, hotel, dates, price, link to admin panel
- Telegram: emoji-rich message with booking summary and admin URL
- Database: { type, title, message, booking_id, url }

### BookingStatusUpdatedUserNotification.php

- implements ShouldQueue
- via: ['mail', 'database']
- If confirmed: green email "Booking Confirmed ✅"
- If cancelled: red email "Booking Cancelled ❌"
- Database: { type, title, message, booking_id }

### Triggers

After booking created:
$admin = User::where('role', 'admin')->first();
$admin->notify(new BookingCreatedAdminNotification($booking->load('user', 'room.hotel', 'room.roomType')));

After status updated:
if (in_array($status, ['confirmed', 'cancelled'])) {
    $booking->user->notify(new BookingStatusUpdatedUserNotification($booking, $status));
}

---

## EMAIL BLADE TEMPLATES

### emails/booking-created.blade.php

- Responsive HTML, hotel name header, user details, booking details, CTA button

### emails/booking-status-updated.blade.php

- Responsive HTML
- confirmed → green header, booking details, "View Booking" CTA
- cancelled → red header, booking details, "Book Again" CTA

---

## REACT FILE STRUCTURE

resources/js/
├── Components/
│ ├── ui/ # shadcn/ui auto-generated components
│ ├── NotificationBell.jsx
│ ├── StatusBadge.jsx
│ └── DataTable.jsx
├── Layouts/
│ └── AdminLayout.jsx
└── Pages/
├── Auth/
│ ├── Login.jsx
│ └── Register.jsx
└── Admin/
├── Dashboard.jsx
├── Hotels/
│ ├── Index.jsx
│ ├── Create.jsx
│ └── Edit.jsx
├── RoomTypes/
│ ├── Index.jsx
│ ├── Create.jsx
│ └── Edit.jsx
├── Rooms/
│ ├── Index.jsx
│ ├── Create.jsx
│ └── Edit.jsx
├── Bookings/
│ ├── Index.jsx
│ └── Show.jsx
├── Payments/
│ └── Index.jsx
└── Users/
└── Index.jsx

---

## SHADCN/UI USAGE GUIDE PER PAGE

### AdminLayout.jsx

- Use <Sheet> for mobile sidebar drawer
- Use <Separator> for sidebar dividers
- Use <Avatar> for user profile image in topbar
- Use <DropdownMenu> for user menu (profile, logout)
- Use <Tooltip> for sidebar icon tooltips (collapsed mode)
- Use <ScrollArea> for sidebar nav scroll

### Dashboard.jsx

- Use <Card>, <CardHeader>, <CardContent> for stats cards
- Use <Table>, <TableHeader>, <TableBody>, <TableRow>, <TableCell> for recent bookings
- Use <Badge> for booking status
- Use <Skeleton> for loading states
- Use <Tabs> to switch between overview and recent activity

### Hotels/Index.jsx, Rooms/Index.jsx, etc. (all index pages)

- Use <Table>, <TableHeader>, <TableBody>, <TableRow>, <TableCell>, <TableHead>
- Use <Button variant="outline"> for edit action
- Use <Button variant="destructive"> for delete action
- Use <Dialog> + <DialogContent> for delete confirmation modal
- Use <Badge> for status column
- Use <Input> for search/filter bar
- Use <Select> for filter by status dropdown
- Use <Skeleton> for loading rows

### Hotels/Create.jsx, Hotels/Edit.jsx (all forms)

- Use <Card>, <CardHeader>, <CardContent> to wrap form sections
- Use <Label> + <Input> for text fields
- Use <Label> + <Textarea> for description fields
- Use <Label> + <Select>, <SelectTrigger>, <SelectContent>, <SelectItem> for dropdowns
- Use <Button type="submit"> for submit
- Use <Button variant="outline"> for cancel/back
- Use <Alert variant="destructive"> to show validation errors
- Use <Separator> between form sections

### Bookings/Show.jsx

- Use <Card> sections for booking info, user info, room info, payment info
- Use <Badge> for status display
- Use <Select> for status update dropdown
- Use <Button> to confirm status change
- Use <Dialog> for confirmation before status change
- Use <Alert> for success/error feedback

### Payments/Index.jsx

- Use <Table> for payment list
- Use <Badge> for payment status
- Use <Tabs> to filter by status (all, paid, pending, failed)

### Users/Index.jsx

- Use <Table> for user list
- Use <Avatar> for user profile image
- Use <Badge> for role (admin=blue, user=gray)
- Use <Select> for inline role change

### Login.jsx & Register.jsx

- Use <Card>, <CardHeader>, <CardContent> to wrap form
- Use <Label> + <Input> for all fields
- Use <Button> for submit
- Use <Separator> with "Or continue with" text between form and social buttons
- Use <Button variant="outline"> for Google login button
- Use <Button> with Facebook blue color for Facebook login button
- Use <Alert variant="destructive"> for error messages

### NotificationBell.jsx

- Use <Popover>, <PopoverTrigger>, <PopoverContent> for notification dropdown
- Use <ScrollArea> for notification list
- Use <Badge> for unread count on bell icon
- Use <Separator> between notifications
- Use <Button variant="ghost"> for "Mark all as read"

### StatusBadge.jsx (reusable component)

Create a reusable StatusBadge using shadcn <Badge>:

- pending → <Badge variant="outline" className="text-yellow-600 border-yellow-400">
- confirmed → <Badge className="bg-green-500">
- cancelled → <Badge variant="destructive">
- completed → <Badge className="bg-blue-500">
- available → <Badge className="bg-green-500">
- booked → <Badge variant="destructive">
- maintenance → <Badge variant="secondary">

---

## ADMINLAYOUT.JSX FULL REQUIREMENTS

- Desktop: fixed sidebar (w-64) with nav links
- Mobile: <Sheet> sliding drawer sidebar
- Sidebar links: Dashboard, Hotels, Room Types, Rooms, Bookings, Payments, Users
- Active link highlight using Inertia usePage().url
- Topbar: NotificationBell + <Avatar> + <DropdownMenu> (profile, logout)
- Wrap page content in <ScrollArea>
- Use <Separator> between sidebar sections

---

## NOTIFICATIONBELL.JSX FULL REQUIREMENTS

- <Popover> trigger: bell icon with <Badge> for unread count
- Fetch GET /api/v1/notifications on mount + every 30 seconds
- <ScrollArea> list of latest 10 notifications
- Each item: title, message, time ago (use date-fns or dayjs)
- Unread items: highlighted background
- onClick: mark as read → redirect to booking URL
- Footer: <Button variant="ghost"> "Mark all as read"

---

## TOAST NOTIFICATIONS (shadcn Toaster)

Add <Toaster> in AdminLayout.jsx
Use toast() from shadcn for:

- Success: toast({ title: "Success", description: "Hotel created successfully." })
- Error: toast({ variant: "destructive", title: "Error", description: "Something went wrong." })
- Use on all CRUD actions, status updates, role changes

---

## GENERAL REQUIREMENTS

### Backend

- All notifications implement ShouldQueue
- QUEUE_CONNECTION=database
- All API responses use consistent JSON format
- All requests validated via Form Request classes
- All foreign keys use cascadeOnDelete()
- Admin routes protected by ['auth', 'admin']
- API routes protected by auth:sanctum
- Telegram failures wrapped in try/catch (do not break booking flow)
- Admin email from config('app.admin_email') via env ADMIN_EMAIL

### Frontend

- Use shadcn/ui components throughout — no plain HTML buttons, inputs, or tables
- All forms use useForm() from @inertiajs/react
- All navigation uses Link from @inertiajs/react
- Use toast() for all success/error feedback (replace flash messages)
- Pagination on all index pages using shadcn Button for prev/next
- Currency formatted as USD
- Timestamps in notifications shown as "time ago" using dayjs
- All tables show <Skeleton> rows while loading
- Confirm destructive actions with <Dialog> before proceeding
- Responsive layout: sidebar collapses to <Sheet> on mobile
