<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $checkIn = $this->faker->dateTimeBetween('-2 months', '+1 month');
        $nights = rand(1, 7);
        $checkOut = (clone $checkIn)->modify("+{$nights} days");

        return [
            'user_id' => User::factory(),
            'room_id' => Room::factory(),
            'coupon_id' => null,
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'guests' => $this->faker->numberBetween(1, 3),
            'price_per_night' => $this->faker->randomFloat(2, 50, 500),
            'total_price' => $this->faker->randomFloat(2, 100, 2000),
            'discount_amount' => 0,
            'special_requests' => null,
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled']),
        ];
    }
}
