---
id: hooks
title: Hooks
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Introduction

SPA hooks allow you to make your application a bit more interactive. These hooks can only be used within SPA applications running on imba componnets.

## useProp

The `useProp` hook allows you to access a property passed down from your backend to your frontend.

#### *Backend*

In order to pass props from our backend, we need to pass an object with all our props as the second parameter to the `view` function:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/web.imba"
import { App } from '../resources/views/app'
import { Route } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'

Route.get('/', do
	view(App, {
		name: 'Donald'
	})
)
```

</TabItem>
<TabItem value="ts">

```typescript title="routes/web.ts"
import { App } from '../resources/views/app'
import { Route } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'

Route.get('/', () => {
	return view(App, {
		name: 'Donald'
	})
)
```
</TabItem>
</Tabs>

#### *View*

To access our props in our view, we can use the `get` helper method. Then we can pass them, to our imba components as html attributes on the `<Props>` component and prefix them with `html:`:

```py {3,20} title="resources/views/app.imba"
import { config } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'
import { Props } from '@formidablejs/view'

export class App < View

	def render
		<html>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> config('app.name', 'Formidable')

				<link rel='stylesheet' href='https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body>
				<script type="module" src="../frontend/main.imba">

				<Props html:name=get('name', 'stranger') html:routes=routes()>

```

#### *Component*

And finally, we can access the props using the `useProp` hook:

```py {1,5} title="resources/frontend/App.imba"
import { useProp } from '@formidablejs/view'

export tag App

	prop name = useProp('name')

	def render
		<self>
			<h1> "Hi {name}"
```

### Working with Objects

When passing object from our backend, it can be a bit tricky. The first thing you'll notice is, when trying to access your passed objects, you'll get `[object Object]` instead of the object itself.

To avoid this, you will need to stringify your objects using `JSON.stringify`:

```js
<Props html:user=JSON.stringify(get('user'))>
```

## useForm

The `useForm` hook allows you to send requests to a specific path:

```py {1,5-8} title="resources/frontend/pages/People/Create.imba"
import { useForm } from '@formidablejs/view'

export tag Create

	prop form = useForm({
		first_name: ''
		last_name: ''
	})

	def submit
		form.post('/api/people', {
			onSuccess: do form.reset()
		})

	def render
		<self>
			<form @submit.prevent=submit>
				<div[d:block]>
					<label> "First Name"
					<input type="text" bind=form.first_name>

				<div[d:block]>
					<label> "Last Name"
					<input type="text" bind=form.last_name>

				<div[d:block]>
					<button> "Add"

```

The `useForm` hook above, will send a body with a new person's information to the `/api/people` path as a post request.

### Error Handling

If we want to display form errors, we may access the errors of a specific property on the `errors` object:

```html {6-8} title="resources/frontend/pages/People/Create.imba"
<form @submit.prevent=submit>
	<div[d:block]>
		<label> "First Name"
		<input type="text" bind=form.first_name>

	if form.errors.first_name
		for error in form.errors.first_name
			<p> error
```

We can also conditionally style elements based on whether there are errors or not. For example, we can change the border color of a text input to red if its property has errors:

```html {4} title="resources/frontend/pages/People/Create.imba"
<form @submit.prevent=submit>
	<div[d:block]>
		<label> "First Name"
		<input [bc:red4]=form.errors.first_name type="text" bind=form.first_name>
```

If you don't want to handle errors on the rendered form itself, you can use `useForm` events:

```py {3-4} title="resources/frontend/pages/People/Create.imba"
def submit
	form.post('/api/person', {
		onError: do(error)
			console.log 'Oops, an error occured!'
	})
```

The `onError` handler event, will pass an instance of `AxiosError`.

When your application returns an error either than a `422`, a errors component will be rendered on top of our current page. If you want to hide this component by default, you can pass a `FormConfig` as a second object to the instantiation of your form:

```py {5} title="resources/frontend/pages/People/Create.imba"
prop form = useForm({
	first_name: ''
	last_name: ''
}, {
	renderServerError: false
})
```

To change this for all forms in your application, you can set a `FormConfig` in your bootstrap file located in the `resources/frontend` directory:

```js title="resources/frontend/bootstrap.imba"
window.FormConfig = {
	renderServerError: false
}
```


### Successful Responses

So what happens when the `useForm` hook returns a success status. Well, the `onSuccess` event handler will be invoked:

```py {3-4} title="resources/frontend/pages/People/Create.imba"
def submit
	form.post('/api/people', {
		onSuccess: do(response)
			console.log 'successfully created a new person!'
	})
```

The `onSuccess` handler event, will pass an instance of `AxiosResponse`.

We can also show a success message on our page:

```html {3-4} title="resources/frontend/pages/People/Create.imba"
def render
	<self>
		if form.recentlySuccessful
			<p[c:green5]> "Success"

		<form @submit.prevent=submit>
```

By default, the `<p>` element with the content "Success" will be shown for `2000` ms. To change this, you can pass a `FormConfig` as a second object to the instantiation of your form:

```py {5} title="resources/frontend/pages/People/Create.imba"
prop form = useForm({
	first_name: ''
	last_name: ''
}, {
	recentlySuccessful: 5000
})
```

We have now changed `recentlySuccessful` to `5000` ms. This value can be anything.

To change this for all forms in your application, you can set a `FormConfig` in your bootstrap file located in the `resources/frontend` directory:

```js title="resources/frontend/bootstrap.imba"
window.FormConfig = {
	recentlySuccessful: 5000
}
```

### FormProgress

Since `useForm` requests are made via XHR, there's no default browser loading indicator when making requests to specified resources. To solve this, there's an optional `<FormProgress>` component, which shows a loading bar whenever you make a request or visit pages:

```py {1,8} title="resources/frontend/App.imba"
import { FormProgress } from '@formidablejs/view'
import { useRoute } from '@formidablejs/view'

export tag App

	def render
		<self>
			<FormProgress>
```

#### Configuration

Since the `<FormProgress>` component is a wrapper around [NProgress](https://ricostacruz.com/nprogress/), you can configure the `<FormProgress>` component with similar [NProgress](https://ricostacruz.com/nprogress/) configurations:

##### `color`

Set a default color for the loading indicator:

```html
<FormProgress color="red">
```

##### `observeUrl`

Show loading indicator when page changes. (default: `false`):

```html
<FormProgress observeUrl=true>
```

##### `minimum`

Changes the minimum percentage used upon starting. (default: `0.08`):

```html
<FormProgress minimum="0.1">
```

##### `template`

You can change the markup using template. To keep the progress bar working, keep an element with role='bar' in there:

```html
<FormProgress template="<div class='....'>...</div>">
```

##### `easing` and `speed`

Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: `ease` and `200`):

```html
<FormProgress easing="ease" speed=500>
```

##### `trickle`

Turn off the automatic incrementing behavior by setting this to `false`. (default: `true`):

```html
<FormProgress trickle=false>
```

##### `trickleSpeed`

Adjust how often to trickle/increment, in ms:

```html
<FormProgress trickleSpeed=200>
```

##### `showSpinner`

Turn on loading spinner by setting it to `true`. (default: `false`):

```html
<FormProgress showSpinner=true>
```

##### `parent`

Specify this to change the parent container. (default: `body`):

```html
<FormProgress parent="#container">
```

## useRoute

The `useRoute` hook allows you to generate routes based on thier name and any required parameters:

```py title="resources/frontend/App.imba"
import { useRoute } from '@formidablejs/view'

export tag App

	def mount
		const postRoute = useRoute('posts.all')
```

### Route Parameters

Sometimes, our routes contain parameters, the `useRoute` hook makes it easy to pass them to the generator:

#### *Backend*

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/api.imba"
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/user/:id', do(request\Request)
	# do something
).name('user.find')
```

</TabItem>
<TabItem value="ts">

```typescript title="routes/api.ts"
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/user/:id', (request: Request) => {
	// do something
}).name('user.find')
```

</TabItem>
</Tabs>

#### *Components*

```py title="resources/frontend/App.imba"
import { useRoute } from '@formidablejs/view'

export tag App

	def mount
		const userRoute = useRoute('user.find', {
			id: 1
		})
```

### Route Query

If we want to include a query string to our route, we can pass a second parameter to the `useRoute` hook with an object of properties of a query string. If the properties are not expected as parameters, then they will be added as a query string:

```py title="resources/frontend/App.imba"
import { useRoute } from '@formidablejs/view'

export tag App

	def mount
		const userRoute = useRoute('user.find', {
			id: 1
			posts: true
			friends: true
		})
```

But how would we handle a case where our query string properties clash with our route parameters? Well, we can pass a `_query` with our query string properties:

```py title="resources/frontend/App.imba"
import { useRoute } from '@formidablejs/view'

export tag App

	def mount
		const userRoute = useRoute('user.find', {
			id: 1
			_query: {
				posts: true
				friends: true
			}
		})
```
