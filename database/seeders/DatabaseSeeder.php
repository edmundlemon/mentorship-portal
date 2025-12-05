<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	use WithoutModelEvents;

	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		// Create 5 Mentors
		$mentors = User::factory(5)->create()->each(function ($user) {
			$user->profile()->create([
				'bio' => 'Experienced mentor in tech.',
				'skills' => 'PHP, Laravel, JavaScript',
				'interests' => 'Teaching, Coding',
				'major' => 'Computer Science',
			]);
		});

		// Create 5 Mentees
		$mentees = User::factory(5)->create()->each(function ($user) {
			$user->profile()->create([
				'bio' => 'Student looking for mentorship.',
				'skills' => 'HTML, CSS',
				'interests' => 'Learning, Web Development',
				'major' => 'Software Engineering',
			]);
		});

		// Create a specific test user for manual login
		$testUser = User::factory()->create([
			'name' => 'Test User',
			'email' => 'test@example.com',
			'password' => bcrypt('password'),
		]);
		$testUser->profile()->create([
			'bio' => 'I am the main test user.',
			'skills' => 'Testing, Debugging',
			'interests' => 'Quality Assurance',
			'major' => 'Information Technology',
		]);

		// Create Projects
		\App\Models\Project::create([
			'title' => 'Build a Mentorship Portal',
			'description' => 'A web app to connect mentors and mentees.',
			'deadline' => now()->addMonth(),
			'tags' => ['laravel', 'vue', 'tailwind'],
			'owner_id' => $mentors->first()->id,
		])->members()->attach($mentors->first()->id);

		\App\Models\Project::create([
			'title' => 'AI Research Group',
			'description' => 'Researching LLMs and Agents.',
			'deadline' => now()->addMonths(3),
			'tags' => ['python', 'ai', 'ml'],
			'owner_id' => $mentees->first()->id,
		])->members()->attach($mentees->first()->id);

		// Create Matches
		// Test User likes a mentor
		\App\Models\UserMatch::create([
			'user_id' => $testUser->id,
			'candidate_id' => $mentors->first()->id,
			'status' => 'liked',
		]);

		// A mentor likes Test User (Mutual Match)
		\App\Models\UserMatch::create([
			'user_id' => $mentors->last()->id,
			'candidate_id' => $testUser->id,
			'status' => 'liked',
		]);
		\App\Models\UserMatch::create([
			'user_id' => $testUser->id,
			'candidate_id' => $mentors->last()->id,
			'status' => 'liked',
		]);
	}
}
