<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:8|confirmed',
			'role' => 'required|in:student,mentor',
			'major' => 'required|string|max:255',
		]);

		$user = User::create([
			'name' => $validated['name'],
			'email' => $validated['email'],
			'password' => Hash::make($validated['password']),
		]);

		Profile::create([
			'user_id' => $user->id,
			'role' => $validated['role'],
			'major' => $validated['major'],
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'user' => $user->load('profile'),
			'token' => $token,
		], 201);
	}

	public function login(Request $request)
	{
		$request->validate([
			'email' => 'required|email',
			'password' => 'required',
		]);

		$user = User::where('email', $request->email)->first();

		if (!$user || !Hash::check($request->password, $user->password)) {
			throw ValidationException::withMessages([
				'email' => ['The provided credentials are incorrect.'],
			]);
		}

		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'user' => $user->load('profile'),
			'token' => $token,
		]);
	}

	public function logout(Request $request)
	{
		$request->user()->currentAccessToken()->delete();

		return response()->json(['message' => 'Logged out successfully']);
	}

	public function user(Request $request)
	{
		return response()->json($request->user()->load('profile'));
	}
}
