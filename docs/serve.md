---
id: serve
title: Serve Application
---

# Serve Application

Using the `craftsman` cli, you can serve your application using the `serve` command. By default, this command will start your application on port `3000`. You may pass the `--port` option to specify a different port:

```bash
node craftsman serve --port=8080
```

You can also use the `--host` option to specify the host address:

```bash
node craftsman serve --host=127.0.0.1
```

And to run your application in development mode, you can use the `--dev` option:

```bash
node craftsman serve --dev
```

:::info

Run `node craftsman serve --help` to see all available options.

:::

## Cors

Formidable expects `APP_URL` and `CLIENT_URL` environment variables to be set. These variables are used to configure CORS. If you do not set these variables, your application will not be able to make requests to itself.

The `APP_URL` variable should be set to the URL of your application. The `CLIENT_URL` variable should be set to the URL of your client application. If you do not have a client application, you can set the `CLIENT_URL` variable to the same value as the `APP_URL` variable:

```bash title=".env"
APP_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

:::info

Should it happen that you set the port of your application to something other than `3000`, you should also update the `APP_URL` and `CLIENT_URL` variables to match the port of your application.

:::
