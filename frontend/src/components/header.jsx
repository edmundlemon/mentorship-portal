import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { 
    Bell, MessageSquare, User, LogOut, 
    Settings, ChevronDown, Menu, Loader2 
} from "lucide-react";
import { api } from '../services/api';

export default function Header() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation(); // To check active route

    const isLoggedIn = !!localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')) || {};

    // Navigation Configuration
    const navItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Match Making", path: "/matchmaking" },
        { label: "Projects", path: "/projects-directory" },
        { label: "Forum", path: "/forum" }, // Renamed from Community
    ];

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true); 
        try {
            const token = localStorage.getItem('token');
            if (token) await api.logout(token);
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setProfileMenuOpen(false);
            window.location.href = '/login'; 
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* LEFT: Logo + Nav */}
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                                STEM <span className="text-indigo-600">Connect</span>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex gap-8">
                            {navItems.map((item) => (
                                <li 
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        cursor-pointer text-sm font-medium transition-colors duration-200
                                        ${location.pathname === item.path 
                                            ? 'text-indigo-600' 
                                            : 'text-slate-600 hover:text-indigo-600'}
                                    `}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT: User Controls */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-4 border-r border-slate-200 pr-4 sm:pr-6">
                                    <button 
                                        className="relative text-slate-500 hover:text-indigo-600 transition-colors"
                                        onClick={() => navigate('/notifications')} // Optional route
                                    >
                                        <Bell size={20} />
                                    </button>
                                    <button 
                                        className="relative text-slate-500 hover:text-indigo-600 transition-colors"
                                        onClick={() => navigate('/chat')}
                                    >
                                        <MessageSquare size={20} />
                                    </button>
                                </div>

                                <div className="relative" ref={menuRef}>
                                    <button 
                                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                        className="flex items-center gap-3 focus:outline-none"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-sm uppercase">
                                                {user.name ? user.name.charAt(0) : 'U'}
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <p className="text-sm font-semibold text-slate-900 leading-none">{user.name || 'User'}</p>
                                            <p className="text-xs text-slate-500 mt-1">Student</p>
                                        </div>
                                        <ChevronDown size={16} className="text-slate-400" />
                                    </button>

                                    {profileMenuOpen && (
                                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                                            <div className="px-4 py-3 border-b border-slate-100 mb-2">
                                                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            </div>
                                            <button onClick={() => navigate('/profile')} className="w-full px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 flex items-center gap-2">
                                                <User size={16} /> My Profile
                                            </button>
                                            <div className="border-t border-slate-100 mt-2 pt-2">
                                                <button onClick={handleLogout} disabled={isLoggingOut} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                    {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <button onClick={() => navigate('/login')} className="text-slate-600 hover:text-indigo-600 font-medium text-sm">Log In</button>
                                <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl">Sign Up</button>
                            </div>
                        )}
                        <button className="md:hidden text-slate-600 ml-2"><Menu size={24} /></button>
                    </div>
                </div>
            </div>
        </header>
    );
}