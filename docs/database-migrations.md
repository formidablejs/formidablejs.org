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

For more information, visit the [Knex.js documentations](https://knexjs.org/#Schema).
