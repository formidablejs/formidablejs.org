---
id: routing
title: Routing
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Routing

## Basic Routing {#basic-routing}

The most basic Formidable routes accept a URI and a Callback, providing a very simple and expressive method of defining routes:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/api.imba"
import { Route } from '@formidablejs/framework'

Route.get '/', do 'Hello World'
```

</TabItem>
<TabItem value="ts">

```typescript title="routes/api.ts"
import { Route } from '@formidablejs/framework'

Route.get('/', () => 'Hello World')
```

</TabItem>
</Tabs>

#### The Default Route Files {#the-default-route-files}

All Formidable routes are defined in your route files, which are located in the `routes` directory. These files are automatically loaded by the `RouterServiceResolver`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/api.imba"
import { UserController } from '../app/Http/Controllers/UserController'

Route.get('/user', [UserController, 'index'])
```

</TabItem>
<TabItem value="ts">

```typescript title="routes/api.ts"
import { UserController } from '../app/Http/Controllers/UserController'

Route.get('/user', [UserController, 'index'])
```

</TabItem>
</Tabs>

By default, Formidable defines all routes in the `routes/api.imba` or `routes/api.ts` file, which is loaded by `RouterServiceResolver`. This resolver, loads these routes within a `session` middleware group. This means, all routes defined in the `routes/api.imba` file, will have the `session` middleware automatically applied on all of them. You may specify a different middleware and other route group options by modifying your `RouterServiceResolver` class.

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

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba"
Route.get '/posts/:id', do (request\Request)
	const postId\number = request.param('id')
	''
```

</TabItem>
<TabItem value="ts">

```typescript title="routes/api.ts"
Route.get('/posts/:id', (request: Request) => {
	const postId: number = request.param('id')
	''
})
```

</TabItem>
</Tabs>

`:id` wil be registered as a route parameter.

You may also define as many route parameters as required by your route:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba"
Route.get '/user/:user/posts/:post', do (request\Request)
    const userId\number = request.param('user')
    const postId\number = request.param('post')
	''
```

</TabItem>
<TabItem value="ts">

```typescript title="routes/api.ts"
Route.get('/user/:user/posts/:post', (request: Request) => {
    const userId: number = request.param('user')
    const postId: number = request.param('post')
	''
})
```

</TabItem>
</Tabs>

Route parameters are always prefixed with `:` and should consist of alphabetic characters. Underscores (_) are also acceptable within route parameter names.

#### Route Query Binding {#route-query-binding}

Formidable makes it easy to automatically load a database record based on a route parameter. You would normally do this by using the `@use` decorator next to your controller route action:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="app/Http/Controllers/PostController.imba" {1,6}
import { @use } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

    @use('table:posts') def show post\object
		await post
		...
```

</TabItem>
<TabItem value="ts">

```js title="app/Http/Controllers/PostController.ts" {1,6}
import { use } from '@formidablejs/ts-ports'
import { Controller } from './Controller'

export class PostController extends Controller {

    @use('table:posts') async show(post: object): Promise {
		await post
		...
	}
}
```

</TabItem>
</Tabs>

This will query the database to look for a post under the `posts` table with the first param using the `id` column.

If you want to load multiple database records, you can do so by passing all the tables you want to load in the `@use` decorator:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="app/Http/Controllers/PostController.imba" {1,6}
import { @use } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

    @use('table:users', 'table:posts') def show user, post
		user = await user
		post = await post
		...
```

</TabItem>
<TabItem value="ts">

```js title="app/Http/Controllers/PostController.ts" {1,6}
import { use } from '@formidablejs/ts-ports'
import { Controller } from './Controller'

export class PostController extends Controller {

    @use('table:users', 'table:posts') async show(userRecord: Promise<object>, postRecord: Promise<object>): Promise {
		const user = await userRecord
		const post = await postRecord
		...
	}
}
```

</TabItem>
</Tabs>

#### Route Param Binding {#route-param-binding}

You can also promote route params to your controller action using the `@use` decorator:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="app/Http/Controllers/PostController.imba" {1,6}
import { @use } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

    @use('param') def show postId\Number
		postId
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/PostController.imba" {1,5}
import { use } from '@formidablejs/ts-ports'
import { Controller } from './Controller'

export class PostController extends Controller {
    @use('param') show(postId: number) {
		return postId
    }
}
```

</TabItem>
</Tabs>

This will return the first `param` in the route.

You can also specify which param should be loaded:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="app/Http/Controllers/PostController.imba" {1,6}
import { @use } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

    @use('param:post') def show postId\Number
		postId
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/PostController.imba" {1,5}
import { use } from '@formidablejs/ts-ports'
import { Controller } from './Controller'

export class PostController extends Controller {
    @use('param:post') show(postId: number): number {
		return postId
    }
}
```

