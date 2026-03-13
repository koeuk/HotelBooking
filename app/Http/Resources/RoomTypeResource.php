<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'hotel' => $this->whenLoaded('hotel', fn () => $this->hotel->name),
            'name' => $this->name,
            'description' => $this->description,
            'max_guests' => $this->max_guests,
            'price_per_night' => $this->price_per_night,
            'images' => $this->images,
        ];
    }
}
