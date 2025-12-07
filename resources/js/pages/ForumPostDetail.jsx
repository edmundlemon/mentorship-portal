import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export default function ForumPostDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [comment, setComment] = useState('');

	useEffect(() => {
		loadPost();
	}, [id]);

	const loadPost = async () => {
		try {
			const data = await api.get(`/forum/${id}`);
			setPost(data);
		} catch (error) {
			console.error('Failed to load post', error);
		}
	};

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		try {
			await api.post(`/forum/${id}/comments`, { content: comment });
			setComment('');
			loadPost();
		} catch (error) {
			console.error('Failed to post comment', error);
		}
	};

	if (!post) return <div className="p-6">Loading...</div>;

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<button
				onClick={() => navigate('/forum')}
				className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
			>
				<ArrowLeft className="w-4 h-4 mr-2" />
				Back to Forum
			</button>

			<div className="bg-white p-8 rounded-lg shadow-md mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
				<div className="flex items-center text-sm text-gray-500 mb-6">
					<span>By {post.user.name}</span>
					<span className="mx-2">•</span>
					<span>{new Date(post.created_at).toLocaleDateString()}</span>
				</div>
				<div className="prose max-w-none text-gray-800">
					{post.content}
				</div>
			</div>

			<div className="mb-8">
				<h3 className="text-xl font-semibold mb-4">Comments</h3>
				<div className="space-y-4">
					{post.comments.map((comment) => (
						<div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
							<div className="flex justify-between items-start mb-2">
								<span className="font-medium text-gray-900">{comment.user.name}</span>
								<span className="text-sm text-gray-500">
									{new Date(comment.created_at).toLocaleDateString()}
								</span>
							</div>
							<p className="text-gray-700">{comment.content}</p>
						</div>
					))}
				</div>
			</div>

			<form onSubmit={handleSubmitComment} className="bg-white p-6 rounded-lg shadow-sm">
				<h3 className="text-lg font-medium mb-4">Add a Comment</h3>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
					rows="3"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
					placeholder="Share your thoughts..."
				/>
				<Button type="submit">Post Comment</Button>
			</form>
		</div>
	);
}
