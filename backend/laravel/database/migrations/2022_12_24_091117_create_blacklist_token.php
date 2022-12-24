<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('blacklist_token', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('token')->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('blacklist_token');
    }
};
