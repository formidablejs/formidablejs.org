---
id: orm-getting-started
title: Getting Started
---

# Getting Started

With Formidable, you have the ability to use an ORM within your application. Formidable uses the [Bookshelf.js](https://bookshelfjs.org/) ORM as its default ORM.

Bookshelf.js is built on top of [Knex.js](https://knexjs.org/) and works with SQLite, MySQL and PostgreSQL.

## Creating Your First Model

You may use the craftsman `make model` command to create a new model:

```
craftsman make model Post
```

This will add a new model under the `app/Models` directory:

```py
import { Model } from '@formidablejs/framework'

export default class Post < Model
```

### Table Name

By default, Formidable will attempt to get the table name from the model name. If you want to override this, you can add a `tableName` getter:

```py
import { Model } from '@formidablejs/framework'

export default class Post < Model

	# The table name.
	#
	# @type {string}

	get tableName
		'posts_table'

```

### Primary Key

Formidable uses the `id` column as the defauld primary key, to change it, you can add a `idAttribute` getter:

```py
import { Model } from '@formidablejs/framework'

export default class Post < Model

	# The table primary key.
	#
	# @type {string}

	get idAttribute
		'uuid'
```

### Hidden Attributes

Formidable provides a way to hide attributes from the model. This is useful if you want to hide sensitive information from the database. To hide an attribute, you can add a `hidden` getter:

```py
import { Model } from '@formidablejs/framework'

export default class Post < Model

	# The attributes that should be hidden.
	#
	# @type {string[]}

	get hidden
		[
			'id'
		]
```
