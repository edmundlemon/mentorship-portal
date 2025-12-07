<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
	public function index()
	{
		$userId = Auth::id();

		// Get users who have exchanged messages with the current user
		$users = User::whereIn('id', function ($query) use ($userId) {
			$query->select('sender_id')
				->from('messages')
				->where('receiver_id', $userId)
				->union(
					DB::table('messages')
						->select('receiver_id')
						->where('sender_id', $userId)
				);
		})->get();

		return response()->json($users);
	}

	public function show($userId)
	{
		$currentUserId = Auth::id();

		$messages = Message::where(function ($q) use ($currentUserId, $userId) {
			$q->where('sender_id', $currentUserId)
				->where('receiver_id', $userId);
		})->orWhere(function ($q) use ($currentUserId, $userId) {
			$q->where('sender_id', $userId)
				->where('receiver_id', $currentUserId);
		})->orderBy('created_at', 'asc')->get();

		return response()->json($messages);
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'receiver_id' => 'required|exists:users,id',
			'content' => 'required|string',
		]);

		$message = Message::create([
			'sender_id' => Auth::id(),
			'receiver_id' => $validated['receiver_id'],
			'content' => $validated['content'],
		]);

		return response()->json($message, 201);
	}
}
