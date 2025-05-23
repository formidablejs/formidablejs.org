---
id: views
title: Views
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Views

Just like any other modern framework, Formidable ships with a views feature. Formidable's views are powered by [Imba](https://imba.io/) allowing you to quickly write beautiful Imba views and use them in your application.

A typical view in Formidable looks like this:

```py title="resources/views/greeting.imba" showLineNumbers
import { View } from '@formidablejs/framework'

export class Greeting < View

	def render
		<html>
			<body>
				<h1> "Hello {get('name')}"
```

Since this view is stored at `resources/views/greeting.imba`, we may return it using the `view` helper like so:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/web.imba" showLineNumbers
import { Route } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'
import { Greeting } from '../resources/views/greeting'

Route.get '/greeting', do view(Greeting, { name: 'Luna' })
```

</TabItem>
<TabItem value="ts">

```ts title="routes/web.ts" showLineNumbers
import { Route } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'
import { Greeting } from '../resources/views/greeting'

Route.get('/greeting', (): View => view(Greeting, { name: 'Luna' }))
```

</TabItem>
</Tabs>

## Creating & Rendering Views

You may create a view by extending the `View` class and placing it in your application's `resources/views` directory.

Once you have created a view, you may return it from one of your application's routes or controllers using the `view` helper:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
Route.get '/greeting', do view(Greeting, { name: 'Luna' })
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
Route.get('/greeting', (): View => view(Greeting, { name: 'Luna' }))
```

</TabItem>
</Tabs>

As you can see, the first argument passed to the view helper is the view class located in the `resources/views` directory. The second argument is an object of data that should be made available to the view. In this case, we are passing the name variable, which is displayed in the view using the `get` method provided by the `View` class.

## Passing Data To Views

As you saw in the previous examples, you may pass an object of data to views to make that data available to the view:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
view(Greeting, { name: 'Donald' })
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
view(Greeting, { name: 'Donald' })
```

</TabItem>
</Tabs>

## Imba Components

You may use Imba components in your views. Here's a typical example of how to use an Imba component in a Formidable view:

```py title="resources/views/components/counter.imba" showLineNumbers
export tag CounterComponent
	prop count = 1

	def render
		<self>
			<h1 [c:blue4]> "Count {self.count}"
			<button @click=count++> "Click"

```

And our Formidable view:

```py title="resources/views/app.imba" showLineNumbers
import { View } from '@formidablejs/framework'
import { CounterComponent } from './components/counter'

export class Counter < View

	def render
		<html>
			<head>
				<title> "Counter app"
				<style src="./components/counter">

			<body>
				<script type="module" src="./components/counter">
				<CounterComponent>
```

As you can see, we have imported the `Counter` component into our view.
We have included a style tag, this will import the stylesheet of the `Counter` component, and we also included a script tag. This will import the js `script` used by the `Counter` component.

> For more informdation, visit the [Imba documentation](https://imba.io/docs/components)

## Global Data Props

#### locale

Returns the requests locale. E.g. `en`.

```py showLineNumbers
def render
	<p> "Locale: { get('locale') }"
```

#### csrf_token

Returns the requests csrf token.

```py showLineNumbers
def render
	<form method="post">
		<input type="hidden" name="_token" value=get('csrf_token')>
```

## View Events

#### beforeRender

Runs before a view is rendered:

```py showLineNumbers
import { View } from '@formidablejs/framework'

export class Home < View

	def beforeRender
		# do something cool
```

#### afterRender

Runs after a view is rendered:

```py showLineNumbers
import { View } from '@formidablejs/framework'

export class Home < View

	def afterRender
		# do something cool
```

Runs before the view is rendered.

## View Helpers

Here a helper functions you can use in your Formidable Views.

#### get

Get sanitized view data prop:

```py showLineNumbers
def render
	<p> "Hello, { get('name') }"
```

> Sanitization only works on strings.

#### raw

Get unsanitized view data prop:

```py showLineNumbers
def render
	<p> "Hello, { raw('name') }"
```

#### has

Check if data prop is present:

```py showLineNumbers
def render
	if has('name')
		<p> "Hello, { get('name') }"
```

#### old

Retrieve old data:

```py showLineNumbers
def render
	<input name='email_address' value=old('email_address')>
```

#### session

Get flashed data:

```py showLineNumbers
def render
	<p> session('success')
```

#### hasSession

Check if flashed data is present:

```py showLineNumbers
def render
	if hasSession('success')
		<p> session('success')
```

#### error

Get validation error:

```py showLineNumbers
def render
	for error in error('email_address')
		<p> error
```

#### hasError

Check if validation error is present:

```py showLineNumbers
def render
	if hasError('email_address')
		for error in error('email_address')
			<p> error
```

#### translation

Translate text:

```py showLineNumbers
def render
	<h1> translate('messages.welcome')
```

You may also use `__`, an alias of `translate`:

```py showLineNumbers
def render
	<h1> __('messages.welcome')
```

> See [Localization](/docs/localization) for more information.
