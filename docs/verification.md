---
id: verification
title: Email Verification
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Email Verification

Many web applications require users to verify their email addresses before using the application. Rather than forcing you to re-implement this feature by hand for each application you create, Formidable provides convenient built-in services for sending and verifying email verification requests.

### Database Preparation

Next, your `users` table must contain an `email_verified_at` column to store the date and time that the user's email address was verified. By default, the `users` table migration included with the Formidable framework already includes this column. So, all you need to do is run your database migrations:

```bash
node craftsman migrate:up
```

## Routing

Formidable provides email verification routes for your application. These routes are automatically added to your `routes/api.imba` or `routes/api.ts` files by the `RouterServiceResolver`.

See [Authentication Routes](/docs/authentication) for more information.

## Customization

#### Email Verification

To create a custom email verification mailable, you can run the following command:

```
node craftsman make:mail CustomEmail
```

The contents of the newely created `CustomEmail.imba` file will look like this:

```py title="app/Mail/CustomEmail.imba" showLineNumbers
import { Mailable } from '@formidablejs/framework'

export class CustomEmail < Mailable

	prop subject\String

	def constructor
		super!

	def render
		<p> "Hello World"
```

You can remove the `subject` prop and `constructor` method, then import the `VerifyEmail` mailable from the `@formidablejs/framework` package and extend it with your custom mailable:

```py title="app/Mail/CustomEmail.imba" showLineNumbers
import Mailable from '@formidablejs/framework/lib/Auth/Mail/VerifyEmail'

export class CustomEmail < Mailable

	def render
		<p> "Hello World"
```

Next, you can start styling your email.

:::note

Formidable publishes layout tags for all of its email mailable classes in the `resources/views/mail/vendor` directory, you may use these tags in your custom email, or modify the tags instead of creating a new custom verification email. <br/> If you don't see this directory, you may run: `node craftsman package:publish --package=@formidablejs/mailer --tag=components,config` to publish the tags.

:::

#### Email Verification URL

To access the email verification URL, you can use the `verificationUrl` property of the `FormRequest` instance:

```js showLineNumbers
def render
	const url = self.request.verificationUrl

	<a href=url> "Click here: {url} to verify your email address"
```
