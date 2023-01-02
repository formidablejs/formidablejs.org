import React, { Fragment } from 'react';
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
					</div>
				</header>
				{/* <div style={{ width: '100%' }}>
					<img src="/img/main-ts-light.png" theme="light" className='img-code' />
					<img src="/img/main-ts-dark.png" theme="dark" className='img-code' />
				</div> */}

				<div style={{ width: '100%', marginBottom: '-60px' }}>
					<img src="/img/code.gif" className='img-code live-img large-img' loading="lazy" />
					<img src="/img/code-split.gif" className='img-code live-img small-img' loading="lazy" />
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
				</div>

				<div className='frameworks-container'>
					<h2 style={{
						fontWeight: '800'
					}}>
						Supported Technologies
					</h2>

					<p>Build with your favorite technologies</p>

					<div className="frameworks">
						<div className="framework" title="Imba">
							<img src="https://raw.githubusercontent.com/imba/branding-imba/04d4fca156c665554debb78317a7d6b608953d31/imba-icon.svg" height="50" width="150" alt="Imba Icon" loading='lazy' />
						</div>
						<div className="framework" title="TypeScript">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="50" width="150" alt="TypeScript Icon" loading='lazy' />
						</div>
						<div className="framework" title="Vue.js">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" height="50" width="150" alt="Vue.js Icon" loading='lazy' />
						</div>
						<div className="framework" title="React.js">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="50" width="150" alt="React.js Icon" loading='lazy' />
						</div>
						<div className="framework" title="GraphQL">
							<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" height="50" width="150" alt="GraphQL Icon" loading='lazy' />
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
									Craftsman Development CLI tool. Craftsman lets you easily scaffold common classes such as Controllers, Models, and Migrations.
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

					<div dangerouslySetInnerHTML={{ __html: "<iframe src='https://codesandbox.io/embed/formidable-pn32bs?fontsize=14&autoresize=1&hidenavigation=1&module=%2Fresources%2Fimba%2FApp.imba' style='width:100%;height:500px;border:0;border-radius:4px;overflow:hidden;' title='formidable' allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking' sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts' loading='lazy'></iframe>" }} />
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
