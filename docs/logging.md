---
id: logging
title: Logging
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Logging

Formidable provides a Monolog-inspired logging library built on top of [`Livy`](https://github.com/loilo/livy). Livy allows you to log messages to files, the file system error log, and more.

The Formidable Logger has "channels" that provide most of the logging functionality. Each channel represents a specific way of writing information. By default, the `single` channel writes messages to a single file, while the `daily` channel writes messages to multiple files based on a date.

## Configuration

All of the configuration options for your application's logging behavior is stored in the `config/logging.imba` or `config/logging.ts` configuration files. These files allow you to configure your application's log channels.

By default, Formidable uses the `console` channel. This channel writes to the console.

### Available Channel Drivers

Each log channel is powered by a "driver". The driver returns a handler whoch determines how and where the log message is actually recorded. The following log channel drivers are available in every Formidable application. An entry for most of these drivers is already present in your application's `config/logging.imba` or `config/logging.ts` configuration files:

Name       | Description
-----------|------------
 `console` | A `ConsoleHandler` based Livy driver which writes to the terminal
 `daily`   | A `RotatingFileHandler` based Livy driver which rotates daily
 `discord` | A `DiscordWebhookHandler` based driver which writes to a Discord Server
 `single`  | A `FileHandler` based Livy driver which writes to a single file or path
 `slack`   | A `SlackWebhookHandler` based Livy driver which writes to a Slack Workspace
 `stack`   | A wrapper to facilitate creating "multi-channel" channels

## Writing Log Messages

You may write information to the logs using the `Log` class. Below is a list of methods you can call from the `Log` class:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Log } from '@formidablejs/logger'

Log.emergency(message)
Log.alert(message)
Log.critical(message)
Log.error(message)
Log.warning(message)
Log.notice(message)
Log.info(message)
Log.debug(message)
```

</TabItem>
<TabItem value="ts">

```ts
import { Log } from '@formidablejs/logger'

Log.emergency(message)
Log.alert(message)
Log.critical(message)
Log.error(message)
Log.warning(message)
Log.notice(message)
Log.info(message)
Log.debug(message)
```

</TabItem>
</Tabs>

You may call any of these methods to log a message for the corresponding level. By default, the message will be written to the default log channel as configured by your `logging` configuration file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
import { DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Log } from '@formidablejs/logger'
import { Controller } from './Controller'

export class TaskController < Controller

    def show request\Request
        const id\number = request.param('id')

        Log.info('Showing Task: ' + id)

        DB.table('tasks').where('id', id).first!
```

</TabItem>
<TabItem value="ts">

```ts
import { DB } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Log } from '@formidablejs/logger'
import { Controller } from './Controller'

export class TaskController extends Controller {
    show(request: Request) {
        const id: number = request.param('id')

        Log.info('Showing Task: ' + id)

        return DB.table('tasks').where('id', id).first()
    }
}
```

</TabItem>
</Tabs>

### Contextual Information

An `object` of contextual data may be passed to the log methods. This contextual data will be formatted and displayed with the log message:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Log } from '@formidablejs/logger'

Log.info('A new task has been created', {
    id: task.id
})
```

</TabItem>
<TabItem value="ts">

```ts
import { Log } from '@formidablejs/logger'

Log.info('A new task has been created', {
    id: task.id
})
```

</TabItem>
</Tabs>

## Writing To Specific Channels

Sometimes you may wish to log a message to a channel other than your application's default channel. You may use the channel method on the `Log` class to retrieve and log to any channel defined in your configuration file:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Log } from '@formidablejs/logger'

Log.channel('discord').info('Something happened!')
```

</TabItem>
<TabItem value="ts">

```ts
import { Log } from '@formidablejs/logger'

Log.channel('discord').info('Something happened!')
```

</TabItem>
</Tabs>