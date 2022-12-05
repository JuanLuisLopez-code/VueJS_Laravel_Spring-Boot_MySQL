<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function store(StoreUserRequest $request)
    {
        $user = $this->user->create($request->validated());
        return UserResource::make($user);
    }

    public function show($id)
    {
        return UserResource::make(User::where('id', $id)->firstOrFail());
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::where('id', $id)->firstOrFail();
        if (!$user) {
            return response()->json([
                "Status" => "Not found"
            ], 404);
        }

        if (isset($request->validated()['username'])) {
            error_log('username');
        }
        if (isset($request->validated()['email'])) {
            error_log('email');
        }
        if (isset($request->validated()['password'])) {
            error_log('password');
        }
        if (isset($request->validated()['photo'])) {
            error_log('photo');
        }
        if (isset($request->validated()['is_active'])) {
            error_log('is_active');
        }

        return UserResource::make($user);
    }

    public function destroy($id)
    {
        $delete = User::where('id', $id)->delete();

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