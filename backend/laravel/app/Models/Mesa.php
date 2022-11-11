<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Mesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_mesa',
        'capacity',
        'photo',
    ];

    public function GetCategory()
    {
        return $this->belongsToMany(Category::class, 'mesas_categorys', 'mesa_id', 'category_id');
    }
}
