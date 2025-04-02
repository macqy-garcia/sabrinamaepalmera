import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';

// Timeline data
const timelineData = [
	{
		year: '2007',
		image: '/2007.jpg',
		description:
			'MY LIFE STARTED WITH BOUNDLESS ENERGY AND CURIOSITY. GROWING UP, I WAS A CHILD FULL OF WONDER, ALWAYS EAGER TO EXPLORE. WHETHER IT WAS DRAWING OR PLAYING OUTDOORS, I FOUND JOY IN THE SIMPLEST THINGS. THESE WERE THE YEARS OF FIRST STEPS, FIRST WORDS, AND THE FIRST SPARKS OF MY PERSONALITY TAKING SHAPE.',
	},
	{
		year: '2011',
		image: '/2011.jpg',
		description:
			'AS I ENTERED SCHOOL, MY WORLD EXPANDED LIKE GALAXIES STRETCHING ACROSS THE COSMOS. I DISCOVERED NEW SUBJECTS, MADE FRIENDSHIPS AND NAVIGATED THE UPS AND DOWNS OF GROWING UP. I SPENT MY DOING SCHOOL ACTIVITIES AND JOINING CONTEST CONSTANTLY LEARNING NOT JUST FROM TEXTBOOKS BUT FROM LIFE ITSELF.',
	},
	{
		year: '2020',
		image: '/2020.jpg',
		description:
			'HIGH SCHOOL WAS A TIME OF TRANSFORMATION—JUST LIKE A STAR NEARING ITS PEAK. I FACED CHALLENGES, EMBRACED NEW OPPORTUNITIES, AND STARTED TO UNDERSTAND WHO I TRULY WAS. WHETHER IT WAS STAYING LATE TO FINISH MY SCHOOLWORKS OR TRYING TO MAKE FRIENDS WITH MY CLASSMATES—THESE YEARS TESTED ME BUT ALSO HELPED ME GROW. I BEGAN TO THINK ABOUT THE FUTURE, DREAMING OF WHAT LAY BEYOND THE HORIZON.',
	},
	{
		year: '2022',
		image: '/2022.jpg',
		description:
			"IT'S THE MOMENT WHEN CHILDHOOD GRADUALLY FADES INTO THE DISTANCE, AND ADULTHOOD LOOMS LIKE AN UNEXPLORED GALAXY—VAST, THRILLING, AND FULL OF PROMISE. TURNING 18 ISN'T JUST ABOUT GETTING OLDER, IT'S ABOUT STEPPING INTO A NEW VERSION OF MYSELF.",
	},
	{
		year: '2023',
		image: '/2023.jpg',
		description:
			'NOW, I STAND AT THE THRESHOLD OF A NEW ERA—COLLEGE. AS I TOOK NURSING, IT BECAME A PLACE WHERE I CAN REDEFINE MYSELF, EXPLORE MY PASSIONS, AND CARVE MY OWN PATH. WITH EVERY NEW EXPERIENCE, I CONTINUE TO EVOLVE, JUST LIKE THE UNIVERSE ITSELF.',
	},
	{
		year: '2024',
		image: '/2024.jpg',
		description:
			"MY CAPPING AND PINNING CEREMONY WAS MORE THAN JUST A TRADITION—IT WAS A SYMBOL OF MY HARD WORK, DEDICATION, AND COMMITMENT TO NURSING. AS THE CAP WAS PLACED ON MY HEAD, I FELT THE WEIGHT OF RESPONSIBILITY, KNOWING I WAS STEPPING CLOSER TO MY DREAM. THE PIN ON MY UNIFORM WASN'T JUST AN ACCESSORY, IT WAS A BADGE OF HONOR, MARKING MY TRANSFORMATION FROM A STUDENT TO A FUTURE NURSE.",
	},
];

