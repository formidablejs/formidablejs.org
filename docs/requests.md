---
id: requests
title: Requests
---

# HTTP Requests

The base `FormRequest` instance provides a variety of methods for examining the incoming HTTP request. `FormRequest` is built on top of `FastifyRequest`, this means you can access `FastifyRequest` methods and properties from the `FormRequest` instance.

> You may also use `Request`, an alias of `FormRequest`.

## Accessing The Request {#accessing-the-request}

Formidable loads requests to route actions as first parameters by default:

```py title="app/Http/Controllers/TaskController.imba"
export class TaskController < Controller

	def store request
		const description = request.get('description')
```

The request loaded by default, is the standard `FormRequest` class provided by the Formidable Framework.

To use a different `FormRequest`, you may use the `@use` decorator:

```py title="app/Http/Controllers/TaskController.imba"
import { @use } from '@formidablejs/framework'
import { StoreTaskRequest } from '../Requests/StoreTaskRequest'
import { Controller } from './Controller'

export class TaskController < Controller

	@use(StoreTaskRequest)
	def store request\StoreTaskRequest
		const description = request.get('description')
```

This, will use the `StoreTaskRequest` request instead.

### Request Host & Origin

#### Retrieving The Request Host

The `getHost` method returns the request's host:

```js
const host = request.getHost!
```

#### Retrieving The Request Origin

The `getOrigin` method returns the request's origin:

```js
const origin = request.getOrigin!
```

You may also use the `getFullOrigin` method to retrieve the full origin including the protocol:

```js
const fullOrigin = request.getFullOrigin!
```

#### Retrieving The Request Origin protocol

The `getOriginProtocol` method returns the request's protocol:

```js
const protocol = request.getOriginProtocol!
```

### Request Path, Param & Method

#### Retrieving The Request Url

The `url` method returns the request's path. So, if the incoming request is targeted at http://example.com/tasks/store, the `url` method will return `tasks/store`:

```js
const uri = request.url!
```

#### Inspecting The Request Url / Path / Route

The `isUrl` method allows you to verify that the incoming request path matches a given url:

```py
if request.isUrl 'tasks/store'
	# do somthing
```

> You may also use `pathIs`. You may use the `*` character as a wildcard when utilizing this method:

```py
if request.pathIs 'tasks/*'
	# do somthing
```

Using the `isRoute` method, you may determine if the incoming request has matched a [named route](/docs/routing#named-routes). You may use the `*` character as a wildcard when utilizing this method:

```py
if request.isRoute 'tasks.*'
	# do something
```

#### Retrieving The Request URL

To retrieve the full URL for the incoming request you may use the `url`, `urlWithoutQuery` or `fullUrl` methods. The `url` method will return the path with the query string, the `urlWithoutQuery` method will return the URL without the query string, and the `fullUrl` method will return the host, the path and the query string:

```js
const url = request.url!

const urlWithoutQueryString = request.urlWithoutQuery!

const fullUrl = request.fullUrl!
```

#### Retrieving Route Parameters

To retrieve a route parameter from the incoming request you may use the `param` method. The `param` method accepts a parameter name:

```js
const slug = request.param('slug')
```

To retrieve all route parameters, you may use the `params` method:

```js
const params = request.params!
```

#### Retrieving The Request Method

The `method` method will return the HTTP verb for the request. You may use the `isMethod` method to verify that the HTTP verb matches a given string:

```py
const method = request.method!

if request.isMethod 'POST'
	# do something
```

### Request Headers

You may retrieve a request header from the `FormRequest` instance using the header method. If the header is not present on the request, `null` will be returned. However, the `header` method accepts an optional second argument that will be returned if the header is not present on the request:

```js
const value = request.header('header-name')

const value = request.header('header-name', 'default')
```

The `hasHeader` method may be used to determine if the request contains a given header:

```py
if request.hasHeader 'header-name'
	# do something
```

For convenience, the `bearerToken` method may be used to retrieve a bearer token from the `Authorization` header. If no such header is present, an empty string will be returned:

```js
const token = request.bearerToken!
```

### Request IP Address

The `ip` method may be used to retrieve the IP address of the client that made the request to your application:

```js
const ipAddress = request.ip!
```

## Input

### Retrieving Input

#### Retrieving All Input Data

You may retrieve all of the incoming request's input data as an `object` using the `all` method:

```js
const input = request.all!
```

#### Retrieving An Input Value

Using a few simple methods, you may access all of the user input from your `FormRequest` instance without worrying about which HTTP verb was used for the request. Regardless of the HTTP verb, the input method may be used to retrieve user input:

```js
const name = request.input('name')
```

You may pass a default value as the second argument to the `input` method. This value will be returned if the requested input value is not present on the request:

```js
const name = request.input('name', 'Luna')
```

You may call the input method without any arguments in order to retrieve all of the input values as an object:

```js
const input = request.input!
```

#### Retrieving Input From The Query String

While the `input` method retrieves values from the entire request payload (including the query string), the `query` method will only retrieve values from the query string:

```js
const name = request.name('name')
```

If the requested query string value data is not present, the second argument to this method will be returned:

```js
const name = request.name('name', 'Luna')
```

You may call the `query` method without any arguments in order to retrieve all of the query string values as an `object`:

```js
const query = request.query!
```

#### Retrieving A Portion Of The Input Data

If you need to retrieve a subset of the `input` data, you may use the `only` method. This method accepts an array:

```js
const input = request.only(['email', 'password'])
```

#### Retrieving Input From The Input Data And The Query String

If you are expecting data from both the query string data and input data, you may use the `get` method. Note, input data takes first preference over the query string:

```js
const name = request.get('name')
```

If the requested query string value data or input data is not present, the second argument to this method will be returned:

```js
const name = request.get('name', 'Luna')
```

### Determining If Input Is Present

You may use the `has` method to determine if a value is present on the request. The has method returns `true` if the value is present on the request:

```py
if request.has 'name'
	# do something
```
