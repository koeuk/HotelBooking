<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                       => $this->id,
            'uuid'                     => $this->uuid,
            'name'                     => $this->name,
            'description'              => $this->description,
            'max_guests'               => $this->max_guests,
            'price_per_night'          => $this->price_per_night,
            'weekend_price_per_night'  => $this->weekend_price_per_night,
            'size_sqm'                 => $this->size_sqm,
            'bed_type'                 => $this->bed_type,
            'images'                   => $this->images,
            'is_active'                => $this->is_active,
            'amenities'                => AmenityResource::collection($this->whenLoaded('amenities')),
        ];
    }
}
