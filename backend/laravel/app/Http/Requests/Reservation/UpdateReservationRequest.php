<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'sometimes',
            'mesa_id' => 'sometimes',
            'fecha_reserva' => 'sometimes',
            'type_reservation' => 'sometimes',
            'accepted' => 'sometimes',
        ];
    }
}
