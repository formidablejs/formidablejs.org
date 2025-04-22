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
		document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1')
	);

	const original = document.querySelector(
		'div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1'
	);

	if (!original) return;

	const clone = original.cloneNode(true);
	clone.classList.add('centered-search');
	if (window.location.pathname !== '/') {
		clone.classList.add('patch');
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

	setTimeout(() => {
		original.style.display = 'none';
	}, 100);
};

if (ExecutionEnvironment.canUseDOM) {
	window.addEventListener('load', () => {
		setTimeout(updateUI, 0);
	});
}
