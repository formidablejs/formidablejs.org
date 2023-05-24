import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './styles.module.css';

export default function Home() {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;
	const [ isUpdated, setIsUpdated ] = useState(false)
	const [ props, setProps ] = useState({})

	if (ExecutionEnvironment.canUseDOM && !isUpdated) {
		const props = !/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
			? { loading: 'lazy' }
			: {}

		setProps(props)

		setIsUpdated(true)
	}

	const copyCommand = () => {
		navigator.clipboard.writeText('npx create-formidable@latest').then(() => {
			const copy = document.querySelector('.copy')
			const check = document.querySelector('.check')

			copy.style.display = 'none'
			check.style.display = 'block'

			setTimeout(() => {
				copy.style.display = 'block'
				check.style.display = 'none'
			}, 2000)
		})
	}

	return (
		<Fragment>
			<Layout
				title={siteConfig.title}
				description={siteConfig.tagline}>
				<header className={clsx('hero hero--primary', styles.heroBanner)}>
					<div className="container">
						<h1 className="hero__title">The Formidable Framework</h1>
						{/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
						<p className="hero__subtitle">
							Formidable makes it easy to build full-stack or api applications by providing a great developer-first experience.
						</p>
						<div className={styles.buttons}>
							<Link
								className={clsx(
									'button button--outline button--custom button--lg',
									styles.getStarted,
								)}
								to={useBaseUrl('/docs')}>
								Get Started
							</Link>
						</div>
						<div className='installer'>
							<div className='installer__copy' onClick={copyCommand}>
								<div></div>
							</div>
							<p>~ npx create-formidable@latest</p>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="copy">
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
							</svg>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="check">
								<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
							</svg>
						</div>
					</div>
				</header>
				{/* <div style={{ width: '100%' }}>
					<img src="/img/main-ts-light.png" theme="light" className='img-code' />
					<img src="/img/main-ts-dark.png" theme="dark" className='img-code' />
				</div> */}

				<div style={{ width: '100%', marginBottom: '-60px' }}>
					<img src="/img/code.gif" className='img-code live-img large-img' loading='lazy' />
					<img src="/img/code-split.gif" className='img-code live-img small-img' loading='lazy' />
				</div>

				<div style={{ textAlign: 'center' }}>
					{/* <p>
						Brought to you by <a href='https://lunaql.com/' target='_blank'>LunaQL</a>
					</p> */}

					{/* <p style={{
						opacity: '.5', fontWeight: '800', fontSize: '1.125rem', lineHeight: '1.75rem', textTransform: 'uppercase', letterSpacing: '.05em'
					}}>
						Sponsored by
					</p>
					<img src="/img/jb_beam.svg" /> */}
					<a href="https://www.producthunt.com/posts/the-formidable-framework?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-the&#0045;formidable&#0045;framework" target="_blank">
						<img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=373241&theme=dark" alt="The&#0032;Formidable&#0032;Framework - The&#0032;one&#0032;person&#0032;framework&#0032; | Product Hunt" style={{ width: '250px', height: '54px'}} width="250" height="54" /></a>
				</div>

				<div className='frameworks-container'>
					{/* <h2 style={{
						fontWeight: '800'
					}}>
						Supported Technologies
					</h2>

					<p>Build with your favorite technologies</p> */}

					<p style={{
						letterSpacing: '.025em', fontSize: '20px', lineHeight: '1.25rem'
					}}>Works with</p>

					<div className="frameworks">
						<div className="framework" title="TypeScript">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="50" width="150" alt="TypeScript Logo" loading='lazy' />
						</div>
						<div className="framework" title="Imba">
							<img src="https://raw.githubusercontent.com/imba/branding-imba/04d4fca156c665554debb78317a7d6b608953d31/imba-icon.svg" height="50" width="150" alt="Imba Logo" loading='lazy' />
						</div>
						<div className="framework" title="Vue.js">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" height="50" width="150" alt="Vue.js Logo" loading='lazy' />
						</div>
						<div className="framework" title="React.js">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="50" width="150" alt="React.js Logo" loading='lazy' />
						</div>
						<div className="framework" title="Svelte">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" height="50" width="150" alt="Svelte Logo" loading='lazy' />
						</div>
						<div className="framework" title="TailwindCSS">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" height="50" width="150" alt="TailwindCSS Logo" loading='lazy' />
						</div>
					</div>
				</div>

				<div className='features'>
					<div className="container">
						<div className="grid-container">
							<div style={{ flex: 1 }}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<h3>Craftsman</h3>
								<p>
									Easily build your Formidable application, tinker with your database data and control your application directly from the terminal using the
									Craftsman Development CLI tool. Craftsman lets you easily scaffold common classes such as Controllers, Repositories, and Migrations.
								</p>
							</div>
							<div style={{ flex: 1 }}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
								</svg>
								<h3>Database</h3>
								<p>
									Formidable ships with the Knex.js Query Builder. It features both traditional node style callbacks as well as a promise interface for
									cleaner async flow control, a stream interface, full-featured query and schema builders. It supports PostgreSQL, MSSQL, MySQL, SQLite3,
									Oracle, and more.
								</p>
							</div>
							<div style={{ flex: 1 }}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
								</svg>
								<h3>Authentication</h3>
								<p>
									With Formidable's out-the-box authentication system, you can easily set up a secure, session based authentication for web applications.
									You can also set up authentication for APIs and mobile applications with JWT token based authentication system.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="live">
					<h1>
						Live preview
					</h1>
					<p>
						See how your application may potentially look like without leaving your personal browser.
					</p>

					<iframe src='https://codesandbox.io/embed/formidable-pn32bs?codemirror=1&fontsize=14&hidenavigation=1&module=%2Fresources%2Fimba%2FApp.imba&moduleview=1&theme=dark' style={{ width: '100%', height: '500px', border: '1px solid #555', borderRadius: '8px', overflow: 'hidden' }} title='formidable' sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts' loading="lazy"></iframe>
				</div>

				<div className="live" style={{ marginTop: '-30px', marginBottom: '100px' }}>
					<h1>
						Support us
					</h1>
					<p style={{ marginBottom: '20px' }}>
						Formidable is an MIT-licensed open-source project that relies on the support of its users to continue improving and growing. If you enjoy using Formidable, please consider contributing to the project by submitting bug reports, feature requests, or even making a financial contribution.
					</p>
					<iframe src="https://github.com/sponsors/donaldp/button" title="Sponsor donaldp" height="32" width="114" style={{border: 0, borderRadius: '6px'}}></iframe>
				</div>

				<div className='community'>
					<div className="container">
						<div className="grid-container">
							<div style={{ flex: 1 }}>
								<h3>Connect with the Formidable community</h3>
								<p>
									Stay up to date with new releases, learn more about how to use Formidable, collaborate with the community and share projects and feedback
									with our team. All community participation is subject to Formidable's <a href="/docs/contributions#code-of-conduct">Code of Conduct</a>
								</p>
							</div>

							<div style={{ flex: 1 }}>
								<ol className="communities">
									<li>
										<a href="https://discord.gg/QdXM7eV5Yj">
											<span className="title">Discord</span>
											<span className="desc">Chat with the Formidable community and dev team</span>
										</a>
									</li>
									<li>
										<a href="https://twitter.com/formidablejs">
											<span className="title">Twitter</span>
											<span className="desc">Stay up to date with the latest news</span>
										</a>
									</li>
									<li>
										<a href="https://github.com/formidablejs">
											<span className="title">Github</span>
											<span className="desc">File issues, read the code, and make contributions</span>
										</a>
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</Fragment>
	);
}
