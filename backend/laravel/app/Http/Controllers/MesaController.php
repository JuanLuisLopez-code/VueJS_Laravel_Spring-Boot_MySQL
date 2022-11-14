<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mesa\StoreMesaRequest;
use App\Http\Requests\Mesa\UpdateMesaRequest;
use App\Http\Resources\MesaResource;
use App\Models\Mesa;
use App\Models\Category;

class MesaController extends Controller
{
    public function index()
    {
        return MesaResource::collection(Mesa::all());
    }

    public function store(StoreMesaRequest $request)
    {
        $cat = Category::where('name_category', $request->category)->firstOrFail();
        if ($cat) {
            $mesa = Mesa::create($request->validated());
            $mesa->categories()->attach($cat->id);
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

    // public function addCategory($id, $categoryName)
    // {
    //     $category = Category::where('name_category', $categoryName)->firstOrFail();
    //     $mesa = Mesa::where('id', $id)->firstOrFail();
    //     if ($category) {
    //         $mesa->categories()->attach($category->id);
    //         return MesaResource::make($mesa);
    //     } else {
    //         return response()->json([
    //             "Status" => "Not found"
    //         ], 404);
    //     }
    // } //add category

    // public function removeCategory($id, $categoryName)
    // {
    //     $category = Category::where('name_category', $categoryName)->firstOrFail();
    //     $mesa = Mesa::where('id', $id)->firstOrFail();
    //     if ($category) {
    //         $mesa->categories()->detach($category->id);
    //         return MesaResource::make($mesa);
    //     } else {
    //         return response()->json([
    //             "Status" => "Not found"
    //         ], 404);
    //     }
    // } //add category

    public function update(UpdateMesaRequest $request, $id)
    {
        if ($request->categories) {
            error_log('sasdasdsa');
        }

        $update = Mesa::where('id', $id)->update($request->validated());
        if ($update == 1) {
            $mesa = Mesa::where('id', $id)->firstOrFail();
            // $mesa->categories->detach();
            // $mesa->categories->attach();
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
