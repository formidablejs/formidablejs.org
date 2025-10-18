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
get routeMiddleware(): MiddlewareAliases {
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

## Built-in Middleware Classes {#built-in-middleware}

Formidable includes several built-in middleware classes that you can use out of the box. These middleware are designed to handle common tasks and can be customized to fit your application's needs.

### Authentication Middleware

#### `Authenticate`
Verifies that the user is authenticated. If the user is not authenticated, it will throw an `UnauthenticatedException`.

```ts
// Usage in routes
Route.get('/profile', () => {
    // User is guaranteed to be authenticated here
}).middleware(['auth'])
```

#### `ErrorIfAuthenticated`
Throws an error if the user is already authenticated. Useful for guest-only routes like login and registration.

```ts
// Usage in routes
Route.get('/login', () => {
    // Only accessible to unauthenticated users
}).middleware(['guest'])
```

#### `EnsureEmailIsVerified`
Ensures that the authenticated user's email is verified. If not verified, it will redirect to a specified route.

```ts
// Custom implementation
export class EnsureEmailIsVerified extends EnsureEmailIsVerified {
    get redirectToRoute(): string {
        return '/email/unverified'
    }
}

// Usage in routes
Route.get('/dashboard', () => {
    // User must be authenticated and email verified
}).middleware(['auth', 'verified'])
```

#### `EnsureStateless`
Ensures stateless operation for API routes by disabling session access. This is useful for JWT-based authentication.

```ts
// Custom implementation
export class EnsureStateless extends EnsureStateless {
    get strict(): boolean {
        return true // Strict mode - no session access allowed
    }
}

// Usage in middleware groups
get middlewareGroups(): MiddlewareGroups {
    return {
        jwt: [
            EnsureStateless // Applied to all JWT routes
        ]
    }
}
```

### Request Processing Middleware

#### `TrimStrings`
Automatically trims whitespace from string inputs in the request data.

```ts
// Applied globally in HTTP Kernel
get middleware(): Array<IMiddleware | string> {
    return [
        TrimStrings, // Trims all string inputs
        // ... other middleware
    ]
}
```

#### `ConvertEmptyStringsToNull`
Converts empty strings to null values in the request data.

```ts
// Applied globally in HTTP Kernel
get middleware(): Array<IMiddleware | string> {
    return [
        ConvertEmptyStringsToNull, // Converts empty strings to null
        // ... other middleware
    ]
}
```

### Security Middleware

#### `VerifyCsrfToken`
Verifies CSRF tokens for state-changing requests. Essential for web applications using session-based authentication.

```ts
// Applied to session middleware group
get middlewareGroups(): MiddlewareGroups {
    return {
        session: [
            VerifyCsrfToken // Protects against CSRF attacks
        ]
    }
}
```

#### `ValidateSignature`
Validates signed URLs to ensure they haven't been tampered with.

```ts
// Usage in routes
Route.get('/signed-url', () => {
    // URL must be properly signed
}).middleware(['signed'])
```

### Utility Middleware

#### `AcceptLanguage`
Handles language preferences from the Accept-Language header.

```ts
// Usage in routes
Route.get('/localized-content', () => {
    // Language preference is automatically handled
}).middleware(['lang'])
```

#### `HasEncryptionKey`
Ensures that the application has a valid encryption key configured.

```ts
// Applied globally in HTTP Kernel
get middleware(): Array<IMiddleware | string> {
    return [
        HasEncryptionKey, // Ensures encryption key is available
        // ... other middleware
    ]
}
```

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
			EnsureStateless // disable this if you wish to access sessions in your api routes.
		]

		session: [
			VerifyCsrfToken
		]
	}
```


</TabItem>
<TabItem value="ts">

```ts title="app/Http/Kernel.ts" {3,7} showLineNumbers
get middlewareGroups(): MiddlewareGroups {
	return {
		jwt: [
			EnsureStateless // disable this if you wish to access sessions in your api routes.
		],

		session: [
			VerifyCsrfToken
		]
	}
}
```

</TabItem>
</Tabs>
