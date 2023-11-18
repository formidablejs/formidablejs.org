---
title: Queing with the Formidable Framework
description: Looking into the Formidable Framework's queueing system.
slug: formidable-queues
authors:
  - name: Donald Pakkies
    title: Creator of the Formidable Framework
    url: https://x.com/donaldpakkies
    image_url: https://github.com/donaldp.png
tags: [queues, redis, sync]
image: https://formidablejs.org/img/formidable-queues.png
hide_table_of_contents: true
---

<head>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@formidablejs" />
	<meta name="twitter:creator" content="@donaldpakkies" />
	<meta name="twitter:title" content="Queing with the Formidable Framework" />
	<meta name="twitter:description" content="Looking into the Formidable Framework's queueing system." />
	<meta name="twitter:url" content="https://formidablejs.org/blog/formidable-queues" />
</head>

A quick deep dive into the Formidable Framework's queueing system and what it can do for you.

<!--truncate-->

The Formidable Framework now ships with [Formidable Queues](https://github.com/formidablejs/queues) out of the box - a queueing system that allows you to queue jobs and process them in the background.

Formidable Queues is a lightweight queueing system that is built on top of [Redis](https://redis.io). It allows you to queue jobs and process them in the background. It also allows you to schedule jobs to run at a later time.

We've had the Formidable Queues for a while now, but it was not part of the Formidable Framework. It was a separate package that you had to install and configure yourself. But now, it is part of the Formidable Framework. We've now integrated it into the framework as we move closer to the release of Formidable v1.0.0.

## How does it work?

Formidable Queues is built on top of [Redis](https://redis.io). It uses Redis to store the jobs and it uses Redis to process the jobs. It also uses Redis to store the failed jobs and the scheduled jobs. We can however, also use `sync` as the queue driver to process the jobs synchronously.

### Exploring Jobs

When we want to queue something, we have to use a job which we can create using the [craftsman](/docs/craftsman) command:

```bash
node craftsman make:job SendWelcomeEmail
```

This will create a job in the `app/Jobs` directory. The job will look something like this:

```ts title="app/Jobs/SendWelcomeEmail.ts"
import { Queueable } from '@formidablejs/queues'

export class SendWelcomeEmail extends Queueable {
    /**
     * Handle job.
     */
    handle(): any {
        console.log('job...')
    }
}
```

The `handle` method is where we put the logic for the job. This is where we do the actual work. This `handle` method also accepts arguments, these arguments are passed to the job when we dispatch it.

Let's say we want to send a welcome email to a user when they register. We can do that like so:

```ts title="app/Jobs/SendWelcomeEmail.ts"
import { Queueable } from '@formidablejs/queues'
import { UserRepository } from '../Repositories/UserRepository'
import { Mail } from '@formidablejs/mailer'
import { WelcomeEmail } from '../Mails/WelcomeEmail'

export class SendWelcomeEmail extends Queueable {
	/**
	 * Handle job.
	 *
	 * @param id The user id.
	 */
	async handle(id: number): any {
		const user = await UserRepository.find(id)

		await Mail.send(new WelcomeEmail(user)).to(user.email)
	}
}
```

We can then dispatch the job like so:

```ts title="routes/api.ts" {9}
import { Route, Request } from '@formidablejs/framework'
import { SendWelcomeEmail } from '../Jobs/SendWelcomeEmail'

Route.post('/register', async (request: Request) => {
	...

	const user = await UserRepository.create(request.all())

	SendWelcomeEmail.dispatch(user.id)

	return user
})
```

Should we want to dispatch the job later, we can use the `delay` method:

```ts title="routes/api.ts"
SendWelcomeEmail.delay('5 minutes').dispatch(user.id)
```

This will delay the job for 5 minutes.

### Registering Jobs

Now that we have a job, we need to register it. We can do that by adding it to the `jobs` array in the `app/Console/Kernel.ts` file:

```ts title="app/Console/Kernel.ts" {17}
import { ConsoleKernel } from '@formidablejs/framework'
import { Log } from '@formidablejs/logger'
import { Queueable } from '@formidablejs/queues'
import { SendWelcomeEmail } from '../Jobs/SendWelcomeEmail'
import type { ICommand } from '@formidablejs/framework'
import type { Schedule } from '@formidablejs/scheduler'

export class Kernel extends ConsoleKernel {
	get registered(): Array<ICommand> {
		return [
			//
		]
	}

	get jobs(): Array<typeof Queueable> {
		return [
			SendWelcomeEmail
		]
	}

	schedule(schedule: Schedule): void {
		// schedule.call(() => {
		// 	Log.info('Hello World')
		// }).everyMinute()
	}
}
```

### Processing Jobs

Now that we have a registered job, we need to process it. We can do that by running the [craftsman](/docs/craftsman) `queue:work` command:

```bash
node craftsman queue:work
```

This will start the queue worker. The queue worker will then process the jobs in the background. It will also process the failed jobs and the scheduled jobs.

For failed jobs, you would need to retry them manually. You can do that by running the [craftsman](/docs/craftsman) `queue:retry` command:

```bash
node craftsman queue:retry
```

This will queue all the failed jobs so they can be processed again.

For more information on Formidable Queues, you can check out the [documentation](/docs/queues).
