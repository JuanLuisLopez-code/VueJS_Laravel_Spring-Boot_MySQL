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
        $file_URL  = FileUploader::store($request->validated()['photo'], 'categories');
        $data = ['name_category' => $request->validated()['name_category'], 'photo' => $file_URL];
        return CategoryResource::make(Category::create($data));
    }

    public function show($id)
    {
        return CategoryResource::make(Category::where('id', $id)->firstOrFail());
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $data = null;
        $category = Category::where('id', $id)->firstOrFail();
        if (isset($request['photo'])) {
            $data['photo'] =  FileUploader::update($request['photo'], $category['photo']);
        }
        if (isset($request['name_category'])) {
            $data['name_category'] = $request['name_category'];
        }
        $update = $category->update($data);
        if ($update == 1) {
            return CategoryResource::make($category->firstOrFail());
        } else {
            return response()->json([
                "Status" => "Not found"
            ], 404);
        };
    }

    public function destroy($id)
    {
        $category = Category::where('id', $id)->firstOrFail();
        FileUploader::delete($category['photo']);
        $delete = $category->delete();

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
