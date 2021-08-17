import React, { Fragment } from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function Home() {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;

	const toggle = document.getElementsByClassName('react-toggle-track');

	while (toggle.length > 0) toggle[0].remove();

	return (
		<BrowserOnly>
			<div className='info'>
				I'm still working on the docs - Come back after a few of weeks 🚀
			</div>
			<Layout
				title={`Hello from ${siteConfig.title}`}
				description={siteConfig.title}>
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
								to={useBaseUrl('docs/')}>
								Get Started
							</Link>
						</div>
					</div>
				</header>
				<div style={{ width: '100%' }}>
					<img src="/img/main.png" style={{
						top: '-80px',
						position: 'relative',
						margin: 'auto',
						display: 'block',
						maxWidth: '40%',
						border: '1px solid #555',
						borderRadius: '8px'
					}} />
				</div>
			</Layout>
		</BrowserOnly>
	);
}
