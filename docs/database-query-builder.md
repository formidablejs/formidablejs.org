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

To select data from the database, use the `select` method from the `DB` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {5}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.select('id', 'title').from('tasks')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {4}
import { DB } from '@formidablejs/framework'
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
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.select().from('tasks')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {4}
import { DB } from '@formidablejs/framework'
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

```js title="routes/api.imba" {6-9}
import { DB } from '@formidablejs/framework'
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

```ts title="routes/api.ts" {6-9}
import { DB } from '@formidablejs/framework'
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
import { DB } from '@formidablejs/framework'
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
import { DB } from '@formidablejs/framework'
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

```js title="routes/api.imba" {6-15}
import { DB } from '@formidablejs/framework'
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

```js title="routes/api.ts" {6-15}
import { DB } from '@formidablejs/framework'
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

## Create

If you want to insert and return the created row or rows, use the `create` method. This method is a combination of the `insert` and `returning` methods:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```js title="routes/api.imba" {6-9}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	const task = await DB.table('tasks')
		.create({
			title: 'Task 1'
			description: 'This is a task'
		})

	task
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {6-9}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', async () => {
	const task = await DB.table('tasks')
		.create({
			title: 'Task 1',
			description: 'This is a task'
		})

	return task
})
```

</TabItem>
</Tabs>

## Soft Delete

To soft delete a row, use the `softDelete` method. This method will set the `deleted_at` column to the current timestamp:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```js title="routes/api.imba" {7}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
		.where('id', 1)
		.softDelete()
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {7}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.where('id', 1)
		.softDelete()
})
```

</TabItem>
</Tabs>

## Restore

To restore a soft deleted row, use the `restore` method. This method will set the `deleted_at` column to `null`:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```js title="routes/api.imba" {7}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
		.where('id', 1)
		.restore()
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {7}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.where('id', 1)
		.restore()
})
```

</TabItem>
</Tabs>

## With Trashed

To include soft deleted rows in your query, use the `withTrashed` method:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```js title="routes/api.imba" {6}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
		.withTrashed()
		.where('id', 1)
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {6}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.withTrashed()
		.where('id', 1)
})
```

</TabItem>
</Tabs>

## Without Trashed

To exclude soft deleted rows from your query, use the `withoutTrashed` method:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```js title="routes/api.imba" {6}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
		.withoutTrashed()
		.where('id', 1)
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {6}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.withoutTrashed()
		.where('id', 1)
})
```

</TabItem>
</Tabs>

## Only Trashed

To only include soft deleted rows in your query, use the `onlyTrashed` method:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```js title="routes/api.imba" {6}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.table('tasks')
		.onlyTrashed()
		.where('id', 1)
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {6}
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', () => {
	return DB.table('tasks')
		.onlyTrashed()
		.where('id', 1)
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
import { DB } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do
	DB.raw('select * from users where id = ?', [1])
```

</TabItem>
<TabItem value="ts">

```js title="routes/api.ts" {4}
import { DB } from '@formidablejs/framework'
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
import { DB } from '@formidablejs/framework'
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
import { DB } from '@formidablejs/framework'
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