const Journey = () => {
	const { setActiveSection } = useNavigation();
	const containerRef = useRef(null);

	// Set up scroll-based animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<div ref={containerRef} className="relative w-full h-full overflow-auto">
			{/* Background with split design */}
			<div className="fixed inset-0 z-0">
				{/* Left side - vintage map background */}
				<div className="absolute left-0 top-0 w-1/2 h-full bg-gray-200 opacity-90">
					<div className="absolute inset-0 opacity-30 bg-[#f5f5f5] bg-opacity-30"></div>
				</div>

				{/* Right side - space background */}
				<div className="absolute right-0 top-0 w-1/2 h-full bg-gray-900">
					<div className="absolute inset-0 opacity-50">
						{/* Stars */}
						{[...Array(50)].map((_, i) => (
							<div
								key={i}
								className="absolute rounded-full bg-white"
								style={{
									top: `${Math.random() * 100}%`,
									left: `${Math.random() * 100}%`,
									width: `${Math.random() * 2 + 1}px`,
									height: `${Math.random() * 2 + 1}px`,
									opacity: Math.random() * 0.7 + 0.3,
								}}
							/>
						))}
					</div>
				</div>

				{/* Center divider with ink splatter effect */}
				<div className="absolute left-1/2 h-full w-10 -ml-5 bg-black opacity-10 transform -skew-x-3"></div>
			</div>

			{/* Decorative elements */}
			<div className="fixed top-10 right-20 w-28 h-28 opacity-20 z-0">
				<svg viewBox="0 0 100 100">
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="#8B4513"
						strokeWidth="0.5"
					/>
					<circle
						cx="50"
						cy="50"
						r="40"
						fill="none"
						stroke="#8B4513"
						strokeWidth="0.5"
					/>
					<path
						d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15"
						stroke="#8B4513"
						strokeWidth="0.5"
					/>
				</svg>
			</div>

			<div className="fixed bottom-20 left-20 w-24 h-24 opacity-20 z-0">
				<svg viewBox="0 0 100 100">
					<path
						d="M30,80 C35,75 40,70 50,70 C60,70 65,75 70,80 C60,85 40,85 30,80 Z"
						fill="#8B4513"
					/>
					<path
						d="M50,20 L50,70 M50,20 L70,40 L50,40 M50,30 L65,45 L50,45"
						stroke="#8B4513"
						strokeWidth="1"
						fill="none"
					/>
				</svg>
			</div>

			{/* Close button */}
			<button
				onClick={() => setActiveSection('INDEX')}
				className="fixed top-5 right-5 z-50 text-neutral-800 hover:text-neutral-500 transition-colors bg-white bg-opacity-50 rounded-full p-1"
			>
				<X size={24} />
			</button>

			{/* Timeline */}
			<div className="relative z-10 min-h-full pb-32">
				{/* Initial title */}
				<div className="min-h-screen flex flex-col justify-center items-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-5xl font-bold mb-4 text-center"
					>
						My Journey
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="text-lg text-center max-w-lg mx-auto mb-12"
					>
						Scroll down to explore the moments that shaped me
					</motion.p>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 1, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-1"
					>
						<div className="w-1 h-2 bg-gray-600 rounded-full"></div>
					</motion.div>
				</div>

				{/* Timeline connector */}
				<div className="absolute left-1/2 top-screen bottom-0 w-0.5 bg-gray-400 z-10 transform -translate-x-1/2 mt-screen"></div>

				{timelineData.map((item, index) => (
					<motion.div
						key={item.year}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: false, amount: 0.8 }}
						transition={{ duration: 0.6 }}
						className={`flex items-center min-h-screen relative ${
							index % 2 === 0 ? 'justify-end' : 'justify-start'
						}`}
					>
						{/* Year marker on timeline */}
						<div className="absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-white border-2 border-gray-800 z-20 flex items-center justify-center">
							<div className="w-2 h-2 rounded-full bg-gray-800"></div>
						</div>

						{/* Year label */}
						<div
							className={`absolute left-1/2 ${
								index % 2 === 0 ? '-ml-24' : 'ml-10'
							} -mt-12`}
						>
							<span className="text-4xl font-bold">{item.year}</span>
						</div>

						{/* Content card */}
						<div
							className={`w-5/12 p-6 mx-4 ${
								index % 2 === 0 ? 'mr-10' : 'ml-10'
							} backdrop-blur-sm rounded-lg shadow-md ${
								index % 2 === 0
									? 'bg-white bg-opacity-80'
									: 'bg-gray-800 bg-opacity-80 text-white'
							}`}
						>
							<div className="relative mb-4 h-[800px] overflow-hidden rounded border-2 border-opacity-30 border-gray-400">
								<img
									src={item.image}
									alt={`Year ${item.year}`}
									className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
								/>
								<div
									className={`absolute inset-0 bg-gradient-to-t ${
										index % 2 === 0 ? 'from-white' : 'from-gray-900'
									} to-transparent opacity-30`}
								></div>
							</div>
							<p className="text-xs leading-tight tracking-wide">
								{item.description}
							</p>

							{/* Decorative elements */}
							<div
								className={`absolute ${
									index % 2 === 0 ? '-right-2' : '-left-2'
								} -top-2 w-8 h-8 border-t border-r border-gray-600 opacity-30`}
							></div>
							<div
								className={`absolute ${
									index % 2 === 0 ? '-left-2' : '-right-2'
								} -bottom-2 w-8 h-8 border-b border-l border-gray-600 opacity-30`}
							></div>

							{/* Small zodiac-like element */}
							<div className="absolute bottom-3 right-3 w-12 h-12 opacity-20">
								<svg viewBox="0 0 24 24">
									<circle
										cx="12"
										cy="12"
										r="10"
										fill="none"
										stroke="currentColor"
										strokeWidth="0.5"
									/>
									<path
										d="M12,2 L12,22 M2,12 L22,12"
										stroke="currentColor"
										strokeWidth="0.5"
									/>
									<circle
										cx="12"
										cy="12"
										r="4"
										fill="none"
										stroke="currentColor"
										strokeWidth="0.5"
									/>
								</svg>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Journey;
