/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	theme: {
		extend: {
			'animation': {
				'gradient-x': 'gradient-x 30s linear infinite',
				'gradient-y': 'gradient-y 30s linear infinite',
				'gradient-xy': 'gradient-xy 30s linear infinite',
			},
			'keyframes': {
				'gradient-y': {
					'0%': {
						'background-size': '400% 400%',
						'background-position': 'center top'
					},
					'33%': {
						'background-size': '200% 200%',
						'background-position': 'center center'
					},
					'66%': {
						'background-size': '400% 400%',
						'background-position': 'center bottom'
					},
					'100%': {
						'background-size': '400% 400%',
						'background-position': 'center top'
					}
				},
				'gradient-x': {
					'0%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'25%': {
						'background-size': '200% 200%',
						'background-position': 'center center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					},
					'75%': {
						'background-size': '200% 200%',
						'background-position': 'center center'
					},
					'100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					}
				},
				'gradient-xy': {
					'0%': {
						'background-size': '400% 400%',
						'background-position': 'left top'
					},
					'25%': {
						'background-size': '300% 300%',
						'background-position': 'right top'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right bottom'
					},
					'75%': {
						'background-size': '300% 300%',
						'background-position': 'left bottom'
					},
					'100%': {
						'background-size': '400% 400%',
						'background-position': 'left top'
					}
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
