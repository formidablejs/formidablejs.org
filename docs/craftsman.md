---
id: craftsman
title: Craftsman Console
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Craftsman Console

## Introduction

Craftsman is the command line interface included with Formidable. It provides a number of helpful commands that can assist you while you build your application. To view a list of all available Craftsman commands, you may call the `craftsman` command:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman
```

</TabItem>
</Tabs>

Every command also includes a "help" screen which displays and describes the command's available arguments and options. To view a help screen, precede the name of the command with the `--help` flag:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman migrate:latest --help
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman migrate:latest --help
```

</TabItem>
</Tabs>

### Shell (REPL)

Craftsman Shell is a powerful REPL for the Formidable framework, powered by the [Imba-Shell](https://github.com/donaldp/imba-shell) package.

#### Usage

Shell allows you to interact with your Formidable application on the command line. To enter the Shell environment, run the `shell` Craftsman command:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman shell
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman shell
```

</TabItem>
</Tabs>

In order for a class or function to be accessible in the Shell environment, it needs to be added in the `context` config file. To get started, open `config/context.imba` or `config/context.ts`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/context.imba"
import { helpers } from '@formidablejs/framework'

export default {
	...helpers
}
```

</TabItem>
<TabItem value="ts">

```ts title="config/context.ts"
import { helpers } from '@formidablejs/framework'

export default {
	...helpers,
}
```

</TabItem>
</Tabs>

Out of the box, Formidable exposes the Framework's helper function to the Shell environment. Lets add the `User` model:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="config/context.imba"
import { helpers } from '@formidablejs/framework'
import { User } from '../app/Models/User'

export default {
	User: User
	...helpers
}
```

</TabItem>
<TabItem value="ts">

```ts title="config/context.ts"
import { helpers } from '@formidablejs/framework'
import { User } from '../app/Models/User'

export default {
	User: User,
	...helpers
}
```

</TabItem>
</Tabs>

Now that you've added your `User` model, you can access it from the Shell environment by just calling `User` in the environment. [Imba-Shell](https://github.com/donaldp/imba-shell) will autocomplete your code.

## Writing Commands

In addition to the commands provided with Craftsman, you may build your own custom commands. Commands are typically stored in the `app/Console/Commands` directory; however, you are free to choose your own storage location.

### Generating Commands

To create a new command, you may use the `make:command` Craftsman command. This command will create a new command class in the `app/Console/Commands` directory:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman make:command Hello
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman make:command Hello
```

</TabItem>
</Tabs>

### Command Structure

After generating your command, you should define appropriate values for the `signature`, `description` and `props` properties of the class. These properties will be used when displaying your command on the list screen. The `signature` property also allows you to define your command's input expectations. The `handle` method will be called when your command is executed. You may place your command logic in this method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Console/Commands/Hello.imba"
import { Command } from '@formidablejs/framework'
import { Prop } from '@formidablejs/framework'

export class Hello < Command

    /**
	 * The name and signature of the console command.
	 *
	 * @type {string}
	 */
	get signature
		'hello {?name}'

    /**
	 * The console command description.
	 *
	 * @type {string}
	 */
	get description
		'My command description'

    /**
	 * Command props.
	 *
	 * @type {object}
	 */
	get props
		{
			name: Prop.string!.description('Your name')
		}

    /**
	 * Execute the console command.
	 *
	 * @returns {mixed}
	 */
	def handle
		self.write "<fg:green>Hello {argument('name', 'Stranger')}</fg:green>"
```

</TabItem>
<TabItem value="ts">

```ts title="app/Console/Commands/Hello.ts"
import { Command } from '@formidablejs/framework'
import { Prop } from '@formidablejs/framework'

export class Hello extending Command {

    /**
	 * The name and signature of the console command.
	 */
	get signature(): string {
		return 'hello {?name}'
	}

    /**
	 * The console command description.
	 */
	get description(): string {
		return 'My command description'
	}

    /**
	 * Command props.
	 */
	get props(): object {
		return {
			name: Prop.string().description('Your name')
		}
	}

    /**
	 * Execute the console command.
	 */
	handle(): void {
		this.write("<fg:green>Hello {argument('name', 'Stranger')}</fg:green>")
	}
```

</TabItem>
</Tabs>

## Defining Input Expectations

When writing console commands, it is common to gather input from the user through arguments or options. Formidable allows you to define the commands input structure in the `signature` property. In the `signature` property you may define the name, arguments, and options for the command in a single, expressive, route-like syntax.

### Arguments

All user supplied arguments and options are wrapped in curly braces. In the following example, the command defines one required argument: `name`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * The name and signature of the console command.
 *
 * @type {string}
 */
get signature
    'hello {name}'
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * The name and signature of the console command.
 */
get signature(): string {
    return 'hello {name}'
}
```

</TabItem>
</Tabs>

You may also make `arguments` optional:

```py
`hello {?name}`
```

If you want to define a default value, you can use the `props` property:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Command props.
 *
 * @type {object}
 */
get props
	{
		name: Prop.string!.default('Donald')
	}
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Command props.
 */
get props(): object {
	return {
		name: Prop.string().default('Donald')
	}
}
```

</TabItem>
</Tabs>

### Options

Options, like arguments, are another form of user input. Options are prefixed by two hyphens (--) when they are provided via the command line. There are two types of options: those that receive a value and those that don't. Options that don't receive a value serve as a boolean "flag". Let's take a look at an example of this type of option:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * The name and signature of the console command.
 *
 * @type {string}
 */
get signature
    'hello {name} {--time}'
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * The name and signature of the console command.
 */
get signature(): string {
    return 'hello {name} {--time}'
}
```

</TabItem>
</Tabs>

In this example, the `--time` switch may be specified when calling the command. If the `--time` flag is passed, the value will of the option will be `true`. Otherwise, the value will be `false`:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman hello Luna --time
```

</TabItem>
<TabItem value="bun">

```py
bun run craftsman hello Luna --time
```

</TabItem>
</Tabs>

#### Options With Values

Next, let's take a look at an option that expects a value. If the user must specify a value for an option, you should set the option type to `string`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * The name and signature of the console command.
 *
 * @type {string}
 */
get signature
    'hello {name} {--time}'

/**
 * Command props.
 *
 * @type {object}
 */
get props
	{
		name: Prop.string!.default('Donald')
		time: Prop.string!
	}
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * The name and signature of the console command.
 */
get signature(): string {
    return 'hello {name} {--time}'
}

/**
 * Command props.
 */
get props(): object {
	{
		name: Prop.string().default('Donald')
		time: Prop.string()
	}
```

</TabItem>
</Tabs>

When invoking the command, you may give the `--time` flag a value:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman hello Luna --time=19:05
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman hello Luna --time=19:05
```

</TabItem>
</Tabs>

#### Option Alias

To assign an alias when defining an option, you may specify it in the `props` property:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Command props.
 *
 * @type {object}
 */
get props
	{
		time: Prop.string!.alias('t')
	}
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Command props.
 */
get props(): object {
	return {
		time: Prop.string().alias('t')
	}
}
```

</TabItem>
</Tabs>

When invoking the command, you may use `-t` instead of `--time`:

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman hello Luna -t=19:05
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman hello Luna -t=19:05
```

</TabItem>
</Tabs>

### Input Descriptions

You may assign descriptions to input arguments and options in the `props` property:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Command props.
 *
 * @type {object}
 */
get props
	{
		time: Prop.string!.description('Current time')
	}
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Command props.
 */
get props(): object {
	return {
		time: Prop.string().description('Current time')
	}
}
```

</TabItem>
</Tabs>

## Command I/O

### Retrieving Input

While your command is executing, you will likely need to access the values for the arguments and options accepted by your command. To do so, you may use the argument and option methods. If an `argument` or `option` does not exist, null will be returned:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    const name\string = self.argument('name')
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Execute the console command.
 */
handle(): void {
    const name: string = this.argument('name')
}
```

</TabItem>
</Tabs>

Options may be retrieved just as easily as arguments using the `option` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    const time\string = self.option('time')
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Execute the console command.
 */
handle(): void {
    const time: string = this.option('time')
}
```

</TabItem>
</Tabs>

You may also pass a default value as the second parameter if the value is `null`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    const name\string = self.argument('name', 'Donald')
    const time\string = self.option('time', '19:05')
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
handle(): void {
    const name: string = this.argument('name', 'Donald')
    const time: string = this.option('time', '19:05')
}
```

</TabItem>
</Tabs>

### Writing Output

To send output to the console, you may use the line, `info`, `write`, `line`, and `error` methods. Each of these methods will use appropriate ANSI colors for their purpose. For example, let's display some general information to the user. Typically, the info method will display in the console as green colored text:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    # ...

    self.info('The command was successful')
```

</TabItem>
<TabItem value="ts">

```ts
/**
 * Execute the console command.
 */
handle(): void {
    // ...

    this.info('The command was successful')
}
```

</TabItem>
</Tabs>

To display an error message, use the `error` method. Error message text is typically displayed in red:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
self.error('Something went wrong!')
```

</TabItem>
<TabItem value="ts">

```ts
this.error('Something went wrong!')
```

</TabItem>
</Tabs>

You may use the `write` method to display plain, uncolored text:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
self.write('Display this on the screen')
```

</TabItem>
<TabItem value="ts">

```ts
this.write('Display this on the screen')
```

</TabItem>
</Tabs>

#### Custom Styling

You may custom style your output, for example, to display a text in `blue` and `red`, use:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
self.write('This is <fg:blue>blue</fg:blue> and this has a <bg:red>red</bg:red> background')
```

</TabItem>
<TabItem value="ts">

```ts
this.write('This is <fg:blue>blue</fg:blue> and this has a <bg:red>red</bg:red> background')
```

</TabItem>
</Tabs>

Tag          | Type       | Color
-------------|------------|-------
`bg:black`   | Background | Black
`bg:blue`    | Background | Blue
`bg:cyan`    | Background | Cyan
`bg:green`   | Background | Green
`bg:magenta` | Background | Magenta
`bg:red`     | Background | Red
`bg:white`   | Background | White
`bg:yellow`  | Background | Yellow
`fg:black`   | Color      | Black
`fg:blue`    | Color      | Blue
`fg:cyan`    | Color      | Cyan
`fg:green`   | Color      | Green
`fg:magenta` | Color      | Magenta
`fg:red`     | Color      | Red
`fg:white`   | Color      | White
`fg:yellow`  | Color      | Yellow
`dim`        | Style      | `null`
`underline`  | Style      | `null`

#### Tables

The `table` method makes it easy to correctly format multiple rows / columns of data. All you need to do is provide the an array of objects for the table and Formidable will automatically calculate the appropriate width and height of the table for you:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
self.table([
    { name: "Donald" }
    { name: "Luna" }
])
```

</TabItem>
<TabItem value="ts">

```ts
this.table([
    { name: "Donald" }
    { name: "Luna" }
])
```

</TabItem>
</Tabs>

## Registering Commands

All of your console commands are registered within your application's `app/Console/Kernel.imba` file or `app/Console/Kernel.ts` file, which is your application's "console kernel". You can register a command by adding it under the `registered` property:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Console/Kernel.imba"
import { ConsoleKernel } from '@formidablejs/framework'
import { Hello } from './Commands/Hello'

export class Kernel < ConsoleKernel

	get registered
		[
			Hello
		]
```

</TabItem>
<TabItem value="ts">

```py title="app/Console/Kernel.ts"
import { ConsoleKernel } from '@formidablejs/framework'
import { Hello } from './Commands/Hello'

export class Kernel extends ConsoleKernel {
	get registered(): Array<object> {
		return [
			Hello
		]
	}
}
```

</TabItem>
</Tabs>
