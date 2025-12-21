// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const referenceModules = [
	'ufunc', 
	'matrix',
	'complex',
	'signal', 
	'stats',
	'calculs',
	'discret'
];

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Numz',
			social: [
				{ 
					icon: 'github', 
					label: 'GitHub', 
					href: 'https://github.com/zakarialaoui10/numz.git' 
				}],
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label : 'philosophy',
					slug : 'philosophy'
				},
				{
					label : 'about',
					slug : 'about'
				},
				{
					label : 'reference',
					items : referenceModules.map(label => ({
						label,
						collapsed: true,
						autogenerate: { directory: `reference/${label}` },
					})),
				},
			],
		}),
	],
});
