<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
	use HasFactory;

	protected $fillable = [
		'user_id',
		'role',
		'major',
		'bio',
		'skills',
		'interests',
		'is_available',
	];

	protected $casts = [
		'skills' => 'array',
		'interests' => 'array',
		'is_available' => 'boolean',
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
