import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const waitForDiv = async (condition) => {
	const poll = (resolve) => {
		if (condition()) {
			resolve();
		} else {
			setTimeout(_ => poll(resolve), 50)
		}
	}

	return new Promise(poll)
}

const updateUI = async () => {
	await waitForDiv(() => {
		return document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1') !== null
	})

	const search = document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1')

	search.classList.add('centered-search')

	if (window.location.pathname !== '/') {
		search.classList.add('patch')
	}

	const nav = document.querySelector('div.navbar__items')

	nav.appendChild(search)

	document.addEventListener('click', () => {
		const search = document.querySelector('div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1')

		if (search === null) {
			return
		}

		search.classList.add('centered-search')

		if (window.location.pathname !== '/') {
			search.classList.add('patch')
		}

		const nav = document.querySelector('div.navbar__items')

		nav.appendChild(search)
	})
}

if (ExecutionEnvironment.canUseDOM) {
	setTimeout(updateUI, 0);
}
