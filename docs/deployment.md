---
id: deployment
title: Deployment
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you're ready to deploy your Formidable application to production, there are some important things you can do to make sure your application is running as efficiently as possible. In this document, we'll cover some great starting points for making sure your Formidable application is deployed properly.

## Server Requirements

The Formidable framework has a few system requirements. You should ensure that your web server has the following minimum Node version:

* `Node >=18.*`
* `npm/pnpm/yarn/bun`

## Deploy

### Heroku (recommended)

Formidable is Heroku-ready out of the box. Here are some few things you may need to do to get started:

Create a `Procfile` in the root of your application with the following content:

```bash title="Procfile"
web: npm start
cron: node craftsman schedule:run
```

If your application is making use of the queue system, you can add the following line to your `Procfile`:

```bash title="Procfile"
worker: node craftsman queue:work
```

:::info

Don't forget to add production `.env` details to Heroku. Remember to set `APP_DEBUG` to `false`.

:::

That's all you need to do to get started.

### Nginx

If you need more control over your server and application, we recommend deploying to a Linux server and using Nginx and PM2.

Before getting started, make sure the following prerequisites are met:
* [Node >=18.*](https://nodejs.org/en/download/) (we recommend using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating))
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://yarnpkg.com/getting-started/install) or [PNPM](https://pnpm.io/installation) or [Bun](https://bun.sh/docs/installation)
* [PM2](https://pm2.keymetrics.io/)
* [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)

#### Serving Your Application

Now that you have all the dependencies, you can go ahead and create a `ecosystem.config.js` file in the root of your application:

```js title="ecosystem.config.js"
module.exports = {
	apps: [
		{
			name: "web",
			script: "npm run start",
			time: true,
			error_file: "./storage/logs/web/error.log",
			out_file: "./storage/logs/web/log.log"
		},
		{
			name: "cron",
			script: "node craftsman schedule:run --no-ansi",
			max_memory_restart: "100M",
			time: true,
			error_file: "./storage/logs/cron/error.log",
			out_file: "./storage/logs/cron/log.log"
		}
	]
}
```

And finally, start your application:

```bash
pm2 start ecosystem.config.js
```

By default, this will start our application on `http://localhost:3000`, we can change port in the `server` file:

```js title="server" {4}
Server
	.use(require('./.formidable/build').default)
	.start({
		port: 3000,
		host: 'localhost'
	})
```

:::info

We also recommend you enable PM2 to auto start your application on system boot. You can do this by running the command: `pm2 startup`

:::

#### Creating a Reverse Proxy

Now that you have started your application you can go ahead and create a virtual host:

```conf title="/etc/nginx/sites-available/app.conf"
server {
    listen 80;
	server_name _;

	location / {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_cache_bypass $http_upgrade;
		proxy_set_header Host $host;
		proxy_pass http://localhost:3000;
		proxy_http_version 1.0;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}
```
Once thats done, we can check for any issues on our newly created `app.conf`:

```bash
sudo nginx -t
```

If everything is fine, we should see a "success" message. Then we can enable our application by creating a symbolic link of the `app.conf` file from the `/etc/nginx/sites-available/` directory to `/etc/nginx/sites-enabled/`:

```bash
sudo ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/
```

Now, for changes to reflect, you will need to restart Nginx:

```bash
sudo systemctl reload nginx
```

And now you should be able to access your application 🎉🎉🎉

#### Automating things

Its not always practical to ssh into your server to pull your latest changes. Because of this, we may wish to automate things a bit using Bash scripts.

Here's a simple bash script that pulls the latest changes from a repo and run the necessary commands:

<Tabs
    defaultValue={State.manager}
	groupId="package-manager"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash title="/root/deploy.sh"
echo "Jump to application folder"
cd /root/app

echo "Update application from Git"
git pull

echo "Install application dependencies"
npm install

echo "Build application"
npm run build

echo "Put application in maintenance mode"
node craftsman down

echo "Run database migrations"
node craftsman migrate:latest --no-interaction

echo "Restart application"
pm2 restart ecosystem.config.js

echo "Put application back online"
node craftsman up
```

</TabItem>

<TabItem value="pnpm">

```bash title="/root/deploy.sh"
echo "Jump to application folder"
cd /root/app

echo "Update application from Git"
git pull

echo "Install application dependencies"
pnpm install

echo "Build application"
pnpm run build

echo "Put application in maintenance mode"
node craftsman down

echo "Run database migrations"
node craftsman migrate:latest --no-interaction

echo "Restart application"
pm2 restart ecosystem.config.js

echo "Put application back online"
node craftsman up
```

</TabItem>

<TabItem value="yarn">

```bash title="/root/deploy.sh"
echo "Jump to application folder"
cd /root/app

echo "Update application from Git"
git pull

echo "Install application dependencies"
yarn install

echo "Build application"
yarn run build

echo "Put application in maintenance mode"
node craftsman down

echo "Run database migrations"
node craftsman migrate:latest --no-interaction

echo "Restart application"
pm2 restart ecosystem.config.js

echo "Put application back online"
node craftsman up
```

</TabItem>

<TabItem value="bun">

```bash title="/root/deploy.sh"
echo "Jump to application folder"
cd /root/app

echo "Update application from Git"
git pull

echo "Install application dependencies"
bun install

echo "Build application"
bun run build

echo "Put application in maintenance mode"
node craftsman down

echo "Run database migrations"
node craftsman migrate:latest --no-interaction

echo "Restart application"
pm2 restart ecosystem.config.js

echo "Put application back online"
node craftsman up
```

</TabItem>
</Tabs>

This script can be triggered by a Github Action, for example. When we push to our `main` branch, we can have a Github Workflow that ssh's into our server on our behalf and executes the `deploy.sh` script:

```yaml title=".github/workflows/deploy.yaml"
name: Deploying

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
      - name: executing remote ssh commands using ssh key
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.KEY }}
          script: sh /root/deploy.sh
