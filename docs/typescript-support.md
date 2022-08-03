---
id: typescript-support
title: TypeScript Support
---

The Formidable Installer allowes you to scaffold your application with TypeScript. This means you can use TypeScript to write your controllers, resolvers, and more.

In this section, we will cover the basics and differences between a Formidable TypeScript Application and a Formidable Imba Application.

## Installation

You may create a Formidable TypeScript project by passing the `--ts` flag in the Formidable Installer:

```bash
formidable new example-app --ts
```

## @use Decorator

Formidable allows you to use the `@use` decorator to modify the behavior of any function within your application:

```py
import { Controller } from './Controller'
import { @use } from '@formidablejs/framework'

export class UserController < Controller
    @use('table:users')
    def show user
        await user || notFound 'User not found.'
```

The snippet above will query the database to look for a user under the `users` table with the first param using the `id` column.

If we wanted to do the same thing in a TypeScript application, we would have to import the `use` decorator from the `@formidablejs/ts-ports` package instead:

```ts
import { Controller } from './Controller';
import { use } from '@formidablejs/ts-ports';

export class UserController extends Controller {
    @use('table:users')
    public async show(user: Promise<User | null>) : Promise<User | void> {
        return (await user) || this.notFound('User not found');
    }
}
```

## Views

Formidable views are a simple way to render HTML templates. By default, Formidable uses Imba as the default language of choice for building views, this means even if you're building your application in TypeScript, you will still use Imba for your Views.
