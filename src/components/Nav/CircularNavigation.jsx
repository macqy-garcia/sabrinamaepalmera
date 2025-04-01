import React, { useState, useEffect, useRef } from 'react';

const CircularNavigation = () => {
	const [activeSection, setActiveSection] = useState('INDEX');
	const [isAnimating, setIsAnimating] = useState(false);
	const [dotPosition, setDotPosition] = useState({ x: 200, y: 140 }); // Default to INDEX position

	const sections = [
		{ name: 'INDEX', angle: 270, x: 200, y: 100 },
		{ name: 'WORK', angle: 180, x: 85, y: 200 },
		{ name: 'ABOUT', angle: 0, x: 320, y: 200 },
		{ name: 'CONTACT', angle: 90, x: 200, y: 311 },
	];

	// Calculate position on circle based on angle
	const getPositionFromAngle = (angle) => {
		const radius = 60; // Smaller radius for the dot path
		const centerX = 200;
		const centerY = 200;
		const angleInRadians = (angle * Math.PI) / 180;

		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians),
		};
	};

	const handleNavClick = (section) => {
		if (section === activeSection || isAnimating) return;

		const targetSection = sections.find((s) => s.name === section);
		const currentSection = sections.find((s) => s.name === activeSection);

		animateDotAlongCircle(currentSection.angle, targetSection.angle);
		setActiveSection(section);

		console.log(`Navigating to ${section}`);
	};

	const animateDotAlongCircle = (startAngle, endAngle) => {
		setIsAnimating(true);

		// Determine the shortest path around the circle
		let angleDistance = endAngle - startAngle;

		// Normalize to -180 to 180 for shortest path
		if (angleDistance > 180) angleDistance -= 360;
		if (angleDistance < -180) angleDistance += 360;

		const duration = 800; // 0.8 seconds for animation
		const startTime = Date.now();

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function for smoother animation
			const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);

			const currentAngle = startAngle + angleDistance * easeProgress;
			const newPosition = getPositionFromAngle(currentAngle);
			setDotPosition(newPosition);

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				setIsAnimating(false);
			}
		};

		requestAnimationFrame(animate);
	};

	// Set initial position
	useEffect(() => {
		const initialSection = sections.find((s) => s.name === 'INDEX');
		setDotPosition(getPositionFromAngle(initialSection.angle));
	}, []);

	return (
		<div className="fixed bottom-8 right-8 z-50">
			<div className="w-64 h-64">
				<svg viewBox="0 0 400 400" className="w-full h-full">
					{/* Main circle */}
					<circle
						cx="200"
						cy="200"
						r="80"
						fill="none"
						stroke="white"
						strokeWidth="1.5"
					/>

					{/* Navigation labels - smaller text */}
					{sections.map((section) => (
						<g
							key={section.name}
							onClick={() => handleNavClick(section.name)}
							className="cursor-pointer"
						>
							<text
								x={section.x}
								y={section.y}
								textAnchor="middle"
								fontFamily="Arial"
								fontSize="14"
								fontWeight="bold"
								className={
									activeSection === section.name
										? 'fill-white'
										: 'fill-white opacity-70'
								}
							>
								{section.name}
							</text>
						</g>
					))}

					{/* Animated dot */}
					<circle cx={dotPosition.x} cy={dotPosition.y} r="4" fill="white" />
				</svg>
			</div>
		</div>
	);
};

export default CircularNavigation;
