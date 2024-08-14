import flowbitePlugin from 'flowbite/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {}
	},

	plugins: [typographyPlugin,flowbitePlugin]
};
