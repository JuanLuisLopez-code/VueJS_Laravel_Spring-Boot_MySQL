<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mesa\StoreMesaRequest;
use App\Http\Requests\Mesa\UpdateMesaRequest;
use App\Http\Resources\MesaResource;
use App\Models\Mesa;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class MesaController extends Controller
{
    public function index()
    {
        return MesaResource::collection(Mesa::all());
    }

    public function store(StoreMesaRequest $request)
    {
        $data = $request->except(['categories']);
        $categories = Category::whereIn('name_category', $request->categories)->get();
        $categories_id = [];
        foreach ($categories as $c) {
            array_push($categories_id, $c->id);
        }

        if (count($categories_id) > 0) {
            $mesa = Mesa::create($data);
            $mesa->categories()->sync($categories_id);
            return MesaResource::make($mesa);
        } else {
            return response()->json([
                "Status" => "Not found"
            ], 404);
        }
    }

    public function show($id)
    {
        return MesaResource::make(Mesa::where('id', $id)->firstOrFail());
    }

    public function update(UpdateMesaRequest $request, $id)
    {
        error_log($request);
        $data = $request->except(['categories']);
        $categories_name = [];
        if ($request->categories !== null) {
            $categories_name = $request->categories;
        }
        $categories = Category::whereIn('name_category', $categories_name)->get();
        $categories_id = [];
        foreach ($categories as $c) {
            array_push($categories_id, $c->id);
        }

        $update = Mesa::where('id', $id)->update($data);

        if ($update == 1) {
            if (count($categories_id) > 0) {
                $mesa = Mesa::where('id', $id)->firstOrFail();
                $mesa->categories()->detach();
                $mesa->categories()->sync($categories_id);
            }

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
