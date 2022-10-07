---
id: hashing
title: Hashing
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Hashing

Formidable provides a Hash class that can be used to hash and compare strings. By default, Formidable uses `bcrypt` to hash passwords, but you can also use `argon2`.

## Configuration

The default hashing driver is `bcrypt`. You can change this by setting the `driver` option in your `config/hashing.imba` or `config/hashing.ts` config file.

## Basic Usage

### Hashing Passwords

You may hash a password with the `make` method of the `Hash` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/PasswordController.imba" {12}
import { DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Hash } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PasswordController < Controller

	def update request\Request
		DB.table('users')
			.where('id', request.auth!.user!.id)
			.update({
				password: Hash.make(request.get('password'))
			})

```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/PasswordController.ts" {8}
import { DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Hash } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PasswordController extends Controller {
	async update(request: Request): Promise {
		const password = await Hash.make(request.get('password'))

		DB.table('users')
			.where('id', request.auth().user!.id)
			.update({ password })
	}
}
```

</TabItem>
</Tabs>

#### Configuring The Hashing Driver

To configure a hashing driver, you can head over to the `config/hashing.imba` or `config/hashing.ts` config file.

Here, you can change `bcrypt` rounds or `argon2` memory cost, parallelism, and time cost.

### Verifying That A Password Matches A Hash

The `check` method provided by the `Hash` class allows you to verify that a given plain-text string corresponds to a given hash:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
if await Hash.check(request.get('password'), user.password)
	# the passwords match
```

</TabItem>
<TabItem value="ts">

```ts
if (await Hash.check(request.get('password'), user.password)) {
	// the passwords match
}
```

</TabItem>
</Tabs>

