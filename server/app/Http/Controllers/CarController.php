<?php

namespace App\Http\Controllers;

use App\Services\CarService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function __construct(private CarService $carService) {}

    public function index(Request $request): JsonResponse
    {
        [$year, $month] = $this->getPeriodFromRequest($request);
        $cars = $this->carService->getAll($year, $month);

        return response()->json($cars);
    }
    
    public function getCar(Request $request, string $identifier): JsonResponse
    {
        [$year, $month] = $this->getPeriodFromRequest($request);

        $car = is_numeric($identifier)
            ? $this->carService->getById($identifier, $year, $month)
            : $this->carService->getByRegNum($identifier, $year, $month);

        return response()->json($car);
    }

    private function getPeriodFromRequest(Request $request): array
    {
        $year = (int) $request->query('year', 2023);
        $month = (int) $request->query('month', 1);

        return [$year, max(1, min(12, $month))];
    }
}
