<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Booking;
use App\Models\Coupon;
use App\Models\Hotel;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::factory()->create([
            'name' => 'koeuk',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);

        // 2. Create Regular Test User
        User::factory()->create([
            'name' => 'Demo user',
            'email' => 'koeuk@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // 3. Create Amenities
        $amenities = collect([
            ['name' => 'WiFi', 'icon' => 'wifi'],
            ['name' => 'Pool', 'icon' => 'waves'],
            ['name' => 'Gym', 'icon' => 'dumbbell'],
            ['name' => 'Spa', 'icon' => 'sparkles'],
            ['name' => 'Restaurant', 'icon' => 'utensils'],
            ['name' => 'Parking', 'icon' => 'car'],
            ['name' => 'Air Conditioning', 'icon' => 'snowflake'],
            ['name' => 'Bar', 'icon' => 'wine'],
        ])->map(fn ($a) => Amenity::create($a));

        // 4. Create 3 Hotels
        $hotels = Hotel::factory(3)->create();

        foreach ($hotels as $hotel) {
            // Attach random amenities to each hotel
            $hotel->amenities()->attach(
                $amenities->random(rand(3, 6))->pluck('id')
            );

            // 5. Create 3 Room Types for each hotel
            $roomTypes = RoomType::factory(3)->create(['hotel_id' => $hotel->id]);

            foreach ($roomTypes as $type) {
                // 5. Create 5 Rooms for each room type
                Room::factory(5)->create([
                    'hotel_id' => $hotel->id,
                    'room_type_id' => $type->id,
                ]);
            }
        }

        // 6. Create 10 Bookings with Users and Payments
        $rooms = Room::all();
        $users = User::factory(10)->create(['role' => 'user']);

        foreach ($users as $user) {
            $room = $rooms->random();
            
            $booking = Booking::factory()->create([
                'user_id' => $user->id,
                'room_id' => $room->id,
                'total_price' => $room->roomType->price_per_night * 2, // 2 nights
            ]);

            Payment::factory()->create([
                'booking_id' => $booking->id,
                'amount' => $booking->total_price,
            ]);

            // Create a review for some bookings
            if (rand(0, 1)) {
                Review::create([
                    'user_id' => $user->id,
                    'hotel_id' => $room->hotel_id,
                    'booking_id' => $booking->id,
                    'rating' => rand(3, 5),
                    'comment' => fake()->sentence(rand(5, 15)),
                ]);
            }
        }

        // 8. Create Coupons
        Coupon::create([
            'code' => 'WELCOME10',
            'discount_percent' => 10,
            'valid_from' => now(),
            'valid_until' => now()->addMonths(3),
            'max_uses' => 100,
        ]);

        Coupon::create([
            'code' => 'SUMMER25',
            'discount_percent' => 25,
            'valid_from' => now(),
            'valid_until' => now()->addMonths(6),
            'max_uses' => 50,
        ]);

        Coupon::create([
            'code' => 'VIP50',
            'discount_percent' => 50,
            'valid_from' => now(),
            'valid_until' => now()->addYear(),
            'max_uses' => 10,
        ]);
    }
}
