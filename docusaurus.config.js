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
		announcementBar: {
			id: 'formidable-announcement',
			content: 'Missed our "Ultimate Meta Framework" GitHub stream? Don\'t worry, you can watch the replay <a target="_blank" href="https://www.youtube.com/watch?v=YJwzu8kPcPs">here</a>.',
			backgroundColor: '#000',
			textColor: '#fff',
			isCloseable: false
		},
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
				content: 'Formidable (or formidablejs) is a modern full-stack framework for building scalable backend applications and APIs with TypeScript or Imba.'
			},
			{
				name: 'twitter:image',
				content: 'https://www.formidablejs.org/img/og-image-5.png'
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
				content: 'Formidable (or formidablejs) is a modern full-stack framework for building scalable backend applications and APIs with TypeScript or Imba.'
			},
			{
				name: 'og:image',
				content: 'https://www.formidablejs.org/img/og-image-5.png'
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
					to: 'docs',
					label: 'Docs',
					position: 'left',
					className: 'left-header-link',
				},
				{
					to: 'blog',
					label: 'Blog',
					position: 'left',
					className: 'left-header-link',
				},
				// {
				// 	href: 'https://github.com/formidablejs/framework',
				// 	position: 'right',
				// 	label: "★ Star us on Github"
				// },
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
				{
					label: 'Docs',
					to: '/docs'
				},
				{
					label: 'Blog',
					to: '/blog'
				}
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
				blog: {
					blogTitle: 'The Formidable Framework blog!',
					blogDescription: 'A journey into a full-stack framework powering the next generation of web applications.',
					postsPerPage: 10,
					blogSidebarCount: 0,
					// blogSidebarTitle: 'All posts',
					// blogSidebarCount: 'ALL',
					showReadingTime: true, // When set to false, the "x min read" won't be shown
					readingTime: ({content, frontMatter, defaultReadingTime}) =>
						defaultReadingTime({content, options: {wordsPerMinute: 300}}),
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
