<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'uuid'                => $this->uuid,
            'user'                => new UserResource($this->whenLoaded('user')),
            'room'                => new RoomResource($this->whenLoaded('room')),
            'check_in_date'       => $this->check_in_date->format('Y-m-d'),
            'check_out_date'      => $this->check_out_date->format('Y-m-d'),
            'guests'              => $this->guests,
            'price_per_night'     => $this->price_per_night,
            'total_price'         => $this->total_price,
            'discount_amount'     => $this->discount_amount,
            'special_requests'    => $this->special_requests,
            'status'              => $this->status,
            'payment'             => new PaymentResource($this->whenLoaded('payment')),
            'cancelled_at'        => $this->cancelled_at?->toISOString(),
            'cancellation_reason' => $this->cancellation_reason,
            'created_at'          => $this->created_at->toISOString(),
        ];
    }
}
