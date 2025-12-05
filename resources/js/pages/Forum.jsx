import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Forum() {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState({ title: '', content: '' });
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		try {
			const data = await api.get('forum');
			setPosts(data);
		} catch (error) {
			console.error('Failed to load posts', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post('/forum', newPost);
			setNewPost({ title: '', content: '' });
			setShowForm(false);
			loadPosts();
		} catch (error) {
			console.error('Failed to create post', error);
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
				<Button onClick={() => setShowForm(!showForm)}>
					{showForm ? 'Cancel' : 'New Post'}
				</Button>
			</div>

			{showForm && (
				<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
					<Input
						label="Title"
						value={newPost.title}
						onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
						required
					/>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
						<textarea
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							rows="4"
							value={newPost.content}
							onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
							required
						/>
					</div>
					<Button type="submit">Post Discussion</Button>
				</form>
			)}

			<div className="space-y-4">
				{posts.map((post) => (
					<Link
						key={post.id}
						to={`/forum/${post.id}`}
						className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
					>
						<h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
						<p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
						<div className="mt-4 flex items-center text-sm text-gray-500">
							<span>By {post.user.name}</span>
							<span className="mx-2">•</span>
							<span>{new Date(post.created_at).toLocaleDateString()}</span>
							<span className="mx-2">•</span>
							<span>{post.comments_count} comments</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
