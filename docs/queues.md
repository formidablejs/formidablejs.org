---
id: queues
title: Queues
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Queues

Sometimes when building your application, you may have to write features that are time intensive. In most cases, these features are not ideal to be ran during a web request as you don't want to keep the user waiting. Thankfully, Formidable allows you to easily create queued jobs that may be processed in the background. This will improve the speed of your application.

## Getting Started

Formidable Queues don't come pre-configured with Formidable applications. But we can easily set them up.

### Prerequisites

* [Redis](https://redis.io/)
* [PM2](https://pm2.keymetrics.io/)

### Installation

To get started, install the `@formidablejs/queues` package:

<Tabs
    defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'NPM', value: 'npm'},
        {label: 'Yarn', value: 'yarn'},
    ]}>
<TabItem value="npm">

```bash
npm i @formidablejs/queues
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add @formidablejs/queues
```

</TabItem>
</Tabs>

### Publish

Once installed, we can publish the `config` file:

```bash
node craftsman package:publish --package=@formidablejs/queues --tag=config
```

This will add a `config/queue.ts` or `config/quueue.imba` file.

Next, you will need to register the queue config file in the `config/index.ts` or `config/index.imba` file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/index.imba" {2,13}
...
import queue from './queue'
...
export class Config < ConfigRepository

	# All of the configuration items.
	#
	# @type {object}

	get registered
		return {
			...
			queue
			...
		}
```

</TabItem>
<TabItem value="ts">

```ts title="config/index.ts" {2,13}
...
import queue from './queue'
...
export class Config extends ConfigRepository
{
	/**
	 * All of the configuration items.
	 */
	get registered(): object
	{
		return {
			...
			queue,
			...
		}
	}
}
```

</TabItem>
</Tabs>

### Database Consideration

Now that we have a queue config file. We need to add a redis database in the `config/database.ts` or `config/database.imba` config file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/database.imba" {7-13}
export default {
	...

	redis: {
		...

		queue: {
			url: helpers.env('REDIS_URL')
			host: helpers.env('REDIS_HOST', '127.0.0.1')
			password: helpers.env('REDIS_PASSWORD', null)
			port: helpers.env('REDIS_PORT', '6379')
			database: helpers.env('REDIS_CACHE_DB', '2')
		}
	}
}
```

</TabItem>
<TabItem value="ts">

```ts title="config/database.ts" {7-13}
export default {
	...

	redis: {
		...

		queue: {
			url: helpers.env('REDIS_URL'),
			host: helpers.env('REDIS_HOST', '127.0.0.1'),
			password: helpers.env('REDIS_PASSWORD', null),
			port: helpers.env('REDIS_PORT', '6379'),
			database: helpers.env('REDIS_CACHE_DB', '2')
		}
	}
}
```

</TabItem>
</Tabs>

### Enabling Service Resolver

And finally, we can start using queues by enabling the `QueueServiceResolver`.

Import the `QueueServiceResolver` from `@formidablejs/queues` in the `config/app.ts` or `config/app.imba` config file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/app.imba" {1}
import { QueueServiceResolver } from '@formidablejs/queues'
...
```

</TabItem>
<TabItem value="ts">

```ts title="config/app.ts" {1}
import { QueueServiceResolver } from '@formidablejs/queues'
...
```

</TabItem>
</Tabs>

Add the `QueueServiceResolver` to `resolvers` after the `RedisServiceResolver` in the `config/app.ts` or `config/app.imba` config file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/app.imba" {7}
export default {
	...

	resolvers: {
		...
		RedisServiceResolver
		QueueServiceResolver
		...
	}
}
```

</TabItem>
<TabItem value="ts">

```ts title="config/app.ts" {7}
export default {
	...

	resolvers: {
		...
		RedisServiceResolver,
		QueueServiceResolver,
		...
	}
}
```

</TabItem>
</Tabs>

### Caching Changes

When done setting up, you can cache the changes:

```bash
node craftsman config:cache
```

## Creating Jobs

### Generating Job Classes

By default, all of the queueable jobs for your application are stored in the `app/Jobs` directory. If the `app/Jobs` directory doesn't exist, it will be created when you run the make:job Craftsman command:

```bash
node craftsman make:job ProcessAudio
```

The generated class will extend the `Queueable` class from the `@formidablejs/queues` package.

### Class Structure

Job classes are very simple, normally containing only a `handle` method that is invoked when the job is processed by the queue. To get started, let's take a look at an example job class. In this example, we'll pretend we manage a audio publishing service and need to process the uploaded audio files before they are published:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Jobs/ProcessAudio.imba" {6}
import { Queueable } from '@formidablejs/queues'

export class ProcessAudio < Queueable

	# Handle job.
	def handle\any audioId\number
		console.log('Process uploaded audio...')

```

</TabItem>
<TabItem value="ts">

```ts title="app/Jobs/ProcessAudio.ts" {7}
import { Queueable } from '@formidablejs/queues'

