---
id: structure
title: Directory Structure
---

The default Formidable application structure is intended to provide a great starting point for both large and small applications. But you are free to organize your application however you like. Formidable imposes no restrictions on where any given class is located.

## Overview

```text showLineNumbers
.
├── app
    ├── Console
        └── Commands
    ├── Exceptions
    ├── Http
        ├── Controllers
        ├── Middleware
        └── Requests
    ├── Interfaces
    ├── Mail
    ├── Resolvers
    └── Types
├── bootstrap
    └── cache
├── config
├── database
    ├── migrations
    └── seeds
├── public
├── resources
    ├── lang
    └── views
├── routes
├── storage
	├── framework
	├── logs
	└── session
└── test

```

## The Root Directory

#### app

Contains the core code of your application.

#### app/Console/Commands

Houses application [commands](/docs/craftsman#generating-commands).

#### app/Exceptions

Houses application exceptions.

#### app/Http/Controllers

Contains applicaiton [controllers](/docs/controllers).

#### app/Http/Middleware

Contains request [middlewares](/docs/middleware).

#### app/Http/Requests

Contains [requests](/docs/requests) classes.

#### app/Interfaces

Houses application interfaces.

#### app/Mail

Contains application [mailers](/docs/mail).

#### app/Resolvers

Contains application service resolvers.

#### app/Types

Houses application types.


#### bootstrap/cache

Contains the cached config file and database settings file.

#### config

Contains application configuration files.

#### database/seeders

Houses your application [factories](/docs/database-factories).

#### database/migrations

Houses your application [migration](/docs/database-migrations) files.

#### database/seeders

Houses your application [seeders](/docs/database-seeding).

#### public

Houses your assets such as images, JavaScript, and CSS.

#### resources/lang

Contains [language](/docs/localization) files.

#### resources/views

Houses your [Formidable View](/docs/views) classes.

#### routes

Contains application routes.

#### storage/framework

Contains core application data.

#### storage/logs

Contains application logs.

#### storage/session

Contains application sessions.

## Domain Driven Design

Should you feel that you need more control over the structure of your application, you may go the Domain Driven Design route. When using Domain Driven Design, you can use the `--domain` flag for the supported make commands:

```bash
node craftsman make:type Customer --domain=Customers
```

This command, will create a `Customer` type and put it under the `app/Domain/Customers/Types` directory. You can also add more classes, and files under a specific domain.

#### Supported Commands

Below, is a list of all the make commands that support the `--domain` flag.

Command            | Description
-------------------|---------------------------------
 `make:command`    | Create a new command class
 `make:controller` | Create a new controller class
 `make:crud`       | Create a new crud
 `make:exception`  | Create a new exception class
 `make:interface`  | Create a new interface
 `make:mail`       | Create a new email class
 `make:middleware` | Create a new middleware class
 `make:repository` | Create a new repository class
 `make:request`    | Create a new form request class
 `make:resolver`   | Create a new resolver class
 `make:type`       | Create a new resolver class

:::info

You can re-arrange your make generated files for make commands that don't support the `--domain` flag.

:::
