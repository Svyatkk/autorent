<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\BookingController;

Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/search/{identifier}', [CarController::class, 'getCar']);
Route::get('/cars/{carId}/bookings', [BookingController::class, 'getByCar']);