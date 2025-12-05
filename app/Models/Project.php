<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
	protected $fillable = ['title', 'description', 'deadline', 'owner_id', 'tags'];

	protected $casts = [
		'tags' => 'array',
		'deadline' => 'date',
	];

	public function owner()
	{
		return $this->belongsTo(User::class, 'owner_id');
	}

	public function members()
	{
		return $this->belongsToMany(User::class, 'project_members');
	}
}
