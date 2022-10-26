---
id: orm-crud-operations
title: CRUD Operations
---

# CRUD Operations

With Formidable, you can create, read, update, and delete records without writing extra code.

## Create

Here is an example of how to create a new record:

### Create Route

To get started, you will have to define a new route that points to a controller, we will assume that the controller is called `PostsController`:

```py title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { PostController } from '../app/Http/Controllers/PostController'

Route.put('posts', [PostController, 'store']).middleware(['auth'])
```

### Create Controller

Next, we will create our controller:

```
node craftsman make:controller PostController
```

Now, we want to add a store method in our controller. This method will be the point of entry for our new route:

```py title="app/Http/Controllers/PostController.imba"
import Controller from './Controller'

export class PostController < Controller

	def store request
		'store new post'
```

### Create Request

Then, we can add a FormRequest that will be responsible for validating the data that is passed to the controller and also saving the data to the database:

```
node craftsman make:request StorePostRequest
```

Once, we have created our request, we can add the validation rules to the request as well data saving logic:

```py title="app/Http/Requests/StorePostRequest.imba"
import { FormRequest } from '@formidablejs/framework'
import { Post } from '../../Models/Post'

export class StorePostRequest < FormRequest

	def authorize
		true

	def rules
		{
			title: 'required|min:3'
			body: 'required:min:10'
		}

	def persist
		new Post({
			user_id: this.auth!.user!.id
			title: this.input('title')
			body: this.input('body')
		}).save!
```

### Persisting Data

Finally, we can include our new request in our `PostController` and run the `persist` method to save the data to the database:

```py title="app/Http/Controllers/PostController.imba"
import { @use } from '@formidablejs/framework'
import { StorePostRequest } from '../Requests/StorePostRequest'
import { Controller } from './Controller'

export class PostController < Controller

	@use(StorePostRequest)
	def store request\StorePostRequest
		request.persist!
```

The `@use` decorator will pass the request into the `store` method and validate the input data.

## Read

You can query the database using the following methods:

### fetchAll

To fetch all records from the database. you can use the `fetchAll` method:

```py title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { Post } from '../app/Models/Post'

Route.get 'posts/all', do
	Post.fetchAll!
```

### find

To fetch a single record from the database, you can use the `find` method:

```py title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { Post } from '../app/Models/Post'

Route.get 'posts/:id', do(request)
	Post.find(request.param('id'))

```

You may also use the `fetchOne` method:

```js
new Post({ id: 1 }).fetchOne!
```

#### Model Route Binding

Formidable also provides a cleaner way of fetching records using a route parameter.

Let's take a look at an example. Code in our routes file:

```py
Route.get 'posts/:post', [PostController, 'show']
```

And our controller:

```py title="app/Http/Controllers/PostController.imba"
import { @use } from '@formidablejs/framework'
import { Post } from '../../Models/Post'
import { Controller } from './Controller'

export class PostController < Controller

	@use(Post)
	def show post\Post
		await post
```

This will automatically bind the `post` parameter from the route to the `Post` model. Formidable assumes that the `post` parameter is the `id` of the model.

If you want to use a different column name, you can prefix the parameter with `:` and the name of the column you want to use:

```py
Route.get 'posts/:post:slug', [PostController, 'show']
```

This will now use `slug` as the column name instead of `id`.

## Update

To update a record in the database, you can use the `update` method:

```py title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { Post } from '../app/Models/Post'

Route.get 'posts/:id', do(request)
	Post.where('id', request.param('id'))
		.set({
			title: request.input('title')
		})

```

## Delete

To delete a record in the database, you can use the `delete` method:

```py title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { Post } from '../app/Models/Post'

Route.get 'posts/:id', do(request)
	Post.where('id', request.param('id'))
		.delete!
```

## Additional Reading

This section doesn't cover all the CRUD operations, but it does cover the basics. To learn more, check out the [Bookshelf.js documentation](https://bookshelfjs.org/).
