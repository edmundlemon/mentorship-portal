<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use App\Models\ForumComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
	public function index()
	{
		$posts = ForumPost::with('user')->withCount('comments')->latest()->get();
		return response()->json($posts);
	}

	public function show($id)
	{
		$post = ForumPost::with(['user', 'comments.user'])->findOrFail($id);
		return response()->json($post);
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'content' => 'required|string',
		]);

		$post = Auth::user()->forumPosts()->create($validated);

		return response()->json($post->load('user'), 201);
	}

	public function storeComment(Request $request, $postId)
	{
		$validated = $request->validate([
			'content' => 'required|string',
		]);

		$post = ForumPost::findOrFail($postId);
		$comment = $post->comments()->create([
			'user_id' => Auth::id(),
			'content' => $validated['content'],
		]);

		return response()->json($comment->load('user'), 201);
	}
}
