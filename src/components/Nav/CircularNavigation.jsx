import React, { useState, useEffect, useRef } from 'react';

const CircularNavigation = () => {
	const [activeSection, setActiveSection] = useState('INDEX');
	const [isAnimating, setIsAnimating] = useState(false);
	const [dotPosition, setDotPosition] = useState({ x: 200, y: 80 }); // Default to INDEX position
	const prevAngleRef = useRef(270); // Start at INDEX angle

	const sections = [
		{ name: 'INDEX', angle: 270, x: 200, y: 40 },
		{ name: 'JOURNEY', angle: 180, x: 30, y: 200 },
		{ name: 'ABOUT', angle: 0, x: 370, y: 200 },
		{ name: 'CONTACT', angle: 90, x: 200, y: 360 },
	];

	// Calculate position on circle based on angle
	const getPositionFromAngle = (angle) => {
		const radius = 100; // Radius for the dot (inside the main circle)
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

		// Here you would add navigation logic, like:
		// navigate(`/${section.toLowerCase()}`);
		console.log(`Navigating to ${section}`);
	};

	const animateDotAlongCircle = (startAngle, endAngle) => {
		setIsAnimating(true);

		// Determine the shortest path around the circle
		let angleDistance = endAngle - startAngle;

		// Normalize to -180 to 180 for shortest path
		if (angleDistance > 180) angleDistance -= 360;
		if (angleDistance < -180) angleDistance += 360;

		const duration = 1000; // 1 second for animation
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
		<div className="relative w-full h-full flex items-center justify-center">
			<svg viewBox="0 0 400 400" className="w-full max-w-lg">
				{/* Main circle */}
				<circle
					cx="200"
					cy="200"
					r="120"
					fill="none"
					stroke="#000"
					strokeWidth="2"
				/>

				{/* Navigation labels */}
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
							fontSize="16"
							fontWeight="bold"
							className={
								activeSection === section.name ? 'fill-blue-600' : 'fill-black'
							}
						>
							{section.name}
						</text>
					</g>
				))}

				{/* Path for visual reference (optional, can be removed) */}
				<circle
					cx="200"
					cy="200"
					r="90"
					fill="none"
					stroke="#f0f0f0"
					strokeWidth="1"
					strokeDasharray="2,2"
				/>

				{/* Animated dot */}
				<circle cx={dotPosition.x} cy={dotPosition.y} r="5" fill="#000" />
			</svg>
		</div>
	);
};

export default CircularNavigation;
