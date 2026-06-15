<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'AutoRent API працює ',
        'timestamp' => now()
    ]);
});