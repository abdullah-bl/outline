/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
	],
}
