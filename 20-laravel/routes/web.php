<?php

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    //return "This is a entry point: 😙";
    return view('welcome');
});

Route::get('hello/perritas/{name}', function () {
    return "<h1>Hello Perritas! 🐶 ".request()->name." </h1>";
});

Route::get('show/pets', function () {
    $pets = \App\Models\Pet::all();
    dd($pets->toArray());

});

Route::get('show/pet/{id}', function () {
    $pet = \App\Models\Pet::find(request()->id);
    dd($pet->toArray());
});


//challenge
Route::get('challenge', function () {
    $users = \App\Models\User::take(20)->get();
    
    $html = '<table border="1" style="border-collapse: collapse; width: 50%;">
        <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Created</th>
        </tr>';
    foreach ($users as $user) {
        $html .= '<tr>
            <td style="text-align: center;">' . $user->id . '</td>
            <td style="text-align: center;"><img src="' . $user->photo . '" width="100"></td>
            <td style="padding: 10px;">' . $user->fullname . '</td>
            <td style="text-align: center;">' . \Carbon\Carbon::parse($user->birthdate)->age . '</td>
            <td style="padding: 10px;">' . $user->created_at->diffForHumans() . '</td>
        </tr>';
    }
    
    $html .= '</table>';
    
    return $html;
});

//
Route::get('view/pets', function () {
    $pets = \App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});




