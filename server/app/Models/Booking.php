<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; 
class Booking extends Model
{
 protected $table = 'rc_bookings';

    protected $primaryKey = 'booking_id';
public $timestamps = false; 
    protected $fillable = [
        'car_id',
        'customer_id',    
        'start_date',        
        'end_date',         
        'status',           
        'total_price',      
        'cancelled_at',     
        'is_deleted'         
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'total_price' => 'float',
        'is_deleted' => 'boolean',
        'cancelled_at' => 'datetime',
    ];
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id', 'car_id');
    }
}
