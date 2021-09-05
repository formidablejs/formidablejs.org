---
id: responses
title: Responses
---

# HTTP Responses

## Creating Responses

#### Strings & Arrays & Objects

All routes and controllers should return a response to be sent back to the client. Formidable provides several different ways to return responses. The most basic response is returning a string from a route or controller. Formidable will automatically convert the string into a full HTTP response:

```js
Route.get '/', 'Hello World!'
```

In addition to returning strings from your routes and controllers, you may also return arrays. Formidable will automatically convert the array into a JSON response:

```js
Route.get '/', [ 'Donald', 'Luna' ]
```

You may also return an object, Formidable will automatically convert the object into a JSON response:

```js
Route.get '/', {
	name: 'Luna'
}
```

Notice how we didn't include the `return` keyword, this is because Imba returns the last value/object by default.

## Attaching Headers To Responses

You may use the `setHeader` method to attach a header to your response. The `header` method is part of the `FormRequest` instance:

```js
request.setHeader('x-header', 'x-value')
```

You may also attach multiple headers by chaining the `setHeader` method:

```js
request
	.setHeader('x-header-1', 'x-value')
	.setHeader('x-header-2', 'x-value')
	.setHeader('x-header-3', 'x-value')
```

> This can be done from Route actions, Middlewares and any other place where the `FormRequest` instance is present.

## Redirects

Redirect responses are instances of the `Redirect` class. To get started with a simple redirect, you may return `Redirect` instance anywhere in your application:

```js
import { Redirect } from '@formidablejs/framework'

Redirect.to('posts/deleted')
```

#### Redirecting To Named Routes

You may also redirect back to a named route by using the `route` method:

```js
Redirect.route('posts.deleted')
```

If your route has parameters, you may pass them as the second argument to the `route` method:

```js
Redirect.route('posts.show', {
	id: 1
})
```
