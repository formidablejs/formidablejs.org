---
id: first-steps
title: First steps
---

# First steps
Lets take a look at how Formidable works.

## Language {#language}
Formidable uses Imba as the Programming Language of choice.

You can learn Imba here: [https://imba.io/](https://imba.io/)

## Prerequisites {#prerequisites}
Please make sure that [Node.js](https://nodejs.org/) (>= 14.*) is installed on your operating system.

## Tooling

For a better development experience, we recommend using the following tools:

1. [VS Code](https://code.visualstudio.com/) - A free and open source code editor for Windows, Mac, and Linux.
2. [Imba Extension](https://marketplace.visualstudio.com/items?itemName=scrimba.vsimba) - VS Code Language support for Imba.
3. [Imba Shell](https://github.com/donaldp/imba-shell) - Interactive debugger, REPL and runtime for Imba, inspired by PsySH.


## Setup {#setup}
To create a new Application, run the following commands in your terminal:

```
npm i -g @formidablejs/craftsman
craftsman new project-name
```

Once created, the application directory structure will look like this:

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

In the `bootstrap` directory, there's a `app.imba` file, which is responsible for creating a new instance of the application:

```py title="bootstrap/app.imba"
import { Application } from '@formidablejs/framework'
import path from 'path'

export const app = new Application path.resolve './'
```

There's also a `main.imba` file, this file is responsible for bootstraping your application and getting it ready.

```py title="bootstrap/main.imba"
import { app } from './app'
import { ConfigRepository } from '@formidablejs/framework'
import { ExceptionHandler } from '@formidablejs/framework'
import { Kernel as HttpKernel } from '@formidablejs/framework'
import { Language } from '@formidablejs/framework'
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

```py title="server.imba"
import { Kernel } from '@formidablejs/framework'
import app from './bootstrap/app'

app.initiate(app.make(Kernel))
```

There's also a `server.app.imba` file, which is responsible for making the Application's core available to the CLI, this file is also used by `Jest` for testing purposes.

```py title="server.app.imba"
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
| `/.formidable`           | Contains a compiled version of the application.
| `/app`                   | Contains the core code of your application.
| `/app/Http/Controllers`  | Contains applicaiton controllers.
| `/app/Http/Middleware`   | Contains request middlewares.
| `/app/Http/Requests`     | Contains form requests.
| `/app/Http/Models`       | Houses `bookshelf` models.
| `/app/Http/Resolvers`    | Contains application service resolvers.
| `/bootstrap/cache`       | Contains the cached config file and database settings file.
| `/config`                | Contains application configuration files.
| `/database/migrations`   | Houses your application `db-migrate` migration files.
| `/public`                | Houses your assets such as images, JavaScript, and CSS.
| `/resources/lang`        | Contains language files.
| `/routes`                | Contains application routes.
| `/storage/framework`     | Contains core application data.
| `/storage/session`       | Contains application sessions.

## Running the application {#running-the-application}
Now that we've got that out of the way, we can start our application:

```
craftsman serve --dev
```

This command starts the app on port `3000` or the specified port.
Once the application is running, you can visit the application by navigating to `http://localhost:3000/`.

To change the default port, you can use the `--port` option:

```bash
craftsman serve --dev --port 3001
```

## API Testing {#api-testing}

Before you can start testing, you need to make a test compatible build of your app. To do this, simply run the following command:

```
craftsman build --env testing
```

> Note, you may need to create a `.env.testing` file in your project root directory if you would like to use a different database for testing.

Should you want to make a test build each time you make changes to your application, use:

```
craftsman serve --dev --env testing
```

This will update the `.formidable` application which is loaded by the `test/app.e2e.test.js` file.

Out of the box, the `test/app.e2e.test.js` file has the following tests:

```js title=test/app.e2e.test.js
const { Application, request } = require('../.formidable/server.app');
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
