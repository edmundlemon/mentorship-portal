import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Matchmaking from './pages/Matchmaking';
import ProjectBoards from './pages/ProjectBoards';
import Input from './components/Input';

function Main() {
	const isAuthenticated = !!localStorage.getItem('token');

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
				<Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

				{/* Protected Routes */}
				<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
				<Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
				<Route path="/matchmaking" element={isAuthenticated ? <Matchmaking /> : <Navigate to="/login" />} />
				<Route path="/projects" element={isAuthenticated ? <ProjectBoards /> : <Navigate to="/login" />} />

				<Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
			</Routes>
		</BrowserRouter>
	);
}

if (document.getElementById('app')) {
	const root = ReactDOM.createRoot(document.getElementById('app'));
	root.render(
		<React.StrictMode>
			<Main />
		</React.StrictMode>
	);
}
