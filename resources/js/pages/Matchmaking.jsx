import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Heart, Check } from 'lucide-react';

export default function Matchmaking() {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);

	const [candidates, setCandidates] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchCandidates();
	}, []);

	const fetchCandidates = async () => {
		try {
			const response = await fetch('/api/matches/candidates', {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Accept': 'application/json',
				}
			});
			const data = await response.json();
			setCandidates(data);
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch candidates', error);
			setLoading(false);
		}
	};

	const currentCandidate = candidates[currentIndex];

	const handleSwipe = async (direction) => {
		if (!currentCandidate) return;

		try {
			const response = await fetch('/api/matches/swipe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					candidate_id: currentCandidate.id,
					direction: direction
				})
			});

			const result = await response.json();
			if (result.matched) {
				alert("It's a Match! 🎉");
			}
		} catch (error) {
			console.error('Swipe failed', error);
		}

		if (currentIndex < candidates.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			// Fetch more candidates or show empty state
			setCandidates([]);
			setCurrentIndex(0);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8 flex flex-col">
			<div className="max-w-md mx-auto w-full flex-1 flex flex-col">
				<button
					onClick={() => navigate('/dashboard')}
					className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
				>
					<ArrowLeft size={20} className="mr-2" /> Back to Dashboard
				</button>

				<div className="flex-1 flex flex-col justify-center">
					{currentCandidate ? (
						<div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative h-[600px] flex flex-col">
							<div className="h-1/2 bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-8">
								<img
									src={currentCandidate.image}
									alt={currentCandidate.name}
									className="w-48 h-48 rounded-full border-4 border-white shadow-lg"
								/>
							</div>

							<div className="p-8 flex-1 flex flex-col">
								<div className="mb-4">
									<span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${currentCandidate.role === 'Mentor' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
										}`}>
										{currentCandidate.role}
									</span>
									<h2 className="text-3xl font-bold text-gray-900">{currentCandidate.name}</h2>
									<p className="text-blue-600 font-medium">{currentCandidate.major}</p>
								</div>

								<p className="text-gray-600 mb-6 flex-1 overflow-y-auto">
									{currentCandidate.bio}
								</p>

								<div className="flex flex-wrap gap-2 mb-8">
									{(currentCandidate.skills || []).map((skill, index) => (
										<span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Action Buttons */}
							<div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8">
								<button
									onClick={() => handleSwipe('left')}
									className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors border border-red-100"
								>
									<X size={32} />
								</button>
								<button
									onClick={() => handleSwipe('right')}
									className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors border border-green-100"
								>
									<Heart size={32} fill="currentColor" />
								</button>
							</div>
						</div>
					) : (
						<div className="text-center py-20">
							<h2 className="text-2xl font-bold text-gray-900">No more profiles!</h2>
							<p className="text-gray-500 mt-2">Check back later for more matches.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
