<?php

namespace App\Http\Requests\Mesa;

use Illuminate\Foundation\Http\FormRequest;

class StoreMesaRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name_mesa' => 'required',
            'capacity' => 'required',
            'photo' => 'required',
            'is_active' => 'required',
            'categories' => 'required', 'array:name,categories',
        ];
    }
}
