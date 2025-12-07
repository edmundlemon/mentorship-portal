import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { api } from '../services/api';

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		try {
			const response = await api.login(formData);
			console.log(response);
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			navigate('/forum');
		} catch (error) {
			setErrors(error.errors || { email: error.message || 'Login failed' });
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
						Welcome Back
					</h1>
					<p className="text-gray-600 mt-2">Sign in to continue your journey</p>
				</div>

				<form onSubmit={handleSubmit}>
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

					<Button type="submit" className="w-full mb-4" disabled={loading}>
						{loading ? 'Signing In...' : 'Sign In'}
					</Button>

					<div className="text-center">
						<p className="text-gray-600">
							Don't have an account?{' '}
							<button
								type="button"
								onClick={() => navigate('/register')}
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								Sign Up
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
