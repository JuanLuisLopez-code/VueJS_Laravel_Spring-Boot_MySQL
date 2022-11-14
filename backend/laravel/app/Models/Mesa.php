<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_mesa',
        'capacity',
        'is_active',
        'photo',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'mesas_categories', 'mesa_id', 'category_id');
    }
}
