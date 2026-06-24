<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\LanguageController;

Route::get('/languages', [LanguageController::class, 'index']);
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/search/{identifier}', [CarController::class, 'getCar']);
Route::get('/cars/{identifier}', [CarController::class, 'getCar']);
Route::get('/cars/{carId}/bookings', [BookingController::class, 'getByCar']);