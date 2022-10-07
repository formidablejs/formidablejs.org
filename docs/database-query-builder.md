---
id: database-query-builder
title: Query Builder
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Query Builder

Formidable uses [Knex.js](https://knexjs.org) as its database query builder. You may use any of the Knex.js methods to build your queries.

## Select Query

To select data from the database, use the `select` method from the `Database` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {5}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.select('id', 'title').from('tasks')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {4}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => DB.select('id', 'title').from('tasks'))
```

</TabItem>
</Tabs>

If you want to select all columns from a table, you can leave the `select` method empty:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {5}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.select().from('tasks')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {4}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => DB.select().from('tasks'))
```

</TabItem>
</Tabs>

## Insert Query

To insert data into the database, use the `insert` method after using the `table` method to specify the table to insert into:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {6}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
		.insert({
			title: 'Task 1'
			description: 'This is a task'
		})
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {6}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.insert({
			title: 'Task 1',
			description: 'This is a task'
		})
})
```

</TabItem>
</Tabs>

Alternatively you can use the `into` method to specify the table to insert into after using the `insert` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {9}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.insert({
			title: 'Task 1'
			description: 'This is a task'
		})
		.into('tasks')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {9}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.insert({
			title: 'Task 1',
			description: 'This is a task'
		})
		.into('tasks')
})
```

</TabItem>
</Tabs>

## Multi Insert

To insert multiple rows at once, use the `insert` method with an array of objects:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {6}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
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

</TabItem>
<TabItem value="ts">

```js title="routes/api.ts" {6}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.insert([
			{
				title: 'Task 1',
				description: 'This is a task'
			},
			{
				title: 'Task 2',
				description: 'This is another task'
			}
		])
})
```

</TabItem>
</Tabs>

## Raw Query

To run a raw query, use the `raw` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {5}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.raw('select * from users where id = ?', [1])
```

</TabItem>
<TabItem value="ts">

```js title="routes/api.ts" {4}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => DB.raw('select * from users where id = ?', [1]))
```

</TabItem>
</Tabs>

## Joins

To join tables, use the `join` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {6}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('posts')
		.join('users', 'posts.id', '=', 'users.user_id')
		.select(
			'posts.id as post_id',
			'users.id as user_id',
			'users.name',
			'posts.title',
			'posts.body'
		)
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {6}
import { Database as DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('posts')
		.join('users', 'posts.id', '=', 'users.user_id')
		.select(
			'posts.id as post_id',
			'users.id as user_id',
			'users.name',
			'posts.title',
			'posts.body'
		)
})
```

</TabItem>
</Tabs>

For more on joins, see the [Knex.js documentation](https://knexjs.org/#Builder-join).
