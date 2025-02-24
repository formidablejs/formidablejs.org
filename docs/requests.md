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

```py title="app/Http/Controllers/TaskController.imba" showLineNumbers
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'

export class TaskController < Controller

	def store request\Request
		const description\string = request.get('description')
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Controllers/TaskController.ts" showLineNumbers
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

```py title="app/Http/Controllers/TaskController.imba" showLineNumbers
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

```ts title="app/Http/Controllers/TaskController.ts" showLineNumbers
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

```js showLineNumbers
const host\string = request.getHost!
```

</TabItem>
<TabItem value="ts">

```js showLineNumbers
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

```js showLineNumbers
const origin\string = request.getOrigin!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const fullOrigin\string = request.getFullOrigin!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const protocol\string = request.getOriginProtocol!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const uri = request.url!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```py showLineNumbers
if request.isUrl 'tasks/store'
	# do somthing
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```py showLineNumbers
if request.pathIs 'tasks/*'
	# do somthing
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```py showLineNumbers
if request.isRoute 'tasks.*'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const url\string = request.url!

const urlWithoutQueryString\string = request.urlWithoutQuery!

const fullUrl\string = request.fullUrl!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const slug\string|null = request.param('slug')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const params\object = request.params!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```py showLineNumbers
const method\string = request.method!

if request.isMethod 'POST'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const value\string|null = request.header('header-name')

const value\string = request.header('header-name', 'default')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```py showLineNumbers
if request.hasHeader 'header-name'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const token\string|null = request.bearerToken!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const ipAddress\string = request.ip!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const input\object = request.all!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const name\string|null = request.input('name')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const name\string = request.input('name', 'Luna')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const input\object = request.input!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const name\string|null = request.name('name')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const name\string = request.name('name', 'Luna')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const query\object = request.query!
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const input\object = request.only(['email', 'password'])
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const name\string|null = request.get('name')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```js showLineNumbers
const name\string = request.get('name', 'Luna')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
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

```py showLineNumbers
if request.has 'name'
	# do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if(request.has('name')) {
	// do something
}
```

</TabItem>
</Tabs>

## File Uploads

Formidable provides an easy way to work with file uploads. You may access uploaded files using the `file` method on the `FormRequest` instance. The `file` method returns an instance of `FileCollection`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const files = request.file('avatar')
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const files = request.file('avatar')
```

</TabItem>
</Tabs>

### File Methods

#### Retrieving A File

The `file` method returns an instance of `FileCollection`. You may use the `first` method to retrieve the first file in the collection:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```py showLineNumbers
const file = request.file('avatar').first()
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const file = request.file('avatar').first()
```

</TabItem>
</Tabs>

#### Retrieving All Files

The `all` method may be used to retrieve all of the files in the collection:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>

<TabItem value="imba">

```py showLineNumbers
const files = request.file('avatar').all()
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const files = request.file('avatar').all()
```

</TabItem>
</Tabs>

You may also use the `get` method to retrieve all of the files in the collection:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const files = request.file('avatar').get()
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const files = request.file('avatar').get()
```

</TabItem>
</Tabs>

#### Retrieving First File

The `first` method may be used to retrieve the first file in the collection:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const file = request.file('avatar').first()
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const file = request.file('avatar').first()
```

</TabItem>
</Tabs>

#### Retrieving Last File

The `last` method may be used to retrieve the last file in the collection:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const file = request.file('avatar').last()
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const file = request.file('avatar').last()
```

</TabItem>
</Tabs>

#### Retrieving Files By Filter

You may use the `filter` method to retrieve files that match a given filter. The `filter` method accepts a callback function that will be used to filter the files:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const files = request.file('avatar').filter do(file)
    file.size > 1000
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const files = request.file('avatar').filter(file => file.size > 1000)
```

</TabItem>
</Tabs>

