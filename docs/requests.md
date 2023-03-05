---
id: requests
title: Requests
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# HTTP Requests

The base `FormRequest` instance provides a variety of methods for examining the incoming HTTP request. `FormRequest` is built on top of `FastifyRequest`, this means you can access `FastifyRequest` methods and properties from the `FormRequest` instance.

> You may also use `Request`, an alias of `FormRequest`.

## Accessing The Request {#accessing-the-request}

Formidable loads requests to route actions as first parameters by default:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/TaskController.imba"
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'

export class TaskController < Controller

	def store request\Request
		const description\string = request.get('description')
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/TaskController.ts"
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'

export class TaskController extends Controller {
	store(request: Request): void {
		const description: string = request.get('description')
	}
}
```

</TabItem>
</Tabs>

The request loaded by default, is the standard `FormRequest` class provided by the Formidable Framework.

To use a different `FormRequest`, you may use the `@use` decorator:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Http/Controllers/TaskController.imba"
import { @use } from '@formidablejs/framework'
import { StoreTaskRequest } from '../Requests/StoreTaskRequest'
import { Controller } from './Controller'

export class TaskController < Controller

	@use(StoreTaskRequest)
	def store request\StoreTaskRequest
		const description\string = request.get('description')
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/TaskController.ts"
import { use } from '@formidablejs/ts-ports'
import { StoreTaskRequest } from '../Requests/StoreTaskRequest'
import { Controller } from './Controller'

export class TaskController extends Controller {
	@use(StoreTaskRequest)
	store(request: StoreTaskRequest): void {
		const description: string = request.get('description')
	}
}
```

</TabItem>
</Tabs>

This, will use the `StoreTaskRequest` request instead.

### Request Host & Origin

#### Retrieving The Request Host

The `getHost` method returns the request's host:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const host\string = request.getHost!
```

</TabItem>
<TabItem value="ts">

```js
const host: string = request.getHost()
```

</TabItem>
</Tabs>

#### Retrieving The Request Origin

The `getOrigin` method returns the request's origin:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const origin\string = request.getOrigin!
```

</TabItem>
<TabItem value="ts">

```ts
const origin: string = request.getOrigin()
```

</TabItem>
</Tabs>

You may also use the `getFullOrigin` method to retrieve the full origin including the protocol:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const fullOrigin\string = request.getFullOrigin!
```

</TabItem>
<TabItem value="ts">

```ts
const fullOrigin: string = request.getFullOrigin()
```

</TabItem>
</Tabs>

#### Retrieving The Request Origin protocol

The `getOriginProtocol` method returns the request's protocol:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const protocol\string = request.getOriginProtocol!
```

</TabItem>
<TabItem value="ts">

```ts
const protocol: string = request.getOriginProtocol()
```

</TabItem>
</Tabs>

### Request Path, Param & Method

#### Retrieving The Request Url

The `url` method returns the request's path. So, if the incoming request is targeted at http://example.com/tasks/store, the `url` method will return `tasks/store`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const uri = request.url!
```

</TabItem>
<TabItem value="ts">

```ts
const uri = request.url()
```

</TabItem>
</Tabs>

#### Inspecting The Request Url / Path / Route

The `isUrl` method allows you to verify that the incoming request path matches a given url:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
if request.isUrl 'tasks/store'
	# do somthing
```

</TabItem>
<TabItem value="ts">

```ts
if (request.isUrl('tasks/store')) {
	// do somthing
}
```

</TabItem>
</Tabs>


> You may also use `pathIs`. You may use the `*` character as a wildcard when utilizing this method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
if request.pathIs 'tasks/*'
	# do somthing
```

</TabItem>
<TabItem value="ts">

```ts
if (request.pathIs('tasks/*')) {
	// do somthing
}
```

</TabItem>
</Tabs>

Using the `isRoute` method, you may determine if the incoming request has matched a [named route](/docs/routing#named-routes). You may use the `*` character as a wildcard when utilizing this method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
if request.isRoute 'tasks.*'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts
if (request.isRoute('tasks.*')) {
	// do something
}
```

</TabItem>
</Tabs>

#### Retrieving The Request URL

To retrieve the full URL for the incoming request you may use the `url`, `urlWithoutQuery` or `fullUrl` methods. The `url` method will return the path with the query string, the `urlWithoutQuery` method will return the URL without the query string, and the `fullUrl` method will return the host, the path and the query string:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const url\string = request.url!

const urlWithoutQueryString\string = request.urlWithoutQuery!

const fullUrl\string = request.fullUrl!
```

</TabItem>
<TabItem value="ts">

```ts
const url: string = request.url()

const urlWithoutQueryString: string = request.urlWithoutQuery()

const fullUrl: string = request.fullUrl()
```

</TabItem>
</Tabs>

#### Retrieving Route Parameters

To retrieve a route parameter from the incoming request you may use the `param` method. The `param` method accepts a parameter name:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const slug\string|null = request.param('slug')
```

</TabItem>
<TabItem value="ts">

```ts
const slug: string|null = request.param('slug')
```

