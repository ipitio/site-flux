import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	theme: {
		extend: {
			boxShadow: {
				panel: '0 24px 60px -32px rgba(12, 22, 41, 0.48)',
			},
			fontFamily: {
				body: ['Lato', 'sans-serif'],
				display: ['Lato', 'sans-serif'],
				brand: ['Rubik Mono One', 'sans-serif'],
			},
			keyframes: {
				drift: {
					'0%, 100%': {
						transform: 'translate3d(0, 0, 0)',
					},
					'50%': {
						transform: 'translate3d(0, -10px, 0)',
					},
				},
			},
			animation: {
				drift: 'drift 8s ease-in-out infinite',
			},
		}
	},
	plugins: [
		typography,
	],
}
