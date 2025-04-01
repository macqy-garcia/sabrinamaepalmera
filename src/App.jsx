import CircularNavigation from './components/Nav/CircularNavigation';
import { StarryBackground } from './animations/StarryBackground';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
	return (
		<main className="relative h-screen w-screen">
			<CircularNavigation />
			<StarryBackground />
			<About />
			<Contact />
		</main>
	);
}
