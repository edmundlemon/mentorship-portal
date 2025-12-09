import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './services/api'; 
import { ArrowLeft, MessageCircle, Calendar, User, Send } from 'lucide-react';

export default function ForumPostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPost();
    }, [id]);

    const loadPost = async () => {
        try {
            const data = await api.get(`forum/${id}`);
            setPost(data);
        } catch (error) {
            console.error('Failed to load post', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        try {
            await api.post(`forum/${id}/comments`, { content: comment });
            setComment('');
            loadPost();
        } catch (error) {
            console.error('Failed to post comment', error);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!post) return <div className="p-8 text-center">Post not found.</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button */}
                <button
                    onClick={() => navigate('/forum')}
                    className="group flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-6"
                >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    Back to Forum
                </button>

                {/* Main Post Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="p-8">
                        {/* Post Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                                    {post.title}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                            {post.user.name[0]}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">{post.user.name}</span>
                                    </div>
                                    <span className="text-slate-300">•</span>
                                    <div className="flex items-center text-slate-500 text-sm">
                                        <Calendar size={14} className="mr-1.5" />
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                            <p>{post.content}</p>
                        </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center gap-4 text-slate-500 text-sm font-medium">
                        <div className="flex items-center gap-1.5">
                            <MessageCircle size={16} />
                            {post.comments.length} Comments
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 px-2">Discussion</h3>
                    
                    {post.comments.length > 0 ? (
                        <div className="space-y-4">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold">
                                        {comment.user.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="font-bold text-slate-900">{comment.user.name}</span>
                                            <span className="text-xs text-slate-400">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    )}

                    {/* Comment Input */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-indigo-100/50 border border-slate-100 sticky bottom-6">
                        <form onSubmit={handleSubmitComment}>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Add your comment</label>
                            <div className="relative">
                                <textarea
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-y"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Type your response here..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute bottom-3 right-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
                                >
                                    <Send size={14} /> Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}