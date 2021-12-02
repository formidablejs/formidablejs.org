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

	// if (ExecutionEnvironment.canUseDOM) {
	// 	const toggle = document.getElementsByClassName('react-toggle-track');

	// 	while (toggle.length > 0) toggle[0].remove();
	// }

	return (
		<Fragment>
			<Layout
				title={siteConfig.title}
				description={siteConfig.tagline}>
				<header className={clsx('hero hero--primary', styles.heroBanner)}>
					<div className="container">
						<h1 className="hero__title">{siteConfig.title}</h1>
						<p className="hero__subtitle">{siteConfig.tagline}</p>
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
				<div style={{ width: '100%' }}>
					<img src="/img/main.png" className='img-code'/>
				</div>

				<div className='community'>
					<div className="container">
						<div className="grid-container">
							<div className="grid-child purple">
								<h3>Connect with the Formidable community</h3>
								<p>
									Stay up to date with new releases, learn more about how to use Formidable, collaborate with the community and share projects and feedback
									with our team. All community participation is subject to Formidable's <a href="/docs/contributions#code-of-conduct">Code of Conduct</a>
								</p>
							</div>

							<div>
								<ol className="communities">
									<li>
										<a href="https://discord.gg/wm2sFGSrmX">
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
