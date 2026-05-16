<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'user_id',
        'room_id',
        'coupon_id',
        'check_in_date',
        'check_out_date',
        'guests',
        'price_per_night',
        'total_price',
        'discount_amount',
        'special_requests',
        'status',
        'cancelled_at',
        'cancellation_reason',
    ];

    protected $casts = [
        'check_in_date'   => 'date',
        'check_out_date'  => 'date',
        'cancelled_at'    => 'datetime',
        'guests'          => 'integer',
        'price_per_night' => 'decimal:2',
        'total_price'     => 'decimal:2',
        'discount_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
}
