import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './services/api';
import { 
    Search, Plus, Filter, Users, Calendar, 
    ArrowRight, Loader2, X, Tag, Save 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProjectsDirectory() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [joiningId, setJoiningId] = useState(null);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        deadline: '',
        tags: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    // --- UPDATED FETCH FUNCTION ---
    const fetchProjects = async () => {
        setLoading(true); // 1. Start Loading Effect
        try {
            const data = await api.get('/projects');
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false); // 2. Stop Loading Effect
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            const formattedTags = newProject.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const payload = {
                ...newProject,
                tags: formattedTags
            };

            await api.post('/projects', payload);
            
            toast.success("Project created successfully!");
            
            // Reset and close
            setNewProject({ title: '', description: '', deadline: '', tags: '' });
            setShowCreateModal(false);
            
            // This will now trigger the Skeleton Loading effect!
            await fetchProjects();

        } catch (error) {
            console.error("Failed to create", error);
            toast.error("Failed to create project.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleJoin = async (projectId) => {
        setJoiningId(projectId);
        try {
            await api.post(`/projects/${projectId}/join`);
            toast.success("Joined project!");
            // Optional: You can remove await here if you don't want the whole page to reload for a simple join
            fetchProjects(); 
        } catch (error) {
            toast.error("Could not join project.");
        } finally {
            setJoiningId(null);
        }
    };

    const filteredProjects = projects.filter(p => 
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 py-8 relative">
            <Toaster position="top-right" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Explore Projects</h1>
                        <p className="text-slate-500 mt-2">Discover active research and collaboration opportunities.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)} 
                        className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus size={20} className="mr-2" /> Create Project
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search projects by title, keyword, or tag..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    // LOADING SKELETON EFFECT
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse border border-slate-300">
                                <div className="h-full w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 opacity-50"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full animate-in fade-in zoom-in duration-300">
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {project.tags && project.tags.map((tag, i) => (
                                                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-3">{project.description}</p>

                                    <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <Users size={16} /> <span className="font-medium">{project.members ? project.members.length : 0}</span>
                                            </div>
                                            {project.deadline && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={16} /> <span>{new Date(project.deadline).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                                    <button 
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                        className="flex-1 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => handleJoin(project.id)}
                                        disabled={joiningId === project.id}
                                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm disabled:bg-indigo-400 flex items-center justify-center gap-2"
                                    >
                                        {joiningId === project.id ? <Loader2 size={16} className="animate-spin" /> : <>Join Team <ArrowRight size={16} /></>}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CREATE PROJECT MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-slate-900">Create New Project</h2>
                            <button 
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. AI Research Initiative"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Describe your project goals..."
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Deadline</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={newProject.deadline}
                                        onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Tags (comma separated)</label>
                                    <input
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="React, PHP, Design"
                                        value={newProject.tags}
                                        onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isCreating ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}