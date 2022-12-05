<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{

    public function definition()
    {
        return [
            'username' => $this->faker->unique()->username,
            'email' => $this->faker->unique()->safeEmail,
            'password' => password_hash(strval('asdasdasd'), PASSWORD_DEFAULT, ['cost' => 12]),
            'type' => 'client',
            'photo' => $this->faker->imageUrl(360, 360, 'user', true, 'user'),
            'is_active' => true,
        ];
    }
}
