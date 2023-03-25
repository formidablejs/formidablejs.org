---
id: rc
title: Run Commands (formidablerc)
---

# Run Commands

Formidablerc config is part of the `package.json` file. In this file, we can add configuration that can improve or change our development process to fit our needs.

## Mode

The `mode` option allows you to switch between `nodemon` and `imba`. Both of these modes control how your application re-builds when running in development mode. By default, Formidable uses `nodemon`:

```js {3} title="package.json"
{
    "development": {
        "mode": "nodemon"
    }
}
```

### Nodemon

When switching to `nodemon`, a few more options will be available.

#### `commands`

The command option allows you to add a list of commands that should run everytime your application re-builds after changes have been made:

```json {4-6} title="package.json"
{
    "development": {
        "mode": "nodemon",
        "commands": [
            "node craftsman types:generate"
        ]
    }
}
```

#### `ignore`

The ignore option allows you to specify the directories that should be ignored when `nodemon` listens to file changes:

```json {4-6} title="package.json"
{
    "development": {
        "mode": "nodemon",
        "ignore": [
            "tests"
        ]
    }
}
```

By default, Formidable ignores the following directories:

```json
[
	"app/Types",
    "bootstrap/config",
    "database",
    "dist",
    "node_modules",
    "public",
    "storage",
    "test",
    "tests"
]
```

:::note

Its advised to include the default ignored directories to your ignore list if you make changes to it.

:::

#### `ext`

the `ext` option allows you to specify the extensions that can trigger a re-build:

```json {4} title="package.json"
{
    "development": {
        "mode": "nodemon",
        "ext": ["imba"]
    }
}
```

By default, Formidable listens to files ending with the following extensions:

```json
[
    "imba",
    "js",
    "ts"
]
```

:::note

Its advised to include the default extensions to your ext list if you make changes to it.

:::

#### `delay`

The `delay` option allows you to specify how long in seconds nodemon should wait before triggering a re-build after files have been changed:

```json {4} title="package.json"
{
    "development": {
        "mode": "nodemon",
        "delay": 5
    }
}
```

You can also specify the delay in milliseconds by suffixing the value with "ms":

```json {4} title="package.json"
{
    "development": {
        "mode": "nodemon",
        "delay": "5000ms"
    }
}
```

## Hooks

You might find yourself repeating the same commands over and over again, for example: whenever you make changes to the `.env` file or any of the configurations files, you need to run the `node craftsman config:cache` command. This is a common task that you might want to automate.

So how would you go about doing this? Well, its as simple as adding "hooks" to your `package.json` file:

```json
{
    ...,
    "hooks": {
        "pre-serve": [
            "node craftsman config:cache"
        ]
    }
}
```

In the snippet above, we've added a "pre-serve" hook that runs the `node craftsman config:cache` command before the server starts.

Hooks are based on the commands your application already has. Formidable is smart enough to register hooks for the commands your application has, so you don't need to worry about that.

### Available Hooks

As mentioned above, you don't need to worry about registering hooks for the commands your application has. So how would you know which hooks are available?

For every command that is registered, 2 hooks are created:

Lets say you have a command called `craftsman config:cache`. The hooks are: `pre-config:cache` and `config:cache` (post-hook). The `pre-config:cache` hook will run before the command, and the `config:cache` (post-hook) hook will run after the command.

:::note

Not all post hooks will work. This is because some commands exit early, and therefore don't run the post-hook.

:::
