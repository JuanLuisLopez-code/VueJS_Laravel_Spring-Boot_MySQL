<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Mesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_mesa',
        'capacity',
        'is_active',
        'photo',
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'mesas_categories', 'mesa_id', 'category_id');
    }
}
