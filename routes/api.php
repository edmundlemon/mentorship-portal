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
	Route::get('/matches/matched', [App\Http\Controllers\MatchController::class, 'matches']);

	// Projects
	Route::get('/projects', [App\Http\Controllers\ProjectController::class, 'index']);
	Route::post('/projects', [App\Http\Controllers\ProjectController::class, 'store']);
	Route::post('/projects/{project}/join', [App\Http\Controllers\ProjectController::class, 'join']);

	// Forum
	Route::get('/forum', [App\Http\Controllers\ForumController::class, 'index']);
	Route::post('/forum', [App\Http\Controllers\ForumController::class, 'store']);
	Route::get('/forum/{id}', [App\Http\Controllers\ForumController::class, 'show']);
	Route::post('/forum/{id}/comments', [App\Http\Controllers\ForumController::class, 'storeComment']);

	// Chat
	Route::get('/chat', [App\Http\Controllers\ChatController::class, 'index']);
	Route::get('/chat/{userId}', [App\Http\Controllers\ChatController::class, 'show']);
	Route::post('/chat', [App\Http\Controllers\ChatController::class, 'store']);
});
