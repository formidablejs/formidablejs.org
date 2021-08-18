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
		// "light" | "dark"
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
        // {
        //   to: 'docs/',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'left',
        // },
        // {to: 'blog', label: 'Blog', position: 'left'},
        // Please keep GitHub link to the right for consistency.
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
    //     {
    //       title: 'Learn',
    //       items: [
    //         {
    //           label: 'Formidablejs',
    //           to: 'docs/',
    //         },
    //         {
    //           label: 'Imba',
    //           href: 'https://imba.io',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/formidablejs',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/formidablejs',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         // {
    //         //   label: 'Blog',
    //         //   to: 'blog',
    //         // },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/github/formidablejs',
    //         },
    //       ],
    //     },
        // {
        //   title: 'Legal',
        //   // Please do not remove the privacy and terms, it's a legal requirement.
        //   items: [
        //     // {
        //     //   label: 'Privacy',
        //     //   href: 'https://opensource.facebook.com/legal/privacy/',
        //     // },
        //     // {
        //     //   label: 'Terms',
        //     //   href: 'https://opensource.facebook.com/legal/terms/',
        //     // },
        //     // {
        //     //   label: 'Data Policy',
        //     //   href: 'https://opensource.facebook.com/legal/data-policy/',
        //     // },
        //     // {
        //     //   label: 'Cookie Policy',
        //     //   href: 'https://opensource.facebook.com/legal/cookie-policy/',
        //     // },
        //   ],
        // },
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
          // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/formidablejs/docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
