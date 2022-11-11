<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mesa;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_category',
        'photo',
    ];

    public function GetMesas()
    {
        return $this->belongsToMany(Mesa::class, 'mesas_categorys', 'category_id', 'mesa_id');
    }
}