```

:::info

This is only an example. You don't have to use Github to be able to Automate your deployments. The same can also be achieved with Gitlab and Bitbucket Pipelines.

:::


### Docker

You can also use Docker to deploy your application. Here's a simple `Dockerfile` that you can use to build your application:

```dockerfile title="Dockerfile"
FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app/
RUN npm install

# Bundle app source
COPY . /usr/app
RUN npm run build
COPY . /usr/app

EXPOSE 3000
CMD ["npm", "start"]
```

:::info

Set `APP_DEBUG` to false in your `.env` file before building your application for production.

:::

### Vercel

Vercel is another great option for deploying your Formidable application. While Formidable is not officially supported by Vercel, you can still deploy your application to Vercel by following these steps:

#### Configure your application

First, you need to trust a couple of dependencies by adding them to your `package.json` file:

```json title="package.json" {3-7}
{
	...
	"trustedDependencies": [
		"bcrypt",
		"esbuild",
		"sqlite3"
	],
	...
}
```

Then create a `vercel.json` file in the root of your application:

```json title="vercel.json"
{
	"buildCommand": "bun run build",
	"installCommand": "bun install",
	"outputDirectory": ".formidable/public",
	"devCommand": "bun run dev",
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/api/serverless.js"
        }
    ]
}
```

> You can also use `npm` or `yarn` or `pnpm` instead of `bun`. However, we recommend using the `bun` package manager in this case.

#### Create a serverless function

Next, we need to create a serverless function that will serve as our entry point. Create a `serverless.js` file in the `api` directory:

```js title="api/serverless.js"
const formidable = require('../.formidable/build').default

