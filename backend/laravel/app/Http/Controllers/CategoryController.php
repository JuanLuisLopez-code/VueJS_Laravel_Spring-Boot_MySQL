<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Helpers\FileUploader;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    public function store(StoreCategoryRequest $request)
    {

        if (isset($request['photo'])) {
            if ($request['photo'] != null && $request['photo'] != '' && !is_string($request['photo'])) {
                $file_URL  = FileUploader::store($request['photo'], 'categories');
            } else {
                $file_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cat_on_its_back.jpg/1280px-Cat_on_its_back.jpg';
            }
        }
        $data = ['name_category' => $request->validated()['name_category'], 'photo' => $file_URL];
        return CategoryResource::make(Category::create($data));
    }

    public function show($id)
    {
        return CategoryResource::make(Category::where('id', $id)->firstOrFail());
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $update = Category::where('id', $id)->update($request->validated());
        if ($update == 1) {
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
        $delete = Category::where('id', $id)->delete();

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
