---
id: database-migrations
title: Migrations
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Database Migrations

Migrations are like version control for your database, allowing your team to define and share the application's database schema definition. If you have ever had to tell a teammate to manually add a column to their local database schema after pulling in your changes from source control, you've faced the problem that database migrations solve.

Out of the box, Formidable provides a simple database migration system that allows you to define and share your database schema definition. This is a great way to ensure that your database schema is always in sync with your application code.

Formidable Database Migrations are stored in the `/database/migrations` directory and are powered by [Knex.js](https://knexjs.org/).

## Creating a Migration

To create a new migration, run the following command:

```bash
node craftsman make:migration CreatePostsTable --table=posts
```

The command above will create a new migration file under `/database/migrations` and will generate the following migration:

```js
const { Database } = require('@formidablejs/framework');

/** @param {Database} DB */
exports.up = (DB) => {
	return DB.schema.createTable('posts', (table) => {

	});
};

/** @param {Database} DB */
exports.down = (DB) => DB.schema.dropTable('posts');

```

We can now define our migration's schema in the `up` function:

```js
exports.up = (DB) => {
	return DB.schema.createTable('posts', (table) => {
		table.increments('id').primary();
		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
		table.string('title');
		table.text('body');
		table.timestamps();
	});
};
```

After defining our schema, we can now run the migration:

```bash
node craftsman migrate:latest
```

This will add a new table to your database.

## Migration Modifications

Formidable allows you to modify existing tables by creating new migrations that modify the existing tables.

### Adding A Column

Here is an example of a migration that adds a new column to an existing table:

```bash
node craftsman make:migration AddSoftDeletesToPostsTable --table=posts --alter
```

```js
const { Database } = require('@formidablejs/framework');

/**
 * Add a softDeletes (delete_at) column to the posts table.
 *
 * @param {Database} DB
 */
exports.up = (DB) => {
	return DB.schema.table('posts', (table) => {
		table.timestamp('deleted_at').nullable();
	});
};

/**
 * Remove the softDeletes (deleted_at) column from the posts table.
 *
 * @param {Database} DB
 */
exports.down = (DB) => {
	return DB.schema.table('posts', (table) => {
		table.schema.dropColumn('deleted_at')
	});
};
```

This migration will add a new column to the `posts` table when `migrate up` is ran, and will remove the column when `migrate down` is ran.

### Removing A Column

Here is an example of a migration that removes a column from an existing table:

```js
const { Database } = require('@formidablejs/framework');

/**
 * Remove the softDeletes (deleted_at) column from the posts table.
 *
 * @param {Database} DB
 */
exports.up = (DB) => {
	return DB.schema.table('posts', (table) => {
		table.dropColumn('deleted_at');
	});
};

/**
 * Add a softDeletes (delete_at) column to the posts table.
 *
 * @param {Database} DB
 */
exports.down = (DB) => {
	return DB.schema.table('posts', (table) => {
		table.timestamp('deleted_at').nullable();
	});
};
```

### Renaming A Column

Here is an example of a migration that renames a column in an existing table:

```js
const { Database } = require('@formidablejs/framework');

/**
 * Rename the deleted_at column to delete_when in the posts table.
 *
 * @param {Database} DB
 */
exports.up = (DB) => DB.schema.table('posts').renameColumn('deleted_at', 'deleted_when');

/**
 * Rename the deleted_when column from posts table back to deleted_at.
 *
 * @param {Database} DB
 */
exports.down = (DB) => DB.schema.table('posts').renameColumn('deleted_when', 'deleted_at');
```

### Changing A Column

Here is an example of a migration that changes a column in an existing table:

```js
const { Database } = require('@formidablejs/framework');

/**
 * Change the type of the deleted_at column from timestamp to boolean.
 *
 * @param {Database} DB
 */
exports.up = (DB) => {
	return DB.schema.table('posts', (table) => {
		table.boolean('deleted_at').alter();
	});
};

/**
 * Change the type of the deleted_at column from boolean to timestamp and make it nullable.
 *
 * @param {Database} DB
 */
exports.down = (DB) => {
	return DB.schema.table('posts', (table) => {
		table.timestamp('deleted_at').nullable().alter();
	});
};
```

## Running Migrations

To run all of your outstanding migrations, execute the `migrate:latest` Craftsman command:

```bash
node craftsman migrate:latest
```

To run the next outstanding migration, execute the `migrate:up` Craftsman command:

```bash
node craftsman migrate:up
```

To run a specific migration, execute the `migrate:up` Craftsman command with the `-m` option:

```bash
node craftsman migrate:up -m 20210820161410_create_posts_table
```

### Rolling Back Migrations

To roll back all of your migrations, execute the `migrate:rollback` Craftsman command:

```bash
node craftsman migrate:rollback
```

To roll back a specific migration, execute the `migrate:down` Craftsman command with the `-m` option:

```bash
node craftsman migrate:down -m 20210820161410_create_posts_table
```

## Schema Builder

The Formidable Framework uses [Knex.js](https://knexjs.org/) to build database schemas.

Let's take a look at an example migration:

```js
const { Database } = require('@formidablejs/framework');

/**
 * Create the posts table.
 *
 * @param {Database} DB
 */
exports.up = (DB) => {
	return DB.schema.createTable('posts', (table) => {
		table.increments('id').primary();
		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
		table.string('title');
		table.text('body');
		table.timestamps();
	});
};

/**
 * Drop the posts table.
 *
 * @param {Database} DB
 */
exports.down = (DB) => DB.schema.dropTable('posts');
```

The `up` method receives a `Database` instance as its first argument. This instance provides a variety of methods that may be used to define the schema for the table. The `down` method receives the same `Database` instance, allowing you to reverse the operations performed by the `up` method.

### Creating Tables

To create a new database table, use the `createTable` method on the `Database` instance you receive in your migration:

```js
exports.up = (DB) => {
	return DB.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('email').unique();
		table.string('password');
		table.timestamps();
	});
};
```

The `createTable` method accepts two arguments: the first is the name of the table, while the second is a `callback` which receives a `TableBuilder` instance that may be used to define the new table's columns.

### Column Types

The `TableBuilder` class contains a variety of column types that you may use when building your tables:

```js
exports.up = (DB) => {
	return DB.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('email').unique();
		table.string('password');
		table.timestamps();
	});
};
```

#### Schema Building

##### dropColumn

Drops a column, specified by the column's name

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.dropColumn('deleted_at');
	});
};
```

##### dropColumns

Drops multiple columns, specified by an array of column names

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.dropColumns(['deleted_at', 'deleted_by']);
	});
};
```

