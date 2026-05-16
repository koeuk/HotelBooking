<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = ['name', 'icon'];

    public function hotels()
    {
        return $this->belongsToMany(Hotel::class, 'hotel_amenities');
    }
}
