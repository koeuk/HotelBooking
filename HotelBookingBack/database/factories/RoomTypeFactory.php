<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Standard Room', 'Deluxe Room', 'Suite']),
            'description' => $this->faker->paragraph(),
            'max_guests' => $this->faker->numberBetween(1, 4),
            'price_per_night' => $this->faker->randomFloat(2, 50, 500),
            'weekend_price_per_night' => null,
            'size_sqm' => $this->faker->numberBetween(20, 80),
            'bed_type' => $this->faker->randomElement(['Single', 'Double', 'Queen', 'King']),
            'images' => [
                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000',
            ],
            'is_active' => true,
        ];
    }
}
