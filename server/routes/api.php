<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\BookingController;
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{carId}/bookings', [BookingController::class, 'getByCar']);




Route::get('/cars/{id}', [CarController::class, 'getCarById']);

