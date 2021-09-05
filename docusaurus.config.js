/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'The Formidable Framework',
  tagline: 'Imba Framework for Rapid API Development',
  url: 'https://formidablejs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'formidablejs', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
	colorMode: {
		defaultMode: 'dark',
		disableSwitch: true,
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
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
    //   style: 'light',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Donald Pakkies. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
