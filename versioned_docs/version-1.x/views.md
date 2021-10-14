---
id: views
title: Views
---

# Introduction

Just like any other morden framework, Formidable ships with a views feature. Formidable's views are powered by [Imba](https://imba.io/) allowing you to quickly write beautiful Imba views and use them in your application.

A typical view in Formidable looks like this:

```py
# View stored in resources/views/greeting.imba

import { View } from '@formidable/framework'

export default class < View
	def render
		<html>
			<body>
				<h1> "Hello {get('name')}"
```

Since this view is stored at `resources/views/greeting.imba`, we may return it using the `view` helper like so:

```py
import { Route, view } from '@formidablejs/framework'
import Greeting from '../resources/views/greeting'

Route.get '/greeting', do view(Greeting, { name: 'Luna' })
```

## Creating & Rendering Views

You may create a view by extending the `View` class and placing it in your application's `resources/views` directory.

Once you have created a view, you may return it from one of your application's routes or controllers using the `view` helper:

```py
Route.get '/greeting', do view(Greeting, { name: 'Luna' })
```

As you can see, the first argument passed to the view helper is the view class located in the `resources/views` directory. The second argument is an object of data that should be made available to the view. In this case, we are passing the name variable, which is displayed in the view using the `get` method provided by the `View` class.

## Passing Data To Views

As you saw in the previous examples, you may pass an object of data to views to make that data available to the view:

```py
view(Greeting, { name: 'Donald' })
```

## Imba Components

You may use Imba components in your views. Here's a typical example of how to use an Imba component in a Formidable view:

```py
# View stored in resources/views/components/counter.imba

export default tag Counter
	prop count = 1

	def render
		<self>
			<h1 [c:blue4]> "Count {self.count}"
			<button @click=count++> "Click"

```

And our Formidable view:

```py
# View stored in resources/views/app.imba

import { View } from '@formidablejs/framework'
import Counter from './components/counter'

export default class < View
	def render
		<html>
			<head>
				<title> "Counter app"
				<style src="./components/counter">

			<body>
				<script type="module" src="./components/counter">
				<Counter>
```

As you can see, we have imported the `Counter` component into our view.
We have included a style tag, this will import the stylesheet of the `Counter` component, and we also included a script tag. This will import the js `script` used by the `Counter` component.

> For more informdation, visit the [Imba documentation](https://imba.io/tags/custom-components)