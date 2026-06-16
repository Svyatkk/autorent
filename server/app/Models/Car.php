<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Car extends Model
{

    protected $table = 'rc_cars';
    protected $primaryKey = 'car_id';

    protected $fillable = [
        'city_id', 'company_id', 'car_model_id', 'car_brand_id', 'car_serie_id',
        'registration_number', 'photo', 'status', 'is_deleted',
        'price_1', 'price_2', 'price_3_6', 'price_7_13', 'price_14_20', 'price_21_29', 'price_30_more',
        'deposit', 'currency', 'insurance', 'insurance_amount',
        'attribute_year', 'attribute_transmission', 'attribute_fuel_type', 'attribute_doors', 'attribute_number_of_seats', 'attribute_mileage',
        'latitude', 'longitude', 'min_day_reservation', 'youtube_video_link'
    ];

    protected $casts = [
        'price_2' => 'float',
        'price_3_6' => 'float',
        'deposit' => 'float',
        'status' => 'integer',
        'is_deleted' => 'boolean',
    ];

    public function carModel(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'car_model_id', 'car_model_id');
    }
        
    public function carBrand(): BelongsTo
    {
        return $this->belongsTo(CarBrand::class, 'car_brand_id', 'car_brand_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'car_id', 'car_id');
    }
}