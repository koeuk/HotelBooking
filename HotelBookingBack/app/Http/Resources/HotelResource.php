<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'uuid'            => $this->uuid,
            'name'            => $this->name,
            'slug'            => $this->slug,
            'description'     => $this->description,
            'address'         => $this->address,
            'city'            => $this->city,
            'country'         => $this->country,
            'zip_code'        => $this->zip_code,
            'phone'           => $this->phone,
            'email'           => $this->email,
            'website'         => $this->website,
            'latitude'        => $this->latitude,
            'longitude'       => $this->longitude,
            'star_rating'     => $this->star_rating,
            'check_in_time'   => $this->check_in_time,
            'check_out_time'  => $this->check_out_time,
            'logo'            => $this->logo,
            'images'          => $this->images,
        ];
    }
}
