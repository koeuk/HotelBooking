<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid', 'name', 'description', 'max_guests', 'price_per_night',
        'weekend_price_per_night', 'size_sqm', 'bed_type', 'images', 'is_active',
    ];

    protected $casts = [
        'images'                   => 'array',
        'price_per_night'          => 'decimal:2',
        'weekend_price_per_night'  => 'decimal:2',
        'is_active'                => 'boolean',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'room_type_amenities');
    }
}
