import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure you run: npm install framer-motion
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { 
    ArrowLeft, Heart, X, GraduationCap, Briefcase, Info, MessageCircle 
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import {api} from './services/api'; 

// --- CONFETTI COMPONENT ---
const Confetti = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${['bg-rose-400', 'bg-teal-400', 'bg-amber-400', 'bg-indigo-400'][i % 4]}`}
                initial={{ x: "50%", y: "50%", opacity: 1, scale: 0 }}
                animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    opacity: 0,
                    scale: 1.5
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        ))}
    </div>
);

// --- MAIN MATCHMAKING PAGE ---
export default function Matchmaking() {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [matchOverlay, setMatchOverlay] = useState(null);
    const [showBio, setShowBio] = useState(false);

    // Motion values
    const x = useMotionValue(0);
    const controls = useAnimation();
    
    // Rotate card based on drag
    const rotate = useTransform(x, [-200, 200], [-5, 5]);
    const likeOpacity = useTransform(x, [50, 150], [0, 1]);
    const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            // Matches Route::get('/matches/candidates', ...) in api.php
            // const response = await fetch('/api/matches/candidates', { headers });
            const response = await api.get('matches/candidates');
            
            if (!response) {
               console.log(response)
                throw new Error("API Error");
            } else {
                const data = await response.json();
                setCandidates(data);
                console.log("Fetched candidates:", data);
            }
            
        } catch (error) {
            console.log("Using fallback data for demo");
            setCandidates([
                { id: 1, name: 'Sarah Chen', age: 24, major: 'Computer Science', role: 'Mentor', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', skills: ['React', 'Python', 'AI'], bio: 'Researching neural networks.' },
                { id: 2, name: 'Marcus Johnson', age: 22, major: 'Business', role: 'Mentee', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', skills: ['Marketing', 'Public Speaking'], bio: 'Aspiring entrepreneur.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const triggerSwipe = async (direction) => {
        if (currentIndex >= candidates.length) return;
        await controls.start({ x: direction === 'right' ? 800 : -800, transition: { duration: 0.4 } });
        await processSwipe(direction);
    };

    const onDragEnd = (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) triggerSwipe('right');
        else if (info.offset.x < -threshold) triggerSwipe('left');
        else controls.start({ x: 0 });
    };

    const processSwipe = async (direction) => {
        const currentCandidate = candidates[currentIndex];
        if (!currentCandidate) return;

        setShowBio(false);
        if (currentIndex < candidates.length) {
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                x.set(0);
                controls.set({ x: 0 });
            }, 300);
        }

        // --- MATCH LOGIC ---
        if (direction === 'right') {
            setMatchOverlay(currentCandidate); // Show match overlay immediately
            
            // Send to API silently
            try {
                const token = localStorage.getItem('token');
                if(token) {
                    await fetch('/api/matches/swipe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            candidate_id: currentCandidate.id,
                            direction: direction
                        })
                    });
                }
            } catch (e) { console.error(e); }
        }
    };

    const activeCard = candidates[currentIndex];
    const nextCard = candidates[currentIndex + 1];

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-rose-500"></div>
        </div>
    );

    return (
        <div className="h-screen w-screen bg-gray-50 text-gray-900 flex flex-col overflow-hidden font-sans">
            <Toaster position="top-center" />

            <div className="flex-1 flex flex-col relative overflow-hidden">
                <div className="px-6 py-6 flex justify-between items-center w-full max-w-md mx-auto shrink-0 z-20">
                    <button onClick={() => navigate('/dashboard')} className="p-2 bg-white border border-gray-200 shadow-sm rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="w-10" /> 
                </div>

                <div className="flex-1 flex items-center justify-center relative w-full max-w-md mx-auto px-4 min-h-0">
                    <div className="relative w-full h-[65vh] max-h-[600px] aspect-[3/4]">
                        <AnimatePresence>
                            {nextCard && (
                                <div key={nextCard.id} className="absolute inset-0 bg-white rounded-3xl border border-gray-200 transform scale-95 translate-y-4 opacity-100 shadow-lg overflow-hidden">
                                    <img src={nextCard.image} alt="" className="w-full h-full object-cover grayscale opacity-50" />
                                </div>
                            )}

                            {activeCard ? (
                                <motion.div
                                    key={activeCard.id}
                                    style={{ x, rotate }}
                                    animate={controls}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={onDragEnd}
                                    className="absolute inset-0 rounded-3xl shadow-xl cursor-grab active:cursor-grabbing overflow-hidden bg-white border border-gray-200"
                                    onClick={() => setShowBio(!showBio)} 
                                >
                                    <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-30 bg-rose-500 text-white font-bold text-2xl px-6 py-2 rounded-full transform -rotate-12 shadow-lg border-2 border-white">LIKE</motion.div>
                                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-30 bg-slate-500 text-white font-bold text-2xl px-6 py-2 rounded-full transform rotate-12 shadow-lg border-2 border-white">NOPE</motion.div>

                                    {!showBio ? (
                                        <>
                                            <img src={activeCard.image} alt={activeCard.name} className="w-full h-full object-cover pointer-events-none" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                                <div className="flex gap-2 mb-3">
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-semibold text-white flex items-center gap-1"><Briefcase size={12} /> {activeCard.role}</span>
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-semibold text-white flex items-center gap-1"><GraduationCap size={12} /> {activeCard.major}</span>
                                                </div>
                                                <h2 className="text-3xl font-bold mb-1 text-white">{activeCard.name}, <span className="font-normal opacity-90">{activeCard.age}</span></h2>
                                                <div className="flex flex-wrap gap-2 mt-2">{activeCard.skills?.slice(0, 3).map((skill, i) => <span key={i} className="text-xs font-medium text-gray-300">• {skill}</span>)}</div>
                                                <div className="absolute bottom-6 right-6"><div className="bg-white/20 backdrop-blur-md p-2 rounded-full"><Info className="text-white" size={20} /></div></div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-white p-6 flex flex-col justify-center items-center text-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden p-1 border border-gray-200 mb-6 shadow-sm"><img src={activeCard.image} alt="" className="w-full h-full object-cover rounded-full" /></div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{activeCard.name}</h2>
                                            <p className="text-rose-500 font-medium text-sm mb-6 uppercase tracking-wide">{activeCard.major}</p>
                                            <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide"><p className="text-gray-600 leading-relaxed text-lg font-serif italic">"{activeCard.bio}"</p></div>
                                            <div className="flex flex-wrap justify-center gap-2 mb-8">{activeCard.skills?.map((skill, i) => <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">{skill}</span>)}</div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Tap to flip back</p>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4"><Briefcase className="opacity-30 text-gray-500" /></div>
                                    <p>No more profiles nearby.</p>
                                    <button onClick={() => fetchCandidates()} className="mt-4 text-rose-500 font-bold text-sm hover:underline">Refresh</button>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto px-6 pb-8 pt-4 flex items-center justify-center gap-8 shrink-0 z-20">
                    <button onClick={() => activeCard && triggerSwipe('left')} disabled={!activeCard} className="w-16 h-16 rounded-full bg-white text-slate-400 shadow-xl flex items-center justify-center hover:text-rose-500 hover:scale-105 transition-all duration-200 disabled:opacity-50"><X size={32} strokeWidth={2.5} /></button>
                    <button onClick={() => activeCard && triggerSwipe('right')} disabled={!activeCard} className="w-16 h-16 rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/30 flex items-center justify-center hover:bg-rose-600 hover:scale-105 transition-all duration-200 disabled:opacity-50"><Heart size={32} fill="currentColor" /></button>
                </div>
            </div>

            {/* MATCH OVERLAY */}
            <AnimatePresence>
                {matchOverlay && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                        <Confetti />
                        <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-bold text-white mb-12">It's a Match!</motion.h2>
                        
                        <div className="relative w-full max-w-sm h-48 mb-12 flex justify-center items-center">
                            <motion.div initial={{ x: -50, rotate: -10, opacity: 0 }} animate={{ x: -30, rotate: -10, opacity: 1 }} className="absolute w-32 h-32 rounded-2xl border-4 border-white overflow-hidden shadow-2xl z-10"><img src="https://ui-avatars.com/api/?name=You&background=random" alt="You" className="w-full h-full object-cover" /></motion.div>
                            <motion.div initial={{ x: 50, rotate: 10, opacity: 0 }} animate={{ x: 30, rotate: 10, opacity: 1 }} className="absolute w-32 h-32 rounded-2xl border-4 border-white overflow-hidden shadow-2xl z-20"><img src={matchOverlay.image} alt={matchOverlay.name} className="w-full h-full object-cover" /></motion.div>
                            <div className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl z-30"><Heart className="text-rose-500" fill="currentColor" size={24} /></div>
                        </div>

                        <p className="text-gray-300 text-center mb-8 max-w-xs">You and <span className="font-bold text-white">{matchOverlay.name}</span> have liked each other.</p>

                        <div className="w-full max-w-xs space-y-3 z-10">
                            {/* Pass data to Chat via state */}
                            <button
                                onClick={() => navigate('/chat', { state: { startChat: matchOverlay } })}
                                className="w-full py-4 bg-rose-500 rounded-xl font-bold text-white hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20"
                            >
                                <MessageCircle size={20} /> Send Message
                            </button>
                            <button onClick={() => setMatchOverlay(null)} className="w-full py-4 bg-transparent border border-white/30 rounded-xl font-bold text-white hover:bg-white/10 transition-all">Keep Swiping</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}