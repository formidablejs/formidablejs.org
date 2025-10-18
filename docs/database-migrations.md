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

```ts showLineNumbers
import type { Database } from '@formidablejs/framework';

export async function up(DB: Database): Promise<void> {
	return DB.schema.createTable('posts', (table) => {

	});
};

export async function down(DB: Database): Promise<void> {
	return DB.schema.dropTable('posts');
}
```

We can now define our migration's schema in the `up` function:

```ts showLineNumbers
export async function up(DB: Database): Promise<void> {
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

```ts showLineNumbers
import type { Database } from '@formidablejs/framework';

/**
 * Add a softDeletes (delete_at) column to the posts table.
 */
export async function up(DB: Database): Promise<void> {
	return DB.schema.table('posts', (table) => {
		table.timestamp('deleted_at').nullable();
	});
};

/**
 * Remove the softDeletes (deleted_at) column from the posts table.
 */
export async function down(DB: Database): Promise<void> {
	return DB.schema.table('posts', (table) => {
		table.schema.dropColumn('deleted_at')
	});
};
```

This migration will add a new column to the `posts` table when `migrate up` is ran, and will remove the column when `migrate down` is ran.

### Removing A Column

Here is an example of a migration that removes a column from an existing table:

```ts showLineNumbers
import type { Database } from '@formidablejs/framework';

/**
 * Remove the softDeletes (deleted_at) column from the posts table.
 */
export async function up(DB: Database): Promise<void> {
	return DB.schema.table('posts', (table) => {
		table.dropColumn('deleted_at');
	});
};

/**
 * Add a softDeletes (delete_at) column to the posts table.
 */
export async function down(DB: Database): Promise<void> {
	return DB.schema.table('posts', (table) => {
		table.timestamp('deleted_at').nullable();
	});
};
```

### Renaming A Column

Here is an example of a migration that renames a column in an existing table:

```ts showLineNumbers
import type { Database } from '@formidablejs/framework';

/**
 * Rename the deleted_at column to delete_when in the posts table.
 */
export async function up(DB: Database): Promise<void> {
	return DB.schema.table('posts').renameColumn('deleted_at', 'deleted_when');
};

/**
 * Rename the deleted_when column from posts table back to deleted_at.
 */
export async function down(DB: Database): Promise<void> {
	return DB.schema.table('posts').renameColumn('deleted_when', 'deleted_at');
};
```

### Changing A Column

Here is an example of a migration that changes a column in an existing table:

```ts showLineNumbers
import type { Database } from '@formidablejs/framework';

/**
 * Change the type of the deleted_at column from timestamp to boolean.
 */
export async function up(DB: Database): Promise<void> {
	return DB.schema.table('posts', (table) => {
		table.boolean('deleted_at').alter();
	});
};

/**
 * Change the type of the deleted_at column from boolean to timestamp and make it nullable.
 */
