---
id: craftsman
title: Craftsman Console
---

# Craftsman Console

## Introduction

Craftsman is the command line interface included with Formidable. It provides a number of helpful commands that can assist you while you build your application. To view a list of all available Craftsman commands, you may call the `craftsman` command:

```bash
node craftsman
```

Every command also includes a "help" screen which displays and describes the command's available arguments and options. To view a help screen, precede the name of the command with the `--help` flag:

```bash
node craftsman migrate:latest --help
```

### Shell (REPL)

Craftsman Shell is a powerful REPL for the Formidable framework, powered by the [Imba-Shell](https://github.com/donaldp/imba-shell) package.

#### Usage

Shell allows you to interact with your Formidable application on the command line. To enter the Shell environment, run the `shell` Craftsman command:

```bash
node craftsman shell
```

In order for a class or function to be accessible in the Shell environment, it needs to be added in the `context` config file. To get started, open `config/context.imba`:

```py title="config/context.imba"
import { helpers } from '@formidablejs/framework'

export default {
	...helpers
}
```

Out of the box, Formidable exposes the Framework's helper function to the Shell environment. Lets add the `User` model:

```py title="config/context.imba"
import { helpers } from '@formidablejs/framework'
import { User } from '../app/Models/User'

export default {
	User: User
	...helpers
}
```

Now that you've added your `User` model, you can access it from the Shell environment by just calling `User` in the environment. [Imba-Shell](https://github.com/donaldp/imba-shell) will autocomplete your code.

## Writing Commands

In addition to the commands provided with Craftsman, you may build your own custom commands. Commands are typically stored in the `app/Console/Commands` directory; however, you are free to choose your own storage location.

### Generating Commands

To create a new command, you may use the `make:command` Craftsman command. This command will create a new command class in the `app/Console/Commands` directory:

```bash
node craftsman make:command Hello
```

### Command Structure

After generating your command, you should define appropriate values for the `signature`, `description` and `props` properties of the class. These properties will be used when displaying your command on the list screen. The `signature` property also allows you to define your command's input expectations. The `handle` method will be called when your command is executed. You may place your command logic in this method:

```py title="app/Console/Commands/Hello.imba"
import { Command } from '@formidablejs/framework'
import { Prop } from '@formidablejs/framework'

export class Hello < Command

    /**
	 * The name and signature of the console command.
	 *
	 * @type {String}
	 */
	get signature
		'hello {?name}'

    /**
	 * The console command description.
	 *
	 * @type {String}
	 */
	get description
		'My command description'
	
    /**
	 * Command props.
	 *
	 * @type {Object}
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

## Defining Input Expectations

When writing console commands, it is common to gather input from the user through arguments or options. Formidable allows you to define the commands input structure in the `signature` property. In the `signature` property you may define the name, arguments, and options for the command in a single, expressive, route-like syntax.

### Arguments

All user supplied arguments and options are wrapped in curly braces. In the following example, the command defines one required argument: `name`:

```py
/**
 * The name and signature of the console command.
 *
 * @type {String}
 */
get signature
    'hello {name}'
```

You may also make `arguments` optional:

```py
`hello {?name}`
```

If you want to define a default value, you can use the `props` property:

```py
/**
 * Command props.
 *
 * @type {Object}
 */
get props
{
    name: Prop.string!.default('Donald')
}
```

### Options

Options, like arguments, are another form of user input. Options are prefixed by two hyphens (--) when they are provided via the command line. There are two types of options: those that receive a value and those that don't. Options that don't receive a value serve as a boolean "flag". Let's take a look at an example of this type of option:

```py
/**
 * The name and signature of the console command.
 *
 * @type {String}
 */
get signature
    'hello {name} {--time}'
```

In this example, the `--time` switch may be specified when calling the command. If the `--time` flag is passed, the value will of the option will be `true`. Otherwise, the value will be `false`:

```py
node craftsman hello Luna --time
```

#### Options With Values

Next, let's take a look at an option that expects a value. If the user must specify a value for an option, you should set the option type to `string`:

```py
/**
 * The name and signature of the console command.
 *
 * @type {String}
 */
get signature
    'hello {name} {--time}'

/**
 * Command props.
 *
 * @type {Object}
 */
get props
{
    name: Prop.string!.default('Donald')
    time: Prop.string!
}
```

When invoking the command, you may give the `--time` flag a value:

```bash
node craftsman hello Luna --time=19:05
```

#### Option Alias

To assign an alias when defining an option, you may specify it in the `props` property:

```py
/**
 * Command props.
 *
 * @type {Object}
 */
get props
{
    time: Prop.string!.alias('t')
}
```

When invoking the command, you may use `-t` instead of `--time`:

```bash
node craftsman hello Luna -t=19:05
```

### Input Descriptions

You may assign descriptions to input arguments and options in the `props` property:

```py
/**
 * Command props.
 *
 * @type {Object}
 */
get props
{
    time: Prop.string!.description('Current time')
}
```

## Command I/O

### Retrieving Input

While your command is executing, you will likely need to access the values for the arguments and options accepted by your command. To do so, you may use the argument and option methods. If an `argument` or `option` does not exist, null will be returned:

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    const name = self.argument('name')
```

Options may be retrieved just as easily as arguments using the `option` method:

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    const time = self.option('time')
```

You may also pass a default value as the second parameter if the value is `null`:

```py
/**
 * Execute the console command.
 *
 * @returns {mixed}
 */
def handle
    const name = self.argument('name', 'Donald')
    const time = self.option('time', '19:05')
```

### Writing Output

To send output to the console, you may use the line, `info`, `write`, `line`, and `error` methods. Each of these methods will use appropriate ANSI colors for their purpose. For example, let's display some general information to the user. Typically, the info method will display in the console as green colored text:
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

To display an error message, use the `error` method. Error message text is typically displayed in red:

```py
self.error('Something went wrong!')
```

You may use the `write` method to display plain, uncolored text:

```py
self.write('Display this on the screen')
```

#### Custom Styling

You may custom style your output, for example, to display a text in `blue` and `red`, use:

```py
self.write('This is <fg:blue>blue</fg:blue> and this has a <bg:red>red</bg:red> background')
```

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

```py
self.table([
    { name: "Donald" }
    { name: "Luna" }
])
```

## Registering Commands

All of your console commands are registered within your application's `app/Console/Kernel.imba` file, which is your application's "console kernel". You can register a command by adding it under the `registered` property:

```py title="app/Console/Kernel.imba"
import { ConsoleKernel } from '@formidablejs/framework'
import { Hello } from './Commands/Hello'

export class Kernel < ConsoleKernel

	get registered
		[
			Hello
		]
```