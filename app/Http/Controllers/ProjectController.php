<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;

class ProjectController extends Controller
{
	public function index()
	{
		$projects = Project::with(['owner', 'members'])->latest()->get();
		return response()->json($projects);
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'description' => 'required|string',
			'deadline' => 'nullable|date',
			'tags' => 'nullable|array',
		]);

		$project = Project::create([
			'title' => $validated['title'],
			'description' => $validated['description'],
			'deadline' => $validated['deadline'],
			'tags' => $validated['tags'],
			'owner_id' => Auth::id(),
		]);

		// Add owner as a member automatically
		$project->members()->attach(Auth::id());

		return response()->json($project->load(['owner', 'members']), 201);
	}

	public function join(Request $request, Project $project)
	{
		$user = Auth::user();

		if (!$project->members()->where('user_id', $user->id)->exists()) {
			$project->members()->attach($user->id);
			return response()->json(['message' => 'Joined project successfully']);
		}

		return response()->json(['message' => 'Already a member'], 409);
	}
}
