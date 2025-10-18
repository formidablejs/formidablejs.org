---
id: helpers
title: Helpers
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Helpers

Formidable includes a variety of "helper" functions. Many of these functions are used by the framework itself; however, you are free to use them in your own applications if you find them convenient.

## Usage

To use a formidable helper function, you need to import it from `@formidablejs/framework/lib/Support/Helpers`:


<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
import { slug } from '@formidablejs/framework/lib/Support/Helpers'

slug('Donald Pakkies') # donald-pakkies
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
import { slug } from '@formidablejs/framework/lib/Support/Helpers'

slug('Donald Pakkies') // donald-pakkies
```

</TabItem>
</Tabs>

## Available Functions

### Arrays & Objects

#### `asObject`

The `asObject` function, converts a custom object into a JavaScript object:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
const object = asObject(customObject)
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const object = asObject(customObject)
```

</TabItem>
</Tabs>

#### `dotNotation`

The `dotNotation` function turns an object into a single level value that uses "dot" notation to indicate depth:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
const object = {
    app: {
        name: 'Formidable'
    }
}

const appName = dotNotation(object, 'app.name')
```

</TabItem>
<TabItem value="ts">

```js showLineNumbers
const object = {
    app: {
        name: 'Formidable'
    }
}

const appName = dotNotation(object, 'app.name')
```

</TabItem>
</Tabs>

You may also use `dot`, an alias of `dotNotation`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
const object = {
    app: {
        name: 'Formidable'
    }
}

const appName = dot(object, 'app.name')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const object = {
    app: {
        name: 'Formidable'
    }
}

const appName = dot(object, 'app.name')
```

</TabItem>
</Tabs>

#### `without`

The `without` helper removes specified data from the given `object`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
without({
    name: 'Donald',
    city: 'East Rand'
}, ['city'])

# { name: 'Donald' }
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
without({
    name: 'Donald',
    city: 'East Rand'
}, ['city'])

// { name: 'Donald' }
```

</TabItem>
</Tabs>

#### `isArray`

The `isArray` helper checks if the given variable is a valid `Array`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isArray([])
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isArray([])) {
    // do something
}

```

</TabItem>
</Tabs>

#### `isBoolean`

The `isBoolean` helper checks if the given variable is a valid `Boolean`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isBoolean(variable)
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isBoolean(variable)) {
    // do something
}

```

</TabItem>
</Tabs>

#### `isClass`

The `isClass` helper checks if the given variable is a valid `Class`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isClass(variable)
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isClass(variable)) {
    // do something
}
```

</TabItem>
</Tabs>

#### `isFunction`

The `isFunction` helper checks if the given variable is a valid `Function`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isFunction(variable)
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isFunction(variable)) {
    // do something
}
```

</TabItem>
</Tabs>

#### `isNumber`

The `isNumber` helper checks if the given variable is a valid `Number`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isNumber(variable)
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isNumber(variable)) {
    // do something
}
```

</TabItem>
</Tabs>

#### `isObject`

The `isObject` helper checks if the given variable is a valid `Object`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isObject(variable)
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isObject(variable)) {
    // do something
}
```

</TabItem>
</Tabs>

#### `isString`

The `isString` helper checks if the given variable is a valid `String`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if isString(variable)
    # do something

```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (isString(variable)) {
    // do something
}
```

</TabItem>
</Tabs>

#### `toBoolean`

The `toBoolean` helper converts the given variable into a `Boolean` value:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
toBoolean('true') # true

toBoolean(true)   # true

toBoolean(1)      # true
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
toBoolean('true') // true

toBoolean(true)   // true

toBoolean(1)      // true
```

</TabItem>
</Tabs>

#### `wildcard`

The `wildcard` helper checks if the given variable matches a wildcard:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
wildcard('/user/*/edit', '/user/1/edit') # true

wildcard('/tasks/*', 'tasks/learn-imba') # true
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
wildcard('/user/*/edit', '/user/1/edit') // true

wildcard('/tasks/*', 'tasks/learn-imba') // true
```

</TabItem>
</Tabs>

### Strings

#### `slug`

The `slug` helper converts the given string into a slug:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
slug('Hello world', '-') # hello-world
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
slug('Hello world', '-') # hello-world
```

