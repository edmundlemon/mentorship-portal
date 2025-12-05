import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Send } from 'lucide-react';

export default function Chat() {
	const [conversations, setConversations] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const messagesEndRef = useRef(null);
	const currentUser = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		loadConversations();
	}, []);

	useEffect(() => {
		if (selectedUser) {
			loadMessages(selectedUser.id);
			const interval = setInterval(() => loadMessages(selectedUser.id), 3000); // Polling
			return () => clearInterval(interval);
		}
	}, [selectedUser]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const loadConversations = async () => {
		try {
			const data = await api.get('chat');
			setConversations(data);
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
		<div className="flex h-[calc(100vh-64px)] bg-gray-100">
			{/* Sidebar */}
			<div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
				<div className="p-4 border-b border-gray-200">
					<h2 className="text-xl font-bold text-gray-800">Messages</h2>
				</div>
				<div className="divide-y divide-gray-200">
					{conversations.map((user) => (
						<div
							key={user.id}
							onClick={() => setSelectedUser(user)}
							className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser?.id === user.id ? 'bg-blue-50' : ''
								}`}
						>
							<div className="flex items-center">
								<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
									{user.name[0]}
								</div>
								<div className="ml-3">
									<p className="font-medium text-gray-900">{user.name}</p>
									<p className="text-sm text-gray-500 truncate">{user.email}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Chat Area */}
			<div className="flex-1 flex flex-col">
				{selectedUser ? (
					<>
						<div className="p-4 bg-white border-b border-gray-200 shadow-sm">
							<h3 className="text-lg font-semibold text-gray-800">{selectedUser.name}</h3>
						</div>

						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{messages.map((msg) => {
								const isMe = msg.sender_id === currentUser.id;
								return (
									<div
										key={msg.id}
										className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`max-w-[70%] rounded-lg px-4 py-2 ${isMe
													? 'bg-blue-600 text-white'
													: 'bg-white text-gray-800 shadow-sm'
												}`}
										>
											<p>{msg.content}</p>
											<p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
												{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</p>
										</div>
									</div>
								);
							})}
							<div ref={messagesEndRef} />
						</div>

						<form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
							<div className="flex gap-2">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type a message..."
									className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="submit"
									className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
								>
									<Send className="w-5 h-5" />
								</button>
							</div>
						</form>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center text-gray-500">
						Select a conversation to start chatting
					</div>
				)}
			</div>
		</div>
	);
}