</TabItem>
</Tabs>

To retrieve all route parameters, you may use the `params` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const params\object = request.params!
```

</TabItem>
<TabItem value="ts">

```ts
const params: object = request.params()
```

</TabItem>
</Tabs>

#### Retrieving The Request Method

The `method` method will return the HTTP verb for the request. You may use the `isMethod` method to verify that the HTTP verb matches a given string:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
const method\string = request.method!

if request.isMethod 'POST'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts
const method: string = request.method()

if (request.isMethod('POST')) {
	// do something
}
```

</TabItem>
</Tabs>

### Request Headers

You may retrieve a request header from the `FormRequest` instance using the header method. If the header is not present on the request, `null` will be returned. However, the `header` method accepts an optional second argument that will be returned if the header is not present on the request:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const value\string|null = request.header('header-name')

const value\string = request.header('header-name', 'default')
```

</TabItem>
<TabItem value="ts">

```ts
const value: string|null = request.header('header-name')

const value: string = request.header('header-name', 'default')
```

</TabItem>
</Tabs>

The `hasHeader` method may be used to determine if the request contains a given header:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
if request.hasHeader 'header-name'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts
if (request.hasHeader('header-name')) {
	// do something
}
```

</TabItem>
</Tabs>

For convenience, the `bearerToken` method may be used to retrieve a bearer token from the `Authorization` header. If no such header is present, an empty string will be returned:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const token\string|null = request.bearerToken!
```

</TabItem>
<TabItem value="ts">

```ts
const token: string|null = request.bearerToken()
```

</TabItem>
</Tabs>

### Request IP Address

The `ip` method may be used to retrieve the IP address of the client that made the request to your application:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const ipAddress\string = request.ip!
```

</TabItem>
<TabItem value="ts">

```ts
const ipAddress: string = request.ip()
```

</TabItem>
</Tabs>

## Input

### Retrieving Input

#### Retrieving All Input Data

You may retrieve all of the incoming request's input data as an `object` using the `all` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const input\object = request.all!
```

</TabItem>
<TabItem value="ts">

```ts
const input: object = request.all()
```

</TabItem>
</Tabs>

#### Retrieving An Input Value

Using a few simple methods, you may access all of the user input from your `FormRequest` instance without worrying about which HTTP verb was used for the request. Regardless of the HTTP verb, the input method may be used to retrieve user input:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const name\string|null = request.input('name')
```

</TabItem>
<TabItem value="ts">

```ts
const name: string|null = request.input('name')
```

</TabItem>
</Tabs>

You may pass a default value as the second argument to the `input` method. This value will be returned if the requested input value is not present on the request:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const name\string = request.input('name', 'Luna')
```

</TabItem>
<TabItem value="ts">

```ts
const name: string = request.input('name', 'Luna')
```

</TabItem>
</Tabs>


You may call the input method without any arguments in order to retrieve all of the input values as an object:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const input\object = request.input!
```

</TabItem>
<TabItem value="ts">

```ts
const input: object = request.input()
```

</TabItem>
</Tabs>


#### Retrieving Input From The Query String

While the `input` method retrieves values from the entire request payload (including the query string), the `query` method will only retrieve values from the query string:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const name\string|null = request.name('name')
```

</TabItem>
<TabItem value="ts">

```ts
const name: string|null = request.name('name')
```

</TabItem>
</Tabs>

If the requested query string value data is not present, the second argument to this method will be returned:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const name\string = request.name('name', 'Luna')
```

</TabItem>
<TabItem value="ts">

```ts
const name: string = request.name('name', 'Luna')
```

</TabItem>
</Tabs>

You may call the `query` method without any arguments in order to retrieve all of the query string values as an `object`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const query\object = request.query!
```

</TabItem>
<TabItem value="ts">

```ts
const query: object = request.query()
```

</TabItem>
</Tabs>

#### Retrieving A Portion Of The Input Data

If you need to retrieve a subset of the `input` data, you may use the `only` method. This method accepts an array:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const input\object = request.only(['email', 'password'])
```

</TabItem>
<TabItem value="ts">

```ts
const input: object = request.only(['email', 'password'])
```

</TabItem>
</Tabs>

#### Retrieving Input From The Input Data And The Query String

If you are expecting data from both the query string data and input data, you may use the `get` method. Note, input data takes first preference over the query string:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const name\string|null = request.get('name')
```

</TabItem>
<TabItem value="ts">

```ts
const name: string|null = request.get('name')
```

</TabItem>
</Tabs>


If the requested query string value data or input data is not present, the second argument to this method will be returned:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
const name\string = request.get('name', 'Luna')
```

</TabItem>
<TabItem value="ts">

```ts
const name: string = request.get('name', 'Luna')
```

</TabItem>
</Tabs>

### Determining If Input Is Present

You may use the `has` method to determine if a value is present on the request. The has method returns `true` if the value is present on the request:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py
if request.has 'name'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts
if(request.has('name')) {
	// do something
}
```

</TabItem>
</Tabs>
