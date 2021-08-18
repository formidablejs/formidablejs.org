---
id: routing
title: Routing
---

# Routing

## Basic Routing {#basic-routing}

The most basic Formidable routes accept a URI and a Callback, providing a very simple and expressive method of defining routes:

```py
import { Route } from '@formidablejs/framework'

Route.get '/', do 'Hello World'
```

#### The Default Route Files {#the-default-route-files}

All Formidable routes are defined in your route files, which are located in the `routes` directory. These files are automatically loaded by the `RouterServiceResolver`:

```py
import { Route } from '@formidablejs/framework'
import UserController from '../app/Http/Controllers/UserController'

Route.get('/user', [UserController, 'index']).name('authenticated.show')
```

By default, Formidable defines all routes in the `routes/api.imba` file, which is loaded by `RouterServiceResolver`. This resolver, loads these routes within a `session` middleware group. This means, all routes defined in the `routes/api.imba` file, will have the `session` middleware automatically applied on all of them. You may specify a different middleware and other route group options by modifying your `RouterServiceResolver` class.

#### Available Router Methods {#available-router-methods}

The router allows you to register routes that respond to any of the listed HTTP verbs:

```js
Route.get(uri, callback)
Route.post(uri, callback)
Route.put(uri, callback)
Route.head(uri, callback)
Route.delete(uri, callback)
Route.patch(uri, callback)
```

## Route Parameters {#route-parameters}

#### Required Parameters {#required-parameters}

You might find yourself in a situation where you would like to have dynamic routes. Maybe you want to load a specific blog post using the blog post id, you can do this by defining a parameter in your route:

```js
Route.get '/posts/:id', do (request)
	const postId = request.param('id')
	''
```

`:id` wil be registered as a route parameter.

You may also define as many route parameters as required by your route:

```js
Route.get '/user/:user/posts/:post', do (request)
    const userId = request.param('user')
    const postId = request.param('post')
	''
```

Route parameters are always prefixed with `:` and should consist of alphabetic characters. Underscores (_) are also acceptable within route parameter names.

#### Route Model Binding {#route-model-binding}

Formidable makes it easy to automatically load a model instance based on a route parameter. You would normally do this by using the `@use` decorator next to your controller route action:

```js
import { @use } from '@formidablejs/framework'
import Controller from './Controller'
import Post from '../../Models/Post'

export default class PostController < Controller
	
    @use(Post)
    def show post
		await post
```

This will query the database to look for a post under the `posts` table with the first param using the `id` column.

If you have want to load multiple models, you can do so by passing all the models you want to load in the `@use` decorator:

```js
import { @use } from '@formidablejs/framework'
import Controller from './Controller'
import Post from '../../Models/Post'
import User from '../../Models/User'

export default class PostController < Controller
	
    @use(User, Post)
    def show user, post
		user = await user
		post = await post
```

To change the default column, add a `routeKeyName` static getter in your model and return the name of the column you would like to use:

```js
import { Model } from '@formidablejs/persona'

export default class User < Model

	static get routeKeyName
        'slug'

```

Alternatively, you can define the column in your route. To do this, simply prefix the column name with `:` and add it after the parameter name:

```js
import { Route } from '@formidablejs/framework'

Route.get('/posts/:post:slug', [PostController, 'show']).name('posts.show')
```

This will use `slug` as the column.

## Route Groups {#route-groups}

Route groups allow you to share route attributes, such as middleware or namespaces, across a large number of routes without needing to define those attributes on each individual route. Shared attributes are specified in an array format as the first parameter to the `Route.group` method.

#### Middleware {#middleware}

To assign middleware to all routes within a group, you may add the `middleware` keyword inside the group. Middleware are executed in the order they are listed in the object:

```js
Route.group { middleware: ['first', 'second'] }, do
	Route.get '/', do
		# uses first & second Middleware
	
	Route.get 'user/profile', do
		# uses first & second Middleware
```

#### Route Prefixes {#route-prefixes}

The `prefix` keyword may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with `admin`:

```js
Route.group { prefix: 'admin' }, do
	Route.get 'users', do
		# matches the "/admin/users" URL
	...
```
