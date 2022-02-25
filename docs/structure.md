---
id: structure
title: Directory Structure
---

The default Formidable application structure is intended to provide a great starting point for both large and small applications. But you are free to organize your application however you like. Formidable imposes no restrictions on where any given class is located.

## Overview

```text
.
├── .formidable
└── app
    └── Http
        ├── Controllers
        ├── Middleware
        └── Requests
    ├── Models
    └── Resolvers
└── bootstrap
    ├── cache
├── config
└── database
    └── migrations
├── public
└── resources
    └── lang
├── routes
├── storage
	├── framework
	└── session
└── test

```

## The Root Directory

#### .formidable

Contains a compiled version of the application.

#### app

Contains the core code of your application.

#### app/Http/Controllers

Contains applicaiton controllers.

#### app/Http/Middleware

Contains request middlewares.

#### app/Http/Requests

Contains form requests.

#### app/Http/Models

Houses `bookshelf` models.

#### app/Http/Resolvers

Contains application service resolvers.

#### bootstrap/cache

Contains the cached config file and database settings file.

#### config

Contains application configuration files.

#### database/migrations

Houses your application migration files.

#### public

Houses your assets such as images, JavaScript, and CSS.

#### resources/lang

Contains language files.

#### routes

Contains application routes.

#### storage/framework

Contains core application data.

#### storage/session

Contains application sessions.
