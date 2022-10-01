---
id: responses
title: Responses
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# HTTP Responses

## Creating Responses

#### Strings & Arrays & Objects

All routes and controllers should return a response to be sent back to the client. Formidable provides several different ways to return responses. The most basic response is returning a string from a route or controller. Formidable will automatically convert the string into a full HTTP response:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
Route.get '/', do 'Hello World!'
```

</TabItem>
<TabItem value="ts">

```ts
Route.get('/', (): string => 'Hello World!')
```

</TabItem>
</Tabs>

In addition to returning strings from your routes and controllers, you may also return arrays. Formidable will automatically convert the array into a JSON response:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
Route.get '/', do [ 'Donald', 'Luna' ]
```

</TabItem>
<TabItem value="ts">

```ts
Route.get('/', (): Array<string> => [ 'Donald', 'Luna' ]))
```

</TabItem>
</Tabs>

You may also return an object, Formidable will automatically convert the object into a JSON response:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
Route.get '/', do {
	name: 'Luna'
}
```

</TabItem>
<TabItem value="ts">

```ts
Route.get('/', (): object => {
	name: 'Luna'
})
```

</TabItem>
</Tabs>

Notice how we didn't include the `return` keyword, this is because Imba returns the last value/object by default.

## Attaching Headers To Responses

You may use the `setHeader` method to attach a header to your response. The `header` method is part of the `FormRequest` instance:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
request.setHeader('x-header', 'x-value')
```

</TabItem>
<TabItem value="ts">

```ts
request.setHeader('x-header', 'x-value')
```

</TabItem>
</Tabs>

You may also attach multiple headers by chaining the `setHeader` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
request
	.setHeader('x-header-1', 'x-value')
	.setHeader('x-header-2', 'x-value')
	.setHeader('x-header-3', 'x-value')
```

</TabItem>
<TabItem value="ts">

```ts
request
	.setHeader('x-header-1', 'x-value')
	.setHeader('x-header-2', 'x-value')
	.setHeader('x-header-3', 'x-value')
```

</TabItem>
</Tabs>

> This can be done from Route actions, Middlewares and any other place where the `FormRequest` instance is present.

## Redirects

Redirect responses are instances of the `Redirect` class. To get started with a simple redirect, you may return `Redirect` instance anywhere in your application:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Redirect } from '@formidablejs/framework'

Redirect.to('posts/deleted')
```

</TabItem>
<TabItem value="ts">

```ts
import { Redirect } from '@formidablejs/framework'

Redirect.to('posts/deleted')
```

</TabItem>
</Tabs>

#### Redirecting To Named Routes

You may also redirect back to a named route by using the `route` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
Redirect.route('posts.deleted')
```

</TabItem>
<TabItem value="ts">

```ts
Redirect.route('posts.deleted')
```

</TabItem>
</Tabs>

If your route has parameters, you may pass them as the second argument to the `route` method:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
Redirect.route('posts.show', {
	id: 1
})
```

</TabItem>
<TabItem value="ts">

```ts
Redirect.route('posts.show', {
	id: 1
})
```

</TabItem>
</Tabs>
