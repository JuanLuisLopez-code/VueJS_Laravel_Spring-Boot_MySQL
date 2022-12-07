<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;
    protected $fillable = [
        'username',
        'password',
        'email',
        'type',
        'is_active',
        'photo',
    ];

    protected $hidden = [
        'password'
    ];

    public function create($fields)
    {
        return parent::create([
            'username' => $fields['username'],
            'password' => password_hash(strval($fields['password']), PASSWORD_DEFAULT, ['cost' => 12]),
            'email' => $fields['email'],
            'type' => 'client',
            'is_active' => true,
            'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
        ]);
    }

    public function login()
    {
        $credentials = request(['username', 'password']);
        $token = auth()->attempt($credentials);
        return $token;
    }

    // public function logout()
    // {
    //     auth()->logout();

    //     return response()->json(['message' => 'Successfully logged out']);
    // }


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
