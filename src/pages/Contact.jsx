import React from 'react';
import { Mail, X, Facebook, Instagram, Phone } from 'lucide-react';

export default function ContactCard() {
	return (
		<section className="absolute bottom-60 right-10 h-72 w-60 rounded-lg p-5 bg-neutral-50 shadow-md">
			{/* Close button */}
			<button className="absolute top-2 right-2 text-neutral-500">
				<X size={16} />
			</button>

			{/* Header */}
			<h2 className="text-neutral-700 font-medium text-base mb-3">CONTACT</h2>

			{/* Email section */}
			<div className="mb-3">
				<div className="flex items-center gap-1">
					<Mail size={14} className="text-neutral-700 flex-shrink-0" />
					<span className="text-neutral-800 text-xs truncate">
						palmerasabrinamae@gmail.com
					</span>
				</div>
				<div className="h-px w-full bg-neutral-300 mt-1"></div>
			</div>

			{/* Social links section */}
			<div className="grid grid-cols-2 gap-2 mb-2">
				<a
					href=""
					className="border border-neutral-300 rounded-md p-2 flex items-center gap-1 hover:bg-neutral-100 text-xs"
				>
					<img src="fb.svg" className="h-4 w-4" alt="" />
					<span>Facebook</span>
				</a>
				<a
					href=""
					className="border border-neutral-300 rounded-md p-2 flex items-center gap-1 hover:bg-neutral-100 text-xs"
				>
					<Instagram size={16} />
					<span>Instagram</span>
				</a>
			</div>

			{/* Phone section */}
			<a
				href="tel:(+63) 935-076-2187"
				className="border border-neutral-300 rounded-md p-2 flex items-center gap-1 hover:bg-neutral-100 mb-3 text-xs"
			>
				<Phone size={16} />
				<span className="truncate">(+63) 935-076-2187</span>
			</a>

			{/* Additional text */}
			<p className="text-xs mb-2">Let's shake hands</p>

			{/* Relationship text */}
			<p className="text-xs mb-2">
				Are you interested in a long-term relationship?{' '}
				<span className="font-bold underline cursor-pointer">Find me</span>
			</p>

			{/* Copyright */}
			<p className="text-xs text-neutral-500 mt-1">&copy; 2025</p>
		</section>
	);
}
