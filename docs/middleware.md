---
id: middleware
title: Middleware
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Middleware

## Introduction {#introduction}

Middleware provide a convenient mechanism for filtering HTTP requests entering your application. For example, Modulus includes a middleware that verifies the user of your application is authenticated. If the user is not authenticated, the middleware will throw an Exception. However, if the user is authenticated, the middleware will allow the request to proceed further into the application.

Of course, additional middleware can be written to perform a variety of tasks besides authentication.

There are several middleware included in the Formidable framework, including middleware for authentication and CSRF protection. All of these middleware are located in the app/Http/Middleware directory.


## Defining Middleware {#defining-middleware}

To create a new middleware, use the `make:middleware` Craftsman command:

```bash
node craftsman make:middleware CheckAge
```

This command will place a new `CheckAge` class within your `app/Http/Middleware` directory. In this middleware, we will only allow access to the route if the supplied `age` is greater than 18. Otherwise, we will throw an Exception.

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Middleware/CheckAge.imba" {7} showLineNumbers
import { ForbiddenException } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'

export class CheckAge

	def handle request\Request
		if request.get('age') < 18 then throw new ForbiddenException 'Entry denied.'

		request
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Middleware/CheckAge.ts" {6,7,8} showLineNumbers
import { ForbiddenException } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'

export class CheckAge {
	handle(request: Request): Request {
		if (request.get('age') < 18) {
			throw new ForbiddenException 'Entry denied.'
		}

		return request
	}
}
```

</TabItem>
</Tabs>

As you can see, if the given `age` is less than `18`, the middleware will throw an Exception; otherwise, the request will be passed further into the application.

## Registering Middleware {#registering-middleware}

### Global Middleware {#global-middleware}

If you want a middleware to run during every HTTP request to your application, list the middleware class in the `middleware` getter of your `app/Http/Kernel.imba` class or `app/Http/Kernel.ts` class.

### Assigning Middleware To Routes {#assigning-middleware-to-routes}

If you would like to assign middleware to specific routes, you should first assign the middleware a key in your `app/Http/Kernel.imba` class or `app/Http/Kernel.ts`. By default, the `routeMiddleware` getter of this class contains entries for the middleware included with Formidable. To add your own, append it to this list and assign it a key of your choosing. For example:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Kernel.imba" {3} showLineNumbers
get routeMiddleware
	{
		'auth': Authenticate
		'cors': HandleCors
		'guest': ErrorIfAuthenticated
		'lang': AcceptLanguage
		'signed': ValidateSignature
	}
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Kernel.ts" {3} showLineNumbers
get routeMiddleware(): object {
	return {
		'auth': Authenticate,
		'cors': HandleCors,
		'guest': ErrorIfAuthenticated,
		'lang': AcceptLanguage,
		'signed': ValidateSignature
	}
}
```

</TabItem>
</Tabs>

Once the middleware has been defined in the HTTP kernel, you may use the `middleware` method to assign middleware to a route:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {3} showLineNumbers
Route.get('admin/profile', do
	# do something...
)->middleware(['auth'])
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {3} showLineNumbers
Route.get('admin/profile', () => {
	// do something...
})->middleware(['auth'])
```

</TabItem>
</Tabs>

You may also assign multiple middleware to the route:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {3} showLineNumbers
Route.get('/', do
	# do something...
).middleware(['first', 'second'])
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {3} showLineNumbers
Route.get('/', () => {
	// do something...
}).middleware(['first', 'second'])
```

</TabItem>
</Tabs>

### Middleware Groups {#middleware-groups}

Sometimes you may want to group several middleware under a single key to make them easier to assign to routes. You may do this using the `middlewareGroups` getter of your HTTP kernel.

Out of the box, Formidable comes with `jwt` and `session` middleware groups:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="app/Http/Kernel.imba" {3,7} showLineNumbers
get middlewareGroups
	{
		jwt: [

		]

		session: [
			VerifyCsrfToken
		]
	}
```


</TabItem>
<TabItem value="ts">

```ts title="app/Http/Kernel.ts" {3,7} showLineNumbers
get middlewareGroups(): object {
	return {
		jwt: [

		],

		session: [
			VerifyCsrfToken
		]
	}
}
```

</TabItem>
</Tabs>
