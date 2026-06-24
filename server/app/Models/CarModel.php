<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // 🟢 Не забудь імпорт 
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
public function carBrand(): BelongsTo
    {
        return $this->belongsTo(CarBrand::class, 'car_brand_id', 'car_brand_id');
    }
    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'car_model_id', 'car_model_id');
    }

    public function translation()
    {
        return $this->hasOne(CarModelTranslation::class, 'car_model_id', 'car_model_id')
            ->where('lang', app()->getLocale());
    }

    public function translations(): HasMany
    {
        return $this->hasMany(CarModelTranslation::class, 'car_model_id', 'car_model_id');
    }
}
