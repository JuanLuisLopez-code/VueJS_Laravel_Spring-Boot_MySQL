<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Mesa;


class MesaFactory extends Factory
{
    protected $model = Mesa::class;
    public function definition()
    {
        return [
            'name_mesa'  => $this->faker->unique()->word(),
            'capacity' => $this->faker->numberBetween(1, 15),
            'is_active' => $this->faker->boolean(),
            'photo' => $this->faker->unique()->imageUrl(360, 360, 'animals', true, 'cats'),
        ];
    }
}
