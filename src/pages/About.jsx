import { X } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function About() {
	const { setActiveSection } = useNavigation();
	return (
		<section className="h-72 w-56 rounded-lg p-5 bg-neutral-50 shadow-md relative mx-auto mt-64">
			{/* Close button */}
			<button
				onClick={() => setActiveSection('INDEX')}
				className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-800 transition-colors"
			>
				<X size={16} />
			</button>
			{/* Image Container - positioned to be half in, half out of the card */}
			<div className="absolute bottom-64 right-16">
				{/* <div className="absolute -top-10 left-1/2 transform -translate-x-1/2"> */}
				<div className="rounded-full h-20 w-20 overflow-hidden ring-2 ring-neutral-500 border-2 border-white shadow-lg">
					<img
						src="dp.jpg"
						alt="Profile Picture"
						className="h-full w-full object-cover"
					/>
				</div>
			</div>

			{/* Content - pushed down to make room for the image */}
			<div className="mt-12 space-y-3 text-center">
				<p className="uppercase text-sm font-semibold text-neutral-800">
					Sabrina Mae Palmera
				</p>
				<div className="h-px w-16 mx-auto bg-neutral-300" />
				<p className="text-xs text-neutral-600 leading-tight overflow-hidden max-h-96">
					I’m sabrina mae palmera, born under the sign of sagittarius on
					november 21, 2004. They say my sign encapsulates a relentless drive
					for freedom, and maybe that’s true—I’ve always found myself going out
					of my comfort zone and trying new things to fulfill my thirst for
					freedom and thrilling moments.
				</p>
			</div>
		</section>
	);
}
