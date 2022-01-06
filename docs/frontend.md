---
id: frontend
title: Frontend Development
---

# Frontend Development

Formidable provides an Inertia Adapter through [Laravel Mix](https://github.com/JeffreyWay/laravel-mix).

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) is a package developed by [Laracasts](https://laracasts.com/) creator Jeffrey Way. It provides a fluent API for defining webpack build steps for your Laravel and Formidable applications using several common CSS and JavaScript pre-processors.

In other words, Mix makes it a cinch to compile and minify your application's CSS and JavaScript files. Through simple method chaining, you can fluently define your asset pipeline. For example:

```js title=webpack.mix.js
mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css');
```

## Installation & Setup

To get started with an application powered by Inertia, use the following commands:

```bash
craftsman new <app-name> --web
cd <app-name>
craftsman inertia
```

Choose Vue or React.

> This will scaffold a Vuejs or React application for you.

## Running Mix

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

## Inertia

### Responses

#### Creating responses

In your controller, provide both the name of the JavaScript page component, as well as any props (data) for the page.

In this example we're passing a single prop, called `post` to the Post/Show page component:

```py title=app/Http/Controllers/PostController.imba
import { Inertia } from '@formidablejs/inertia'
import { Post } from '../../Models/Post'
import { Controller } from './Controller'

export class PostController

	@use(Post)
	def show post\Post
		const { attributes } = await post

		Inertia.render('Post/Show', {
			post: attributes
		})
```

#### Root template data

The default inertia root view is defined in the `config/inertia.imba` config file:

```py title=config/inertia.imba
import { App } from '../resources/views/app'

export default {

	# --------------------------------------------------------------------------
	# Root View
	# --------------------------------------------------------------------------
	#
	# Sets the root template that's loaded on the first page visit.

	rootView: App

}
```

If you'd like to provide a custom root for for a specific component, you may do so by using `setRootView`:

```py
Inertia.render('Welcome').setRootView(CustomFormidableView)
```

You can also pass data props to a root view by using `withViewData`:

```py
Inertia.render('Welcome').withViewData({
	meta: meta
})
```

> This section is incomplete. Join our [discord](https://discord.gg/wm2sFGSrmX) if you have questions.

-----

For more information on how to use Laravel Mix and Inertia, see the Laravel [documentation](https://laravel.com/docs/8.x/mix) and the Inertia [documentation](https://inertiajs.com/).
