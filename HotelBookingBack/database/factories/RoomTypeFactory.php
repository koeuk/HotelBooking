<?php

namespace Database\Factories;

use App\Models\Hotel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'hotel_id' => Hotel::factory(),
            'name' => $this->faker->randomElement(['Deluxe Room', 'Superior Room', 'Suite', 'Penthouse', 'Standard Room']),
            'description' => $this->faker->sentence(),
            'max_users' => $this->faker->numberBetween(1, 4),
            'price_per_night' => $this->faker->randomFloat(2, 50, 500),
            'images' => [
                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000'
            ],
        ];
    }
}
