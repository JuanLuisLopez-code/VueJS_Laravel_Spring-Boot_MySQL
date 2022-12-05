<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => 'sometimes',
            'email' => 'sometimes',
            'password' => 'sometimes',
            'photo' => 'sometimes',
            'is_active' => 'sometimes',
        ];
    }
}
