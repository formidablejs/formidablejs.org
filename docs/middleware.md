---
id: middleware
title: Middleware
---

# Middleware

## Introduction

Middleware provide a convenient mechanism for filtering HTTP requests entering your application. For example, Modulus includes a middleware that verifies the user of your application is authenticated. If the user is not authenticated, the middleware will throw an Exception. However, if the user is authenticated, the middleware will allow the request to proceed further into the application.

Of course, additional middleware can be written to perform a variety of tasks besides authentication.

There are several middleware included in the Formidable framework, including middleware for authentication and CSRF protection. All of these middleware are located in the app/Http/Middleware directory.


## Defining Middleware

To create a new middleware, use the `make middleware` Craftsman command:

```
$ craftsman make middleware CheckAge
```

This command will place a new `CheckAge` class within your `app/Http/Middleware` directory. In this middleware, we will only allow access to the route if the supplied `age` is greater than 18. Otherwise, we will throw an Exception.

```py
import { ForbiddenException } from '@formidablejs/framework'

export default class CheckAge

	def handle request
		if request.get('age') < 18 then throw new ForbiddenException 'Entry denied.'

		request
```

As you can see, if the given `age` is less than `18`, the middleware will throw an Exception; otherwise, the request will be passed further into the application.

## Registering Middleware

### Global Middleware

If you want a middleware to run during every HTTP request to your application, list the middleware class in the `middleware` getter of your `app/Http/Kernel.imba` class.

### Assigning Middleware To Routes

If you would like to assign middleware to specific routes, you should first assign the middleware a key in your `app/Http/Kernel.imba` file. By default, the `routeMiddleware` getter of this class contains entries for the middleware included with Formidable. To add your own, append it to this list and assign it a key of your choosing. For example:

```py
# Within app/Http/Kernel.imba Class...
get routeMiddleware
	{
		'auth': Authenticate
		'cors': HandleCors
		'guest': ErrorIfAuthenticated
		'lang': AcceptLanguage
		'signed': ValidateSignature
	}
```

Once the middleware has been defined in the HTTP kernel, you may use the `middleware` method to assign middleware to a route:

```js
Route.get('admin/profile', do
	# do something...
)->middleware(['auth'])
```

You may also assign multiple middleware to the route:

```js
Route.get('/', do
	# do something...
).middleware(['first', 'second'])
```

### Middleware Groups

Sometimes you may want to group several middleware under a single key to make them easier to assign to routes. You may do this using the `middlewareGroups` getter of your HTTP kernel.

Out of the box, Formidable comes with `jwt` and `session` middleware groups:

```js
get middlewareGroups
	{
		jwt: [

		]

		session: [
			HasCsrfToken
			VerifyCsrfToken
		]
	}
```
