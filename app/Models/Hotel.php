<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'address', 'city', 'country', 'rating', 'images'];

    protected $casts = [
        'images' => 'array',
        'rating' => 'decimal:1',
    ];

    public function roomTypes()
    {
        return $this->hasMany(RoomType::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
