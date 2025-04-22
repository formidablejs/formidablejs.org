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

To build a multi-page application, use the `create-formidable` CLI with the following flags:

<Tabs
    defaultValue={State.manager}
	groupId="code-snippets"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm create formidable@latest example-app --imba --scaffolding mpa
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm create formidable@latest example-app --imba --scaffolding mpa
```

</TabItem>

<TabItem value="yarn">

```bash
yarn create formidable example-app --imba --scaffolding mpa
```

</TabItem>

<TabItem value="bun">

```bash
bun create formidable@latest example-app --imba --scaffolding mpa
```

</TabItem>
</Tabs>

This will create a new project with mpa related files.

See the [Views](/docs/views) documentation for more information.

#### Single-page Application

To build a single-page application, you can use the `create-formidable` CLI with the following flag:

<Tabs
    defaultValue={State.manager}
	groupId="code-snippets"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm create formidable@latest example-app --imba
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm create formidable@latest example-app --imba
```

</TabItem>

<TabItem value="yarn">

```bash
yarn create formidable example-app --imba
```

</TabItem>

<TabItem value="bun">

```bash
bun create formidable@latest example-app --imba
```

</TabItem>
</Tabs>

This will create a new project and install the `@formidablejs/view` package, then publish spa related files.

The frontend files will be published in the `resources/frontend` folder.
To get started, open the `resources/frontend/App.imba` file.

See the [Views](/docs/views) documentation for more information.

## Vue.js, React & Svelte

