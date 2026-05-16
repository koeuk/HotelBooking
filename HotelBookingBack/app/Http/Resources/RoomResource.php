<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'uuid'        => $this->uuid,
            'room_number' => $this->room_number,
            'floor'       => $this->floor,
            'status'      => $this->status,
            'notes'       => $this->notes,
            'room_type'   => new RoomTypeResource($this->whenLoaded('roomType')),
        ];
    }
}
