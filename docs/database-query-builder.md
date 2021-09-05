---
id: database-query-builder
title: Query Builder
---

# Query Builder

Formidable uses [Knex.js](https://knexjs.org) as its database query builder. You may use any of the Knex.js methods to build your queries.

## Select Query

To select data from the database, use the `select` method from the `Database` class:

```js
import { Database, Route } from '@formidablejs/framework'

Route.get '/', do
	Database.select('id', 'title').from('tasks')
```

If you want to select all columns from a table, you can leave the `select` method empty:

```js
import { Database, Route } from '@formidablejs/framework'

Route.get '/', do
	Database.select().from('tasks')
```

## Insert Query

To insert data into the database, use the `insert` method after using the `table` method to specify the table to insert into:

```js
import { Database, Route } from '@formidablejs/framework'

Route.get '/', do
	Database.table('tasks')
		.insert({
			title: 'Task 1'
			description: 'This is a task'
		})
```

Alternatively you can use the `into` method to specify the table to insert into after using the `insert` method:

```js
import { Database, Route } from '@formidablejs/framework'

Route.get '/', do
	Database.insert({
			title: 'Task 1'
			description: 'This is a task'
		})
		.into('tasks')
```

## Multi Insert

To insert multiple rows at once, use the `insert` method with an array of objects:

```js
import { Database. Route } from '@formidablejs/framework'

Route.get '/', do
	Database.table('tasks')
		.insert([
			{
				title: 'Task 1'
				description: 'This is a task'
			}
			{
				title: 'Task 2'
				description: 'This is another task'
			}
		])
```

## Raw Query

To run a raw query, use the `raw` method:

```js
import { Database, Route } from '@formidablejs/framework'

Route.get '/', do
	Database.raw('select * from users where id = ?', [1])
```

## Joins

To join tables, use the `join` method:

```js
import { Database, Route } from '@formidablejs/framework'

Route.get '/', do
	Database.table('posts')
		.join('users', 'posts.id', '=', 'users.user_id')
		.select(
			'posts.id as post_id',
			'users.id as user_id',
			'users.name',
			'posts.title',
			'posts.body'
		)
```

For more on joins, see the [Knex.js documentation](https://knexjs.org/#Builder-join).
