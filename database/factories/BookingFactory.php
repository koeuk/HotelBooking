<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $checkIn = $this->faker->dateTimeBetween('now', '+1 month');
        $checkOut = (clone $checkIn)->modify('+' . rand(1, 7) . ' days');

        return [
            'user_id' => User::factory(),
            'room_id' => Room::factory(),
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'total_price' => $this->faker->randomFloat(2, 100, 2000),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
        ];
    }
}
