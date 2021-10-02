---
id: controllers
title: Controllers
---

# Controllers

## Introduction {#introduction}

Instead of defining all of your request handling logic as anonymous functions in route files, you may wish to organize this behavior using Controller classes. Controllers can group related request handling logic into a single class. Controllers are stored in the `app/Http/Controllers` directory.

## Basic Controllers {#basic-controllers}

### Defining Controllers {#defining-controllers}

To create a new controller, use the `make controller` Craftsman command:

```
craftsman make controller UserController
```

This command will place a new `UserController` class within your `app/Http/Controllers` directory.

Below is an example of a basic controller class. Note that the controller extends the base controller class included with Formidable:

```py
import { NotFoundException } from '@formidablejs/framework'
import Controller from './Controller'
import User from '../../Models/User'

export default class UserController < Controller

	def show request
		try return await new User({ id: request.param('id') }).fetch!

		throw new NotFoundException 'User does not exist'
```

You can define a route to this controller action like this:

```js
import { Route } from '@formidablejs/framework'
import UserController from '../app/Http/Controllers/UserController'

Route.get('/user/:id', [UserController, 'show'])
```

Now, when a request matches the specified route URI, the `show` method in the `UserController` class will be executed.
