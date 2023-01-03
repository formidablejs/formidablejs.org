/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'The Formidable Framework',
	tagline: 'The full-stack one person Framework',
	url: 'https://formidablejs.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'formidablejs',
	projectName: 'formidablejs.org',
	themeConfig: {
		// announcementBar: {
		// 	id: 'formidable-announcement',
		// 	content: "Formidable is currently in Public Beta. Please report any bugs or suggestions at <a href='https://github.com/orgs/formidablejs/discussions'>GitHub</a>.",
		// 	backgroundColor: '#000',
		// 	textColor: '#fff',
		// 	isCloseable: false
		// },
		metadata: [
			{
				name: 'twitter:card',
				content: 'summary_large_image'
			},
			{
				name: 'twitter:url',
				content: 'https://formidablejs.org'
			},
			{
				name: 'twitter:title',
				content: 'FormidableJS - The One Person Framework ✌️'
			},
			{
				name: 'twitter:description',
				content: 'Formidable (or formidablejs) is a Laravel inspired framework for building Full-Stack or Backend applications.'
			},
			{
				name: 'twitter:image',
				content: 'https://www.formidablejs.org/img/og-image-3.png'
			},
			{
				name: 'twitter:site',
				content: '@formidablejs'
			},
			{
				name: 'twitter:creator',
				content: '@donaldpakkies'
			},
			{
				name: 'og:type',
				content: 'website',
			},
			{
				name: 'og:url',
				content: 'https://formidablejs.org'
			},
			{
				name: 'og:title',
				content: 'FormidableJS - The One Person Framework ✌️'
			},
			{
				name: 'og:description',
				content: 'Formidable (or formidablejs) is a Laravel inspired framework for building Full-Stack or Backend applications.'
			},
			{
				name: 'og:image',
				content: 'https://www.formidablejs.org/img/og-image-3.png'
			},
		],
		algolia: {
			appId: 'BH4D9OD16A',
			apiKey: 'a445a9bfec68203859d07885f532285b',
			indexName: 'formidablejs',
		},
		colorMode: {
			defaultMode: 'light',
		},
		navbar: {
			title: 'Formidable',
			logo: {
				alt: 'formidable',
				src: 'img/formidable.svg',
			},
			items: [
				{
					href: 'https://github.com/formidablejs/framework',
					position: 'right',
					label: "★ Star us on Github"
				},
				{
					href: 'https://github.com/formidablejs',
					position: 'right',
					className: 'header-github-link',
				},
				{
					href: 'https://discord.gg/QdXM7eV5Yj',
					position: 'right',
					className: 'header-discord-link',
				},
			],
		},
		footer: {
			style: 'light',
			links: [

			],
			copyright: `Copyright © ${new Date().getFullYear()} Donald Pakkies | Brought to you by <a href='https://lunaql.com/' target='_blank'>LunaQL</a>. Code licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT</a>.`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: "https://github.com/formidablejs/formidablejs.org/edit/main/",
					sidebarCollapsed: false,
					sidebarCollapsible: false,
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
