---
id: validation
title: Validation
---

# Validation

Formidable uses the [validatorjs](https://github.com/mikeerickson/validatorjs) package for handling validations within your application. By default, each [FormRequest](/docs/requests) is validated if rules are present.

## Validation Quickstart

Let's look at a basic route that validates input data and returns errors back to the client. 

### Defining The Route

First, we will assume we have a post route for adding new tasks:

```js
import { Route } from '@formidablejs/framework'
import TaskController from '../app/Http/Controllers/TaskControllers'

Route.post('/tasks/store', [TaskController, 'store']).name('tasks.store')
```

### Creating The Controller

Next, we will create a controller and add a store method that handles incoming requests:

```js
import Controller from './Controller'

export default class TaskController < Controller

	def store request
		'do nothing'
```

### Creating The Request

Then, we will create a `FormRequest` class that will be passed to the controller. We will add our rules here:

```js
import { FormRequest } from '@formidablejs/framework'

export default class StoreTaskRequest < FormRequest

	def rules
		{
			title: 'required|min:4',
			description: 'required|min:10'
		}

```

The `title` rule is required and must be at least 4 characters long. The `description` rule is also required and must be at least 10 characters long. Should the validation fail, Formidable will throw an `ValidationException`.

### Using The Request In Our Controller

Now that we have created our request, we can go back to our controller and use the `@use` decorator to inject the `FormRequest` into our `store` method:

```py
import { @use } from '@formidablejs/framework'
import StoreTaskRequest from '../Requests/StoreTaskRequest'
import Controller from './Controller'

export default class TaskController < Controller

	@use(StoreTaskRequest)
	def store request\StoreTaskRequest
		'you will only see this if the validation passed'
```

Because we used the `@use` decorator, the `StoreTaskRequest` will be injected into the `store` method and Formidable will automatically run the `validate` method from the `FormRequest` instance.

If the validation fails, Formidable will throw an `ValidationException`, which will return a list of errors to the client, if the validation passes, the `store` method will be called and "you will only see this if the validation passed" will be returned.

## Displaying The Validation Errors

Formidable automatically returns a list of validation errors to the client as JSON with the status code `422`.

#### Customizing The Error Messages

To customize the error messages, we can use the `messages` method from the `FormRequest` class. You must return an object with the keys and validation rules nested under each key with the value being the error message.

```js
def messages
	{
		title: {
			required: 'The title is required',
			min: 'The title must be at least 4 characters long'
		}
		description: {
			required: 'The description is required',
			min: 'The description must be at least 10 characters long'
		}
	}
```

For more information on the available validation rules, please see the [validatorjs documentation](https://github.com/mikeerickson/validatorjs#available-rules).
