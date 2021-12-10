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

```js title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { TaskController } from '../app/Http/Controllers/TaskControllers'

Route.post('/tasks/store', [TaskController, 'store']).name('tasks.store')
```

### Creating The Controller

Next, we will create a controller and add a store method that handles incoming requests:

```js title="app/Http/Controllers/TaskController.imba"
import Controller from './Controller'

export class TaskController < Controller

	def store request
		'do nothing'
```

### Creating The Request

Then, we will create a `FormRequest` class that will be passed to the controller. We will add our rules here:

```js title="app/Http/Request/StoreTaskRequest.imba"
import { FormRequest } from '@formidablejs/framework'

export class StoreTaskRequest < FormRequest

	def rules
		{
			title: 'required|min:4',
			description: 'required|min:10'
		}

```

The `title` rule is required and must be at least 4 characters long. The `description` rule is also required and must be at least 10 characters long. Should the validation fail, Formidable will throw an `ValidationException`.

### Using The Request In Our Controller

Now that we have created our request, we can go back to our controller and use the `@use` decorator to inject the `FormRequest` into our `store` method:

```py title="app/Http/Controllers/TaskController.imba"
import { @use } from '@formidablejs/framework'
import { StoreTaskRequest } from '../Requests/StoreTaskRequest'
import { Controller } from './Controller'

export class TaskController < Controller

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

## Available Rules

Validation rules do not have an implicit 'required'. If a field is _undefined_ or an empty string, it will pass validation. If you want a validation to fail for undefined or '', use the _required_ rule.

#### accepted

The field under validation must be yes, on, 1 or true. This is useful for validating "Terms of Service" acceptance.

#### after:date

The field under validation must be after the given date.

#### after_or_equal:date

The field unter validation must be after or equal to the given field

#### alpha

The field under validation must be entirely alphabetic characters.

#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

#### alpha_num

The field under validation must be entirely alpha-numeric characters.

#### array

The field under validation must be an array.

#### before:date

The field under validation must be before the given date.


#### before_or_equal:date

The field under validation must be before or equal to the given date.

#### between:min,max

The field under validation must have a size between the given min and max. Strings, numerics, and files are evaluated in the same fashion as the size rule.

#### boolean

The field under validation must be a boolean value of the form `true`, `false`, `0`, `1`, `'true'`, `'false'`, `'0'`, `'1'`,

#### confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### date

The field under validation must be a valid date format which is acceptable by Javascript's `Date` object.

#### digits:value

The field under validation must be numeric and must have an exact length of value.

#### digits_between:min,max

The field under validation must be numeric and must have length between given min and max.

#### different:attribute

The given field must be different than the field under validation.

#### email

The field under validation must be formatted as an e-mail address.

#### file

The field under validation must be a successfully uploaded file.

#### file_size:value

The field under validation must have a maximum size (in MB) greater than or equal to the size of the given file.

#### hex
The field under validation should be a hexadecimal format. Useful in combination with other rules, like `hex|size:6` for hex color code validation.

#### image

The file under validation must be an image (jpg, jpeg, png, bmp, gif, svg, or webp).

#### in:foo,bar,...

The field under validation must be included in the given list of values. The field can be an array or string.

#### integer

The field under validation must have an integer value.

#### max:value

Validate that an attribute is no greater than a given size

_Note: Maximum checks are inclusive._

#### min:value

Validate that an attribute is at least a given size.

_Note: Minimum checks are inclusive._

#### mimetypes:text/plain,...

The file under validation must match one of the given MIME types:

```
'video' => 'mimetypes:video/avi,video/mpeg,video/quicktime'
```

#### mimes:foo,bar,...

The file under validation must have a MIME type corresponding to one of the listed extensions:

```
'photo' => 'mimes:jpg,bmp,png'
```

#### not_in:foo,bar,...

The field under validation must not be included in the given list of values.

#### numeric

Validate that an attribute is numeric. The string representation of a number will pass.

#### present
The field under validation must be present in the input data but can be empty.

#### required

Checks if the length of the String representation of the value is >

#### required_if:anotherfield,value

The field under validation must be present and not empty if the anotherfield field is equal to any value.

#### required_unless:anotherfield,value

The field under validation must be present and not empty unless the anotherfield field is equal to any value.

#### required_with:foo,bar,...

The field under validation must be present and not empty only if any of the other specified fields are present.

#### required_with_all:foo,bar,...

The field under validation must be present and not empty only if all of the other specified fields are present.

#### required_without:foo,bar,...

The field under validation must be present and not empty only when any of the other specified fields are not present.

#### required_without_all:foo,bar,...

The field under validation must be present and not empty only when all of the other specified fields are not present.

#### same:attribute

The given field must match the field under validation.

#### size:value

The field under validation must have a size matching the given value. For string data, value corresponds to the number of characters. For numeric data, value corresponds to a given integer value.

#### string

The field under validation must be a string.

#### url

Validate that an attribute has a valid URL format

#### regex:pattern

The field under validation must match the given regular expression.

**Note**: When using the ``regex`` pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character.
For each backward slash that you used in your regex pattern, you must escape each one with another backward slash.

#### video

The file under validation must be a video (flv, mp4, m3u8, ts, 3gp, mov, avi, or wmv).
