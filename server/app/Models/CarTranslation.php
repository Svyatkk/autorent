<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarTranslation extends Model
{
    protected $table = 'rc_cars_translations';

    protected $fillable = [
        'car_id',
        'lang',
        'title',
        'description',
        'attribute_color',
        'attribute_interior_color',
        'footer_title',
        'footer_subtitle',
        'footer_description',
        'footer_subdescription',
        'page_title',
        'page_meta_description',
        'page_meta_keywords',
        'was_migrated',
    ];

    protected $casts = [
        'car_id' => 'integer',
        'was_migrated' => 'integer',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id', 'car_id');
    }
}
