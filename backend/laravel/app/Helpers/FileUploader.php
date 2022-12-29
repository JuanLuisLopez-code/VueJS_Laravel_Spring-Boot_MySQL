<?php
// https://laravel.com/docs/9.x/filesystem
// php artisan storage:link
namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileUploader
{

    public static function store($file, $type)
    {
        if ($file) {
            $file_name =  Storage::disk('public')->put($type, $file);
            return asset('storage/' . $file_name);
        }
    }

    public static function update($field, $file, $title, $loc, $old)
    {
    }

    public static function delete($file)
    {
    }
}
