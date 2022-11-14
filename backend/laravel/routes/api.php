<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MesaController;


Route::resource('mesa', MesaController::class);
Route::resource('category', CategoryController::class);
