---
id: migrations
title: Migrations
---

# Migrations

Formidable migrations are powered by [DB-Migrate](https://github.com/db-migrate).

Migrations are like version control for your database, allowing your team to define and share the application's database schema definition. If you have ever had to tell a teammate to manually add a column to their local database schema after pulling in your changes from source control, you've faced the problem that database migrations solve.

## Generating Migrations

You may use the `make:migration` Craftsman command to generate a database migration. The new migration will be placed in your `database/migrations` directory. Each migration filename contains a timestamp that allows Formidable to determine the order of the migrations:

```
node craftsman make:migration CreatePostsTable --table=posts
```

## Migration Structure

A migration file contains two methods: `up` and `down`. The `up` method is used to add new tables, columns, or indexes to your database, while the `down` method should reverse the operations performed by the up method.

### Running Migrations

To run all of your outstanding migrations, execute the `migrate:up` Craftsman command:

```
node craftsman migrate:up
```

#### Rolling Back Migrations

To roll back all of your migrations, execute the `migrate:down` Craftsman command:

```
node craftsman migrate:down
```

##### Rolling Back a Single Migration

To roll back a specific migration, execute the `migrate:down` Craftsman command with the `-m` option:

```
node craftsman migrate:down -m 20210402215000-create_posts_table
```

## Columns

### Creating Columns

To add a new column to a table, you can use the 
