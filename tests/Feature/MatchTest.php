<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\UserMatch;

class MatchTest extends TestCase
{
	use RefreshDatabase;

	public function test_user_can_list_candidates()
	{
		$user = User::factory()->create();
		$candidate = User::factory()->create();
		$candidate->profile()->create(['bio' => 'Candidate']);

		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->getJson('/api/matches/candidates', [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJsonCount(1);
	}

	public function test_user_can_swipe_right()
	{
		$user = User::factory()->create();
		$candidate = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->postJson('/api/matches/swipe', [
			'candidate_id' => $candidate->id,
			'direction' => 'right',
		], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJson(['message' => 'Swipe recorded', 'matched' => false]);
	}

	public function test_mutual_match()
	{
		$user = User::factory()->create();
		$candidate = User::factory()->create();

		// Candidate already liked User
		UserMatch::create([
			'user_id' => $candidate->id,
			'candidate_id' => $user->id,
			'status' => 'liked',
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->postJson('/api/matches/swipe', [
			'candidate_id' => $candidate->id,
			'direction' => 'right',
		], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJson(['message' => 'It\'s a Match!', 'matched' => true]);
	}
}
