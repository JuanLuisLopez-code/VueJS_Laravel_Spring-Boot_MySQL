<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\LoginUserRequest;
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
            $user->username = $request->validated()['username'];
        }
        if (isset($request->validated()['email'])) {
            $user->email = $request->validated()['email'];
        }
        if (isset($request->validated()['password'])) {
            $user->password = password_hash(strval($request->validated()['password']), PASSWORD_DEFAULT, ['cost' => 12]);
        }
        if (isset($request->validated()['photo'])) {
            $user->photo = $request->validated()['photo'];
        }
        if (isset($request->validated()['is_active'])) {
            $user->is_active = $request->validated()['is_active'];
        }
        $user->save();
        // return UserResource::make($user);
        return response()->json([
            "Message" => "Updated correctly"
        ]);
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

    public function login(LoginUserRequest $request)
    {
        return response()->json(['test' => 'aaa']);
    }
}//class