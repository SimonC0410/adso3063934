<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/', function () {
    //return "This is route: 🍎";
    return view('welcome');
});

Route::get('hello/{name}', function () {
    return "<h1>Hello" . request()->name . "</h1>";
});

Route::get('show/pets', function () {
    $pets = App\Models\Pet::all();
    dd($pets->toArray()); //dump and die
});

Route::get('show/pet/{id}', function () {
    $pet = App\Models\Pet::find(request()->id);
    dd($pet->toArray()); //dump and die
});

Route::get('challenge', function () {
    $users = \App\Models\User::take(20)->get();
    
    $html = '<table border="1" style="border-collapse: collapse; width: 50%;">
        <tr>
            <th>Id</th>
            <th>Foto</th>
            <th>Nombre Completo</th>
            <th>Edad</th>
            <th>Creación</th>
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

Route::get('view/pets', function () {
    $pets = App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});

Route::get('view/pet/{id}', function () {
    $pet = App\Models\Pet::find(request()->id);
    // dd($pet->toArray());
    return view('view-pet')->with('pet', $pet);
});