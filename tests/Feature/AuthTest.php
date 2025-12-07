<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
	use RefreshDatabase;

	public function test_user_can_register()
	{
		$response = $this->postJson('/api/register', [
			'name' => 'New User',
			'email' => 'new@example.com',
			'password' => 'password',
			'password_confirmation' => 'password',
			'role' => 'student',
			'major' => 'Computer Science',
		]);

		$response->assertStatus(201)
			->assertJsonStructure(['user', 'token']);
	}

	public function test_user_can_login()
	{
		$user = User::factory()->create([
			'password' => bcrypt('password'),
		]);

		$response = $this->postJson('/api/login', [
			'email' => $user->email,
			'password' => 'password',
		]);

		$response->assertStatus(200)
			->assertJsonStructure(['user', 'token']);
	}

	public function test_user_can_logout()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->postJson('/api/logout', [], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJson(['message' => 'Logged out successfully']);
	}

	public function test_user_can_get_profile()
	{
		$user = User::factory()->create();
		$token = $user->createToken('auth_token')->plainTextToken;

		$response = $this->getJson('/api/user', [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJson(['id' => $user->id, 'email' => $user->email]);
	}
}
