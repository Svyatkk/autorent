<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookingService; 
use Illuminate\Http\JsonResponse; 

class BookingController extends Controller
{
    public function __construct(private BookingService $bookingService) {}

    public function getByCar(string $carId): JsonResponse
    {
        $bookings = $this->bookingService->getByCarId($carId);
        return response()->json($bookings);
    }
}