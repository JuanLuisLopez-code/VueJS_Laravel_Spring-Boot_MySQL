<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Mesa\StoreMesaRequest;
use App\Http\Requests\Mesa\UpdateMesaRequest;
use App\Http\Resources\MesaResource;
use App\Models\Mesa;

class MesaController extends Controller
{
    public function index()
    {
        return MesaResource::collection(Mesa::all());
    }

    public function store(StoreMesaRequest $request)
    {
        return MesaResource::make(StoreMesaRequest::create($request->validated()));
    }

    public function show($id)
    {
        return MesaResource::make(Mesa::where('id', $id)->firstOrFail());
    }

    public function update(UpdateMesaRequest $request, $id)
    {
        $update = Mesa::where('id', $id)->update($request->validated());
        if ($update == 1) {
            MesaResource::make($update);
            return response()->json([
                "Message" => "Updated correctly"
            ]);
        } else {
            return response()->json([
                "Status" => "Not found"
            ], 404);
        };
    }

    public function destroy($id)
    {
        $delete = Mesa::where('id', $id)->delete();

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
}//class
