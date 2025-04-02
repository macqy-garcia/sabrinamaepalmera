import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
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
	const scrollContainerRef = useRef(null);

	// Effect to enable smooth horizontal scrolling with mouse wheel
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleWheel = (e) => {
			if (e.deltaY !== 0) {
				e.preventDefault();
				container.scrollLeft += e.deltaY;
			}
		};

		container.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			container.removeEventListener('wheel', handleWheel);
		};
	}, []);

	// Navigate to next/previous section
	const navigate = (direction) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const cardWidth = container.querySelector('.year-card').offsetWidth;
		const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;

		container.scrollBy({
			left: scrollAmount,
			behavior: 'smooth',
		});
	};

	return (
		<div className="relative w-full h-full bg-gray-100 text-gray-900 flex flex-col overflow-hidden">
			{/* Header */}
			<div className="py-8 px-16 flex items-center justify-between">
				<div>
					<h1 className="text-base font-mono uppercase tracking-wide">
						MY JOURNEY
					</h1>
					<h2 className="text-sm text-gray-500">FROM CHILDHOOD TO NURSING</h2>
				</div>

				<button
					onClick={() => setActiveSection('INDEX')}
					className="p-2 rounded-full hover:bg-gray-200 transition-colors"
				>
					<X size={20} />
				</button>
			</div>

			{/* Timeline content */}
			<div
				ref={scrollContainerRef}
				className="flex-1 flex overflow-x-auto overflow-y-hidden px-14 pb-12 gap-6"
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
			>
				<style jsx global>{`
					/* Hide scrollbar for Chrome, Safari and Opera */
					#journey-scroll::-webkit-scrollbar {
						display: none;
					}
				`}</style>

				{timelineData.map((item, index) => (
					<motion.div
						key={item.year}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						className="year-card flex-shrink-0 w-[28%] min-w-[280px] flex flex-col bg-white rounded-lg overflow-hidden shadow-sm"
					>
						{/* Image */}
						<div className="relative w-full aspect-[4/5] overflow-hidden">
							<img
								src={item.image}
								alt={`Year ${item.year}`}
								className="w-full h-full object-cover object-center"
							/>
						</div>

						{/* Content */}
						<div className="p-6 flex-1 flex flex-col">
							<div className="mb-2 flex justify-between items-start">
								<div>
									<h3 className="text-lg font-semibold">{item.year}</h3>
								</div>
								<div className="text-xs text-gray-400 py-1 px-3 rounded-full bg-gray-100">
									{index === 0
										? 'CHILDHOOD'
										: index === 1
										? 'ELEMENTARY'
										: index === 2
										? 'HIGH SCHOOL'
										: index === 3
										? 'TURNING 18'
										: index === 4
										? 'COLLEGE'
										: 'CAPPING'}
								</div>
							</div>

							<p className="text-xs leading-relaxed text-gray-600 line-clamp-5">
								{item.description}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* Navigation Controls */}
			<div className="absolute bottom-6 left-16 flex items-center gap-2">
				<button
					onClick={() => navigate('prev')}
					className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>

				<button
					onClick={() => navigate('next')}
					className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Journey;
