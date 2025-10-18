---
id: serve
title: Serve Application
---

# Serve Application

### Development

Using the `craftsman` cli, you can serve your application using the `serve` command. By default, this command will start your application on port `3000`. You may pass the `--port` option to specify a different port:

```bash
node craftsman serve --port=8080
```

You can also use the `--host` option to specify the host address:

```bash
node craftsman serve --host=127.0.0.1
```

To listen for changes, you may use the `--dev` option:

```bash
node craftsman serve --dev
```

:::info

Run `node craftsman serve --help` to see all available options.

:::

### Production

For production, you may start your application using the command:

```bash
node server
```

:::tip

If you'd like to use [Bun](https://bun.sh/) in production, you can serve your application using `bun server`. But please keep in mind that Bun support for the Formidable Framework is still a WIP and should only be used only when necessary.

:::

To modify the `host` or `port`, you will need to edit the `start` method:

```typescript title="server" showLineNumbers
#!/usr/bin/env node

/**
 * This file is the entry point for the server. It is responsible for
 * starting the server and listening for requests.
 *
 * Avoid modifying this file unless you know what you are doing.
 */

const { Server } = require('@formidablejs/framework')

/**
 * The .start method will start the server and listen for requests.
 *
 * You can pass an object with the following properties:
 * - port: The port to listen on. Defaults to 3000.
 * - host: The host to listen on. Defaults to 'localhost'.
 * - _: A callback function that will be called when the server is ready.
 * 		This callback will receive an error object as the first argument
 * 		and the address as the second argument.
 *
 * @example
 * 		// Start the server on port 3000
 * 		.start({
 * 			port: 3000,
 * 			host: 'localhost',
 * 			_: (err, address) => {
 * 				if (err) {
 * 					console.error(err)
 * 					process.exit(1)
 * 				}
 * 				console.log(`Server listening on ${address}`)
 * 			}
 * 		})
 */

Server
	.use(require('./.formidable/build').default)
	.start()
```

## Cors

Formidable expects `APP_URL` and `CLIENT_URL` environment variables to be set. These variables are used to configure CORS. If you do not set these variables, your application will not be able to make requests to itself.

The `APP_URL` variable should be set to the URL of your application. The `CLIENT_URL` variable should be set to the URL of your client application. If you do not have a client application, you can set the `CLIENT_URL` variable to the same value as the `APP_URL` variable:

```bash title=".env"
APP_URL=http://127.0.0.1:3000
CLIENT_URL=http://127.0.0.1:3000
```

:::info

Should it happen that you set the port of your application to something other than `3000`, you should also update the `APP_URL` and `CLIENT_URL` variables to match the port of your application.

:::
