<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'room' => new RoomResource($this->whenLoaded('room')),
            'check_in_date' => $this->check_in_date->format('Y-m-d'),
            'check_out_date' => $this->check_out_date->format('Y-m-d'),
            'total_price' => $this->total_price,
            'status' => $this->status,
            'payment' => new PaymentResource($this->whenLoaded('payment')),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
