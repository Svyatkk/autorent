<?php

namespace App\Services;

use App\Models\Car;

class CarService
{
    public function getAll(): array
{
    return Car::where('company_id', 1)
        ->where('status', 1)
        ->where('is_deleted', '!=', 1)
        ->with([
            'bookings' => function($query) {
                $query->where('status', 1);
            },
            'carModel', 
            'carBrand'  
        ])
        ->orderBy('car_id', 'asc')
        ->get()
        ->toArray(); 
}

    public function getById(string $id): Car
    {
        return Car::with('bookings')->findOrFail($id);
    }
}