export class ProcessAudio extends Queueable {
    /**
     * Handle job.
     */
    handle(audioId: number): any {
        console.log('Process uploaded audio...')
    }
}
```

</TabItem>
</Tabs>

## Registering Jobs

Once you have created your first job, you will need to register it for the framework to know which job to run when the queue is running.

To register a job, simply import it in the `Kernel.ts` or `Kernel.imba` file under the `app/Console` directory and add it in the `jobs` getter:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Console/Kernel.imba" {1-2,6-9}
import { Queueable } from '@formidablejs/queues'
import { ProcessAudio } from '../Jobs/ProcessAudio'
...
export class Kernel < ConsoleKernel
	...
	get jobs\Array<typeof Queueable>
		[
			ProcessAudio
		]
	...
```

</TabItem>
<TabItem value="ts">

```ts title="app/Console/Kernel.ts" {1-2,6-10}
import { Queueable } from '@formidablejs/queues'
import { ProcessAudio } from '../Jobs/ProcessAudio'
...
export class Kernel extends ConsoleKernel {
	...
	get jobs(): Array<typeof Queueable> {
		return [
			ProcessAudio
		]
	}
	...
}
```

</TabItem>
</Tabs>

### Dispatching Jobs

Once you have written your job class, you may dispatch it using the dispatch `method` on the job itself. The arguments passed to the dispatch method will be given to the job's handle method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/AudioController.imba" {23}
import { Request } from '@formidablejs/framework'
import { strRandom } from '@formidablejs/framework'
import { AudioRepository } from '../../Repositories/AudioRepository'
import { Controller } from './Controller'
import { ProcessAudio } from '../../Jobs/ProcessAudio'

export class AudioController < Controller
	prop audio = new AudioRepository

	# Store a new audio.
	def store\Promise<any> request\Request
		const file = request.file('audio').first!

		const path = "storage/framework/audio/{strRandom(20)}.{file.ext}"

		const audio = await self.audio.create({
			...
			path: path
		})

		file.move(path)

		await ProcessAudio.dispatch(audio.id)
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/AudioController.ts" {25}
import { Request } from '@formidablejs/framework'
import { strRandom } from '@formidablejs/framework'
import { AudioRepository } from '../../Repositories/AudioRepository'
import { Controller } from './Controller'
import { ProcessAudio } from '../../Jobs/ProcessAudio'

export class AudioController extends Controller {
	private readonly audio = new AudioRepository

	/**
	 * Store a new audio.
	 */
	async store(request: Request): Promise<any> {
		const file = request.file('audio').first!

		const path = `storage/framework/audio/${strRandom(20)}.${file.ext}`

		const audio = await this.audio.create({
			...,
			path: path
		})

		file.move(path)

		await ProcessAudio.dispatch(audio.id)
	}
}
```

</TabItem>
</Tabs>

#### Delayed Dispatching

You may also delay a job with the `delay` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/AudioController.imba" {9}
export class AudioController < Controller
	prop audio = new AudioRepository

	# Store a new audio.
	def store\Promise<any> request\Request
		...

		await ProcessAudio
			.delay('30 minutes')
			.dispatch(audio.id)
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/AudioController.ts" {11}
export class AudioController extends Controller {
	private readonly audio = new AudioRepository

	/**
	 * Store a new audio.
	 */
	async store(request: Request): Promise<any> {
		...

		await ProcessAudio
			.delay('30 minutes')
			.dispatch(audio.id)
	}
}
```

</TabItem>
</Tabs>

## Processing Jobs

### Running Queue

By default, when running the queue, Formidable will run from the default queue:

```bash
node craftsman queue:work
```

But if you wish to use a different queue, you may pass the `--queue` flag with the name of the queue you wish to run:

```bash
node craftsman queue:work --queue=custom_queue
```

> You may also pass as many `--queue` flags as you wish.

### Retrying Failed Jobs

To retry failed jobs, you may use the `queue:retry` command:

```bash
node craftsman queue:retry
```

This will retry failed jobs from the default queue, to retry failed jobs of a different queue, simply pass the `--queue` flag with the name of the queue:

```bash
node craftsman queue:retry --queue=custom_queue
```

> You may also pass as many `--queue` flags as you wish.

### Removing Failed Jobs

If you wish to remove failed jobs that may never be ran again, you can use the `queue:flush` command:

```bash
node craftsman queue:flush
```

Similar to other commands we've already looked at, you can also pass the `--queue` flag with the name of the queue to delete failed jobs from:

```bash
node craftsman queue:retry --queue=custom_queue
```

### Queue Information

Should you wish to know more about your application's jobs, you may use the `queue:about` command:

```bash
node craftsman queue:flush
```

### Production Consideration

When running your application in production, it is recommended to use pm2 for your queues:

```js title="ecosystem.config.js"
module.exports = {
	apps: [
		{
			name: "queue",
			script: "node craftsman queue:work --no-ansi",
			max_memory_restart: "100M",
			time: false,
			error_file: "./storage/logs/queue/error.log",
			out_file: "./storage/logs/queue/log.log"
		}
	]
}
```
