<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = ['code', 'discount_percent', 'valid_from', 'valid_until', 'max_uses', 'used_count'];

    protected $casts = [
        'discount_percent' => 'integer',
        'valid_from' => 'date',
        'valid_until' => 'date',
        'max_uses' => 'integer',
    ];

    public function isValid(): bool
    {
        return now()->between($this->valid_from, $this->valid_until);
    }
}
