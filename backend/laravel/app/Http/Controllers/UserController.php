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
        $username_exist = User::where('username', $request->validated()['username'])->get()->count();
        if ($username_exist == 1) {
            return response()->json([
                "Status" => "Username taken"
            ], 400);
        }

        $email_exist = User::where('email', $request->validated()['email'])->get()->count();
        if ($email_exist == 1) {
            return response()->json([
                "Status" => "Email taken"
            ], 400);
        }

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

        if (isset($request->validated()['username'])) {
            $username_exist = User::where('username', $request->validated()['username'])->get()->count();
            if ($username_exist == 1) {
                return response()->json([
                    "Status" => "Username taken"
                ], 400);
            }
            $user->username = $request->validated()['username'];
        }
        if (isset($request->validated()['email'])) {
            $email_exist = User::where('email', $request->validated()['email'])->get()->count();
            if ($email_exist == 1) {
                return response()->json([
                    "Status" => "Email taken"
                ], 400);
            }
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
        $user = User::where('username', $request->validated()['username'])->firstOrFail();
        $token =  $user->login();
        if (!$token) {
            return response()->json([
                "error" => "Unauthorized"
            ], 401);
        }

        return response()->json(['Token' => $token]);
    }
}//class