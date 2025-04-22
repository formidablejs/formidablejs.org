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

const updateUI = async () => {
	await waitForDiv(() =>
		document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1') !== null
	);

	const original = document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1');
	if (!original) return;

	const clone = original.cloneNode(true); // full copy of the node

	original.style.display = 'none';

	clone.classList.add('centered-search');

	if (window.location.pathname !== '/') {
		clone.classList.add('patch');
	}

	const nav = document.querySelector('div.navbar__items');
	nav.appendChild(clone); // inject our version instead of stealing React's

	document.addEventListener('click', () => {
		if (!document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1')) {
			return;
		}

		const clickClone = original.cloneNode(true);
		clickClone.classList.add('centered-search');

		if (window.location.pathname !== '/') {
			clickClone.classList.add('patch');
		}

		const nav = document.querySelector('div.navbar__items');
		nav.appendChild(clickClone);
	});
};

if (ExecutionEnvironment.canUseDOM) {
	setTimeout(updateUI, 0); // let React fully render before running this
}
