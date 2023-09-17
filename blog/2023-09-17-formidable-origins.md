---
title: Something is brewing and it's Formidable
description: A quick introduction to the Formidable Framework.
slug: origins
authors:
  - name: Donald Pakkies
    title: Creator of the Formidable Framework
    url: https://x.com/donaldpakkies
    image_url: https://github.com/donaldp.png
tags: [hello, origins]
# image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: true
---

A quick deep dive into the Formidable Framework and what it can do for you.

<!--truncate-->

A few years ago I stumbled upon a full stack language called [Imba](https://imba.io). Getting my hands dirty with it was a breeze and I was very much pleased with what I could do with it, with little to no effort. Not knowing much about the language, I had to work on a project to teach myself the language. That project was [The Formidable Framework](https://formidablejs.org). Having built a framework in the past with PHP, it was a no brainer to build one with Imba. The Formidable Framework was born. It was meant to be a fun learning project, but it turned out to be much more than that. With a lot of hard work and dedication, the Formidable Framework has grown into a fully fledged framework that can be used to build any type of application and its no longer just a learning project for me.

While the framework was built with Imba, it is not limited to Imba. It can be used with any language that compiles to JavaScript, in fact, out of the box, it comes with support for a [TypeScript](https://typescriptlang.org) template and there are plans to add more templates in the future.

Now that you know a little bit about the Formidable Framework, let's take a look at what it can do for you.

## What can it do for you?

The Formidable Framework is a full stack framework that can be used to build any type of application. It comes with a lot of features out of the box, but it is also very extensible. You can add your own features to it and you can even replace the default features with your own. It is also very easy to use and it comes with a lot of documentation to help you get started. Some of the features that come out of the box are: [Authentication](/docs/authentication), [Task Scheduling](/docs/scheduling), [Database](/docs/database-getting-started) and more.

## How does it work?

The Formidable Framework is built on top of [Fastify](https://fastify.dev), a fast and low overhead web framework for Node.js. It uses [Imba](https://imba.io) and [TypeScript](https://typescriptlang.org). In addition to that, it also supports [React](https://react.dev), [Vue](https://vuejs.org) and [Svelte](https://svelte.dev) through [Inertia.js](https://inertiajs.com) giving you the ability to build single page applications with ease.

The Formidable Framework allows you to easily create routes that can then return a react component, a vue component or a svelte component:

```ts title="routes/web.ts"
import { Route } from '@formidablejs/framework'
import { Inertia } from '@formidablejs/inertia'

Route.get('/', () => {
	return Inertia.render('Home')
})
```

This means, we can build full stack application in a single codebase. But of course, you may not want to do that. You may want to build a backend API with the Formidable Framework and a frontend with something else. That's also possible. The Formidable Framework is very flexible and it allows you to do that.

For example, you can build a backend API with the Formidable Framework and a frontend with [React](https://reactjs.org) and [Next.js](https://nextjs.org) like so:

```ts title="routes/api.ts"
import { Route } from '@formidablejs/framework'
import { UserRepository } from '../app/Repositories/UserRepository'

Route.get('/users', () => {
	return UserRepository.get()
})
```

```tsx title="pages/users.tsx"
import axios from 'axios'

const Users = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		axios.get('/users').then((response) => {
			setUsers(response.data)
		})
	}, [])

	return (
		<div>
			{users.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}
		</div>
	)
}

export default Users
```

And thanks to features like CORS, you can ensure that your API requests are only coming from your frontend.

We can also add real-time capabilities to our application. Let's say, we want to notify our users through browser notifications when an action is completed:

<video src="/notification.MOV" controls="controls" style={{ maxWidth: '100%' }}>
</video>

We can also do other cool things, like live tracking a user's mouse location:

<video src="/live.MOV" controls="controls" style={{ maxWidth: '100%' }}>
</video>

And last but not least, we can do most things on the command line. For example, we can create a new database table with its corresponding repository, controller, and we can define its columns all from the command line:

```bash
node craftsman make:crud Person -r -t -s="first_name:text,last_name:text,email_address:text.nullable"
```

This command will add a controller, migration, 2 requests (one for creating, and one for updating), a seeder, a repository and a type.

![image](/img/make-crud.png)


Lets take a look at the migration:

```ts title="database/migrations/20230916181244_create_people_table.js"
const { Database } = require('@formidablejs/framework');

/** @param {Database} DB */
exports.up = (DB) => {
	return DB.schema.createTable('people', (table) => {
		table.bigIncrements().primary();
		table.text("first_name");
		table.text("last_name");
		table.text("email_address").nullable();
		table.timestamps(true, true);
	});
};

/** @param {Database} DB */
exports.down = (DB) => DB.schema.dropTable('people');
```

And the type:

```ts title="app/Database/Types/Person.ts"
type Person = {
	id: number
	first_name: string
	last_name: string
	email_address: string
	updated_at: string
	created_at: string
}
```

And finally, the controller:

```ts title="app/Http/Controllers/PersonController.ts"
import { Controller } from './Controller'
import { StorePersonRequest } from '../Requests/StorePersonRequest'
import { UpdatePersonRequest } from '../Requests/UpdatePersonRequest'
import { use } from '@formidablejs/framework'
import type { Response } from '@formidablejs/framework'

export class PersonController extends Controller {
    /**
     * Display a listing of the resource.
     */
    index(): Response {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    create(): Response {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    @use(StorePersonRequest)
    store(request: StorePersonRequest): Response {
        //
    }

    /**
     * Display the specified resource.
     */
    @use('param')
    show(id: number): Response {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    @use('param')
    edit(id: number): Response {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    @use('param', UpdatePersonRequest)
    update(id: number, request: UpdatePersonRequest): Response {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    @use('param')
    destroy(id: number): Response {
        //
    }
}
```

Here's a complete list of all the [commands](/docs/craftsman) that are available to you:

![image](/img/craftsman-commands.png)

Now, as you can see, the Formidable Framework takes care of a lot of things for you, so you can focus on building your application. One of the most important things I focused on was making sure that the DX is as good as it possibly can be. I wanted to make sure that the framework is easy to use and that it is easy to learn, and exciting.

I do hope that you will give the Formidable Framework a try and that you will enjoy using it as much as I enjoyed building it. If you have any questions, please feel free to reach out to me on [Twitter](https://twitter.com/donaldpakkies).

## What's next?

The Formidable Framework is still in its early stages, but I'm already using it in production at [LunaQL](https://lunaql.com). I am planning to make it more stable and add a few more features and templates in the near future.

If you ever find yourself in a situation where you need to build a full stack application, I hope you will consider using the Formidable Framework.
