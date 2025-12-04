import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
	const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
		outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
	};

	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
