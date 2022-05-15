---
id: structure
title: Directory Structure
---

The default Formidable application structure is intended to provide a great starting point for both large and small applications. But you are free to organize your application however you like. Formidable imposes no restrictions on where any given class is located.

## Overview

```text
.
├── app
    ├── Http
        ├── Controllers
        ├── Middleware
        └── Requests
    └── Resolvers
├── bootstrap
    └── cache
├── config
└── database
    ├── migrations
    └── seeds
├── public
├── resources
    ├── lang
    └── views
├── routes
├── storage
	├── framework
	└── session
└── test

```

## The Root Directory

#### app

Contains the core code of your application.

#### app/Http/Controllers

Contains applicaiton [controllers](/docs/controllers).

#### app/Http/Middleware

Contains request [middlewares](/docs/middleware).

#### app/Http/Requests

Contains [requests](/docs/requests) classes.

#### app/Http/Resolvers

Contains application service resolvers.

#### bootstrap/cache

Contains the cached config file and database settings file.

#### config

Contains application configuration files.

#### database/migrations

Houses your application [migration](/docs/database-migrations) files.

#### database/seeds

Houses your application [seeders](/docs/database-seeding).

#### public

Houses your assets such as images, JavaScript, and CSS.

#### resources/lang

Contains [language](/docs/localization) files.

#### resources/lang

Houses your [Formidable View](/docs/views) classes.

#### routes

Contains application routes.

#### storage/framework

Contains core application data.

#### storage/session

Contains application sessions.
