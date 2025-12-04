import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { LogOut, User, Heart, Briefcase, MessageSquare } from 'lucide-react';

export default function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const handleLogout = async () => {
		try {
			await api.logout(localStorage.getItem('token'));
		} catch (error) {
			console.error('Logout failed', error);
		} finally {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.location.href = '/login';
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								STEM Portal
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-gray-700">Welcome, {user?.name}</span>
							<button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
								<LogOut size={20} />
							</button>
						</div>
					</div>
				</div>
			</nav>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<DashboardCard
						title="Profile"
						icon={<User className="text-blue-500" size={24} />}
						description="Update your bio, skills, and interests"
						onClick={() => navigate('/profile')}
					/>
					<DashboardCard
						title="Matchmaking"
						icon={<Heart className="text-pink-500" size={24} />}
						description="Find your perfect mentor or mentee"
						onClick={() => navigate('/matchmaking')}
					/>
					<DashboardCard
						title="Projects"
						icon={<Briefcase className="text-purple-500" size={24} />}
						description="Collaborate on STEM projects"
						onClick={() => navigate('/projects')}
					/>
					<DashboardCard
						title="Forums"
						icon={<MessageSquare className="text-green-500" size={24} />}
						description="Join the discussion"
						onClick={() => navigate('/forums')}
					/>
				</div>
			</div>
		</div>
	);
}

function DashboardCard({ title, icon, description, onClick }) {
	return (
		<div
			onClick={onClick}
			className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				{icon}
			</div>
			<p className="text-gray-600">{description}</p>
		</div>
	);
}
