<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Mesa;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::factory()->count(7)->create();
        $mesas = Mesa::factory()->count(30)->create();

        foreach ($mesas as $mesa) {
            $mesa->categories()->attach($categories->random(rand(1, 3)));
        } //attach category in mesa
    } //run
}
