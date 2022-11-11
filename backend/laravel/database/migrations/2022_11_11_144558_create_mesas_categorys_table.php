<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mesas_categorys', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('mesa_id')->constrained('mesas')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categorys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mesas_categorys');
    }
};
