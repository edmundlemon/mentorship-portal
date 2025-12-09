import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { api } from './services/api'; 
import { Send, Search, Phone, Video, Info } from 'lucide-react';

export default function Chat() {
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    
    // Get the location to check for passed state from Matchmaking
    const location = useLocation();
    
    const currentUser = JSON.parse(localStorage.getItem('user')) || { id: 0 };

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        let interval;
        if (selectedUser) {
            loadMessages(selectedUser.id);
            interval = setInterval(() => loadMessages(selectedUser.id), 3000);
        }
        return () => clearInterval(interval);
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadConversations = async () => {
        try {
            const data = await api.get('chat');
            let chatList = data || [];

            // --- CHECK FOR NEW MATCH FROM MATCHMAKING PAGE ---
            if (location.state?.startChat) {
                const newMatch = location.state.startChat;
                
                // Check if this user is already in the conversation list
                const exists = chatList.find(c => c.id === newMatch.id);
                
                if (!exists) {
                    // Add them to the top of the list temporarily so you can chat immediately
                    chatList = [newMatch, ...chatList];
                }
                
                // Automatically select the new match to open the chat window
                setSelectedUser(newMatch);
                
                // Optional: Clean up history so refresh doesn't re-trigger (browser behavior dependent)
                window.history.replaceState({}, document.title);
            }
            
            setConversations(chatList);
        } catch (error) {
            console.error('Failed to load conversations', error);
        }
    };

    const loadMessages = async (userId) => {
        try {
            const data = await api.get(`/chat/${userId}`);
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            await api.post('/chat', {
                receiver_id: selectedUser.id,
                content: newMessage
            });
            setNewMessage('');
            loadMessages(selectedUser.id);
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-50 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex h-full">
                    
                    {/* --- SIDEBAR --- */}
                    <div className="w-80 border-r border-slate-200 flex flex-col bg-white">
                        <div className="p-4 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {conversations.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`p-4 cursor-pointer transition-all border-l-4 ${
                                        selectedUser?.id === user.id 
                                            ? 'bg-indigo-50 border-indigo-600' 
                                            : 'border-transparent hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name[0]
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <p className="font-semibold text-slate-900 truncate text-sm">{user.name}</p>
                                                <span className="text-[10px] text-slate-400">Now</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate">{user.major || "New Match!"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- CHAT AREA --- */}
                    <div className="flex-1 flex flex-col bg-slate-50/50">
                        {selectedUser ? (
                            <>
                                <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
                                            {selectedUser.image ? (
                                                <img src={selectedUser.image} alt={selectedUser.name} className="w-full h-full object-cover" />
                                            ) : (
                                                selectedUser.name[0]
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 leading-none">{selectedUser.name}</h3>
                                            <span className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <Phone className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                                        <Video className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                                        <Info className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                                    {messages.map((msg) => {
                                        const isMe = msg.sender_id === currentUser.id;
                                        return (
                                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                                                    <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                                        isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                                                    }`}>
                                                        {msg.content}
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="p-4 bg-white border-t border-slate-200">
                                    <form onSubmit={sendMessage} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                                        />
                                        <button type="submit" disabled={!newMessage.trim()} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md">
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 bg-slate-50">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200">
                                    <Search className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-1">Your Messages</h3>
                                <p className="text-sm text-slate-500 text-center max-w-xs">Select a conversation to start chatting.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}