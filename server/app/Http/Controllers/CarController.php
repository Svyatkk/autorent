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
    
    public function getCarById(string $id): JsonResponse 
    {
        $car = $this->carService->getById($id);

        return response()->json($car);
    }
}