##### renameColumn

Renames a column from one name to another

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.renameColumn('deleted_at', 'deleted_when');
	});
};
```

##### increments

Adds an auto incrementing column. This is the same as `integer` with `autoIncrement` set to `true`.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.increments('id').primary();
	});
};
```

##### integer

Adds an integer column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.integer('age');
	});
};
```

##### bigInteger

Adds a big integer column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.bigInteger('views');
	});
};
```

##### tinyint

Adds a tiny integer column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.tinyint('views');
	});
};
```

##### smallint

Adds a small integer column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.smallint('views');
	});
};
```

##### mediumint

Adds a medium integer column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.mediumint('views');
	});
};
```

##### bigint

Adds a big integer column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.bigint('views');
	});
};
```

##### text

Adds a text column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.text('description');
	});
};
```

##### string

Adds a string column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email');
	});
};
```

##### float

Adds a float column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.float('amount');
	});
};
```

##### double

Adds a double column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.double('amount');
	});
};
```

##### decimal

Adds a decimal column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.decimal('amount');
	});
};
```

##### boolean

Adds a boolean column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.boolean('confirmed');
	});
};
```

##### date

Adds a date column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.date('created_at');
	});
};
```

##### datetime

Adds a datetime column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.datetime('created_at');
	});
};
```

##### time

Adds a time column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.time('sunrise');
	});
};
```

##### timestamp

Adds a timestamp column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.timestamp('created_at');
	});
};
```

##### timestamps

Adds `created_at` and `updated_at` columns.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.timestamps();
	});
};
```

##### dropTimestamps

Drops `created_at` and `updated_at` columns.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.dropTimestamps();
	});
};
```

##### binary

Adds a binary column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.binary('photo');
	});
};
```

##### enum

Adds an enum column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.enum('role', ['admin', 'user']);
	});
};
```

##### json

Adds a json column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.json('options');
	});
};
```

##### jsonb

Adds a jsonb column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.jsonb('options');
	});
};
```

##### uuid

Adds a uuid column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.uuid('id').defaultTo(DB.fn.uuid());
	});
};
```

##### comment

Adds a comment to the column.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').comment('The user\'s email address');
	});
};
```

##### engine

Sets the table's storage engine.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.engine('InnoDB');
	});
};
```

##### charset

Sets the table's character set.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.charset('utf8mb4');
	});
};
```

##### collate

Sets the table's collation.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.collate('utf8mb4_unicode_ci');
	});
};
```

##### inherits

Sets the table's inheritance.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.inherits('users');
	});
};
```

##### specificType

Sets the table's specific type.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.specificType('email', 'varchar(100)');
	});
};
```

##### index

Adds an index.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.index('email');
	});
};
```

##### dropIndex

Drops an index.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.dropIndex('email');
	});
};
```

##### setNullable

Sets the column to be nullable.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').setNullable();
	});
};
```

##### dropNullable

Drops the column's nullable property.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').dropNullable();
	});
};
```

##### primary

Sets the column to be the primary key.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').primary();
	});
};
```

##### unique

Sets the column to be unique.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').unique();
	});
};
```

##### foreign

Sets the column to be a foreign key.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
	});
};
```

##### dropForeign

Drops the column's foreign key.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.dropForeign('user_id');
	});
};
```

##### dropUnique

Drops the column's unique property.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').dropUnique();
	});
};
```

##### dropPrimary

Drops the column's primary property.

```js
exports.up = (DB) => {
	return DB.schema.table('users', (table) => {
		table.string('email').dropPrimary();
	});
};
```

For more information, visit the [Knex.js documentations](https://knexjs.org/#Schema).