You may also use the `where` method to retrieve files that match a given key-value pair:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const files = request.file('avatar').where('mimetype', 'image/png').get()
```

</TabItem>

<TabItem value="ts">

```ts showLineNumbers
const files = request.file('avatar').where('mimetype', 'image/png').get()
```

</TabItem>
</Tabs>


#### Mapping Through Files

You may use the `map` method to iterate over the files in the collection. The `map` method accepts a callback function that will be used to map over the files:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const files = request.file('avatar').map do(file)
    # do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const files = request.file('avatar').map(file => {
    // do something
})
```

</TabItem>
</Tabs>

#### Iterating Over Files

You may use the `each` method to iterate over the files in the collection. The `each` method accepts a callback function that will be used to iterate over the files:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
request.file('avatar').each do(file)
    # do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
request.file('avatar').each(file => {
    // do something
})
```


</TabItem>
</Tabs>

#### Counting Files

You may use the `count` method to count the number of files in the collection:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const count = request.file('avatar').count()
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const count = request.file('avatar').count()
```

</TabItem>
</Tabs>

#### Determining If Files Are Present

You may use the `hasFiles` method to determine if files are present in the collection. The `hasFiles` method returns `true` if files are present in the collection:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if request.file('avatar').hasFiles()
    # do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (request.file('avatar').hasFiles()) {
    // do something
}
```

</TabItem>
</Tabs>

You may also use the `hasFile` method on the `Request` or `FormRequest` instance to determine if a file is present on the request. The `hasFile` method returns `true` if the file is present on the request:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
if request.hasFile('avatar')
    # do something
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
if (request.hasFile('avatar')) {
    // do something
}
```

</TabItem>
</Tabs>

### Working With Files

#### Storing Files

You may use the `move` method to move an uploaded file to a new location. The `move` method accepts two arguments: the destination directory and overwriting the file if it already exists:

<Tabs
    defaultValue={State.language}
    groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py showLineNumbers
const avatar = request.file('avatar').first()

avatar.move("storage/avatars/{avatar.name}", true)
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const avatar = request.file('avatar').first()

avatar.move(`storage/avatars/${avatar.name}`, true)
```

</TabItem>
</Tabs>


#### Retrieving File Information

You may retrieve information about an uploaded file using the following getters:

Property | Description
--- | ---
`name` | The name of the file.
`filename` | The name of the file.
`encoding` | The encoding of the file.
`mime` | The MIME type of the file.
`mimetype` | The MIME type of the file.
`type` | The MIME type of the file.
`path` | The path to the file.
`extension` | The extension of the file.
`ext` | The extension of the file.
`size` | The size of the file in MB.

For example, to retrieve the extension of an uploaded file, you may use the `extension` getter:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```py showLineNumbers
const avatar = request.file('avatar').first()

const extension = avatar.extension
```

</TabItem>
<TabItem value="ts">

```ts showLineNumbers
const avatar = request.file('avatar').first()

const extension = avatar.extension
```

</TabItem>
</Tabs>

#### Validating File Uploads

When working with file uploads, you may use the `file` rule to validate that the uploaded file is a file. The `file` rule may be used to validate that the uploaded file is an image, audio, video, or PDF file. The `file` rule may be used to validate that the uploaded file is an image file:

<Tabs
	defaultValue={State.language}
	groupId="code-snippets"
	values={[
		{label: 'Imba', value: 'imba'},
		{label: 'TypeScript', value: 'ts'},
	]}>
<TabItem value="imba">

```py title="app/Http/Requests/StorePersonRequest.imba" {6} showLineNumbers
import { Request } from '@formidablejs/framework'

export class StorePersonRequest < Request

	def rules
		avatar: 'required|file|image'
```

</TabItem>
<TabItem value="ts">

```ts title="app/Http/Requests/StorePersonRequest.ts" {6} showLineNumbers
import { Request } from '@formidablejs/framework'