</TabItem>
</Tabs>

This will look for the `param` named `post` and return that instead of the first `param` in the route.

You can also load multiple params:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="app/Http/Controllers/PostController.imba" {1,7}
import { @use } from '@formidablejs/framework'
import { DB } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

    @use('param', 'param') def show userId\Number, postId\Number
		DB.table('posts').where('id', postId).where('user_id', userId)
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/PostController.imba" {1,6}
import { use } from '@formidablejs/ts-ports'
import { DB } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController extends Controller {
    @use('param', 'param') show(userId: number, postId: number): Promise<object[]> {
		return DB.table('posts').where('id', postId).where('user_id', userId)
    }
}
```

</TabItem>
</Tabs>

## Named Routes

`Named routes` allow the convenient generation of URLs or redirects for specific routes. You may specify a name for a route by chaining the `name` method onto the route definition:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/api.imba" {3}
Route.get('/posts/:slug', do(request\Request)
	# do somthing
).name('posts.show')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {3}
Route.get('/posts/:slug', (request: Request) => {
	// do somthing
}).name('posts.show')
```

</TabItem>
</Tabs>

You may also specify route names for controller actions:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba"
Route.get('/posts/:slug', [PostController, 'show']).name('posts.show')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts"
Route.get('/posts/:slug', [PostController, 'show']).name('posts.show')
```

</TabItem>
</Tabs>

#### Generating URLs To Named Routes

Once you have assigned a name to a given route, you may use the route's name when generating URLs or redirects via Fomidablejs's `Redirect` and `URL` classes:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { URL } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'

# Generating URLs...
const url = URL.route('user')

# Generating Redirects...
return Redirect.route('user')
```

</TabItem>
<TabItem value="ts">

```ts
import { URL } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'

// Generating URLs...
const url = URL.route('user')

// Generating Redirects...
return Redirect.route('user')
```

</TabItem>
</Tabs>

If the named route defines parameters, you may pass the parameters as the second argument to the `route` function of the `Redirect` class. The given parameters will automatically be inserted into the generated URL in their correct positions:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
Route.get('/posts/:id', do(request\Request)
	# do something
).name('posts.show')

const url = URL.route('posts.show', {
	id: 1
})
```

</TabItem>
<TabItem value="ts">

```ts
Route.get('/posts/:id', (request: Request) => {
	# do something
}).name('posts.show')

const url = URL.route('posts.show', {
	id: 1
})
```

</TabItem>
</Tabs>

#### Inspecting The Current Route

If you would like to determine if the current request was routed to a given named route, you may use the `routeIs` method on a `FormRequest` instance. For example, you may check the current route name from a route middleware:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
def handle request\Request
	if request.routeIs 'posts.show'
		# do something
```

</TabItem>
<TabItem value="ts">

```ts
handle(request: Request) {
	if (request.routeIs('posts.show')) {
		// do something
    }
}
```

</TabItem>
</Tabs>

## Route Groups {#route-groups}

Route groups allow you to share route attributes, such as middleware or namespaces, across a large number of routes without needing to define those attributes on each individual route. Shared attributes are specified in an array format as the first parameter to the `Route.group` method.

#### Middleware {#middleware}

To assign middleware to all routes within a group, you may add the `middleware` keyword inside the group. Middleware are executed in the order they are listed in the object:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js {1}
Route.group { middleware: ['first', 'second'] }, do
	Route.get '/', do
		# uses first & second Middleware

	Route.get 'user/profile', do
		# uses first & second Middleware
```

</TabItem>
<TabItem value="ts">

```ts {1}
Route.group({ middleware: ['first', 'second'] }, () => {
	Route.get('/', () => {
		// uses first & second Middleware
    })

	Route.get('user/profile', () => {
		// uses first & second Middleware
    })
})
```

</TabItem>
</Tabs>

#### Route Prefixes {#route-prefixes}

The `prefix` keyword may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with `admin`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js {1}
Route.group { prefix: 'admin' }, do
	Route.get 'users', do
		# matches the "/admin/users" URL
	...
```

</TabItem>
<TabItem value="ts">

```ts {1}
Route.group({ prefix: 'admin' }, () => {
	Route.get('users', () => {
		// matches the "/admin/users" URL
    })
	...
})
```

</TabItem>
</Tabs>
