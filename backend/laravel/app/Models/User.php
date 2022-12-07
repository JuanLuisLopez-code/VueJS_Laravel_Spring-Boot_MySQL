<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//https://laravel-jwt-auth.readthedocs.io/en/latest/
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
    } //create

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
