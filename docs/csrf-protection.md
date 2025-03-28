---
id: csrf-protection
title: CSRF Protection
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# CSRF Protection

## Introduction {#introduction}

Formidable makes it easy to protect your application from [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) attacks. Cross-site request forgeries are a type of malicious exploit whereby unauthorized commands are performed on behalf of an authenticated user.

Formidable automatically generates a CSRF "token" for each active user session managed by the application. This token is used to verify that the authenticated user is the one actually making the requests to the application.

Before you can access the generated CSRF token, your application needs to make a call to the `/csrf-cookie` URI. This URI will ensure that the CSRF token is added to your cookie with the name `XSRF-TOKEN`.

To use this token in your client application, retrieve the token from your cookies, and add it to your form as `_token`, or to your headers as `X-CSRF-TOKEN`.

You may use [js-cookie](https://github.com/js-cookie/js-cookie) to retrieve the CSRF token from your cookies.

## Protecting routes {#protecting-routes}

To protect any route that's not in the `session` group, you may use the `VerifyCsrfToken` middleware:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js title="routes/api.imba" {8} showLineNumbers
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { VerifyCsrfToken } from '@formidablejs/framework'

Route.post('/tasks/create', do(request\Request)
	# do something...
).middleware([VerifyCsrfToken])
```

</TabItem>
<TabItem value="ts">

```ts title="routes/api.ts" {8} showLineNumbers
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { VerifyCsrfToken } from '@formidablejs/framework'

Route.post('/tasks/create', (request: Request) => {
	// do something...
}).middleware([VerifyCsrfToken])
```

</TabItem>
</Tabs>
