<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid', 'name', 'slug', 'description', 'address', 'city', 'country',
        'zip_code', 'phone', 'email', 'website', 'latitude', 'longitude',
        'star_rating', 'check_in_time', 'check_out_time', 'logo', 'images',
    ];

    protected $casts = [
        'images'      => 'array',
        'star_rating' => 'integer',
    ];
}
