---
id: packages
title: Package Development
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Package Development

Formidable provides an easy way of letting developers extend the framework. This is a great way of building in features that aren't bundled with the framework. For example, the [Pretty Errors](https://github.com/formidablejs/pretty-errors) package adds a new view that gets displayed when there's an error. This view only gets triggered if the application is in `debug` mode.

## Package Registration

### Service Resolver

We can create a service resolver in our package that adds a route that returns a random quote:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="src/QuotesServiceResolver.imba"
import { Route } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class QuotesServiceResolver < ServiceResolver

	def boot
		Route.get 'quote', do
			const key = Math.floor(Math.random! * (2 - 1 + 1))

			self.quotes[key] ?? 'Could not find a quote'

	get quotes
		[
			'Computers are good at following instructions, but not at reading your mind.'
			'UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.'
		]
```

</TabItem>
<TabItem value="ts">

```ts title="src/QuotesServiceResolver.ts"
import { Route } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class QuotesServiceResolver extends ServiceResolver {
	boot(): void {
		Route.get('quote', () => {
			const key = Math.floor(Math.random() * (2 - 1 + 1))

			this.quotes[key] ?? 'Could not find a quote'
		})
	}

	get quotes(): Array<string> {
		return [
			'Computers are good at following instructions, but not at reading your mind.'
			'UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.'
		]
	}
```

</TabItem>
</Tabs>

We can then register the resolver in a formidable application in the `config/app.imba` or `config/app.ts` config file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/app.imba" {1,8}
import { QuotesServiceResolver } from '<custom-package>'
...

export default {
	...
	resolvers: {
		...
		QuotesServiceResolver
```

</TabItem>
<TabItem value="ts">

```ts title="config/app.ts" {1,8}
import { QuotesServiceResolver } from '<custom-package>'
...

export default {
	...
	resolvers: {
		...
		QuotesServiceResolver,
```

</TabItem>
</Tabs>

Once the resolver has been registered, you can access `/quote` in the browser, and you will see any of the 2 quotes you added above.

### Publisher

Before a package can be used by Formidable, it needs to be registered. This means a package can be easily turned off and removed from the application boot cycle.

You can ship framework files such as a `config` file, along with your package. This can be done by including a `Package.js` file in your package:

```js title="formidable/Package.js" {2,4}
exports.Package = class Package {
	publish(language = 'imba') {
		const ext = language.toLowerCase() == 'imba'
			? 'imba' : (
				language.toLowerCase() == 'typescript' ? 'ts' : 'imba'
			)

		const configKey = `config/bugsnag.${ext}`;
		const configValue = `./formidable/config/bugsnag.${ext}`;

		return {
			config: {
				paths: {
					[configKey]: configValue
				}
			}
		}
	}
}
```

For formidable to be aware of the `Package.js` file, you must include it in the `package.json` npm file with the key `publisher`:

```json title="package.json" {4}
{
	"name": "my-package",
	"version": "1.0.0",
	"publisher": "formidable/Package.js",
	...
```

The `Package.js` file contains a `publish` function which should always return an object. In this object, you can specify the files that must be copied from the package to the framework.

e.g. The package above will copy the `formidable/config/bugsnag.imba` or `formidable/config/bugsnag.ts` file from the package to `config` folder in a formidable application when running the `package:publish` [Craftsman](docs/craftsman) command:

```
node craftsman package:publish --package=<package-name> --tag=config
```

 flag        | description
:-----------:|:---------------------------------------
 `--package` | npm package that should be published.
 `--tag`    | tags that should be published - paths returned by the `publish` function

## Server

### Hooks

Formidable supports [Fastify](https://www.fastify.io/docs/latest/Reference/Hooks/) hooks, in the example below, we will look at how you can register a hook in your service resolver:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { ServiceResolver } from '@formidablejs/framework'
import { FastifyRequest } from '@formidablejs/framework'

export class HttpLoggerServiceResolver < ServiceResolver

	def boot
		self.app.addHook 'onRequest', do(request\FastifyRequest)
			console.log "{request.method}: {request.url}"
```

</TabItem>
<TabItem value="ts">

```ts
import { ServiceResolver } from '@formidablejs/framework'
import { FastifyRequest } from '@formidablejs/framework'

export class HttpLoggerServiceResolver extends ServiceResolver {
	boot(): void {
		this.app.addHook('onRequest', (request: FastifyRequest) => {
			console.log("{request.method}: {request.url}")
		})
	}
```

</TabItem>
</Tabs>

This hook logs all requests made to our application.

For a list of fastify hooks you can use: visit [Fastify Hooks](https://www.fastify.io/docs/latest/Reference/Hooks/).

### Plugins

We can also register [Fastify](https://www.fastify.io) plugins:

Install `under-pressure`:

```bash
npm i under-pressure --save
```

Update your Service Resolver:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { ServiceResolver } from '@formidablejs/framework'

export class UnderPresureServiceResolver < ServiceResolver

	get config
		{
			maxEventLoopDelay: 1000
			maxHeapUsedBytes: 100000000
			maxRssBytes: 100000000
			maxEventLoopUtilization: 0.98
		}

	def boot
		self.app.register require('under-pressure'), self.config
```

</TabItem>
<TabItem value="ts">

```ts
import { ServiceResolver } from '@formidablejs/framework'

export class UnderPresureServiceResolver extends ServiceResolver {
	get config(): object {
		return {
			maxEventLoopDelay: 1000,
			maxHeapUsedBytes: 100000000,
			maxRssBytes: 100000000,
			maxEventLoopUtilization: 0.98
		}
	}

	boot(): void {
		this.app.register(require('under-pressure'), this.config)
	}
}
```

</TabItem>
</Tabs>

If you want to tinker with the updated [Fastify](https://www.fastify.io) server instance:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { ServiceResolver } from '@formidablejs/framework'
import { FastifyInstance } from '@formidablejs/framework'

export class UnderPresureServiceResolver < ServiceResolver

	get config
		{
			maxEventLoopDelay: 1000
			maxHeapUsedBytes: 100000000
			maxRssBytes: 100000000
			maxEventLoopUtilization: 0.98
		}

	def boot
		self.app.register require('under-pressure'), self.config, do(error, instance\FastifyInstance)
			if error then throw error

			# do something with the instance
```

</TabItem>
<TabItem value="ts">

```ts
import { ServiceResolver } from '@formidablejs/framework'
import { FastifyInstance } from '@formidablejs/framework'

export class UnderPresureServiceResolver extends ServiceResolver {
	get config(): object {
		return {
			maxEventLoopDelay: 1000,
			maxHeapUsedBytes: 100000000,
			maxRssBytes: 100000000,
			maxEventLoopUtilization: 0.98
		}
	}

	boot(): void {
		this.app.register(require('under-pressure'), this.config, (error, instance: FastifyInstance) => {
			if (error) {
				throw error
			}

			// do something with the instance
		}
	}
}
```

</TabItem>
</Tabs>

For a list of fastify plugins you can use: visit [Fastify Ecosystem](https://www.fastify.io/docs/latest/Guides/Ecosystem).

### Routes

To register a new route, just use the `Route` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { ServiceResolver } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'
import { Dashboard } from '../views/Dashboard'

export class DashboardServiceResolver < ServiceResolver

	def boot
		Route.get 'dashboard', do view(Dashboard)
```

</TabItem>
<TabItem value="ts">

```ts
import { ServiceResolver } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'
import { Dashboard } from '../views/Dashboard'

export class DashboardServiceResolver extends ServiceResolver {
	boot(): void {
		Route.get('dashboard', () => view(Dashboard))
	}
}
```

</TabItem>
</Tabs>

In the example above, the Service Resolver adds a new dashboard `GET` route.

> See [Routing](/docs/routing) for more information.

## Commands

You can register a package command using the `registerCommand` app function:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { ServiceResolver } from '@formidablejs/framework'
import { MakeRoleCommand } from '../commands/MakeRoleCommand'

export class DashboardServiceResolver < ServiceResolver

	def boot
		self.app.registerCommand MakeRoleCommand
```

</TabItem>
<TabItem value="ts">

```ts
import { ServiceResolver } from '@formidablejs/framework'
import { MakeRoleCommand } from '../commands/MakeRoleCommand'

export class DashboardServiceResolver extends ServiceResolver {
	boot(): void {
		this.app.registerCommand(MakeRoleCommand)
	}
}
```

</TabItem>
</Tabs>

> See [Commands](/docs/craftsman#writing-commands) for more information.
