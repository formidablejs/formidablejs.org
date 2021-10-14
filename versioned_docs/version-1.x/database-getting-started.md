---
id: database-getting-started
title: Getting Started
---

# Getting Started

Formidable supports has out of the box support for `SQL` Queries and `Redis`. The SQL data layer is powered by Knex.js, while the Redis data layer is powered by Node-Redis.

## Configuration

The configuration for all the supported database drivers redis db's can be found in the `config/database.imba` file:	

```py
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

#### default

The `default` property can be used to set the default connection that will be used for all database operations.

#### migrations

The `migrations` property is used to define the table used to store the different migrations for your applications.

#### connections

The `connections` object is used to define the connections used by your application. You can have as many connections as you want defined here.

#### redis

The `redis` object is used to define the redis databases and options used by your application.

## Usage

### Database Connections

The following example shows how to use the `Database` class to query the database:

```py
import { Database as DB } from '@formidablejs/framework'
import Controller from './Controller'

export default class PostController < Controller

	def index
		DB.table('posts')

```

The example above will query the `posts` table and return all the records it finds.

We can also sort and paginate the results:

```py
import { Database as DB, FormRequest } from '@formidablejs/framework'
import Controller from './Controller'

export default class PostController < Controller

	def index request\FormRequest
		const page = request.get('page', 1)

		DB.table('posts')
			.orderBy('id', 'desc')
			.paginate({
				perPage: 1
				currentPage: page
			})
```

#### Pagination

Key           | Value
--------------|:----
`perPage`     | The number of records to show per page.
`currentPage` | The current page number.
`from`        | Counting ID of the first item of the current page.
`to`          | Counting ID of the last item of the current page.

#### Insert A New Row

To insert a new row into a table, we can use the `insert` method:

```py
const [ taskId ] = await DB.table('tasks')
	.insert({
		title: 'Learn imba'
		description: 'Learn imba by building a new framework'
	})
```

####  Update Existing Row By ID

To update a row by ID, we can use the `update` method:

```py
const updatedRowCount = await DB.table('tasks')
	.where('id', 1)
	.update({
		title: 'New title'
	})
```

#### Delete Existing Row By ID

To delete a row by ID, we can use the `delete` method:

```py
const deletedRowCount = await DB.table('tasks')
	.where('id', 1)
	.delete!
```

### Redis

To quickly get started with setting values to Redis or retrieving data, we can use the `set` method or the `get` method from the `connection` method provided by the `Redis` class:

```js
import { Redis, Route } from '@formidablejs/framework'

Route.get '/', do(request)
	const name = request.get('name', 'Luna')

	Redis.connection!.set('name', name)

```

#### Setting A Value In Redis

To set a value in Redis, we can use the `set` method from the `connection` method provided by the `Redis` class:

```js
import { Redis, Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.set('name', 'Luna')

```

To check if an error occurred while, we can pass a `callback` function to the `set` method as the last argument:

```py
Redis.connection!.set 'name', 'Luna', do(error)
	if error
		# do something
```

#### Setting Expiring Data In Redis

To set a value in Redis with an expiration time, we can use the `set` method from the `connection` method provided by the `Redis` class and pass the expiration time as the third argument using the `expiresIn` helper method:

```js
import { expiresIn, Redis, Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.set 'name', 'Luna', expiresIn('1 minute')
```

Should you wish to pass a `callback` function, you can do so as the last argument:

```py
import { expiresIn, Redis, Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.set 'name', 'Luna', expiresIn('1 minute'), do(error)
		if error
			# do something
```

#### Retrieve Data From Redis

To retrieve data from Redis, we can use the `get` method from the `connection` method provided by the `Redis` class:

```js
import { Redis, Route } from '@formidablejs/framework'

Route.get '/', do(request)
	Redis.connection!.get 'name', do(error, response)
		if error then throw new Error 'Could not retrieve name from Redis'

		console.log response

```

For more information, see the [Node-Redis Documentation](https://www.npmjs.com/package/redis) and [Redis Documentation](https://redis.io/).
