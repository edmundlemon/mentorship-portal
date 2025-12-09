import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Save, Camera, Mail, 
    BookOpen, Hash, Award, User, Sparkles 
} from 'lucide-react';
import {api} from './services/api'; 

export default function Profile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // Safer initial state to prevent crashes if localStorage is empty
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || {};
        } catch {
            return {};
        }
    });

    const [profile, setProfile] = useState({
        bio: '',
        skills: '',
        interests: '',
        major: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Assuming api.getUser returns { profile: ... }
                const response = await api.getUser(token);
				// const response = await api.get('profile');
                if (response && response.profile) {
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
        setIsLoading(true);
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
                // Optional: Use a toast notification library here instead of alert
                alert('Profile updated successfully!');
                
                // Update local user data
                const userData = JSON.parse(localStorage.getItem('user')) || {};
                userData.profile = profile;
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    // Reusable Input Component for cleaner code
    const FormInput = ({ label, icon: Icon, value, onChange, placeholder, type = "text", isTextArea = false }) => (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Icon size={20} />
                </div>
                {isTextArea ? (
                    <textarea
                        value={value}
                        onChange={onChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none min-h-[120px] resize-y text-slate-700 placeholder:text-slate-400"
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                        placeholder={placeholder}
                    />
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header / Nav */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile information and public presence.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Identity Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            {/* Decorative Banner */}
                            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                                <div className="absolute inset-0 bg-white/10 pattern-grid-lg"></div>
                            </div>
                            
                            <div className="px-6 pb-6 text-center relative">
                                {/* Avatar */}
                                <div className="relative -mt-16 mb-4 inline-block">
                                    <div className="h-32 w-32 bg-white rounded-full p-1.5 shadow-lg mx-auto">
                                        <div className="h-full w-full bg-slate-100 rounded-full flex items-center justify-center text-4xl font-bold text-slate-400 overflow-hidden relative group cursor-pointer">
                                            {/* Image placeholder or Initials */}
                                            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={40} />}
                                            
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="text-white" size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors border-2 border-white">
                                        <Camera size={14} />
                                    </button>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900">{user?.name || 'User'}</h2>
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mt-1 mb-6">
                                    <Mail size={14} />
                                    <span>{user?.email || 'No email provided'}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Status</span>
                                        <span className="font-semibold text-emerald-600 flex items-center justify-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Member Since</span>
                                        <span className="font-semibold text-slate-700">2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-slate-100">
                                <Sparkles className="text-indigo-600" size={24} />
                                <h3 className="text-xl font-bold text-slate-900">Profile Details</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                <FormInput 
                                    label="Major / Field of Study"
                                    icon={BookOpen}
                                    value={profile.major}
                                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                                    placeholder="e.g. Computer Science, Mechanical Engineering"
                                />

                                <FormInput 
                                    label="About Me"
                                    icon={User}
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    placeholder="Write a short bio about your academic goals..."
                                    isTextArea
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput 
                                        label="Skills"
                                        icon={Award}
                                        value={profile.skills}
                                        onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                                        placeholder="React, Python, CAD..."
                                    />
                                    <FormInput 
                                        label="Interests"
                                        icon={Hash}
                                        value={profile.interests}
                                        onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                                        placeholder="Robotics, AI, Green Tech..."
                                    />
                                </div>
                                <p className="text-xs text-slate-400 pl-1">
                                    * Separate multiple items with commas
                                </p>

                                <div className="pt-6 flex items-center justify-end gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => navigate('/dashboard')}
                                        className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`
                                            flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-200
                                            transition-all transform hover:-translate-y-0.5
                                            ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                                        `}
                                    >
                                        {isLoading ? (
                                            <>Saving...</>
                                        ) : (
                                            <>
                                                <Save size={20} /> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}