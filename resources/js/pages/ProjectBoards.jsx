import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Calendar } from 'lucide-react';

export default function ProjectBoards() {
	const navigate = useNavigate();

	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects', {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Accept': 'application/json',
				}
			});
			const data = await response.json();
			setProjects(data);
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch projects', error);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<button
						onClick={() => navigate('/dashboard')}
						className="flex items-center text-gray-600 hover:text-blue-600"
					>
						<ArrowLeft size={20} className="mr-2" /> Back to Dashboard
					</button>

					<button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						<Plus size={20} className="mr-2" /> New Project
					</button>
				</div>

				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Project Boards</h1>
					<p className="text-gray-500 mt-2">Collaborate on innovative STEM projects with your peers.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map(project => (
						<div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
							<div className="flex justify-between items-start mb-4">
								<h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
							</div>

							<p className="text-gray-600 mb-6 line-clamp-3">
								{project.description}
							</p>

							<div className="flex flex-wrap gap-2 mb-6">
								{project.tags.map((tag, index) => (
									<span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
										{tag}
									</span>
								))}
							</div>

							<div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
								<div className="flex items-center">
									<Users size={16} className="mr-1" />
									{project.members} members
								</div>
								<div className="flex items-center">
									<Calendar size={16} className="mr-1" />
									{project.deadline}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
