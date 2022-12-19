<?php

namespace App\Http\Controllers;

use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Mesa;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return ReservationResource::collection(Reservation::all());
    }

    public function store(Request $request)
    {
        $user = User::where('id', $request->user_id)->firstOrFail();
        $mesa = Mesa::where('id', $request->mesa_id)->firstOrFail();
        $reservation = Reservation::create(['fecha_reserva' => $request->fecha_reserva, "type_reservation" => $request->type_reservation, 'accepted' => false, 'mesa_id' => $mesa->id, 'user_id' => $user->id]);
        return ReservationResource::make($reservation);
    }

    public function show($id)
    {
        return ReservationResource::make(Reservation::where('id', $id)->firstOrFail());
    }

    // public function update(UpdateReservationRequest $request, $id)
    // {
    //     $data = $request->except(['user_id', 'mesa_id']);
    //     $update = Reservation::where('id', $id)->update($data);

    //     if ($update == 1) {
    //         $reservation = Reservation::where('id', $id)->firstOrFail();
    //         $reservation->categories()->detach();

    //         return response()->json([
    //             "Message" => "Updated correctly"
    //         ]);
    //     } else {
    //         return response()->json([
    //             "Status" => "Not found"
    //         ], 404);
    //     };
    // }

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
