<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
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
            'email' => 'admin@yourhotel.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);

        // 2. Create Regular Test User
        User::factory()->create([
            'name' => 'Demo Guest',
            'email' => 'guest@example.com',
            'password' => Hash::make('password'),
            'role' => 'guest',
        ]);

        // 3. Create 3 Hotels
        $hotels = Hotel::factory(3)->create();

        foreach ($hotels as $hotel) {
            // 4. Create 3 Room Types for each hotel
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
        $guests = User::factory(10)->create(['role' => 'guest']);

        foreach ($guests as $guest) {
            $room = $rooms->random();
            
            $booking = Booking::factory()->create([
                'user_id' => $guest->id,
                'room_id' => $room->id,
                'total_price' => $room->roomType->price_per_night * 2, // 2 nights
            ]);

            Payment::factory()->create([
                'booking_id' => $booking->id,
                'amount' => $booking->total_price,
            ]);
        }
    }
}
