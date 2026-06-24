<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarModelTranslation extends Model
{
    protected $table = 'rc_cars_models_translations';

    protected $fillable = [
        'car_model_id',
        'lang',
        'name',
        'description',
        'footer_title',
        'footer_subtitle',
        'footer_description',
        'footer_subdescription',
        'page_title',
        'page_meta_description',
        'page_meta_keywords',
    ];

    protected $casts = [
        'car_model_id' => 'integer',
    ];

    public function carModel(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'car_model_id', 'car_model_id');
    }
}