</TabItem>
</Tabs>

#### `strRandom`

The `strRandom` helper generates a random string:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
strRandom() # bfd809fc

# with custom length
strRandom(40) # 485f8c73737030df7872e2c3e5e2d3b0eb1d769f
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
strRandom() // bfd809fc

# with custom length
strRandom(40) // 485f8c73737030df7872e2c3e5e2d3b0eb1d769f
```

</TabItem>
</Tabs>

:::note

`length` must be divisible by 2.

:::

### Security

#### `encrypt`

The `encrypt` helper encrypts an object.

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
encrypt('Hello World') # f8867ec8f7960de147f4c2da37fe4b99
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
encrypt('Hello World') // f8867ec8f7960de147f4c2da37fe4b99
```

</TabItem>
</Tabs>

#### `decrypt`

The `decrypt` helper decrypts an encrypted value.

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
decrypt('f8867ec8f7960de147f4c2da37fe4b99') # Hello World
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
decrypt('f8867ec8f7960de147f4c2da37fe4b99') // Hello World
```

</TabItem>
</Tabs>

### Miscellaneous

#### `now`

The `now` helper returns the current timestamp instance for `Database` queries:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
now!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
now()
```

</TabItem>
</Tabs>

#### `expiresIn`

The `expiresIn` helper creates an expiration date for Redis:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
expiresIn('2 minutes')

expiresIn('1 hour')

expiresIn('3 days')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
expiresIn('2 minutes')

expiresIn('1 hour')

expiresIn('3 days')
```

</TabItem>
</Tabs>

#### `config`

The `config` function gets the value of a configuration variable. The configuration values are accessed using "dot" syntax, which includes the name of the file and the option you wish to access. A default value may be specified and is returned if the configuration option does not exist:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
const appName = config('app.name')

const appName = config('app.name', 'Something else')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const appName = config('app.name')

const appName = config('app.name', 'Something else')
```

</TabItem>
</Tabs>

#### `env`

The `env` function retrieves the value of an environment variable or returns a default value:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
const appUrl = env('APP_URL')

const appUrl = env('APP_URL', 'http://127.0.0.1:3000')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const appUrl = env('APP_URL')

const appUrl = env('APP_URL', 'http://127.0.0.1:3000')
```

</TabItem>
</Tabs>

#### `response`

The `response` function returns a response object to the client:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
response('Hello', 200)

response().json({
	message: 'Hello'
})

response().code(200)
```

</TabItem>
<TabItem value="ts">

```js showLineNumbers
response('Hello', 200)

response().json({
	message: 'Hello'
})

response().code(200)
```

</TabItem>
</Tabs>

#### `view`

The `view` function returns a view response to the client:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js showLineNumbers
view(Profile, { user }, 200)
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
view(Profile, { user }, 200)
```

</TabItem>
</Tabs>

#### `tap` & `multitap`

The `tap` function accepts two arguments: an arbitrary `value` and a `callback`. The `value` will be passed to the `callback` and then be returned by the `tap` function. The return value of the `callback` is irrelevant:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const user = tap User.forge!.first!, do(user)
	user.name = 'Donald'
	user.save!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const user = tap(User.forge().first(), (user: object) => {
	user.name = 'Donald'
	user.save()
})
```

</TabItem>
</Tabs>

If no `callback` is passed to the `tap` function, you may call any method on the given `value`. The return value of the method you call will always be `value`, regardless of what the method actually returns in its definition:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
user = tap(user).save({
	name: 'Donald'
})
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const user = tap(user).save({
	name: 'Donald'
})
```

</TabItem>
</Tabs>

You may also use the `multitap` function, this function allows you to access any method that's part of `value` by always returning `value` after you call a value method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const user = multitap(user)
	.setName('Donald')
	.setLocation('East Rand')
	.untap!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const user = multitap(user)
	.setName('Donald')
	.setLocation('East Rand')
	.untap()
```

</TabItem>
</Tabs>

In the example above, we have a `untap` method which we call at the end of our method calls, we do this so we can exit `multitap`.
