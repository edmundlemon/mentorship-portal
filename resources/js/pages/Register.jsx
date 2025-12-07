import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { api } from '../services/api';

export default function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		role: 'student',
		major: ''
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		try {
			const response = await api.register(formData);
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			navigate('/dashboard');
		} catch (error) {
			setErrors(error.errors || { email: error.message || 'Registration failed' });
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
			<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Join STEM Portal
					</h1>
					<p className="text-gray-600 mt-2">Create your account to get started</p>
				</div>

				<form onSubmit={handleSubmit}>
					<Input
						label="Full Name"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						error={errors.name}
						placeholder="John Doe"
						required
					/>

					<Input
						label="Email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						error={errors.email}
						placeholder="you@university.edu"
						required
					/>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							I am a
						</label>
						<div className="grid grid-cols-2 gap-4">
							<button
								type="button"
								onClick={() => setFormData({ ...formData, role: 'student' })}
								className={`p-4 rounded-lg border-2 transition-all ${formData.role === 'student'
										? 'border-blue-600 bg-blue-50'
										: 'border-gray-300 hover:border-gray-400'
									}`}
							>
								<div className="text-2xl mb-1">🎓</div>
								<div className="font-medium">Student</div>
							</button>
							<button
								type="button"
								onClick={() => setFormData({ ...formData, role: 'mentor' })}
								className={`p-4 rounded-lg border-2 transition-all ${formData.role === 'mentor'
										? 'border-purple-600 bg-purple-50'
										: 'border-gray-300 hover:border-gray-400'
									}`}
							>
								<div className="text-2xl mb-1">👨‍🏫</div>
								<div className="font-medium">Mentor</div>
							</button>
						</div>
					</div>

					<Input
						label="Major / Field"
						type="text"
						name="major"
						value={formData.major}
						onChange={handleChange}
						error={errors.major}
						placeholder="Computer Science"
						required
					/>

					<Input
						label="Password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						error={errors.password}
						placeholder="••••••••"
						required
					/>

					<Input
						label="Confirm Password"
						type="password"
						name="password_confirmation"
						value={formData.password_confirmation}
						onChange={handleChange}
						error={errors.password_confirmation}
						placeholder="••••••••"
						required
					/>

					<Button type="submit" className="w-full mb-4" disabled={loading}>
						{loading ? 'Creating Account...' : 'Create Account'}
					</Button>

					<div className="text-center">
						<p className="text-gray-600">
							Already have an account?{' '}
							<button
								type="button"
								onClick={() => navigate('/login')}
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								Sign In
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
