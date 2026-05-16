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
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users
        User::create([
            'uuid'     => Str::uuid(),
            'name'     => 'Admin',
            'email'    => 'koeukkos@gmail.com',
            'password' => Hash::make('12345678'),
            'role'     => 'admin',
        ]);

        $demoUser = User::create([
            'uuid'     => Str::uuid(),
            'name'     => 'Demo User',
            'email'    => 'koeuk@gmail.com',
            'password' => Hash::make('12345678'),
            'role'     => 'user',
        ]);

        $extraUsers = User::factory(8)->create(['role' => 'user']);
        $allUsers = $extraUsers->prepend($demoUser);

        // 2. Hotel (single)
        Hotel::create([
            'uuid'            => Str::uuid(),
            'name'            => 'Grand Horizon Hotel',
            'slug'            => 'grand-horizon-hotel',
            'description'     => 'A premier luxury hotel offering world-class amenities, breathtaking views, and exceptional service in the heart of the city.',
            'address'         => '123 Monivong Boulevard',
            'city'            => 'Phnom Penh',
            'country'         => 'Cambodia',
            'zip_code'        => '12000',
            'phone'           => '+855 23 123 456',
            'email'           => 'info@grandhorizon.com',
            'website'         => 'https://grandhorizon.com',
            'latitude'        => 11.5564,
            'longitude'       => 104.9282,
            'star_rating'     => 5,
            'check_in_time'   => '14:00:00',
            'check_out_time'  => '12:00:00',
            'images'          => [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1200',
            ],
        ]);

        // 3. Amenities
        $amenityData = [
            ['name' => 'Free WiFi',         'icon' => 'wifi',           'category' => 'connectivity'],
            ['name' => 'Air Conditioning',  'icon' => 'snowflake',      'category' => 'comfort'],
            ['name' => 'Flat-screen TV',    'icon' => 'tv',             'category' => 'entertainment'],
            ['name' => 'Mini Bar',          'icon' => 'wine',           'category' => 'food'],
            ['name' => 'Room Service',      'icon' => 'concierge-bell', 'category' => 'service'],
            ['name' => 'Safe',              'icon' => 'lock',           'category' => 'security'],
            ['name' => 'Bathtub',           'icon' => 'bath',           'category' => 'bathroom'],
            ['name' => 'Private Balcony',   'icon' => 'sun',            'category' => 'comfort'],
            ['name' => 'King Bed',          'icon' => 'bed',            'category' => 'bedroom'],
            ['name' => 'Coffee Maker',      'icon' => 'coffee',         'category' => 'food'],
        ];

        $amenities = collect($amenityData)->map(
            fn ($a) => Amenity::create(array_merge($a, ['uuid' => Str::uuid()]))
        );

        // 4. Room Types (3)
        $roomTypeData = [
            [
                'uuid'                    => Str::uuid(),
                'name'                    => 'Standard Room',
                'description'             => 'Comfortable and well-appointed room perfect for solo travelers or couples, featuring modern furnishings and all essential amenities.',
                'max_guests'              => 2,
                'price_per_night'         => 59.00,
                'weekend_price_per_night' => 75.00,
                'size_sqm'                => 28,
                'bed_type'                => 'Queen',
                'is_active'               => true,
                'images'                  => [
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200',
                ],
                'amenity_ids' => [1, 2, 3, 6, 10],
            ],
            [
                'uuid'                    => Str::uuid(),
                'name'                    => 'Deluxe Room',
                'description'             => 'Spacious deluxe room with premium furnishings, city views, and upgraded amenities for a truly elevated stay experience.',
                'max_guests'              => 2,
                'price_per_night'         => 99.00,
                'weekend_price_per_night' => 120.00,
                'size_sqm'                => 40,
                'bed_type'                => 'King',
                'is_active'               => true,
                'images'                  => [
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200',
                ],
                'amenity_ids' => [1, 2, 3, 4, 5, 6, 9, 10],
            ],
            [
                'uuid'                    => Str::uuid(),
                'name'                    => 'Suite',
                'description'             => 'Luxurious suite with a separate living area, panoramic city views, premium minibar, and exclusive butler service.',
                'max_guests'              => 4,
                'price_per_night'         => 199.00,
                'weekend_price_per_night' => 249.00,
                'size_sqm'                => 75,
                'bed_type'                => 'King',
                'is_active'               => true,
                'images'                  => [
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=1200',
                ],
                'amenity_ids' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            ],
        ];

        $createdTypes = collect($roomTypeData)->map(function ($data) use ($amenities) {
            $amenityIds = $data['amenity_ids'];
            unset($data['amenity_ids']);
            $type = RoomType::create($data);
            $type->amenities()->attach(
                $amenities->whereIn('id', $amenityIds)->pluck('id')
            );
            return $type;
        });

        [$standard, $deluxe, $suite] = $createdTypes;

        // 5. Rooms — 25 total
        // Standard: 10 rooms, floors 1–2, numbers 101–110
        // Deluxe:   10 rooms, floors 3–4, numbers 301–310
        // Suite:     5 rooms, floor 5,    numbers 501–505
        $rooms = collect();

        foreach (range(1, 10) as $i) {
            $rooms->push(Room::create([
                'uuid'         => Str::uuid(),
                'room_type_id' => $standard->id,
                'room_number'  => (string)(100 + $i),
                'floor'        => $i <= 5 ? 1 : 2,
                'status'       => 'available',
            ]));
        }

        foreach (range(1, 10) as $i) {
            $rooms->push(Room::create([
                'uuid'         => Str::uuid(),
                'room_type_id' => $deluxe->id,
                'room_number'  => (string)(300 + $i),
                'floor'        => $i <= 5 ? 3 : 4,
                'status'       => 'available',
            ]));
        }

        foreach (range(1, 5) as $i) {
            $rooms->push(Room::create([
                'uuid'         => Str::uuid(),
                'room_type_id' => $suite->id,
                'room_number'  => (string)(500 + $i),
                'floor'        => 5,
                'status'       => 'available',
            ]));
        }

        // 6. Bookings, Payments & Reviews
        foreach ($allUsers as $user) {
            $room     = $rooms->random();
            $nights   = rand(1, 5);
            $checkIn  = now()->subDays(rand(5, 60));
            $price    = $room->roomType->price_per_night;
            $total    = $price * $nights;

            $booking = Booking::create([
                'uuid'            => Str::uuid(),
                'user_id'         => $user->id,
                'room_id'         => $room->id,
                'check_in_date'   => $checkIn->toDateString(),
                'check_out_date'  => $checkIn->copy()->addDays($nights)->toDateString(),
                'guests'          => rand(1, $room->roomType->max_guests),
                'price_per_night' => $price,
                'total_price'     => $total,
                'discount_amount' => 0,
                'status'          => 'confirmed',
            ]);

            Payment::create([
                'uuid'       => Str::uuid(),
                'booking_id' => $booking->id,
                'amount'     => $total,
                'method'     => collect(['cash', 'card', 'qr_code'])->random(),
                'status'     => 'paid',
                'paid_at'    => now(),
            ]);

            if (rand(0, 1)) {
                Review::create([
                    'uuid'        => Str::uuid(),
                    'user_id'     => $user->id,
                    'booking_id'  => $booking->id,
                    'rating'      => rand(3, 5),
                    'comment'     => fake()->sentence(rand(8, 20)),
                    'is_approved' => true,
                ]);
            }
        }

        // 7. Coupons
        Coupon::create([
            'uuid'           => Str::uuid(),
            'code'           => 'WELCOME10',
            'name'           => 'Welcome Discount',
            'discount_type'  => 'percent',
            'discount_value' => 10,
            'min_nights'     => 1,
            'valid_from'     => now(),
            'valid_until'    => now()->addMonths(3),
            'max_uses'       => 100,
            'is_active'      => true,
        ]);

        Coupon::create([
            'uuid'           => Str::uuid(),
            'code'           => 'SUMMER25',
            'name'           => 'Summer Special',
            'discount_type'  => 'percent',
            'discount_value' => 25,
            'min_nights'     => 2,
            'valid_from'     => now(),
            'valid_until'    => now()->addMonths(6),
            'max_uses'       => 50,
            'is_active'      => true,
        ]);

        Coupon::create([
            'uuid'           => Str::uuid(),
            'code'           => 'FLAT30',
            'name'           => '$30 Off',
            'discount_type'  => 'fixed',
            'discount_value' => 30,
            'min_nights'     => 3,
            'valid_from'     => now(),
            'valid_until'    => now()->addYear(),
            'max_uses'       => 0,
            'is_active'      => true,
        ]);
    }
}
