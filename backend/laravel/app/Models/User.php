<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class User extends Model
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
}
