<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
            'photo' => 'sometimes',
            'is_active' => 'sometimes',
        ];
    }
}
