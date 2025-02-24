---
id: database-getting-started
title: Getting Started
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

Formidable has out of the box support for `SQL` Queries and `Redis`. The SQL data layer is powered by Knex.js, while the Redis data layer is powered by Node-Redis.

## Supported Drivers

Thanks to Knex.js, Formidable supports a number of different database drivers. The following drivers are supported out of the box:

* [SQLite (default)](#using-sqlite)
* [MySQL / MariaDB](#using-mysql--mariadb)
* [PostgreSQL](#using-postgresql)
* [Microsoft SQL Server](#using-microsoft-sql-server)

### Using SQLite

SQLite is a great database for getting started with Formidable. It's file-based, meaning you don't need to install any additional software to get started. To use SQLite, simply set the `DB_CONNECTION` environment variable to `sqlite` in your `.env` file:

```bash title=".env"
DB_CONNECTION=sqlite
```

You can go ahead and install the `sqlite3` driver using your package manager of choice:

<Tabs
	defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm install sqlite3
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add sqlite3
```

</TabItem>
<TabItem value="pnpm">

```bash
pnpm add sqlite3
```

</TabItem>

<TabItem value="bun">

```bash
bun add sqlite3
```

</TabItem>
</Tabs>

### Using MySQL / MariaDB

To use MySQL or MariaDB, simply set the `DB_CONNECTION` environment variable to `mysql` in your `.env` file:

```bash title=".env"
DB_CONNECTION=mysql
```

You can go ahead and install the `mysql` driver using your package manager of choice:

<Tabs
	defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm install mysql2
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add mysql2
```

</TabItem>
<TabItem value="pnpm">

```bash
pnpm add mysql2
```

</TabItem>

<TabItem value="bun">

```bash
bun add mysql2
```

</TabItem>
</Tabs>

### Using PostgreSQL

To use PostgreSQL, simply set the `DB_CONNECTION` environment variable to `pgsql` in your `.env` file:

```bash title=".env"
DB_CONNECTION=pgsql
```

You can go ahead and install the `pg` driver using your package manager of choice:

<Tabs
	defaultValue={State.manager}
	groupId="package-manager"
	values={[
		{label: 'npm', value: 'npm'},
		{label: 'pnpm', value: 'pnpm'},
		{label: 'yarn', value: 'yarn'},
		{label: 'bun', value: 'bun'},
	]}>
<TabItem value="npm">

```bash
npm install pg
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add pg
```

</TabItem>
<TabItem value="pnpm">

```bash
pnpm add pg
```

</TabItem>

<TabItem value="bun">

```bash
bun add pg
```

</TabItem>
</Tabs>

### Using Microsoft SQL Server

To use Microsoft SQL Server, simply set the `DB_CONNECTION` environment variable to `mssql` in your `.env` file:

```bash title=".env"
DB_CONNECTION=mssql
```

You can go ahead and install the `tedious` driver using your package manager of choice:

<Tabs
	defaultValue={State.manager}
	groupId="package-manager"
	values={[
		{label: 'npm', value: 'npm'},
		{label: 'pnpm', value: 'pnpm'},
		{label: 'yarn', value: 'yarn'},
		{label: 'bun', value: 'bun'},
	]}>
<TabItem value="npm">

```bash
npm install tedious
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add tedious
```

</TabItem>
<TabItem value="pnpm">

```bash
pnpm add tedious
```

</TabItem>

<TabItem value="bun">

```bash
bun add tedious
```

</TabItem>
</Tabs>

## Configuration

The configuration for all the supported database drivers and redis db's can be found in the `config/database.imba` or `config/database.ts` config file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/database.imba" showLineNumbers
import { helpers } from '@formidablejs/framework'

export default {

	# --------------------------------------------------------------------------
	# Default Database Connection Name
	# --------------------------------------------------------------------------
	#
	# Here you may specify which of the database connections below you wish
	# to use as your default connection for all database work. Of course
	# you may use many connections at once using the Database library.

	default: helpers.env 'DB_CONNECTION', 'mysql'

	# --------------------------------------------------------------------------
	# Database Connections
	# --------------------------------------------------------------------------
	#
	# Here are each of the database connections setup for your application.
	# Feel free to add more.

	connections: {
		sqlite: {
			driver: 'sqlite3'
			filename: helpers.env 'DATABASE_URL'
		}

		mysql: {
			driver: 'mysql'
			url: helpers.env 'DATABASE_URL'
			host: helpers.env 'DB_HOST', '127.0.0.1'
			port: helpers.env 'DB_PORT', '3306'
			user: helpers.env 'DB_USER', ''
			database: helpers.env 'DB_DATABASE', ''
			password: helpers.env 'DB_PASSWORD', ''
			charset: 'utf8mb4'
		}

		pgsql: {
			driver: 'pg'
			url: helpers.env 'DATABASE_URL'
			host: helpers.env 'DB_HOST', '127.0.0.1'
			port: helpers.env 'DB_PORT', '5432'
			user: helpers.env 'DB_USER', ''
			database: helpers.env 'DB_DATABASE', ''
			password: helpers.env 'DB_PASSWORD', ''
			charset: 'utf8'
		}

		mssql: {
			driver: 'tedious'
			url: helpers.env 'DATABASE_URL'
			host: helpers.env 'DB_HOST', '127.0.0.1'
			port: helpers.env 'DB_PORT', '5432'
			user: helpers.env 'DB_USER', ''
			database: helpers.env 'DB_DATABASE', ''
			password: helpers.env 'DB_PASSWORD', ''
			charset: 'utf8'
		}
	}

	# --------------------------------------------------------------------------
	# Migration Settings
	# --------------------------------------------------------------------------
	#
	# Here you can configure database migration settings.
	#
	# The "tableName" is the name of the table that will store the migration
	# state.
	# The "directory" is the location where migrations files are stored.

	migrations: {
		tableName: 'migrations'
		directory: './database/migrations'
	}

	# --------------------------------------------------------------------------
	# useNullAsDefault
	# --------------------------------------------------------------------------
	#
	# Set useNullAsDefault to true when using sqlite as the default database
	# driver to prevent knex from throwing a warning.
	#
	# See: https://github.com/formidablejs/framework/issues/61

	useNullAsDefault: null

	# --------------------------------------------------------------------------
	# Redis Databases
	# --------------------------------------------------------------------------
	#
	# You can configure your redis databases here.

	redis: {
		options: {
			prefix: helpers.env 'REDIS_PREFIX', helpers.slug(helpers.env('APP_NAME', 'formidable'), '_') + '_database_'
		}

		default: {
			url: helpers.env 'REDIS_URL'
			host: helpers.env 'REDIS_HOST', '127.0.0.1'
			password: helpers.env 'REDIS_PASSWORD', null
			port: helpers.env 'REDIS_PORT', '6379'
			database: helpers.env 'REDIS_DB', '0'
		}

		cache: {
			url: helpers.env 'REDIS_URL'
			host: helpers.env 'REDIS_HOST', '127.0.0.1'
			password: helpers.env 'REDIS_PASSWORD', null
			port: helpers.env 'REDIS_PORT', '6379'
			database: helpers.env 'REDIS_CACHE_DB', '1'
		}
	}

}
```

</TabItem>
<TabItem value="ts">

```py title="config/database.ts" showLineNumbers
import { helpers } from '@formidablejs/framework'

export default {

	/**
	 * --------------------------------------------------------------------------
	 * Default Database Connection Name
	 * --------------------------------------------------------------------------
	 *
	 * Here you may specify which of the database connections below you wish
	 * to use as your default connection for all database work. Of course
	 * you may use many connections at once using the Database library.
	 */

	default: helpers.env('DB_CONNECTION', 'mysql'),

	/**
	 * --------------------------------------------------------------------------
	 * Database Connections
	 * --------------------------------------------------------------------------
	 *
	 * Here are each of the database connections setup for your application.
	 * Feel free to add more.
	 */

	connections: {
		sqlite: {
			driver: 'sqlite3',
			filename: helpers.env('DATABASE_URL'),
		},

		mysql: {
			driver: 'mysql',
			url: helpers.env('DATABASE_URL'),
			host: helpers.env('DB_HOST', '127.0.0.1'),
			port: helpers.env('DB_PORT', '3306'),
			user: helpers.env('DB_USER', ''),
			database: helpers.env('DB_DATABASE', ''),
			password: helpers.env('DB_PASSWORD', ''),
			charset: 'utf8mb4',
		},

		pgsql: {
			driver: 'pg',
			url: helpers.env('DATABASE_URL'),
			host: helpers.env('DB_HOST', '127.0.0.1'),
			port: helpers.env('DB_PORT', '5432'),
			user: helpers.env('DB_USER', ''),
			database: helpers.env('DB_DATABASE', ''),
			password: helpers.env('DB_PASSWORD', ''),
			charset: 'utf8',
		},

		mssql: {
			driver: 'tedious',
			url: helpers.env('DATABASE_URL'),
			host: helpers.env('DB_HOST', '127.0.0.1'),
			port: helpers.env('DB_PORT', '5432'),
			user: helpers.env('DB_USER', ''),
			database: helpers.env('DB_DATABASE', ''),
			password: helpers.env('DB_PASSWORD', ''),
			charset: 'utf8',
		}
	},

	/**
	 * --------------------------------------------------------------------------
	 * Migration Settings
	 * --------------------------------------------------------------------------
	 *
	 * Here you can configure database migration settings.
	 *
	 * The "tableName" is the name of the table that will store the migration
	 * state.
	 * The "directory" is the location where migrations files are stored.
	 */

	migrations: {
		tableName: 'migrations',
		directory: './database/migrations',
	},

	/**
	 * --------------------------------------------------------------------------
	 * useNullAsDefault
	 * --------------------------------------------------------------------------
	 *
	 * Set useNullAsDefault to true when using sqlite as the default database
	 * driver to prevent knex from throwing a warning.
	 *
	 * See: https://github.com/formidablejs/framework/issues/61
	 */

	useNullAsDefault: null,

	/**
	 * --------------------------------------------------------------------------
	 * Redis Databases
	 * --------------------------------------------------------------------------
	 *
	 * You can configure your redis databases here.
	 */

	redis: {
		options: {
			prefix: helpers.env('REDIS_PREFIX', helpers.slug(helpers.env('APP_NAME', 'formidable'), '_') + '_database_')
		},

		default: {
			url: helpers.env('REDIS_URL'),
			host: helpers.env('REDIS_HOST', '127.0.0.1'),
			password: helpers.env('REDIS_PASSWORD', null),
			port: helpers.env('REDIS_PORT', '6379'),
			database: helpers.env('REDIS_DB', '0')
		},

		cache: {
			url: helpers.env('REDIS_URL'),
			host: helpers.env('REDIS_HOST', '127.0.0.1'),
			password: helpers.env('REDIS_PASSWORD', null),
			port: helpers.env('REDIS_PORT', '6379'),
			database: helpers.env('REDIS_CACHE_DB', '1')
		}
	}

}
```

</TabItem>
</Tabs>

### Default

The `default` property can be used to set the default connection that will be used for all database operations.

### Migrations

The `migrations` property is used to define the table used to store the different migrations for your applications.

### Connections

The `connections` object is used to define the connections used by your application. You can have as many connections as you want defined here.

### Pooling

The `pool` object is used to define the minimum and maximum number of connections to the database. By default the minimum value is set to `2` and the maximum value is set tp `10` for `MySQL`, and `PG` libraries, and a single connection for `sqlite`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/database.imba" showLineNumbers
	...

	# --------------------------------------------------------------------------
	# Database Pooling
	# --------------------------------------------------------------------------
	#
	# Here we can define the minimum and maximum number of connections to the
	# database.

	pool: {
		min: 2  # minimum
		max: 10 # maximum
	}

	...
```

</TabItem>
<TabItem value="ts">

```ts title="config/database.ts" showLineNumbers
	...

	/**
	 * --------------------------------------------------------------------------
	 * Database Pooling
	 * --------------------------------------------------------------------------
	 *
	 * Here we can define the minimum and maximum number of connections to the
	 * database.
	 */

	pool: {
		min: 2,  // minimum
		max: 10  // maximum
	},

	...
```

</TabItem>
</Tabs>

### useNullAsDefault

The `useNullAsDefault` property can be set to `true` if one prefers that `undefined` keys are replaced with `NULL` instead of `DEFAULT`.

### Redis

The `redis` object is used to define the redis databases and options used by your application.

## Usage

### Database Connections

The following example shows how to use the `Database` class to query the database:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/PostController.imba" showLineNumbers
import { Database as DB } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

	def index
		DB.table('posts')

```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/PostController.ts" showLineNumbers
import { Database as DB } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController extends Controller {
	index(): Promise {
		return DB.table('posts')
	}
}
```

</TabItem>
</Tabs>

The example above will query the `posts` table and return all the records it finds.

We can also sort and paginate the results:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/PostController.imba" showLineNumbers
import { Database as DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController < Controller

	def index request\Request
		const page = request.query('page', 1)

		DB.table('posts')
			.orderBy('id', 'desc')
			.pagination({
				page: page
				perPage: 10
			})
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/PostController.ts" showLineNumbers
import { Database as DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'

export class PostController extends Controller {
	index(request: Request): Promise {
		const page: number = request.get('page', 1)

		return DB.table('posts')
			.orderBy('id', 'desc')
			.pagination({
				page: page,
				perPage: 10
			})
	}
}
```

</TabItem>
</Tabs>

#### Pagination

Property | Type               | Description
-------- | :----------------- | :-----------
page     | `number`           | The current page. The default value is `1`.
perPage  | `number` or `null` | The number of records per page. The default value is `20`.
query    | `object` or `null` | The query object of the request.
url      | `string` or `null` | The url of the request.

#### Insert A New Row

To insert a new row into a table, we can use the `insert` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const [ taskId ] = await DB.table('tasks')
	.insert({
		title: 'Learn imba'
		description: 'Learn imba by building a new framework'
	})
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const [ taskId: number ] = await DB.table('tasks')
	.insert({
		title: 'Learn imba',
		description: 'Learn imba by building a new framework'
	})
```

</TabItem>
</Tabs>

Alternatively, we can use the `create` method, which is an alias for the `insert` method but instead of returning an array of ID's, it returns the created row(s):

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const task = await DB.table('tasks')
	.create({
		title: 'Learn imba'
		description: 'Learn imba by building a new framework'
	})
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const task = await DB.table('tasks')
	.create({
		title: 'Learn imba',
		description: 'Learn imba by building a new framework'
	})
```

</TabItem>
</Tabs>

####  Update Existing Row By ID

To update a row by ID, we can use the `update` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const updatedRowCount = await DB.table('tasks')
	.where('id', 1)
	.update({
		title: 'New title'
	})
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const updatedRowCount = await DB.table('tasks')
	.where('id', 1)
	.update({
		title: 'New title'
	})
```

</TabItem>
</Tabs>

#### Delete Existing Row By ID

To delete a row by ID, we can use the `delete` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const deletedRowCount = await DB.table('tasks')
	.where('id', 1)
	.delete!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const deletedRowCount = await DB.table('tasks')
	.where('id', 1)
	.delete()
```

</TabItem>
</Tabs>

### Redis

To quickly get started with setting values to Redis or retrieving data, we can use the `set` method or the `get` method from the `connection` method provided by the `Redis` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" showLineNumbers
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do(request)
	const name = request.get('name', 'Luna')

	Redis.connection!.set('name', name)

```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" showLineNumbers
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', (request) => {
	const name = request.get('name', 'Luna')

	Redis.connection().set('name', name)
})

```

</TabItem>
</Tabs>

#### Setting A Value In Redis

To set a value in Redis, we can use the `set` method from the `connection` method provided by the `Redis` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" showLineNumbers
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.set('name', 'Luna')

```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" showLineNumbers
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', (request) => {
	Redis.connection().set('name', 'Luna')
})
```

</TabItem>
</Tabs>

To check if an error occurred while, we can pass a `callback` function to the `set` method as the last argument:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
Redis.connection!.set 'name', 'Luna', do(error)
	if error
		# do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
Redis.connection().set('name', 'Luna', (error) => {
	if (error) {
		// do something
	}
})
```

</TabItem>
</Tabs>

#### Setting Expiring Data In Redis

To set a value in Redis with an expiration time, we can use the `set` method from the `connection` method provided by the `Redis` class and pass the expiration time as the third argument using the `expiresIn` helper method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" showLineNumbers
import { expiresIn } from '@formidablejs/framework'
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.set 'name', 'Luna', expiresIn('1 minute')
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" showLineNumbers
import { expiresIn } from '@formidablejs/framework'
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', (request) => {
	Redis.connection().set('name', 'Luna', expiresIn('1 minute'))
})
```

</TabItem>
</Tabs>

Should you wish to pass a `callback` function, you can do so as the last argument:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="routes/api.imba" showLineNumbers
import { expiresIn } from '@formidablejs/framework'
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.set 'name', 'Luna', expiresIn('1 minute'), do(error)
		if error
			# do something
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" showLineNumbers
import { expiresIn } from '@formidablejs/framework'
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', (request) => {
	Redis.connection().set('name', 'Luna', expiresIn('1 minute'), (error) => {
		if (error) {
			// do something
		}
	})
})
```

</TabItem>
</Tabs>

#### Retrieve Data From Redis

To retrieve data from Redis, we can use the `get` method from the `connection` method provided by the `Redis` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" showLineNumbers
import { Log } from '@formidablejs/logger'
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.get 'name', do(error, response)
		if error then throw new Error 'Could not retrieve name from Redis'

		Log.info response

```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" showLineNumbers
import { Log } from '@formidablejs/logger'
import { Redis } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', (request) => {
	Redis.connection().get('name', (error, response) => {
		if (error) {
			throw new Error('Could not retrieve name from Redis')
		}

		Log.info(response)
	})
})

```

</TabItem>
</Tabs>

For more information, see the [Node-Redis Documentation](https://www.npmjs.com/package/redis) and [Redis Documentation](https://redis.io/).
