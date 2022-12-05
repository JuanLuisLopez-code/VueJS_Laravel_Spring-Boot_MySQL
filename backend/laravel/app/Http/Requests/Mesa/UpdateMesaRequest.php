<?php

namespace App\Http\Requests\Mesa;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMesaRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name_mesa' => 'sometimes',
            'capacity' => 'sometimes',
            'photo' => 'sometimes',
            'is_active' => 'sometimes',
            'categories' => 'sometimes', 'array:name,categories',
        ];
    }
}