Formidable provides an Inertia Adapter through [Laravel Mix](https://github.com/JeffreyWay/laravel-mix).

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) is a package developed by [Laracasts](https://laracasts.com/) creator Jeffrey Way. It provides a fluent API for defining webpack build steps for your Laravel and Formidable applications using several common CSS, TypeScript and JavaScript pre-processors.

In other words, Mix makes it a cinch to compile and minify your application's CSS, TypeScript and JavaScript files. Through simple method chaining, you can fluently define your asset pipeline. For example:

```js title=webpack.mix.js showLineNumbers
mix.ts('resources/js/app.ts', 'public/js')
    .postCss('resources/css/app.css', 'public/css');
```

### Installation & Setup

To get started with an application powered by Inertia, use the following commands:

#### Vue

<Tabs
    defaultValue={State.manager}
	groupId="code-snippets"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm create formidable@latest example-app --vue
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm create formidable@latest example-app --vue
```

</TabItem>

<TabItem value="yarn">

```bash
yarn create formidable example-app --vue
```

</TabItem>

<TabItem value="bun">

```bash
bun create formidable@latest example-app --vue
```

</TabItem>
</Tabs>

#### React

<Tabs
    defaultValue={State.manager}
	groupId="code-snippets"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm create formidable@latest example-app --react
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm create formidable@latest example-app --react
```

</TabItem>

<TabItem value="yarn">

```bash
yarn create formidable example-app --react
```

</TabItem>

<TabItem value="bun">

```bash
bun create formidable@latest example-app --react
```

</TabItem>
</Tabs>

#### Svelte

<Tabs
    defaultValue={State.manager}
	groupId="code-snippets"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm create formidable@latest example-app --svelte
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm create formidable@latest example-app --svelte
```

</TabItem>

<TabItem value="yarn">

```bash
yarn create formidable example-app --svelte
```

</TabItem>

<TabItem value="bun">

```bash
bun create formidable@latest example-app --svelte
```

</TabItem>
</Tabs>

> This will scaffold a Vuejs, React or Svelte application for you.

### Running Mix

Mix is a configuration layer on top of [webpack](https://webpack.js.org/), so to run your Mix tasks you only need to execute one of the NPM scripts that are included in the default Formidable `package.json` file. When you run the `dev` or `production` scripts, all of your application's CSS, TypeScript and JavaScript assets will be compiled and placed in your application's `public` directory:

<Tabs
    defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```
// Run all Mix tasks...
npm run mix:dev

// Run all Mix tasks and minify output...
npm run mix:prod
```

</TabItem>

<TabItem value="pnpm">

```
// Run all Mix tasks...
pnpm run mix:dev

// Run all Mix tasks and minify output...
pnpm run mix:prod
```

</TabItem>

<TabItem value="yarn">

```
// Run all Mix tasks...
yarn run mix:dev

// Run all Mix tasks and minify output...
yarn run mix:prod
```

</TabItem>

<TabItem value="bun">

```
// Run all Mix tasks...
bun run mix:dev

// Run all Mix tasks and minify output...
bun run mix:prod
```

</TabItem>
</Tabs>

#### Watching Assets For Changes

The `mix:watch` script will continue running in your terminal and watch all relevant CSS, TypeScript and JavaScript files for changes. Webpack will automatically recompile your assets when it detects a change to one of these files:

<Tabs
    defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'npm', value: 'npm'},
		{label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm run mix:watch
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm run mix:watch
```

</TabItem>

<TabItem value="yarn">

```bash
yarn run mix:watch
```

</TabItem>

<TabItem value="bun">

```bash
bun run mix:watch
```

</TabItem>
</Tabs>

:::info

You don't have to run the `mix:watch` script, running `node craftsman serve --dev` will also watch your assets for changes and recompile them when needed.

:::


### Component Rendering

#### Creating responses

In your controller, provide both the name of the TypeScript or JavaScript page component, as well as any props (data) for the page.

In this example we're passing a single prop, called `post` to the Post/Show page component:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title=app/Http/Controllers/PostController.imba showLineNumbers
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

```ts title=app/Http/Controllers/PostController.ts showLineNumbers
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

We can access the `post` prop in our page component like so:

<Tabs
    defaultValue={State.framework}
	groupId="frameworks"
    values={[
        {label: 'Vue', value: 'vue'},
        {label: 'React', value: 'react'},
        {label: 'Svelte', value: 'svelte'},
    ]}>
<TabItem value="vue">

```html title="resources/js/Pages/Post/Show.vue" showLineNumbers
<script lang="ts" setup>
defineProps({
	post: {
		type: Post,
		required: true
	}
})
</script>

<template>
	<h1>{{ post.title }}</h1>
	<p>{{ post.body }}</p>
</template>
```

</TabItem>
<TabItem value="react">

```tsx title="resources/js/Pages/Post/Show.tsx" showLineNumbers
export default function Show({ post }: { post: Post }) {
	return (
		<>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</>
	)
}
```

</TabItem>
<TabItem value="svelte">

```html title="resources/js/Pages/Post/Show.svelte" showLineNumbers
<script>
	/** @type {Post} post */
	export let post
</script>

<h1>{post.title}</h1>
<p>{post.body}</p>
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

```py title=config/inertia.imba {11} showLineNumbers
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

	mix: "npm run mix:watch" # "pnpm run mix:watch" || "yarn run mix:watch" || "bun run mix:watch"

}
```

</TabItem>
<TabItem value="ts">

```ts title=config/inertia.ts {13} showLineNumbers
import { App } from '../resources/views/app'

export default {

	/*
	 * --------------------------------------------------------------------------
	 * Root View
	 * --------------------------------------------------------------------------
	 *
	 * Sets the root template that's loaded on the first page visit.
	 */

	rootView: App,

	/**
	 * --------------------------------------------------------------------------
	 * Laravel Mix Command
	 * --------------------------------------------------------------------------
	 * Command that runs to execute Laravel Mix when Formidable is in development
	 * mode.
	 */

	mix: "npm run mix:watch" // "pnpm run mix:watch" || "yarn run mix:watch" || "bun run mix:watch"

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

```py showLineNumbers
Inertia.render('Welcome').setRootView(CustomFormidableView)
```

</TabItem>
<TabItem value="ts">

```py showLineNumbers
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

```py showLineNumbers
Inertia.render('Welcome').withViewData({
	meta: meta
})
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
Inertia.render('Welcome').withViewData({
	meta: meta
})
```

</TabItem>
</Tabs>

> This section is incomplete. Join our [discord](https://discord.gg/QdXM7eV5Yj) if you have questions.

-----

For more information on how to use Laravel Mix and Inertia, see the Laravel Mix [documentation](https://laravel-mix.com/docs/6.0/installation) and the Inertia [documentation](https://inertiajs.com/).

### TailwindCSS

You can use TailwindCSS with your React, Vue or Svelte application. In this guide, we will setup TailwindCSS for your application.

#### Installation

Install tailwindcss and its peer dependencies via npm, and create your tailwind.config.js file:

<Tabs
    defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm install -D tailwindcss postcss autoprefixer
pnpm exec tailwindcss init
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add -D tailwindcss postcss autoprefixer
yarn exec tailwindcss init
```

</TabItem>

<TabItem value="bun">

```bash
bun add --dev tailwindcss postcss autoprefixer
bunx tailwindcss init
```

</TabItem>
</Tabs>

#### Configuration

In your `webpack.mix.js` file, add tailwindcss as a PostCSS plugin:

```js title="webpack.mix.js" {2} showLineNumbers
.postCss('resources/css/app.css', './public/css', [
	require("tailwindcss"),
])
```

Add the paths to all of your template files in your `tailwind.config.js` file:

```js title="tailwind.config.js" {4-8} showLineNumbers
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.js",
    "./resources/**/*.ts",
    "./resources/**/*.tsx",
    "./resources/**/*.vue",
    "./resources/**/*.svelte",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the @tailwind directives for each of Tailwind’s layers to your `./resources/css/app.css` file:

```css title="resources/css/app.css" showLineNumbers
@tailwind base;
@tailwind components;
@tailwind utilities;
```
You're done! Visit [https://tailwindcss.com/](https://tailwindcss.com/) for more information.
