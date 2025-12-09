import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowRight, Users, Lightbulb, GraduationCap, 
    TrendingUp, Sparkles, Briefcase, Zap, Loader2 
} from 'lucide-react';

// ✅ FIX 1: Uncomment this and ensure the path matches your project structure
// If your api.js is in src/services/api.js, this path is correct:
import { api } from './services/api'; 

export default function Dashboard() {
    const navigate = useNavigate();
    
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true); 
        try {
            const response = await api.get('projects'); 
            setProjects(response.data || response); 
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false); 
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Open': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'In-progress': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Closed': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const ToolCard = ({ title, desc, icon: Icon, color, onClick }) => (
        <button 
            onClick={onClick}
            className="flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left group w-full"
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* ... (Hero Section remains unchanged) ... */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium">
                                <Sparkles size={16} />
                                <span>The #1 STEM Collaboration Hub</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                Connect. <br /> Collaborate. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-400">Innovate.</span>
                            </h1>
                            <p className="text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Join a community of over 10,000 students and researchers building the future of science and technology.
                            </p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                <button onClick={() => navigate('/projects-directory')} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                                    Find a Project <ArrowRight size={20} />
                                </button>
                                <button onClick={() => navigate('/mentors-directory')} className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 rounded-xl font-bold text-lg transition-all">
                                    Find a Mentor
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-lg lg:max-w-none">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 translate-y-8">
                                    <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 text-indigo-600">
                                        <Users size={40} className="mb-4" />
                                        <div className="text-3xl font-bold text-slate-900">10k+</div>
                                        <div className="text-sm font-medium opacity-80">Active Students</div>
                                    </div>
                                    <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 text-amber-600">
                                        <Lightbulb size={40} className="mb-4" />
                                        <div className="text-3xl font-bold text-slate-900">500+</div>
                                        <div className="text-sm font-medium opacity-80">Ideas Launched</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 text-teal-600">
                                        <GraduationCap size={40} className="mb-4" />
                                        <div className="text-3xl font-bold text-slate-900">1.2k</div>
                                        <div className="text-sm font-medium opacity-80">Expert Mentors</div>
                                    </div>
                                    <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 text-slate-600">
                                        <TrendingUp size={40} className="mb-4" />
                                        <div className="text-3xl font-bold text-slate-900">98%</div>
                                        <div className="text-sm font-medium opacity-80">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 mt-16">
                
                {/* 1. TOOLS SECTION */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="text-indigo-600" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900">Explore Tools</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ToolCard title="Mentor Match" desc="Swipe to find your perfect mentor based on skills and interests." icon={Users} color="bg-pink-50 text-pink-600" onClick={() => navigate('/matchmaking')} />
                        <ToolCard title="Project Board" desc="Find open research positions and hackathon teams." icon={Briefcase} color="bg-emerald-50 text-emerald-600" onClick={() => navigate('/projects-directory')} />
                        <ToolCard title="Skill Up" desc="Take assessments to earn badges and verify your skills." icon={Zap} color="bg-amber-50 text-amber-600" onClick={() => console.log("Navigate to skills")} />
                    </div>
                </section>

                {/* 2. PROJECTS SECTION */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Latest Opportunities</h2>
                            <p className="text-slate-500 mt-2">Join groundbreaking projects and gain experience.</p>
                        </div>
                        <button onClick={() => navigate("/projects-directory")} className="hidden sm:flex items-center gap-1 text-indigo-600 font-bold hover:gap-2 transition-all">
                            View all projects <ArrowRight size={18} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="animate-spin text-indigo-600" size={48} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.length > 0 ? projects.map((project) => (
                                <div key={project.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                        
                                        {/* ✅ FIX 2: Handle Author as Object or String safely */}
                                        <span className="text-slate-400 text-xs font-medium">
                                            {typeof project.author === 'object' ? project.author?.name : project.author}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                                    <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs font-semibold mb-1">
                                                <span className="text-slate-500 flex items-center gap-1">
                                                    <Users size={14} /> Team Size
                                                </span>
                                                <span className={(project.members?.length || 0) >= project.maxMembers ? 'text-red-500' : 'text-indigo-600'}>
                                                    {project.members ? project.members.length : 0} / {project.maxMembers}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div 
                                                    className="bg-indigo-600 h-2 rounded-full transition-all" 
                                                    style={{ width: `${((project.members?.length || 0) / project.maxMembers) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div className="flex gap-2">
                                                {/* Ensure tags exist before mapping */}
                                                {project.tags && Array.isArray(project.tags) && project.tags.slice(0, 2).map((tag, idx) => (
                                                    <span key={idx} className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                                                        {/* Handle case where tag might be an object */}
                                                        #{typeof tag === 'object' ? tag.name : tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <button className="text-sm font-bold text-indigo-600 hover:underline">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-2 text-center py-10 text-slate-500">
                                    No projects found at the moment.
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}