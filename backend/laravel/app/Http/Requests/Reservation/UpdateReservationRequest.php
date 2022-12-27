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
            'fecha_reserva' => 'sometimes',
            'type_reservation' => 'sometimes',
            'accepted' => 'sometimes',
        ];
    }
}