export default async (req, res) => {
	const application = await formidable
	const app = application.fastify()

	await app.ready()
	app.server.emit('request', req, res)
}
```

:::info

Your serverless function must be named `serverless.js` and must be located in the `api` directory.

:::

#### Deploy

Finally, you can deploy your application to Vercel by running the following command:

```bash
vercel
```

:::info

You can find the instructions for installing the Vercel CLI [here](https://vercel.com/docs/cli).

:::

#### Considerations

While this approach works, there are some things you need to consider:

##### Logging

By default, Formidable logs to the `storage/logs` directory. However, Vercel does not allow writing to the file system. So, you will need to use the `console` channel instead. You can change the default log channel in the `.env` file:

```bash title=".env"
LOG_CHANNEL=console
```

##### Database

Vercel supports Formidable's `pgsql` driver. So, you can use Postgres as your database. However, you will need to use Vercel's [Postgres](https://vercel.com/docs/storage/vercel-postgres) service. Once you have the credentials, you can add them to your `.env` file:

```bash title=".env"
DB_CONNECTION=pgsql
DATABASE_URL=postgres://default:**********@**********.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
```

:::info

Don't forget to add `?sslmode=require` to your `DATABASE_URL`.

:::

And finally, ensure that you have the `pgsql` driver installed:

```bash
bun add pgsql
```

##### Redis

Vercel only supports the `memory` and `redis` session drivers. So, we recommend using the `memory` driver for your application if you do not have a redis server.

You can however use [Vercel KV](https://vercel.com/docs/storage/vercel-kv). Once you have the credentials, you can add them to your `.env` file:

```bash title=".env"
REDIS_URL=redis://default:**********@**********.kv.vercel-storage.com:32857
```

Once that's done, you can use the `redis` driver for your application:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/session.imba" {15}
export default {

	# --------------------------------------------------------------------------
	# Default Session Driver
	# --------------------------------------------------------------------------
	#
	# This option controls the default session "driver" that will be used on
	# requests. By default, we will use the lightweight native driver but
	# you may specify any of the other wonderful drivers provided here.
	#
	# Supported: "memory", "file", "redis"
	#
	# See: "config > app.imba > resolvers"

	driver: 'redis'

	...
}
```

</TabItem>
<TabItem value="ts">

```ts title="config/session.ts" {17}
export default {

	/**
	 * --------------------------------------------------------------------------
	 * Default Session Driver
	 * --------------------------------------------------------------------------
	 *
	 * This option controls the default session "driver" that will be used on
	 * requests. By default, we will use the lightweight native driver but
	 * you may specify any of the other wonderful drivers provided here.
	 *
	 * Supported: "memory", "file", "redis"
	 *
	 * See: "config > app.ts > resolvers"
	 */

	driver: 'redis',

	...
```

</TabItem>
</Tabs>

The next step would be to update your redis' default connection in the `config/database.{imba,ts}` file:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```py title="config/database.imba"
export default {

	...

	# --------------------------------------------------------------------------
	# Redis Databases
	# --------------------------------------------------------------------------
	#
	# You can configure your redis databases here.

	redis: {
		default: {
			url: helpers.env('REDIS_URL')
			database: helpers.env('REDIS_DB', '0')
			tls: true
		}
	}
}
```

</TabItem>
<TabItem value="ts">

```ts title="config/database.ts"
export default {

	...

	/**
	 * --------------------------------------------------------------------------
	 * Redis Databases
	 * --------------------------------------------------------------------------
	 *
	 * You can configure your redis databases here.
	 */

	redis: {
		default: {
			url: helpers.env('REDIS_URL'),
			database: helpers.env('REDIS_DB', '0'),
			tls: true
		}
	}
}
```

</TabItem>
</Tabs>

:::tip

In the default `redis` connection, we set `tls` to `true`. This is because Vercel KV uses TLS. And we removed the `host`, `port` and `password` options because they are not needed.

:::

##### Package Lock

Please ensure that you remove your `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` or `bun.lockb` file before deploying to Vercel. You may encounter some issues if you don't.
