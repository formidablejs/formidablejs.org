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

	if (ExecutionEnvironment.canUseDOM) {
		const toggle = document.getElementsByClassName('react-toggle-track');

		while (toggle.length > 0) toggle[0].remove();
	}

	return (
		<Fragment>
			{/* <div className='info'>
				Version 0.1.0-alpha.3 is out now 🚀
			</div> */}
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
			</Layout>
		</Fragment>
	);
}
