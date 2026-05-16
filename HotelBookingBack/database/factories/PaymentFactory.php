<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'amount' => $this->faker->randomFloat(2, 100, 2000),
            'method' => $this->faker->randomElement(['card', 'cash', 'paypal']),
            'status' => $this->faker->randomElement(['pending', 'paid', 'failed', 'refunded']),
            'transaction_id' => $this->faker->uuid(),
            'paid_at' => $this->faker->optional()->dateTimeThisYear(),
        ];
    }
}
