---
id: configuration
title: Configuration
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

All of the configuration files for the Formidable framework are stored in the `config` directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

These configuration files allow you to configure things like your database connection information, your mail server information, as well as various other core configuration values such as your application locale and encryption key.

## Environment Configuration

It is often helpful to have different configuration values based on the environment where the application is running. For example, you may wish to use a different cache driver locally than you do on your production server.

Formidable's default `.env` file contains some common configuration values that may differ based on whether your application is running locally or on a production web server. These values are then retrieved from various Formidable configuration files within the config directory using Formidable's `env` function.

#### Environment File Security

Your `.env` file should not be committed to your application's source control, since each developer / server using your application could require a different environment configuration. Furthermore, this would be a security risk in the event an intruder gains access to your source control repository, since any sensitive credentials would get exposed.

#### Additional Environment Files

Before loading your application's environment variables, Formidable determines if the `--env` CLI argument has been specified. If so, Formidable will attempt to load an `.env.[APP_ENV]` file if it exists. If it does not exist, the default `.env` file will be loaded.

### Environment Variable Types

Formidable will automatically use the assumed types when reading any of the variables from the `.env` files. For example, `APP_DEBUG=true` will return a `boolean` value of `TRUE` and `APP_NAME=Formidable` will return a `string` value of `"FORMIDABLE"`.

If you need to define an environment variable with a value that contains spaces, you may do so by enclosing the value in double quotes:

```env title=".env"
APP_NAME="My Application"
```

## Retrieving Environment Configuration

All of the variables listed in this file will be loaded into the `process.env` object when your application does an initial boot. However, you may use the `env` helper to retrieve values from these variables in your configuration files:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/app.imba"
import { env } from '@formidablejs/framework/lib/Support/Helpers'

export {
    ...
    debug: env('APP_DEBUG', false)
    ...
```

</TabItem>
<TabItem value="ts">

```ts title="config/app.ts"
import { env } from '@formidablejs/framework/lib/Support/Helpers'

export {
    ...
    debug: env('APP_DEBUG', false),
    ...
```

</TabItem>
</Tabs>

The second value passed to the `env` function is the "default value". This value will be returned if no environment variable exists for the given key.

## Accessing Configuration Values

You may easily access your configuration values using the global `config` helper function from anywhere in your application. The configuration values may be accessed using "dot" syntax, which includes the name of the file and option you wish to access. A default value may also be specified and will be returned if the configuration option does not exist:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { config } from '@formidablejs/framework/lib/Support/Helpers'

let value\string = config('app.name')

# Retrieve a default value if the configuration value does not exist...
let value\string = config('app.name', 'Formidable')
```

</TabItem>
<TabItem value="ts">

```ts
import { config } from '@formidablejs/framework/lib/Support/Helpers'

let value: string = config('app.name')

// Retrieve a default value if the configuration value does not exist...
let value: string = config('app.name', 'Formidable')
```

</TabItem>
</Tabs>

## Configuration Caching

When making changes to your `.env` file or any of your `config` files, you should cache the changes using `node craftsman config:cache`. Formidable loads its configuration from this cached config file instead of your `.env` or config files.

## Debug Mode

The debug option in your `config/app.imba` configuration file or `config/app.ts` configuration file determines how much information about an error is actually displayed to the user. By default, this option is set to respect the value of the APP_DEBUG environment variable, which is stored in your `.env` file.

For local development, you should set the `APP_DEBUG` environment variable to `true`. In your production environment, this value should always be `false`.

:::danger

If the `APP_DEBUG` variable is set to `true` in production, you risk exposing sensitive configuration values to your application's end users.

:::

## Maintenance Mode

When your application is in maintenance mode, a custom view will be displayed for all requests into your application. This makes it easy to "disable" your application while it is updating or when you are performing maintenance. A maintenance mode check is included in the default middleware stack for your application. If the application is in maintenance mode, `HttpException` instance will be thrown with a status code of 503.

To enable maintenance mode, execute the `down` Craftsman command:

```bash
node craftsman down
```

#### Bypassing Maintenance Mode

Even while in maintenance mode, you may use the `secret` option to specify a maintenance mode bypass secret:

```bash
node craftsman down --secret="a-private-secret"
```

After placing the application in maintenance mode, you may navigate to the application URL matching this secret and Formidable will issue a maintenance mode bypass cookie to your browser:

```curl
https://example.com/a-private-secret
```

When accessing this hidden route, you will then be redirected to the / route of the application. Once the cookie has been issued to your browser, you will be able to browse the application normally as if it was not in maintenance mode.

#### Disabling Maintenance Mode

To disable maintenance mode, use the `up` command:

```bash
node craftsman up
```
