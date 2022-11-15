<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MesaResource extends JsonResource
{
    public function toArray($request)
    {
        $categories = [];
        foreach ($this->categories as $c) {
            $category = [
                "id" => $c->id,
                "name_category" => $c->name_category,
                "photo" => $c->photo
            ];
            array_push($categories, $category);
        }

        return [
            'id' => $this->id,
            'name_mesa' => $this->name_mesa,
            'capacity' => $this->capacity,
            'photo' => $this->photo,
            'is_active' => $this->is_active,
            'categories' => $categories
        ];
    }
}
