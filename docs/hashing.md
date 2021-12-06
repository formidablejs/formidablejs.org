---
id: hashing
title: Hashing
---

# Hashing

Formidable provides a Hash class that can be used to hash and compare strings. By default, Formidable uses `bcrypt` to hash passwords, but you can also use `argon2`.

## Configuration

The default hashing driver is `bcrypt`. You can change this by setting the `driver` option in your `config/hashing.imba` file.

## Basic Usage

### Hashing Passwords

You may hash a password with the `make` method of the `Hash` class:

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

#### Configuring The Hashing Driver

To configure a hashing driver, you can head over to the `config/hashing.imba` file.

Here, you can change `bcrypt` rounds or `argon2` memory cost, parallelism, and time cost.

### Verifying That A Password Matches A Hash

The `check` method provided by the `Hash` class allows you to verify that a given plain-text string corresponds to a given hash:

```py
if await Hash.check(request.get('password'), user.password)
	# the passwords match
```

