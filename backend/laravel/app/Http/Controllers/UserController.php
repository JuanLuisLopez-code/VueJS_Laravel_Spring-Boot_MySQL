<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{

    protected User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        return UserResource::collection(User::all());
    } //list all

    public function store(StoreUserRequest $request)
    {
        $username_exist = User::where('username', $request->validated()['username'])->get()->count();
        if ($username_exist === 1) {
            return response()->json([
                "Status" => "Username taken"
            ], 400);
        }

        $email_exist = User::where('email', $request->validated()['email'])->get()->count();
        if ($email_exist === 1) {
            return response()->json([
                "Status" => "Email taken"
            ], 400);
        }

        $user = $this->user->create($request->validated());
        return UserResource::make($user);
    } //Create

    public function show($id)
    {
        return UserResource::make(User::where('id', $id)->firstOrFail());
    } //list one

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::where('id', $id)->firstOrFail();

        if (isset($request->validated()['username'])) {
            $username_exist = User::where('username', $request->validated()['username'])->get()->count();
            if ($username_exist === 1) {
                return response()->json([
                    "Status" => "Username taken"
                ], 400);
            }
            $user->username = $request->validated()['username'];
        }
        if (isset($request->validated()['email'])) {
            $email_exist = User::where('email', $request->validated()['email'])->get()->count();
            if ($email_exist === 1) {
                return response()->json([
                    "Status" => "Email taken"
                ], 400);
            }
            $user->email = $request->validated()['email'];
        }
        if (isset($request->validated()['password'])) {
            $user->password = bcrypt($request->validated()['password']);
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
    } //update

    public function destroy($id)
    {
        $delete = User::where('id', $id)->delete();

        if ($delete === 1) {
            return response()->json([
                "Message" => "Deleted correctly"
            ], 200);
        } else {
            return response()->json([
                "Status" => "Not found"
            ], 404);
        }
    } //delete

    public function login(LoginUserRequest $request)
    {
        $token = auth()->attempt($request->validated());
        if (!$token) {
            return response()->json([
                "error" => "Unauthorized"
            ], 401);
        }
        if (auth()->user()->type != "admin") {
            return response()->json([
                "error" => "Unauthorized"
            ], 401);
        }

        return response()->json(['token' => $token, 'user' => UserResource::make(auth()->user())]);
    } //login

    public function logout()
    {
        try {
            if (auth()->user() === null) {
                return response()->json(['error' => 'logout error'], 500);
            }
            auth()->logout();
            return response()->json(["Message" => "Logout correctly"]);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'logout error'], 500);
        }
    } //logout

    public function getUserToken()
    {
        try {
            return UserResource::make(auth()->user());
        } catch (\Throwable $th) {
            return response()->json(['error' => 'get user error'], 401);
        }
    }
}//class