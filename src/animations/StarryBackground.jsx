import React, { useEffect, useRef, useState } from 'react';

export const StarryBackground = () => {
	const canvasRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	// Initialize stars, meteorites, and constellations
	const starsRef = useRef([]);
	const meteoritesRef = useRef([]);
	const constellationsRef = useRef([]);

	// Set up the canvas and animation
	useEffect(() => {
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Set initial dimensions
		updateDimensions();

		// Add resize listener
		window.addEventListener('resize', updateDimensions);

		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	}, []);

	// Generate stars and constellations once dimensions are available
	useEffect(() => {
		if (dimensions.width === 0 || dimensions.height === 0) return;

		const generateStars = () => {
			const starCount = Math.floor(
				(dimensions.width * dimensions.height) / 6000,
			);
			const stars = [];

			for (let i = 0; i < starCount; i++) {
				stars.push({
					x: Math.random() * dimensions.width,
					y: Math.random() * dimensions.height,
					size: Math.random() * 2 + 0.5,
					opacity: Math.random() * 0.8 + 0.2,
					blinkSpeed: Math.random() * 0.02 + 0.005,
					blinkDirection: Math.random() > 0.5 ? 1 : -1,
					// Make some stars polygonal (5-8 points)
					isPolygonal: Math.random() > 0.7,
					points: Math.floor(Math.random() * 4) + 5, // 5-8 points
					rotation: Math.random() * Math.PI * 2,
				});
			}

			return stars;
		};

		// Generate constellation patterns
		const generateConstellations = () => {
			// Create 3-4 constellations
			const constellationCount = Math.floor(Math.random() * 2) + 3;
			const constellations = [];

			for (let i = 0; i < constellationCount; i++) {
				const centerX = Math.random() * dimensions.width;
				const centerY = Math.random() * dimensions.height;
				const starCount = Math.floor(Math.random() * 5) + 5; // 5-9 stars per constellation
				const stars = [];

				// Generate stars for this constellation
				for (let j = 0; j < starCount; j++) {
					const angle = (j / starCount) * Math.PI * 2;
					const distance = Math.random() * 150 + 50;

					stars.push({
						x: centerX + Math.cos(angle) * distance,
						y: centerY + Math.sin(angle) * distance,
						size: Math.random() * 2 + 1,
						isPolygonal: true,
						points: Math.floor(Math.random() * 4) + 5, // 5-8 points
						rotation: Math.random() * Math.PI * 2,
					});
				}

				// Generate connections between stars
				const connections = [];
				for (let j = 0; j < stars.length - 1; j++) {
					connections.push({
						from: j,
						to: j + 1,
					});

					// Add some random connections
					if (Math.random() > 0.7 && j > 1) {
						const randomStar = Math.floor(Math.random() * j);
						connections.push({
							from: j,
							to: randomStar,
						});
					}
				}

				constellations.push({
					stars,
					connections,
				});
			}

			return constellations;
		};

		starsRef.current = generateStars();
		constellationsRef.current = generateConstellations();
	}, [dimensions]);

	// Animation loop
	useEffect(() => {
		if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0)
			return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Modified generateMeteorite function with larger random sizes
		const generateMeteorite = () => {
			// Increase the size range for more dramatic meteors (was 1-4, now 1-10)
			const size =
				Math.random() > 0.8
					? Math.random() * 7 + 3 // 20% chance of large meteor (size 3-10)
					: Math.random() * 3 + 1; // 80% chance of regular meteor (size 1-4)

			return {
				x: Math.random() * dimensions.width,
				y: 0,
				size,
				speed: Math.random() * 5 + 3,
				// Increase tail length proportional to size for more dramatic effect
				tailLength: Math.random() * 30 + size * 10,
				angle: Math.PI / 4 + (Math.random() * Math.PI) / 8,
				opacity: 0.7,
			};
		};

		// Modified meteor interval to generate more meteors
		const meteorInterval = setInterval(() => {
			// Increase chance of meteor generation (was 0.7, now 0.5)
			// and increase max number of meteors (was 5, now 10)
			if (Math.random() > 0.5 && meteoritesRef.current.length < 10) {
				meteoritesRef.current.push(generateMeteorite());
			}
		}, 1000);

		// Draw polygonal star
		const drawPolygonalStar = (x, y, size, points, rotation) => {
			ctx.beginPath();
			for (let i = 0; i <= points * 2; i++) {
				const radius = i % 2 === 0 ? size * 2 : size * 0.5;
				const angle = (Math.PI * 2 * i) / (points * 2) + rotation;
				const starX = x + radius * Math.cos(angle);
				const starY = y + radius * Math.sin(angle);

				if (i === 0) {
					ctx.moveTo(starX, starY);
				} else {
					ctx.lineTo(starX, starY);
				}
			}
			ctx.closePath();
		};

		// Draw circular text
		const drawCircularText = () => {
			const text =
				'THE FAULT, DEAR BRUTUS, IS NOT IN OUR STARS, BUT IN OURSELVES.';
			const centerX = dimensions.width / 2;
			const centerY = dimensions.height * 0.4;
			const radius = Math.min(dimensions.width, dimensions.height) * 0.25;

			ctx.save();
			ctx.font = 'bold 16px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

			const angleStep = (Math.PI * 2) / text.length;

			// Draw characters along the circle
			for (let i = 0; i < text.length; i++) {
				const angle = i * angleStep - Math.PI / 2; // Start at top

				ctx.save();
				ctx.translate(
					centerX + Math.cos(angle) * radius,
					centerY + Math.sin(angle) * radius,
				);
				ctx.rotate(angle + Math.PI / 2); // Rotate text to be tangent to circle
				ctx.fillText(text[i], 0, 0);
				ctx.restore();
			}

			ctx.restore();
		};

		// Draw introducing text
		const drawIntroducingText = () => {
			const centerX = dimensions.width * 0.8;
			const centerY = dimensions.height * 0.35;

			ctx.save();

			// Draw "INTRODUCING" text
			ctx.font = '24px Arial';
			ctx.textAlign = 'center';
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.fillText('INTRODUCING', centerX, centerY);

			// Draw "SABBY!" text
			ctx.font = 'bold 72px Arial';
			ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			ctx.fillText('SABBY!', centerX, centerY + 70);

			ctx.restore();
		};

		// Draw zodiac circle in center
		const drawZodiacCircle = () => {
			const centerX = dimensions.width / 2;
			const centerY = dimensions.height * 0.4;
			const outerRadius = Math.min(dimensions.width, dimensions.height) * 0.2;
			const innerRadius = outerRadius * 0.8;

			ctx.save();

			// Draw outer circle
			ctx.beginPath();
			ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// Draw inner circle
			ctx.beginPath();
			ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
			ctx.stroke();

			// Draw zodiac sun in center
			ctx.beginPath();
			ctx.arc(centerX, centerY, outerRadius * 0.2, 0, Math.PI * 2);
			const gradient = ctx.createRadialGradient(
				centerX,
				centerY,
				0,
				centerX,
				centerY,
				outerRadius * 0.2,
			);
			gradient.addColorStop(0, 'rgba(255, 215, 0, 1)');
			gradient.addColorStop(1, 'rgba(255, 140, 0, 1)');
			ctx.fillStyle = gradient;
			ctx.fill();

			// Draw sun rays
			const rayCount = 24;
			const innerRayRadius = outerRadius * 0.25;
			const outerRayRadius = innerRadius * 0.9;

			for (let i = 0; i < rayCount; i++) {
				const angle = (Math.PI * 2 * i) / rayCount;

				ctx.beginPath();
				ctx.moveTo(
					centerX + Math.cos(angle) * innerRayRadius,
					centerY + Math.sin(angle) * innerRayRadius,
				);
				ctx.lineTo(
					centerX + Math.cos(angle) * outerRayRadius,
					centerY + Math.sin(angle) * outerRayRadius,
				);

				ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Draw zodiac symbols (simplified)
			const symbolRadius = (innerRadius + outerRadius) / 2;
			const symbolCount = 12;

			for (let i = 0; i < symbolCount; i++) {
				const angle = (Math.PI * 2 * i) / symbolCount;
				const x = centerX + Math.cos(angle) * symbolRadius;
				const y = centerY + Math.sin(angle) * symbolRadius;

				ctx.beginPath();
				ctx.arc(x, y, 3, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
				ctx.fill();
			}

			ctx.restore();
		};

		// Draw celestial objects on sides
		const drawCelestialObjects = () => {
			// Draw moon on left side
			const moonX = dimensions.width * 0.1;
			const moonY = dimensions.height * 0.3;
			const moonRadius = 30;

			ctx.save();

			// Moon
			ctx.beginPath();
			ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255, 235, 205, 0.7)';
			ctx.fill();

			// Moon crescent
			ctx.beginPath();
			ctx.arc(moonX - 10, moonY, moonRadius * 0.9, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(10, 14, 31, 0.7)';
			ctx.fill();

			// Draw sun rays on right side
			const sunX = dimensions.width * 0.9;
			const sunY = dimensions.height * 0.7;
			const sunRadius = 40;

			// Sun rays
			for (let i = 0; i < 12; i++) {
				const angle = (Math.PI * 2 * i) / 12;
				const innerRadius = sunRadius * 1.2;
				const outerRadius = sunRadius * 2;

				ctx.beginPath();
				ctx.moveTo(
					sunX + Math.cos(angle) * innerRadius,
					sunY + Math.sin(angle) * innerRadius,
				);
				ctx.lineTo(
					sunX + Math.cos(angle) * outerRadius,
					sunY + Math.sin(angle) * outerRadius,
				);

				ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			ctx.restore();
		};

		let animationFrameId;

		const render = () => {
			ctx.clearRect(0, 0, dimensions.width, dimensions.height);

			// Draw night sky background with gradient
			const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
			gradient.addColorStop(0, '#0a0e1f');
			gradient.addColorStop(0.7, '#1a2a4a');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, dimensions.width, dimensions.height);

			// Draw celestial objects
			drawCelestialObjects();

			// Draw zodiac circle
			drawZodiacCircle();

			// Draw circular text
			drawCircularText();

			// Draw constellations
			constellationsRef.current.forEach((constellation) => {
				// Draw connections
				constellation.connections.forEach((connection) => {
					const from = constellation.stars[connection.from];
					const to = constellation.stars[connection.to];

					ctx.beginPath();
					ctx.moveTo(from.x, from.y);
					ctx.lineTo(to.x, to.y);
					ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
					ctx.lineWidth = 0.5;
					ctx.stroke();
				});

				// Draw stars in constellation
				constellation.stars.forEach((star) => {
					ctx.save();
					if (star.isPolygonal) {
						drawPolygonalStar(
							star.x,
							star.y,
							star.size,
							star.points,
							star.rotation,
						);
						ctx.fillStyle = 'rgba(100, 149, 237, 0.8)';
					} else {
						ctx.beginPath();
						ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
					}
					ctx.fill();
					ctx.restore();
				});
			});

			// Draw regular stars
			starsRef.current.forEach((star) => {
				// Update star blinking
				star.opacity += star.blinkSpeed * star.blinkDirection;

				if (star.opacity >= 1) {
					star.opacity = 1;
					star.blinkDirection = -1;
				} else if (star.opacity <= 0.2) {
					star.opacity = 0.2;
					star.blinkDirection = 1;
				}

				ctx.save();
				if (star.isPolygonal) {
					drawPolygonalStar(
						star.x,
						star.y,
						star.size,
						star.points,
						star.rotation,
					);
					ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
				} else {
					ctx.beginPath();
					ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
				}
				ctx.fill();
				ctx.restore();
			});

			// Draw meteorites
			meteoritesRef.current.forEach((meteorite, index) => {
				// Update meteorite position
				meteorite.x += Math.cos(meteorite.angle) * meteorite.speed;
				meteorite.y += Math.sin(meteorite.angle) * meteorite.speed;

				// Draw meteorite head
				ctx.beginPath();
				ctx.arc(meteorite.x, meteorite.y, meteorite.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${meteorite.opacity})`;
				ctx.fill();

				// Draw meteorite tail
				ctx.beginPath();
				ctx.moveTo(meteorite.x, meteorite.y);
				const tailX =
					meteorite.x - Math.cos(meteorite.angle) * meteorite.tailLength;
				const tailY =
					meteorite.y - Math.sin(meteorite.angle) * meteorite.tailLength;
				ctx.lineTo(tailX, tailY);

				const gradient = ctx.createLinearGradient(
					meteorite.x,
					meteorite.y,
					tailX,
					tailY,
				);
				gradient.addColorStop(0, `rgba(255, 255, 255, ${meteorite.opacity})`);
				gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

				ctx.strokeStyle = gradient;
				ctx.lineWidth = meteorite.size;
				ctx.stroke();

				// Remove meteorites that have gone off screen
				if (
					meteorite.y > dimensions.height ||
					meteorite.x < 0 ||
					meteorite.x > dimensions.width
				) {
					meteoritesRef.current.splice(index, 1);
				}
			});

			// Draw horizon
			// drawHorizon();

			// Draw introducing text
			drawIntroducingText();

			animationFrameId = window.requestAnimationFrame(render);
		};

		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			clearInterval(meteorInterval);
		};
	}, [dimensions]);

	return (
		<div className="fixed inset-0 -z-10">
			<canvas
				ref={canvasRef}
				width={dimensions.width}
				height={dimensions.height}
				className="block"
			/>
		</div>
	);
};
