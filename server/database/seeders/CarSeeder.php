<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::insert([
            ['name' => 'Toyota Camry',   'plate' => 'AA1234BB', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'BMW 5 Series',   'plate' => 'KA5678CC', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mercedes E220',  'plate' => 'AB9012DD', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
