import CircularNavigation from './components/Nav/CircularNavigation';
import { StarryBackground } from './animations/StarryBackground';
import About from './pages/About';
import Contact from './pages/Contact';
import Journey from './pages/Journey';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
	return (
		<NavigationProvider>
			<main className="relative h-screen w-screen overflow-hidden">
				<CircularNavigation />
				<StarryBackground />
				<PageController />
			</main>
		</NavigationProvider>
	);
}

// Component to control which page is displayed based on active section
function PageController() {
	const { activeSection } = useNavigation();

	// Animation variants
	const pageVariants = {
		initial: { y: 100, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
		exit: { y: 100, opacity: 0, transition: { duration: 0.3 } }
	};

	return (
		<div className="absolute inset-0 pointer-events-none">
			<AnimatePresence mode="wait">
				{activeSection === 'JOURNEY' && (
					<motion.div 
						key="journey"
						className="pointer-events-auto absolute inset-0 z-20"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={pageVariants}
					>
						<Journey />
					</motion.div>
				)}

				{activeSection === 'ABOUT' && (
					<motion.div 
						key="about"
						className="pointer-events-auto"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={pageVariants}
					>
						<About />
					</motion.div>
				)}

				{activeSection === 'CONTACT' && (
					<motion.div 
						key="contact"
						className="pointer-events-auto"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={pageVariants}
					>
						<Contact />
					</motion.div>
				)}

				{/* Add other sections as needed */}
			</AnimatePresence>
		</div>
	);
}