export async function down(DB: Database): Promise<void> {
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

```ts showLineNumbers
import type { Database } from '@formidablejs/framework';

/**
 * Create the posts table.
 */
export async function up(DB: Database): Promise<void> {
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
 */
export async function down(DB: Database): Promise<void> {
	return DB.schema.dropTable('posts');
};
```

The `up` method receives a `Database` instance as its first argument. This instance provides a variety of methods that may be used to define the schema for the table. The `down` method receives the same `Database` instance, allowing you to reverse the operations performed by the `up` method.

### Creating Tables

To create a new database table, use the `createTable` method on the `Database` instance you receive in your migration:

```ts showLineNumbers
export async function up(DB: Database): Promise<void> {
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

```ts showLineNumbers
export async function up(DB: Database): Promise<void> {
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

```ts showLineNumbers
table.dropColumn('deleted_at');
```

##### dropColumns

Drops multiple columns, specified by an array of column names

```ts showLineNumbers
table.dropColumns(['deleted_at', 'deleted_by']);
```

##### renameColumn

Renames a column from one name to another

```ts showLineNumbers
table.renameColumn('deleted_at', 'deleted_when');
```

##### rememberToken

Adds a `remember_token` column to the table

```ts showLineNumbers
table.rememberToken();
```

##### increments

Adds an auto incrementing column. This is the same as `integer` with `autoIncrement` set to `true`.

```ts showLineNumbers
table.increments('id').primary();
```

##### integer

Adds an integer column.

```ts showLineNumbers
table.integer('age');
```

##### bigInteger

Adds a big integer column.

```ts showLineNumbers
table.bigInteger('views');
```

##### tinyint

Adds a tiny integer column.

```ts showLineNumbers
table.tinyint('views');
```

##### smallint

Adds a small integer column.

```ts showLineNumbers
table.smallint('views');
```

##### mediumint

Adds a medium integer column.

```ts showLineNumbers
table.mediumint('views');
```

##### bigint

Adds a big integer column.

```ts showLineNumbers
table.bigint('views');
```

##### text

Adds a text column.

```ts showLineNumbers
table.text('description');
```

##### string

Adds a string column.

```ts showLineNumbers
table.string('email');
```

##### float

Adds a float column.

```ts showLineNumbers
table.float('amount');
```

##### double

Adds a double column.

```ts showLineNumbers
table.double('amount');
```

##### decimal

Adds a decimal column.

```ts showLineNumbers
table.decimal('amount');
```

##### boolean

Adds a boolean column.

```ts showLineNumbers
table.boolean('confirmed');
```

##### date

Adds a date column.

```ts showLineNumbers
table.date('created_at');
```

##### datetime

Adds a datetime column.

```ts showLineNumbers
table.datetime('created_at');
```

##### time

Adds a time column.

```ts showLineNumbers
table.time('sunrise');
```

##### timestamp

Adds a timestamp column.

```ts showLineNumbers
table.timestamp('created_at');
```

##### timestamps

Adds `created_at` and `updated_at` columns.

```ts showLineNumbers
table.timestamps();
```

##### dropTimestamps

Drops `created_at` and `updated_at` columns.

```ts showLineNumbers
table.dropTimestamps();
```

##### softDeletes

Adds a `deleted_at` column to the table.

```ts showLineNumbers
table.softDeletes();
```

##### dropSoftDeletes

Drops the `deleted_at` column from the table.

```ts showLineNumbers
table.dropSoftDeletes();
```

##### binary

Adds a binary column.

```ts showLineNumbers
table.binary('photo');
```

##### enum

Adds an enum column.

```ts showLineNumbers
table.enum('role', ['admin', 'user']);
```

##### json

Adds a json column.

```ts showLineNumbers
table.json('options');
```

##### jsonb

Adds a jsonb column.

```ts showLineNumbers
table.jsonb('options');
```

##### uuid

Adds a uuid column.

```ts showLineNumbers
table.uuid('id').defaultTo(DB.fn.uuid());
```

##### comment

Adds a comment to the column.

```ts showLineNumbers
table.string('email').comment('The user\'s email address');
```

##### engine

Sets the table's storage engine.

```ts showLineNumbers
table.engine('InnoDB');
```

##### charset

Sets the table's character set.

```ts showLineNumbers
table.charset('utf8mb4');
```

##### collate

Sets the table's collation.

```ts showLineNumbers
table.collate('utf8mb4_unicode_ci');
```

##### inherits

Sets the table's inheritance.

```ts showLineNumbers
table.inherits('users');
```

##### specificType

Sets the table's specific type.

```ts showLineNumbers
table.specificType('email', 'varchar(100)');
```

##### index

Adds an index.

```ts showLineNumbers
table.index('email');
```

##### dropIndex

Drops an index.

```ts showLineNumbers
table.dropIndex('email');
```

##### setNullable

Sets the column to be nullable.

```ts showLineNumbers
table.string('email').setNullable();
```

##### dropNullable

Drops the column's nullable property.

```ts showLineNumbers
table.string('email').dropNullable();
```

##### primary

Sets the column to be the primary key.

```ts showLineNumbers
table.string('email').primary();
```

##### unique

Sets the column to be unique.

```ts showLineNumbers
table.string('email').unique();
```

##### foreign

Sets the column to be a foreign key.

```ts showLineNumbers
table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
```

##### dropForeign

Drops the column's foreign key.

```ts showLineNumbers
table.dropForeign('user_id');
```

##### dropUnique

Drops the column's unique property.

```ts showLineNumbers
table.string('email').dropUnique();
```

##### dropPrimary

Drops the column's primary property.

```ts showLineNumbers
table.string('email').dropPrimary();
```

For more information, visit the [Knex.js documentations](https://knexjs.org/#Schema).
