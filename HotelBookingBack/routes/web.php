<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard.login');
});

require __DIR__.'/dashboard.php';
