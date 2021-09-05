---
id: bookshelf
title: Bookshelf.js ORM
---

# Bookshelf.js ORM

Formidable uses [Bookshelf.js](http://bookshelfjs.org/) as its ORM.

Bookshelf is a JavaScript ORM for Node.js, built on the [Knex](http://knexjs.org/) SQL query builder. It features both Promise-based and traditional callback interfaces, transaction support, eager/nested-eager relation loading, polymorphic associations, and support for one-to-one, one-to-many, and many-to-many relations.

It is designed to work with PostgreSQL, MySQL, and SQLite3.

## Generating Model Classes

To create a Bookshelf model, you can run the following command:

```
craftsman make model Post
```

This will place a new `Post` model class in the `app/Models` directory.

To create a migration file for the `Post` model, run the following command:

```
craftsman make migration CreatePostTable --option=table:posts
```

> For more information visit [Bookshelf.js ORM](http://bookshelfjs.org/).
