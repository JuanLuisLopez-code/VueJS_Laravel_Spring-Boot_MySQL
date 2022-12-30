<?php
// https://laravel.com/docs/9.x/filesystem
// php artisan storage:link
namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileUploader
{

    public static function store($file, $type = 'default')
    {
        if ($file) {
            $file_name =  Storage::disk('public')->put($type, $file);
            return asset('storage/' . $file_name);
        } else {
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cat_on_its_back.jpg/1280px-Cat_on_its_back.jpg';
        }
    }

    public static function delete($file_URL)
    {
        $split = explode('/', $file_URL);
        $path = $split[count($split) - 2] . '/' . $split[count($split) - 1];
        return Storage::disk('public')->delete($path);
    }

    public static function update($file, $old)
    {
        $URL =  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cat_on_its_back.jpg/1280px-Cat_on_its_back.jpg';
        $split = explode('/', $old);
        $type = $split[count($split) - 2];
        $delete = self::delete($old);
        if ($delete) {
            $URL =  self::store($file, $type);
        }
        return $URL;
    }
}
