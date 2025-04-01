export default function About() {
	return (
		<section className="absolute bottom-60 right-14 h-64 w-56 rounded-lg p-5 bg-neutral-50 shadow-md">
			{/* Image Container - positioned to be half in, half out of the card */}
			<div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
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
				<p className="text-xs text-neutral-600 leading-tight overflow-hidden max-h-36">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque a
					doloremque vitae, voluptatem odit exercitationem quasi accusantium
					eaque voluptate saepe enim iusto in eveniet nisi maiores rem deleniti
					laudantium eius culpa voluptas!
				</p>
			</div>
		</section>
	);
}
