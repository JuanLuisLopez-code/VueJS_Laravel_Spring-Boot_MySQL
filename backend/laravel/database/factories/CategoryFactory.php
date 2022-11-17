<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class CategoryFactory extends Factory
{
    protected $model = Category::class;
    public function definition()
    {
        return [
            'name_category' => $this->faker->unique()->word(),
            'photo' => $this->faker->unique()->imageUrl(360, 360, 'animals', true, 'cats'),
        ];
    }
}
