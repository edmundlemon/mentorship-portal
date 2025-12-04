<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
	Route::get('/user', [AuthController::class, 'user']);
	Route::post('/logout', [AuthController::class, 'logout']);

	// Profile
	Route::post('/profile', [App\Http\Controllers\ProfileController::class, 'update']);

	// Matchmaking
	Route::get('/matches/candidates', [App\Http\Controllers\MatchController::class, 'candidates']);
	Route::post('/matches/swipe', [App\Http\Controllers\MatchController::class, 'swipe']);

	// Projects
	Route::get('/projects', [App\Http\Controllers\ProjectController::class, 'index']);
	Route::post('/projects', [App\Http\Controllers\ProjectController::class, 'store']);
	Route::post('/projects/{project}/join', [App\Http\Controllers\ProjectController::class, 'join']);
});
