<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;

Route::group(['middleware' => ['admin']], function () {
    Route::resource('mesa', MesaController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('user', UserController::class);
    Route::resource('reservation', ReservationController::class);
});


Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);
Route::get('profile', [UserController::class, 'getUserToken']);
Route::get('isAdmin', [UserController::class, 'isAdmin']);
