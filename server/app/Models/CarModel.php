<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; 
class CarModel extends Model
{
protected $table = 'rc_cars_models';
    protected $primaryKey = 'car_model_id';

    public $incrementing = true;
public $timestamps = false;
    protected $fillable = [
        'car_brand_id', 
        'name',        
        'status',
    ];

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'car_model_id', 'car_model_id');
    }
}
