---
id: errors
title: Error Handling
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

All exceptions thrown by your application will be reported by the Formidable framework. However, you may wish to define your own exception reporting behavior, including logging exceptions or sending exceptions to an external service like [Sentry](https://sentry.io/) or [Bugsnag](https://www.bugsnag.com/).

## Configuration

The `debug` option in your `config/app.imba` or `config/app.ts` configuration file determines how errors are displayed by your application. By default, this option is set to `true`, which results in detailed error messages being displayed. In production applications, it's recommended to set this value to `false`.

## The Exception Handler

### Logging

By default, the Formidable Framework will log all exceptions excluding `HttpException` based exceptions to [Bugsnag](https://www.bugsnag.com/). You can exclude your own exceptions by adding a `dontReport` getter in the `app/Exceptions/Handler.imba` or `app/Exceptions/Handler.ts` file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Exceptions/Handler.imba"  {5-8} showLineNumbers
import { ExceptionHandler, HttpException } from '@formidablejs/framework'

export class Handler < ExceptionHandler

	get dontReport
		[
			HttpException
		]
```

</TabItem>
<TabItem value="ts">

```ts title="app/Exceptions/Handler.ts" {4-8} showLineNumbers
import { ExceptionHandler, HttpException } from '@formidablejs/framework'

export class Handler extends ExceptionHandler {
	get dontReport() {
		return [
			HttpException
		]
	}
}
```

</TabItem>
</Tabs>

### Handling

You can handle exceptions by adding a `handle` method in the `app/Exceptions/Handler.imba` or `app/Exceptions/Handler.ts` file. Out of the box, you don't need to add a `handle` method as the framework will handle all exceptions for you. However, if you want to add your own custom exception handling, you can do so by adding a `handle` method:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```py title="app/Exceptions/Handler.imba" {6-8} showLineNumbers
import { ExceptionHandler, NotFoundException, view } from '@formidablejs/framework'
import { NotFound } from '../../resources/views/errors/NotFound'

export class Handler < ExceptionHandler

	def handle exception\Error
		if exception instanceof NotFoundException
			view(NotFound)
```

</TabItem>
<TabItem value="ts">

```ts title="app/Exceptions/Handler.ts" {5-9} showLineNumbers
import { ExceptionHandler, NotFoundException, view } from '@formidablejs/framework'
import { NotFound } from '../../resources/views/errors/NotFound'

export class Handler extends ExceptionHandler {
	handle(exception: Error) {
		if (exception instanceof NotFoundException) {
			return view(NotFound)
		}
	}
}
```

</TabItem>
</Tabs>

### Conditional Handling

If your application handles both web based and api based requests, you can use the `request` argument to determine the type of request. For example, you can return a JSON response for api requests and a view for web requests:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```py title="app/Exceptions/Handler.imba" {6-11} showLineNumbers
import { ExceptionHandler, NotFoundException, view, response } from '@formidablejs/framework'
import { NotFound } from '../../resources/views/errors/NotFound'

export class Handler < ExceptionHandler

	def handle exception\Error, request
		if exception instanceof NotFoundException
			if request.expectsJson!
				response({ message: 'Not Found' }, 404)
			else
				view(NotFound)
```

</TabItem>
<TabItem value="ts">

```ts title="app/Exceptions/Handler.ts" {5-13} showLineNumbers
import { ExceptionHandler, NotFoundException, view, response } from '@formidablejs/framework'
import { NotFound } from '../../resources/views/errors/NotFound'

export class Handler extends ExceptionHandler {
	handle(exception: Error, request) {
		if (exception instanceof NotFoundException) {
			if (request.expectsJson()) {
				return response({ message: 'Not Found' }, 404)
			} else {
				return view(NotFound)
			}
		}
	}
}
```

</TabItem>
</Tabs>

<!-- ## Application Exceptions

The Formidable Framework ships with a variety of exceptions that cover the majority of use cases. Let's take a look at each of them:

### HttpException

The `HttpException` is the base exception for all HTTP based exceptions. It accepts a `message` and `status` argument:

```js showLineNumbers
import { HttpException } from '@formidablejs/framework'

throw new HttpException('Not Found', 404)
```

You can instead use some of the pre-defined http exceptions:

#### 400

```js showLineNumbers
import { BadRequestException } from '@formidablejs/framework/lib/Http/Exceptions'

throw new BadRequestException('Bad Request')
```

#### 401

```js showLineNumbers
import { AuthorizationException } from '@formidablejs/framework/lib/Auth/Exceptions'

throw new AuthorizationException('Unauthorized')
```

#### 403

```js showLineNumbers
import { EmailNotVerifiedException, EmailVerifiedException } from '@formidablejs/framework/lib/Auth/Exceptions'
import { ForbiddenException } from '@formidablejs/framework/lib/Http/Exceptions'

throw new EmailNotVerifiedException('Email not verified')
throw new EmailVerifiedException('Email already verified')
throw new ForbiddenException('Action not allowed')
```

#### 404

```js showLineNumbers
import { NotFoundException } from '@formidablejs/framework'

throw new NotFoundException('Not Found')
```

#### 422

```js showLineNumbers
import { ValidationException } from '@formidablejs/framework'

throw ValidationException.withMessages({
	first_name: ['The first name field is required.'],
	last_name: ['The last name field is required.'],
	email: ['Invalid email address.']
})
``` -->
