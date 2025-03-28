// useCircularPath.js
import { useCallback } from 'react';

/**
 * Hook to calculate positions along a circular path
 * @param {number} radius - Circle radius in pixels
 * @returns {Object} - Functions to work with circular paths
 */
const useCircularPath = (radius = 30) => {
	/**
	 * Calculate position on circle from angle
	 * @param {number} angle - Angle in degrees (0 = top, 90 = right, 180 = bottom, 270 = left)
	 * @returns {Object} - {x, y} coordinates
	 */
	const getPointFromAngle = useCallback(
		(angle) => {
			// Convert to radians, subtract 90 to start from top
			const radian = (angle - 90) * (Math.PI / 180);
			return {
				x: radius * Math.cos(radian),
				y: radius * Math.sin(radian),
			};
		},
		[radius],
	);

	/**
	 * Generate animation path along circle arc
	 * @param {number} startAngle - Starting angle in degrees
	 * @param {number} endAngle - Ending angle in degrees
	 * @param {number} steps - Number of points along the path
	 * @returns {Array} - Array of {x, y} points along the path
	 */
	const createArcPath = useCallback(
		(startAngle, endAngle, steps = 20) => {
			const path = [];
			let angleDiff = endAngle - startAngle;

			// Determine shortest path around the circle
			if (Math.abs(angleDiff) > 180) {
				if (angleDiff > 0) {
					angleDiff = angleDiff - 360;
				} else {
					angleDiff = angleDiff + 360;
				}
			}

			for (let i = 0; i <= steps; i++) {
				const progress = i / steps;
				const currentAngle = startAngle + angleDiff * progress;
				path.push(getPointFromAngle(currentAngle));
			}

			return path;
		},
		[getPointFromAngle],
	);

	return {
		getPointFromAngle,
		createArcPath,
	};
};

export default useCircularPath;
