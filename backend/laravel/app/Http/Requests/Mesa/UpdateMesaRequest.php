<?php

namespace App\Http\Requests\Mesa;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMesaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
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
