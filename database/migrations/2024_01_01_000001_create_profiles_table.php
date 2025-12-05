<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up(): void
	{
		Schema::create('profiles', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');
			$table->enum('role', ['student', 'mentor'])->default('student');
			$table->string('major')->nullable(); // e.g., Computer Science, Biology
			$table->text('bio')->nullable();
			$table->json('skills')->nullable(); // Array of skills
			$table->json('interests')->nullable(); // Array of research interests
			$table->boolean('is_available')->default(true); // For mentors
			$table->timestamps();
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('profiles');
	}
};
