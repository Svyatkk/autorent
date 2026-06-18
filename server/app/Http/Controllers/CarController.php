<?php

namespace App\Http\Controllers;

use App\Services\CarService;
use Illuminate\Http\JsonResponse;

class CarController extends Controller
{
    public function __construct(private CarService $carService) {}

    public function index(): JsonResponse
    {
        $cars = $this->carService->getAll();
        return response()->json($cars);
    }
    
    public function getCar(string $identifier): JsonResponse
{
    $car = is_numeric($identifier) 
        ? $this->carService->getById($identifier)
        : $this->carService->getByRegNum($identifier);

    return response()->json($car);
}
}
