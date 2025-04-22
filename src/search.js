import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const waitForDiv = async (condition) => {
	const poll = (resolve) => {
		if (condition()) {
			resolve();
		} else {
			setTimeout(() => poll(resolve), 50);
		}
	};
	return new Promise(poll);
};

const moveSearch = () => {
	const original = document.querySelector(
		'div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1'
	);

	if (!original) return;

	const existingClone = document.querySelector('div.navbar__items > div.centered-search');
	if (existingClone) return;

	const clone = original.cloneNode(true);
	clone.classList.add('centered-search');
	if (window.location.pathname !== '/') {
		clone.classList.add('patch');
	}

	if (!clone.firstChild.lastChild.hasChildNodes()) {
		const kbd1 = document.createElement('kbd');
		kbd1.classList.add('DocSearch-Button-Key');

		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('width', '15');
		svg.setAttribute('height', '15');
		svg.classList.add('DocSearch-Control-Key-Icon');

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('d', 'M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953');
		path.setAttribute('stroke-width', '1.2');
		path.setAttribute('stroke', 'currentColor');
		path.setAttribute('fill', 'none');
		path.setAttribute('stroke-linecap', 'square');

		svg.appendChild(path);

		kbd1.appendChild(svg);

		const kbd2 = document.createElement('kbd');
		kbd2.classList.add('DocSearch-Button-Key');
		kbd2.textContent = 'K';

		clone.firstChild.lastChild.appendChild(kbd1)
		clone.firstChild.lastChild.appendChild(kbd2)
	}

	const centerNav = document.querySelector('div.navbar__items');
	if (!centerNav) return;

	centerNav.appendChild(clone);

	clone.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();

		const realButton = original.querySelector('button.DocSearch-Button');
		if (realButton) realButton.click();
	});

	original.style.display = 'none';
};

const updateUI = async () => {
	await waitForDiv(() =>
		document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1')
	);

	moveSearch();
};

const setup = () => {
	// Ensure search gets moved after hydration is complete
	if ('requestIdleCallback' in window) {
		requestIdleCallback(() => {
			updateUI();

			// Listen for route changes (single page app)
			document.addEventListener('click', () => {
				setTimeout(() => {
					updateUI();
				}, 300);
			});
		});
	} else {
		// Fallback
		window.addEventListener('load', () => {
			updateUI();
			document.addEventListener('click', () => {
				setTimeout(() => {
					updateUI();
				}, 300);
			});
		});
	}
};

if (ExecutionEnvironment.canUseDOM) {
	// setup();
}
