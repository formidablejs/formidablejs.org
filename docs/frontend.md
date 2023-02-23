---
id: frontend
title: Frontend Development
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Frontend Development

## Imba

By default Formidable uses Imba for its frontend development. You can build your frontend either as a single-page application or as a web application.

#### Multi-page Application

To build a multi-page application, use the `formidable new` command with the following flags:

```bash
formidable new example-app --type "full-stack" --stack "imba" --scaffolding "mpa"
```

This will create a new project with mpa related files.

See the [Views](/docs/views) documentation for more information.

#### Single-page Application

To build a single-page application, you can use the `formidable new` command with the following flags:

```bash
formidable new example-app --type "full-stack" --stack "imba" --scaffolding "spa"
```

This will create a new project and install the `@formidablejs/view` package, then publish spa related files.

The frontend files will be published in the `resources/frontend` folder.
To get started, open the `resources/frontend/App.imba` file.

See the [Views](/docs/views) documentation for more information.

## Vue.js & React

Formidable provides an Inertia Adapter through [Laravel Mix](https://github.com/JeffreyWay/laravel-mix).

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) is a package developed by [Laracasts](https://laracasts.com/) creator Jeffrey Way. It provides a fluent API for defining webpack build steps for your Laravel and Formidable applications using several common CSS and JavaScript pre-processors.

In other words, Mix makes it a cinch to compile and minify your application's CSS and JavaScript files. Through simple method chaining, you can fluently define your asset pipeline. For example:

```js title=webpack.mix.js
mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css');
```

### Installation & Setup

To get started with an application powered by Inertia, use the following commands:

#### React

```bash
formidable new example-app --type "full-stack" --stack "react"
```

#### Vue

```bash
formidable new example-app --type "full-stack" --stack "vue"
```

> This will scaffold a Vuejs or React application for you.

### Running Mix

Mix is a configuration layer on top of [webpack](https://webpack.js.org/), so to run your Mix tasks you only need to execute one of the NPM scripts that are included in the default Formidable `package.json` file. When you run the `dev` or `production` scripts, all of your application's CSS and JavaScript assets will be compiled and placed in your application's `public` directory:

```
// Run all Mix tasks...
npm run mix:dev

// Run all Mix tasks and minify output...
npm run mix:prod
```

#### Watching Assets For Changes

The `npm run mix:watch` command will continue running in your terminal and watch all relevant CSS and JavaScript files for changes. Webpack will automatically recompile your assets when it detects a change to one of these files:

```
npm run mix:watch
```

### Inertia

#### Creating responses

In your controller, provide both the name of the JavaScript page component, as well as any props (data) for the page.

In this example we're passing a single prop, called `post` to the Post/Show page component:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title=app/Http/Controllers/PostController.imba
import { @use } from '@formidablejs/framework'
import { Inertia } from '@formidablejs/inertia'
import { PostRepository } from '../../Repositories/PostRepository'
import { Controller } from './Controller'

export class PostController < Controller

	@use(PostRepository)
	def show post\Promise<Post>
		post = await post

		Inertia.render('Post/Show', {
			post: post
		})
```

</TabItem>
<TabItem value="ts">

```ts title=app/Http/Controllers/PostController.ts
import { use } from '@formidablejs/framework'
import { Inertia } from '@formidablejs/inertia'
import { InertiaResponse } from '@formidablejs/inertia'
import { PostRepository } from '../../Repositories/PostRepository'
import { Controller } from './Controller'

export class PostController extends Controller
	@use(PostRepository)
	async show(post: Promise<Post>): Promise<InertiaResponse> {
		post = await post

		return Inertia.render('Post/Show', {
			post: post
		})
	}
}
```

</TabItem>
</Tabs>

#### Root template data

The default inertia root view is defined in the `config/inertia.imba` or `config/inertia.ts` config file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title=config/inertia.imba {11}
import { App } from '../resources/views/app'

export default {

	# --------------------------------------------------------------------------
	# Root View
	# --------------------------------------------------------------------------
	#
	# Sets the root template that's loaded on the first page visit.

	rootView: App

	# --------------------------------------------------------------------------
	# Laravel Mix Command
	# --------------------------------------------------------------------------
	#
	# Command that runs to execute Laravel Mix when Formidable is in development
	# mode.

	mix: "npm run mix:watch"

}
```

</TabItem>
<TabItem value="ts">

```ts title=config/inertia.ts {13}
import { App } from '../resources/views/app'

export default {

	/*
	 * --------------------------------------------------------------------------
	 * Root View
	 * --------------------------------------------------------------------------
	 *
	 * Sets the root template that's loaded on the first page visit.
	 */

	rootView: App

	/**
	 * --------------------------------------------------------------------------
	 * Laravel Mix Command
	 * --------------------------------------------------------------------------
	 * Command that runs to execute Laravel Mix when Formidable is in development
	 * mode.
	 */

	mix: "npm run mix:watch"

}
```

</TabItem>
</Tabs>

If you'd like to provide a custom root for for a specific component, you may do so by using `setRootView`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
Inertia.render('Welcome').setRootView(CustomFormidableView)
```

</TabItem>
<TabItem value="ts">

```py
Inertia.render('Welcome').setRootView(CustomFormidableView)
```

</TabItem>
</Tabs>

You can also pass data props to a root view by using `withViewData`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
Inertia.render('Welcome').withViewData({
	meta: meta
})
```

</TabItem>
<TabItem value="ts">

```ts
Inertia.render('Welcome').withViewData({
	meta: meta
})
```

</TabItem>
</Tabs>

> This section is incomplete. Join our [discord](https://discord.gg/QdXM7eV5Yj) if you have questions.

-----

For more information on how to use Laravel Mix and Inertia, see the Laravel Mix [documentation](https://laravel-mix.com/docs/6.0/installation) and the Inertia [documentation](https://inertiajs.com/).
