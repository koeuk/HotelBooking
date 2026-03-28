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

        // 4. Create 14 Hotels in Cambodia
        $cambodiaHotels = [
            ['name' => 'Sokha Phnom Penh Hotel', 'city' => 'Phnom Penh', 'address' => 'Sokha Hotel, Chroy Changvar, Phnom Penh', 'latitude' => 11.5756, 'longitude' => 104.9285],
            ['name' => 'Raffles Hotel Le Royal', 'city' => 'Phnom Penh', 'address' => '92 Rukhak Vithei Daun Penh, Phnom Penh', 'latitude' => 11.5731, 'longitude' => 104.9228],
            ['name' => 'The Plantation Urban Resort', 'city' => 'Phnom Penh', 'address' => '28 Street 184, Phnom Penh', 'latitude' => 11.5623, 'longitude' => 104.9275],
            ['name' => 'Rosewood Phnom Penh', 'city' => 'Phnom Penh', 'address' => 'Vattanac Capital Tower, Phnom Penh', 'latitude' => 11.5565, 'longitude' => 104.9283],
            ['name' => 'Sofitel Angkor Phokeethra', 'city' => 'Siem Reap', 'address' => 'Vithei Charles de Gaulle, Siem Reap', 'latitude' => 13.3540, 'longitude' => 103.8560],
            ['name' => 'Park Hyatt Siem Reap', 'city' => 'Siem Reap', 'address' => 'Sivutha Boulevard, Siem Reap', 'latitude' => 13.3533, 'longitude' => 103.8580],
            ['name' => 'Shinta Mani Angkor', 'city' => 'Siem Reap', 'address' => 'Junction of Street 14 & Oum Khun, Siem Reap', 'latitude' => 13.3560, 'longitude' => 103.8555],
            ['name' => 'Viroth\'s Hotel', 'city' => 'Siem Reap', 'address' => 'Street 23, Wat Bo Village, Siem Reap', 'latitude' => 13.3510, 'longitude' => 103.8640],
            ['name' => 'Song Saa Private Island', 'city' => 'Sihanoukville', 'address' => 'Koh Rong Archipelago, Sihanoukville', 'latitude' => 10.7588, 'longitude' => 103.2783],
            ['name' => 'The Royal Sands Koh Rong', 'city' => 'Sihanoukville', 'address' => 'Koh Rong Island, Sihanoukville', 'latitude' => 10.7275, 'longitude' => 103.2400],
            ['name' => 'Alila Villas Koh Russey', 'city' => 'Sihanoukville', 'address' => 'Koh Russey Island, Sihanoukville', 'latitude' => 10.6140, 'longitude' => 103.5210],
            ['name' => 'Knai Bang Chatt', 'city' => 'Kep', 'address' => 'Phum Prey Thom, Kep', 'latitude' => 10.4833, 'longitude' => 104.3000],
            ['name' => 'Six Senses Krabey Island', 'city' => 'Sihanoukville', 'address' => 'Krabey Island, Ream, Sihanoukville', 'latitude' => 10.5440, 'longitude' => 103.5630],
            ['name' => 'Jaya House River Park', 'city' => 'Siem Reap', 'address' => 'River Road, Siem Reap', 'latitude' => 13.3640, 'longitude' => 103.8590],
        ];

        $hotelImages = [
            ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1000'],
            ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000'],
            ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000'],
            ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000'],
            ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1000', 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=1000'],
        ];

        $hotels = collect($cambodiaHotels)->map(function ($data, $index) use ($hotelImages) {
            return Hotel::create([
                'name' => $data['name'],
                'description' => fake()->paragraph(3),
                'address' => $data['address'],
                'city' => $data['city'],
                'country' => 'Cambodia',
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'rating' => fake()->randomFloat(1, 3.5, 5),
                'images' => $hotelImages[$index % count($hotelImages)],
            ]);
        });

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
