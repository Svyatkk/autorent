<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarBrandTranslation extends Model
{
    protected $table = 'rc_cars_brands_translations';

    protected $fillable = [
        'car_brand_id',
        'lang',
        'name',
        'header_description',
        'footer_title',
        'footer_subtitle',
        'footer_description',
        'footer_subdescription',
        'page_title',
        'page_meta_description',
        'page_meta_keywords',
    ];

    protected $casts = [
        'car_brand_id' => 'integer',
    ];

    public function carBrand(): BelongsTo
    {
        return $this->belongsTo(CarBrand::class, 'car_brand_id', 'car_brand_id');
    }
}
