import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { 
    Search, MapPin, Filter, BadgeCheck, 
    Briefcase, Sparkles, SlidersHorizontal 
} from 'lucide-react';

export default function MentorsDirectory() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    // MOCK DATA (Replace with API fetch below when backend route exists)
    const MOCK_MENTORS = [
        {
            id: 1,
            name: "Dr. Alice Johnson",
            role: "AI Research Lead",
            institution: "MIT",
            expertise: ["Machine Learning", "Neural Networks"],
            available: true,
            avatar: "https://randomuser.me/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Prof. Mark Smith",
            role: "Cybersecurity Analyst",
            institution: "Stanford",
            expertise: ["Cybersecurity", "Ethical Hacking"],
            available: false,
            avatar: "https://randomuser.me/portraits/men/46.jpg"
        },
        // ... add more mock data as needed
    ];

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        // TO DO: Create Route::get('/mentors', ...) in Laravel
        // try {
        //     const data = await api.get('mentors');
        //     setMentors(data);
        // } catch (error) { ... }
        
        // Simulating API call
        setTimeout(() => {
            setMentors(MOCK_MENTORS);
            setLoading(false);
        }, 800);
    };

    // Filter Logic
    const filteredMentors = mentors.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || mentor.expertise.includes(filter);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-slate-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-slate-900">Find a Mentor</h1>
                    <p className="text-slate-500 mt-2 max-w-2xl">
                        Connect with industry experts and researchers who can guide your STEM journey.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search by name, role, or institution..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Machine Learning', 'Cybersecurity', 'Big Data'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    filter === cat 
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                        <button className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* Mentors Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredMentors.map((mentor) => (
                            <div key={mentor.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col">
                                
                                {/* Cover / Avatar */}
                                <div className="h-24 bg-gradient-to-r from-slate-100 to-slate-200 relative">
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                        <div className="relative">
                                            <img 
                                                src={mentor.avatar} 
                                                alt={mentor.name} 
                                                className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover"
                                            />
                                            {mentor.available && (
                                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Available for mentorship"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-12 pb-6 px-6 text-center flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-1">
                                        {mentor.name}
                                        <BadgeCheck size={16} className="text-blue-500" />
                                    </h3>
                                    <p className="text-sm font-medium text-indigo-600 mb-1">{mentor.role}</p>
                                    <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-4">
                                        <MapPin size={12} /> {mentor.institution}
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                        {mentor.expertise.slice(0, 3).map((skill, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto grid grid-cols-2 gap-3">
                                        <button className="py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
                                            Profile
                                        </button>
                                        <button className="py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}