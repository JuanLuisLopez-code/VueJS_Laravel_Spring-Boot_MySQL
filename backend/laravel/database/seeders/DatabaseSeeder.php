<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Mesa;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::factory()->count(5)->create();
        $mesas = Mesa::factory()->count(50)->create();
        $users = User::factory()->count(5)->create();

        foreach ($mesas as $mesa) {
            $mesa->categories()->attach($categories->random(rand(1, 3)));
        } //attach category in mesa
    } //run
}
