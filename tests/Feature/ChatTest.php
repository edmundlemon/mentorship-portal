<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Message;

class ChatTest extends TestCase
{
	use RefreshDatabase;

	public function test_user_can_send_message()
	{
		$sender = User::factory()->create();
		$receiver = User::factory()->create();
		$token = $sender->createToken('auth_token')->plainTextToken;

		$response = $this->postJson('/api/chat', [
			'receiver_id' => $receiver->id,
			'content' => 'Hello!',
		], [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(201)
			->assertJsonPath('content', 'Hello!');
	}

	public function test_user_can_list_conversations()
	{
		$user1 = User::factory()->create();
		$user2 = User::factory()->create();
		$token = $user1->createToken('auth_token')->plainTextToken;

		Message::create([
			'sender_id' => $user1->id,
			'receiver_id' => $user2->id,
			'content' => 'Hi',
		]);

		$response = $this->getJson('/api/chat', [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJsonCount(1);
	}

	public function test_user_can_view_messages()
	{
		$user1 = User::factory()->create();
		$user2 = User::factory()->create();
		$token = $user1->createToken('auth_token')->plainTextToken;

		Message::create([
			'sender_id' => $user1->id,
			'receiver_id' => $user2->id,
			'content' => 'Hi',
		]);

		$response = $this->getJson("/api/chat/{$user2->id}", [
			'Authorization' => 'Bearer ' . $token,
		]);

		$response->assertStatus(200)
			->assertJsonCount(1);
	}
}
