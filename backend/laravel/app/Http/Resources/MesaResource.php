<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MesaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name_mesa' => $this->name_mesa,
            'capacity' => $this->capacity,
            'photo' => $this->photo,
            'is_active' => $this->is_active,
        ];
    }
}
