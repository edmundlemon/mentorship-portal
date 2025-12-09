import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { api} from './services/api'; // Assuming your API service is in '../api'

export default function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [profile, setProfile] = useState({
		bio: '',
		skills: '',
		interests: '',
		major: ''
	});

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await api.getUser(localStorage.getItem('token'));
				if (response.profile) {
					setProfile({
						bio: response.profile.bio || '',
						skills: response.profile.skills || '',
						interests: response.profile.interests || '',
						major: response.profile.major || ''
					});
				}
			} catch (error) {
				console.error('Failed to fetch profile', error);
			}
		};
		fetchProfile();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Accept': 'application/json',
				},
				body: JSON.stringify(profile)
			});

			if (response.ok) {
				alert('Profile updated successfully!');
				// Update local user data
				const userData = JSON.parse(localStorage.getItem('user'));
				userData.profile = profile;
				localStorage.setItem('user', JSON.stringify(userData));
			}
		} catch (error) {
			console.error('Failed to update profile', error);
			alert('Failed to update profile');
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-2xl mx-auto">
				<button
					onClick={() => navigate('/dashboard')}
					className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
				>
					<ArrowLeft size={20} className="mr-2" /> Back to Dashboard
				</button>

				<div className="bg-white rounded-2xl shadow-sm p-8">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
							<p className="text-gray-500">{user?.name} - {user?.email}</p>
						</div>
						<div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
							{user?.name?.charAt(0)}
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Major / Field of Study</label>
							<input
								type="text"
								value={profile.major}
								onChange={(e) => setProfile({ ...profile, major: e.target.value })}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="e.g. Computer Science"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
							<textarea
								value={profile.bio}
								onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
								placeholder="Tell us about yourself..."
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
							<input
								type="text"
								value={profile.skills}
								onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="React, Python, Data Analysis..."
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
							<input
								type="text"
								value={profile.interests}
								onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="AI, Robotics, Space..."
							/>
						</div>

						<button
							type="submit"
							className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<Save size={20} className="mr-2" /> Save Profile
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
