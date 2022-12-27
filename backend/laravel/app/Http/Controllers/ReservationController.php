<?php

namespace App\Http\Controllers;

use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Mesa;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Integer;

class ReservationController extends Controller
{
    public function index()
    {
        return ReservationResource::collection(Reservation::all());
    }

    public function show($id)
    {
        return ReservationResource::make(Reservation::where('id', $id)->firstOrFail());
    }

    public function update(UpdateReservationRequest $request, $id)
    {
        $data = $request->except(['user_id', 'mesa_id']);
        $reservation = Reservation::where('id', $id)->firstOrFail();
        $mesa_id = $reservation->mesa_id;
        $type_reservation_accepted = ['dinner', 'launch'];

        if (!isset($data["fecha_reserva"]) && !isset($data["type_reservation"])) {
            $avalible = 0;
        } else if ($reservation->type_reservation == $data["type_reservation"] && $reservation->fecha_reserva == $data["fecha_reserva"]) {
            $avalible = 0;
        } else if (isset($data["type_reservation"]) && !in_array($data["type_reservation"], $type_reservation_accepted)) {
            $avalible = 1;
        } else {
            $avalible = Reservation::where('fecha_reserva', $data["fecha_reserva"])->where('type_reservation', $data['type_reservation'])->where('mesa_id', $mesa_id)->count();
        }

        if ($avalible == 0) {
            $update = Reservation::where('id', $id)->update($data);
            if ($update == 1) {
                return response()->json([
                    "Message" => "Updated correctly"
                ]);
            } else {
                return response()->json([
                    "Status" => "Not found"
                ], 404);
            };
        } else {
            return response()->json([
                "Status" => "Already reservated"
            ], 304);
        };
    }

    public function destroy($id)
    {
        $delete = Reservation::where('id', $id)->delete();

        if ($delete == 1) {
            return response()->json([
                "Message" => "Deleted correctly"
            ], 200);
        } else {
            return response()->json([
                "Status" => "Not found"
            ], 404);
        }
    }
}
