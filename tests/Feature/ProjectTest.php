<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Project;

class ProjectTest extends TestCase
{
	use RefreshDatabase;

	public function test_user_can_list_projects()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;
		Project::create([
			'title' => 'Test Project',
			'description' => 'Description',
			'owner_id' => $user->id,
		]);

		$response = $this->getJson('/api/projects', [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJsonCount(1);
	}

	public function test_user_can_create_project()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->postJson('/api/projects', [
			'title' => 'New Project',
			'description' => 'New Description',
			'tags' => ['tag1', 'tag2'],
		], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(201)
			->assertJsonPath('title', 'New Project');
	}

	public function test_user_can_join_project()
	{
		$owner = User::factory()->create();
		$project = Project::create([
			'title' => 'Test Project',
			'description' => 'Description',
			'owner_id' => $owner->id,
		]);

		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->postJson("/api/projects/{$project->id}/join", [], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJson(['message' => 'Joined project successfully']);
	}
}
