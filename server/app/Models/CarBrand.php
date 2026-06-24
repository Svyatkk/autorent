<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; 
use Illuminate\Database\Eloquent\SoftDeletes; 
class CarBrand extends Model
{
    use SoftDeletes;

protected $table = 'rc_cars_brands';
    protected $primaryKey = 'car_brand_id';

    protected $fillable = [
        'icon',
        'is_deleted',
        'slug',
        'status',
        'youtube_video_link',
    ];

    protected $casts = [
        'status' => 'integer',
        'is_deleted' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'car_brand_id', 'car_brand_id');
    }

    public function translation()
    {
        return $this->hasOne(CarBrandTranslation::class, 'car_brand_id', 'car_brand_id')
            ->where('lang', app()->getLocale());
    }

    public function translations(): HasMany
    {
        return $this->hasMany(CarBrandTranslation::class, 'car_brand_id', 'car_brand_id');
    }
}