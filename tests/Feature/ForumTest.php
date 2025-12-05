<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\ForumPost;

class ForumTest extends TestCase
{
	use RefreshDatabase;

	public function test_user_can_list_forum_posts()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;
		ForumPost::create([
			'user_id' => $user->id,
			'title' => 'Test Post',
			'content' => 'Content',
		]);

		$response = $this->getJson('/api/forum', [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJsonCount(1);
	}

	public function test_user_can_create_forum_post()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->postJson('/api/forum', [
			'title' => 'New Discussion',
			'content' => 'Discussion Content',
		], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(201)
			->assertJsonPath('title', 'New Discussion');
	}

	public function test_user_can_comment_on_post()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;
		$post = ForumPost::create([
			'user_id' => $user->id,
			'title' => 'Test Post',
			'content' => 'Content',
		]);

		$response = $this->postJson("/api/forum/{$post->id}/comments", [
			'content' => 'Nice post!',
		], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(201)
			->assertJsonPath('content', 'Nice post!');
	}
}
