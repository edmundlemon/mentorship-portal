<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
	public function update(Request $request)
	{
		$user = Auth::user();

		$validated = $request->validate([
			'bio' => 'nullable|string',
			'skills' => 'nullable|string',
			'interests' => 'nullable|string',
			'major' => 'nullable|string',
		]);

		$user->profile()->updateOrCreate(
			['user_id' => $user->id],
			$validated
		);

		return response()->json([
			'message' => 'Profile updated successfully',
			'user' => $user->load('profile')
		]);
	}
}
