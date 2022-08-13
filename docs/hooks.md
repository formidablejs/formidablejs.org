---
id: hooks
title: Hooks
---

# Hooks

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

## Available Hooks

As mentioned above, you don't need to worry about registering hooks for the commands your application has. So how would you know which hooks are available?

For every command that is registered, 2 hooks are created:

Lets say you have a command called `craftsman config:cache`. The hooks are: `pre-config:cache` and `config:cache` (post-hook). The `pre-config:cache` hook will run before the command, and the `config:cache` (post-hook) hook will run after the command.

:::note

Not all post hooks will work. This is because some commands exit early, and therefore don't run the post-hook.

:::