export class StorePersonRequest extends Request {
	rules() {
		return {
			avatar: 'required|file|image'
		}
	}
}
```

</TabItem>
</Tabs>

:::info

For a list of available validation rules, see the [Validation documentation](/docs/validation#available-rules).

:::


## Type-safe

When using TypeScript, you may generate types based on your request rules. You may do this for the purpose of type-hinting your request within your forms. This works with Imba (SPA), Vue, React, and Svelte.

:::info

This feature is only available when using TypeScript as the default language and [nodemon](/docs/rc#mode) as the default development mode.

:::

### Generating Types

To generate types, you may use the `types:generate` Craftsman command:

```bash
node craftsman types:generate
```

This command will generate types for all of your request rules. The generated types will be placed in the `app/Types/Forms` directory.

### Using Generated Types

Once you have generated your types, you may use them in your frontend forms. For example, let's assume we have a `StorePersonRequest` class that contains the following rules:

```ts title="app/Http/Requests/StorePersonRequest.ts" {6-10} showLineNumbers
import { Request } from '@formidablejs/framework'

export class StorePersonRequest extends Request {
	rules() {
		return {
			first_name: 'required|string',
			last_name: 'required|string',
			email: 'required|email',
			phone: 'nullable|string',
			address: 'nullable|string',
		}
	}
}
```

After running the `types:generate` command, we will have a `StorePersonForm` type generated in the `app/Types/Forms` directory:

```ts title="app/Types/Forms/StorePersonForm.ts" showLineNumbers
type StorePersonForm = {
	first_name: string
	last_name: string
	email: string
	phone: string | null
	address: string | null
}
```

We may now use this type in our frontend form:

<Tabs
    defaultValue={State.framework}
	groupId="frameworks"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'Vue', value: 'vue'},
        {label: 'React', value: 'react'},
        {label: 'Svelte', value: 'svelte'},
    ]}>
<TabItem value="imba">

Create a `useStorePersonForm` typescript file that exports a `useStorePersonForm` function in the `resources/frontend/Pages/People` directory:

```ts title="resources/frontend/Pages/People/useStorePersonForm.ts" showLineNumbers
import { useForm } from '@formidablejs/view'

export const useStorePersonForm = useForm<StorePersonForm>
```

And finally, import the `useStorePersonForm` function in your `Create.imba` file:

```js title="resources/frontend/Pages/People/Create.imba" {4-10} showLineNumbers
import { useStorePersonForm } from './useStorePersonForm'

export tag Create
	prop form = useStorePersonForm({
		first_name: ''
		last_name: ''
		email: ''
		phone: ''
		address: ''
	})

	...
```
</TabItem>

<TabItem value="vue">

Create a `Create.vue` file in the `resources/js/Pages/People` directory:

```html title="resources/js/Pages/People/Create.vue" {4-10} showLineNumbers
<script lang="ts" setup>
import { useForm } from '@inertia/vue3'

const form = useForm<StorePersonForm>({
	first_name: '',
	last_name: '',
	email: '',
	phone: null,
	address: null
})
</script>

...
```

</TabItem>

<TabItem value="react">

Create a `Create.tsx` file in the `resources/js/Pages/People` directory:

```tsx title="resources/js/Pages/People/Create.tsx" {4-10} showLineNumbers
import { useForm } from '@inertiajs/react'

export default function Create() {
	const { data, setData, post, processing, errors } = useForm<StorePersonForm>({
		first_name: '',
		last_name: '',
		email: '',
		phone: null,
		address: null
	})

	...
}
```

</TabItem>

<TabItem value="svelte">

Create a `Create.svelte` file in the `resources/js/Pages/People` directory:

```html title="resources/js/Pages/People/Create.svelte" {5-11} showLineNumbers
<script>
import { useForm } from '@inertiajs/svelte'

/** @type {StorePersonForm} form */
let form = useForm({
	first_name: '',
	last_name: '',
	email: '',
	phone: null,
	address: null
})

</script>

...

```
</TabItem>

</Tabs>

### Auto-generation

You may also generate types automatically when you run the `serve` command with the `--dev` flag. You can do this by adding the `node craftsman types:generate` command to your `package.json` file under `development.commands`:

```json title="package.json" {5} showLineNumbers
{
	"development": {
		"mode": "nodemon",
		"commands": [
			"node craftsman types:generate",
		]
	}
}
```

This will generate types for all of your request rules whenever you make changes to your application.
