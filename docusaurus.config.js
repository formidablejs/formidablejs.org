/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'The Formidable Framework',
	tagline: 'The one person Framework', // 'Imba Framework for Rapid API Development',
	url: 'https://formidablejs.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'formidablejs', // Usually your GitHub org/user name.
	projectName: 'formidablejs.org', // Usually your repo name.
	themeConfig: {
		announcementBar: {
			id: 'formidable-announcement',
			content: "Formidable is currently in Public Beta. Please report any bugs or suggestions at <a href='https://github.com/orgs/formidablejs/discussions'>GitHub</a>.",
			backgroundColor: '#000', // Defaults to `#ff0000`.
			textColor: '#fff', // Defaults to `#fff`.
			isCloseable: false
		},
		algolia: {
			appId: 'BH4D9OD16A',
			apiKey: 'a445a9bfec68203859d07885f532285b',
			indexName: 'formidablejs',
		},
		colorMode: {
			defaultMode: 'light',
			// disableSwitch: true,
			// switchConfig: {
			// 	darkIcon: '🌙',
			// 	darkIconStyle: {
			// 		marginLeft: '2px',
			// 	},
			// 	lightIcon: '☀️',
			// 	lightIconStyle: {
			// 		marginLeft: '1px',
			// 	},
			// },
		},
		navbar: {
			title: 'Formidable',
			logo: {
				alt: 'formidable',
				src: 'img/formidable.svg',
			},
			items: [
				{
					href: 'https://github.com/formidablejs',
					position: 'right',
					className: 'header-github-link',
				},
			],
		},
		footer: {
			style: 'light',
			links: [

			],
			copyright: `Copyright © ${new Date().getFullYear()} Donald Pakkies. Code licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT</a>.`,
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
