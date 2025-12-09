<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserMatch;

class MatchController extends Controller
{
	public function candidates(Request $request)
	{
		$user = Auth::user();

		// Get IDs of users already swiped on
		$swipedIds = UserMatch::where('user_id', $user->id)->pluck('candidate_id')->toArray();
		$swipedIds[] = $user->id; // Exclude self

		// Get candidates (opposite role preferred, but can be same for peer mentorship)
		$candidates = User::with('profile')
			->whereNotIn('id', $swipedIds)
			->whereHas('profile', function ($q) use ($user) {
				// Simple logic: if mentor, show students; if student, show mentors
				// For now, just show everyone else
			})
			->with('projectsOwned') // Eager load projects owned by the user
			->limit(10)
			->get();

		return response()->json($candidates);
	}

	public function swipe(Request $request)
	{
		$request->validate([
			'candidate_id' => 'required|exists:users,id',
			'direction' => 'required|in:right,left',
		]);

		$user = Auth::user();
		$status = $request->direction === 'right' ? 'liked' : 'passed';

		$match = UserMatch::create([
			'user_id' => $user->id,
			'candidate_id' => $request->candidate_id,
			'status' => $status,
		]);

		// Check for mutual match
		if ($status === 'liked') {
			$mutual = UserMatch::where('user_id', $request->candidate_id)
				->where('candidate_id', $user->id)
				->where('status', 'liked')
				->first();

			if ($mutual) {
				$match->update(['status' => 'matched']);
				$mutual->update(['status' => 'matched']);
				return response()->json(['message' => 'It\'s a Match!', 'matched' => true]);
			}
		}

		return response()->json(['message' => 'Swipe recorded', 'matched' => false]);
	}

	public function matches(Request $request)
	{
		$user = Auth::user();

		$matches = UserMatch::where('user_id', $user->id)
			->where('status', 'matched')
			->with('candidate.profile')
			->get();

		return response()->json($matches);
	}
}
