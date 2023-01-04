---
id: controllers
title: Controllers
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Controllers

## Introduction {#introduction}

Instead of defining all of your request handling logic as anonymous functions in route files, you may wish to organize this behavior using Controller classes. Controllers can group related request handling logic into a single class. Controllers are stored in the `app/Http/Controllers` directory.

## Basic Controllers {#basic-controllers}

### Defining Controllers {#defining-controllers}

To create a new controller, use the `make:controller` Craftsman command:

```bash
node craftsman make:controller UserController
```

This command will place a new `UserController` class within your `app/Http/Controllers` directory.

Below is an example of a basic controller class. Note that the controller extends the base controller class included with Formidable:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/UserController.imba"
import { DB } from '@formidablejs/framework'
import { NotFoundException } from '@formidablejs/framework'
import { Controller } from './Controller'

export class UserController < Controller

	def show request\Request
		const user = await DB.where('id', request.param('id')).first!

		if !user then throw new NotFoundException 'User does not exist'

		user
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/UserController.ts"
import { DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { NotFoundException } from '@formidablejs/framework'
import { Controller } from './Controller'

export class UserController extends Controller {
	async show(request: Request): Promise<object> {
		const user = await DB.where('id', request.param('id')).first()

		if (!user) {
			throw new NotFoundException('User does not exist')
		}

		return user
	}
}
```

</TabItem>
</Tabs>

You can define a route to this controller action like this:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba"
import { Route } from '@formidablejs/framework'
import { UserController } from '../app/Http/Controllers/UserController'

Route.get('/user/:id', [UserController, 'show'])
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts"
import { Route } from '@formidablejs/framework'
import { UserController } from '../app/Http/Controllers/UserController'

Route.get('/user/:id', [UserController, 'show'])
```

</TabItem>
</Tabs>

Now, when a request matches the specified route URI, the `show` method in the `UserController` class will be executed.

### Helpers

The base `Controller` class comes with helper functions.

#### `notFound`

The `notFound` function throws a `404` Exception:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
...
export class UserController < Controller

	def show request\Request

		if (await DB.table('users').where('id', request.param('id')).count())[0]["count(*)"] < 1
            notFound!
```

</TabItem>
<TabItem value="ts">

```ts
...
export class UserController extends Controller {
	async show(request: Request): Promise<any> {
		if ((await DB.table('users').where('id', request.param('id')).count())[0]["count(*)"] < 1) {
            this.notFound()
        }

		...
```

</TabItem>
</Tabs>

You may also pass a custom error message:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
...
export class UserController < Controller

	def show request\Request

		if (await DB.table('users').where('id', request.param('id')).count())[0]["count(*)"] < 1
            notFound 'User does not exist'
```

</TabItem>
<TabItem value="ts">

```ts
...
export class UserController extends Controller {
	async show(request: Request): Promise<any> {
		if ((await DB.table('users').where('id', request.param('id')).count())[0]["count(*)"] < 1) {
            this.notFound('User does not exist')
        }

		...
```

</TabItem>
</Tabs>

#### `badRequest`

The `badRequest` function throws a `400` Exception:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
...
export class UserController < Controller

	def destroy request\Request
		if !request.auth!.can('users:delete')
			badRequest!
```

</TabItem>
<TabItem value="ts">

```ts
...
export class UserController extends Controller {
	destroy(request: Request): any {
		if (!request.auth().can('users:delete')) {
            this.badRequest()
        }

		...
```

</TabItem>
</Tabs>

And with a custom message:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
...
export class UserController < Controller

	def destroy request\Request
		if !request.auth!.can('users:delete')
			badRequest 'Permission denied'
```

</TabItem>
<TabItem value="ts">

```ts
...
export class UserController extends Controller {
	destroy(request: Request): any {
		if (!request.auth().can('users:delete')) {
            this.badRequest('Permission denied')
        }

		...
```

</TabItem>
</Tabs>

#### `validate`

The `validate` function makes it easier to validate incoming requests:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
...
export class UserController < Controller

	def update request\Request
		const validator = validate(request, {
			name: 'required'
			email: 'required|email'
		})

		if validator.fails!
			throw ValidationException.withMessage(validator.errors.errors)

			...
```

</TabItem>
<TabItem value="ts">

```ts
...
export class UserController extends Controller
	update(request: Request): any {
		const validator = validate(request, {
			name: 'required',
			email: 'required|email'
		})

		if (validator.fails()) {
			throw ValidationException.withMessage(validator.errors.errors)

			...
```

</TabItem>
</Tabs>

