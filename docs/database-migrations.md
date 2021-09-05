---
id: database-migrations
title: Migrations
---

# Database Migrations

Migrations are like version control for your database, allowing your team to define and share the application's database schema definition. If you have ever had to tell a teammate to manually add a column to their local database schema after pulling in your changes from source control, you've faced the problem that database migrations solve.

Out of the box, Formidable provides a simple database migration system that allows you to define and share your database schema definition. This is a great way to ensure that your database schema is always in sync with your application code.

Formidable Database Migrations are stored in the `/database/migrations` directory and are powered by [DBMigrate](https://github.com/db-migrate).

## Creating a Migration

To create a new migration, run the following command:

```
craftsman make migration CreatePostsTable --option=table:posts
```

The command above will create a new migration file under `/database/migrations` and will generate the following migration:

```js
const { schema } = require('@formidablejs/schema-builder');

exports.up = (db) => {
	return db.createTable('posts', schema([
		
	]));
};

exports.down = (db) => {
	return db.dropTable('posts');
};

let dbm, type, seed;

exports.setup = (options, seedLink) => {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports._meta = {
	version: 1
};

```

We can now define our migration's schema in the `up` function:

```js
const { schema, id, foreign, string, longText, timestamps } = require('@formidablejs/schema-builder');

exports.up = (db) => {
	return db.createTable('posts', schema([
		foreign('user_id').references('id').on('users').onDelete('cascade'),
		string('title'),
		longText('body'),
		timestamps()
	]));
};
```

After defining our schema, we can now run the migration:

```
craftsman migrate up
```

This will add a mew table to your database.

## Migration Modifications

Formidable allows you to modify existing tables by creating new migrations that modify the existing tables.

### Adding A Column

Here is an example of a migration that adds a new column to an existing table:

```js
const { add, softDeletes } = require('@formidablejs/schema-builder');

/**
 * Add a softDeletes (delete_at) column to the posts table.
 */
exports.up = (db) => {
	return add( softDeletes() )
		.whereTable('posts')
		.using(db);
};

/**
 * Remove the softDeletes (deleted_at) column from the posts table.
 */
exports.down = (db) => db.removeColumn('posts', 'deleted_at');
```

This migration will add a new column to the `posts` table when `migrate up` is ran, and will remove the column when `migrate down` is ran.

> The `add` method, return a `ChangeColumn` instance.

### Removing A Column

Here is an example of a migration that removes a column from an existing table:

```js
/**
 * Remove the softDeletes (deleted_at) column from the posts table.
 */
exports.up = (db) => db.removeColumn('posts', 'deleted_at');

/**
 * Add a softDeletes (delete_at) column to the posts table.
 */
exports.down = (db) => {
	return add( softDeletes() )
		.whereTable('posts')
		.using(db);
};
```

### Renaming A Column

Here is an example of a migration that renames a column in an existing table:

```js
/**
 * Remove the deleted_at column from the posts table to deleted_when.
 */
exports.up = (db) => db.renameColumn('posts', 'deleted_at', 'deleted_when');

/**
 * Rename the deleted_when column from posts table back to deleted_at.
 */
exports.down = (db) => db.renameColumn('posts', 'deleted_when', 'deleted_at);
```

### Changing A Column

Here is an example of a migration that changes a column in an existing table:

```js
const { boolean, change, timestamp } = require('@formidablejs/schema-builder');

/**
 * Change the type of the deleted_at column from timestamp to boolean.
 */
exports.up = (db) => {
	return change( boolean('deleted_at') )
		.whereTable('posts')
		.using(db);
}

/**
 * Change the type of the deleted_at column from boolean to timestamp and make it nullable.
 */
exports.down = (db) => {
	return change( timestamp('deleted_at').nullable() )
		.whereTable('posts')
		.using(db);
}
```

You can also modify an exising column by setting it to `nullable`, setting a `default` value, etc.

> The `change` method, return a `ChangeColumn` instance.

## Columns

Here is a list of all the columns that can be added to a table:

Column          | Params                      | Type            | Unique Constraint Support
:---------------|:----------------------------|-----------------|:--------------------
`bigIncrements` | `name: string`              | `Column`        | &#9745;
`bigInteger`    | `name: string`              | `Column`        | &#9745;
`binary`        | `name: string`              | `Column`        | &#9745;
`blob`          | `name: string`              | `Column`        | &#9744;
`boolean`       | `name: string`              | `Column`        | &#9745;
`char`          | `name: string`              | `Column`        | &#9745;
`date`          | `name: string`              | `Column`        | &#9745;
`dateTime`      | `name: string`              | `Column`        | &#9745;
`decimal`       | `name: string`              | `Column`        | &#9745;
`foreign`       | `name: string`              | `ForeignColumn` | &#9744;
`id`            |                             | `Column`        | &#9745;
`integer`       | `name: string`              | `Column`        | &#9745;
`longText`      | `name: string`              | `Column`        | &#9744;
`real`          | `name: string`              | `Column`        | &#9745;
`smallInteger`  | `name: string`              | `Column`        | &#9745;
`softDeletes`   |                             | `Column`        | &#9745;
`string`        | `name: string`              | `Column`        | &#9745;
`text`          | `name: string`              | `Column`        | &#9744;
`time`          | `name: string`              | `Column`        | &#9745;
`timestamp`     | `name: string`              | `Column`        | &#9745;
`timestamps`    | `currentTimeStamp: boolean` | `object`        | &#9745;

### Column API

Here is a list of all the methods that can be used on a column:

 Method         | Params                | Description
:---------------|:----------------------|:-----------------------------
`after`         | `column: string`      | Add column after another column.
`length`        | `length: integer`     | Set column length.
`primary`       | `primary: boolean`    | Set column as primary key.
`autoIncrement` | `increment: boolean`  | Add auto increment attribute.
`nullable`      | `nullable: boolean`   | Mark column nullable.
`unique`        | `isUnique: boolean`   | Mark column unique.
`unsigned`      | `isUnsigned: boolean` | Mark column unsigned.
`default`       | `value: mixed`        | Set column default value.

### ForeignColumn API

Here is a list of all the methods that can be used on a foreign column:

 Method      | Params           | Description
:------------|:-----------------|:----------------------------------
`references` | `column: string` | Reference column of another table.
`on`         | `table: string`  | Reference table.
`onDelete`   | `rule: string`   | Add onDelete rule.
`onUpdate`   | `rule: string`   | Add onUpdate rule.

### ChangeColumn API

Here is a list of all the methods that can be used on a change column:

 Method         | Params                | Description
:---------------|:----------------------|:-----------------------------
`where`         | `table: string`       | Set table name.
`whereTable`    | `table: string`       | Set table name.
`using`         | `db: object`          | Add/change column and return db-migrate db instance.

## Helpers

Here is a list of all the helpers that can be used to create or modify columns or tables:

Method    | Params                            | Description
:---------|:----------------------------------|:-----------------------------
`add`     | `column: Column or ForeignColumn` | Add a new column to an existing table.
`change`  | `column: Column or ForeignColumn` | Change a column in an existing table.
`columns` | `columns: array`                  | A collection of columns.
`schema`  | `columns: array`                  | A collection of columns.

<br/>
