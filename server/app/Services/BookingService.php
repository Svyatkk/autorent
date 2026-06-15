<?php

namespace App\Services;

use App\Models\Booking;

class BookingService
{


    public function getByCarId(string $car_id): array
    {
        return Booking::where('car_id', $car_id)->get()->toArray(); 
    }

}
