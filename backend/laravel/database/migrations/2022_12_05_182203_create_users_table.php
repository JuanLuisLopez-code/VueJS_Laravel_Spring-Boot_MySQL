<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('type');
            $table->string('photo');
            $table->boolean('is_active');
        });
    }


    public function down()
    {
        Schema::dropIfExists('users');
    }
};
