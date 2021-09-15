---
id: first-steps
title: First steps
---

# First steps
Lets take a look at how Formidable works.

## Language {#language}
Formidable uses Imba as the choice of Programming Language, but also allows developers to use JavaScript and TypeScript.

You can learn Imba here: [https://imba.io/](https://imba.io/)

## Prerequisites {#prerequisites}
Please make sure that [Node.js](https://nodejs.org/) (>= 14.*) is installed on your operating system.

## Setup {#setup}
To create a new Application, run the following commands in your terminal:

```
$ npm i -g @formidablejs/craftsman
$ craftsman new project-name
```

Once created, the application directory structure will look like this:

```text
.
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
└── test

```

In the `bootstrap` directory, there's a `app.imba` file, which is responsible for creating a new instance of the application:

```py
import { Application } from '@formidablejs/framework'
import path from 'path'

export const app = new Application path.resolve './'
```

There's also a `main.imba` file, this file is responsible for bootstraping your application and getting it ready.

```py
import { app } from './app'

import {
	ConfigRepository
	ExceptionHandler
	Kernel as HttpKernel
	Language
} from '@formidablejs/framework'

import { Config } from '../config/index'
import { Handler } from '../app/Exceptions/Handler'
import { Kernel } from '../app/Http/Kernel'

app
	.bind(HttpKernel, Kernel)
	.bind(ConfigRepository, Config)
	.bind(Language, Language)
	.bind(ExceptionHandler, Handler)

export default app.prepare!
```
In the root of your project, there's also `server.imba` file, which is responsible for starting your application.

```py
import { Kernel } from '@formidablejs/framework'
import app from './bootstrap/app'

app.initiate(app.make(Kernel))
```

There's also a `server.app.imba` file, which is responsible for making the Application's core available to the CLI, this file is also used by `Jest` for testing purposes.

```py
import { Kernel } from '@formidablejs/framework'
import app from './bootstrap/app'
import request from 'supertest'

# --------------------------------------------------------------------------
# Module Exports for Tests
# --------------------------------------------------------------------------
#
# This is where you can export modules that you want to test.
# By default, the server is exported as application, making it easy to run
# end-2-end tests.
#
# To get started, simply import any module, and export it below.

exports.Application = app.initiate(app.make(Kernel), true)
exports.request = request
```

The `server.imba` and `server.app.imba` files will initiate the application with the `Kernel` module, which loads Fastify.

| Directory                | Description
|:-------------------------|:-------------
| `/app`                   | Contains the core code of your application.
| `/app/Http/Controllers`  | Contains applicaiton controllers.
| `/app/Http/Middleware`   | Contains request middlewares.
| `/app/Http/Requests`     | Contains form requests.
| `/app/Http/Models`       | Houses `bookshelf` models.
| `/app/Http/Resolvers`    | Contains application service resolvers.
| `/bootstrap/cache`       | Contains the cached config file and database settings file.
| `/config`                | Contains application configuration files.
| `/database/migrations`   | Houses your application `db-migrate` migration files.
| `/dist`                  | Contains a compiled version of the application.
| `/public`                | Houses your assets such as images, JavaScript, and CSS.
| `/resources/lang`        | Contains language files.
| `/routes`                | Contains application routes.

## Running the application {#running-the-application}
Now that we've got that out of the way, we can start our application:

```
$ craftsman serve --dev
```

This command starts the app on port `3000` or the specified port.
Once the application is running, you can visit the application by navigating to `http://localhost:3000/`.

To change the default port, you can use the `--port` option:

```bash
$ craftsman serve --dev --port 3001
```

## API Testing {#api-testing}

Before you can start testing, you need to make a test compatible build of your app. To do this, simply run the following command:

```
$ craftsman build --env testing
```

> Note, you may need to create a `.env.testing` file in your project root directory if you would like to use a different database for testing.

Should you want to make a test build each time you make changes to your application, use:

```
$ craftsman serve --dev --env testing
```

This will update the `dist` application which is loaded by the `test/app.e2e.test.js` file.

Out of the box, the `test/app.e2e.test.js` file has the following tests:

```js
const { Application, request } = require('../dist/server.app');
const { helpers: { config } } = require('@formidablejs/framework');

/**
 * Skip if not in testing environment
 */
const maybe = config('app.env') === 'testing'
	? describe
	: describe.skip

maybe('Application (e2e)', () => {
	let app;

	beforeAll(async () => {
		await Application.then((formidable) => {
			(app = formidable.fastify()).ready();
		});
	});

	afterAll(async () => await app.close());

	it('/ (GET: Hello World)', () => {
		return request(app.server)
			.get('/')
			.set('Accept-Language', 'en')
			.expect(200)
			.expect('Hello World');
	});

	it('/ (GET: Hola Mundo)', () => {
		return request(app.server)
			.get('/')
			.set('Accept-Language', 'es')
			.expect(200)
			.expect('Hola Mundo');
	});
})

```

And that's all! 🎊
