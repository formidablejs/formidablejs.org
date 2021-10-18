---
id: helpers
title: Helpers
---

# Helpers

Formidable includes a variety of "helper" functions. Many of these functions are used by the framework itself; however, you are free to use them in your own applications if you find them convenient.

## Available Methods

### Arrays & Objects

#### `asObject`

The `asObject` method, converts a custom object into a JavaScript object:

```js
const object = asObject(customObject)
```

#### `dotNotation`

The `dotNotation` method turns an object into a single level value that uses "dot" notation to indicate depth:

```js
const object = {
    app: {
        name: 'Formidable'
    }
}

const appName = dotNotation(object, 'app.locale')
```

You may also use `dot`, an alias of `dotNotation`:

```js
const object = {
    app: {
        name: 'Formidable'
    }
}

const appName = dot(object, 'app.locale')
```

#### `without`

The `without` helper removes specified data from the given `object`:

```js
without({
    name: 'Donald',
    city: 'East Rand'
}, ['city'])

# { name: 'Donald' }
```

#### `isArray`

The `isArray` helper checks if the given variable is a valid `Array`:

```py
if isArray([])
    # do something

```

#### `isBoolean`

The `isBoolean` helper checks if the given variable is a valid `Boolean`:

```py
if isBoolean(variable)
    # do something

```

#### `isClass`

The `isClass` helper checks if the given variable is a valid `Class`:

```py
if isClass(variable)
    # do something

```

#### `isFunction`

The `isFunction` helper checks if the given variable is a valid `Function`:

```py
if isFunction(variable)
    # do something

```

#### `isNumber`

The `isNumber` helper checks if the given variable is a valid `Number`:

```py
if isNumber(variable)
    # do something

```

#### `isObject`

The `isObject` helper checks if the given variable is a valid `Object`:

```py
if isObject(variable)
    # do something

```

#### `isString`

The `isString` helper checks if the given variable is a valid `String`:

```py
if isString(variable)
    # do something

```

#### `toBoolean`

The `toBoolean` helper converts the given variable into a `Boolean` value:

```py
toBoolean('true') # true

toBoolean(true)   # true

toBoolean(1)      # true
```

#### `wildcard`

The `wildcard` helper checks if the given variable matches a wildcard:

```py
wildcard('/user/*/edit', '/user/1/edit') # true

wildcard('/tasks/*', 'tasks/learn-imba') # true
```

### Strings

#### `slug`

The `slug` helper converts the given string into a slug:

```py
slug('Hello world', '-') # hello-world
```

#### `strRandom`

The `strRandom` helper generates a random string:

```py
strRandom() # bfd809fc

# with custom length
strRandom(40) # 485f8c73737030df7872e2c3e5e2d3b0eb1d769f
```

> Note, `length` must be divisible by 2.

### Security

#### `encrypt`

The `encrypt` helper encrypts an object.

```py
encrypt('Hello World') # f8867ec8f7960de147f4c2da37fe4b99
```

#### `decrypt`

The `decrypt` helper decrypts an encrypted value.

```py
decrypt('f8867ec8f7960de147f4c2da37fe4b99') # Hello World
```

### Miscellaneous

#### `now`

The `now` helper returns the current timestamp instance for `Database` queries:

```py
now!
```

#### `expiresIn`

The `expiresIn` helper creates an expiration date for Redis:

```py
expiresIn('2 minutes')

expiresIn('1 hour')

expiresIn('3 days')
```

#### `config`

The `config` method gets the value of a configuration variable. The configuration values are accessed using "dot" syntax, which includes the name of the file and the option you wish to access. A default value may be specified and is returned if the configuration option does not exist:

```js
const appName = config('app.name')

const appName = config('app.name', 'Something else')
```

#### `env`

The `env` method retrieves the value of an environment variable or returns a default value:

```js
const appUrl = env('APP_URL')

const appUrl = env('APP_URL', 'http://localhost:3000')
```

#### `response`

The `response` method returns a response object to the client:

```js
response('Hello', 200)

response().json({
	message: 'Hello'
})

response().code(200)
```

#### `view`

The `view` method returns a view response to the client:

```py
view(Profile, { user }, 200)
```
