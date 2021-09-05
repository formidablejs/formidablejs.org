---
id: verification
title: Email Verification
---

# Email Verification

Many web applications require users to verify their email addresses before using the application. Rather than forcing you to re-implement this feature by hand for each application you create, Formidable provides convenient built-in services for sending and verifying email verification requests.

### Database Preparation

Next, your `users` table must contain an `email_verified_at` column to store the date and time that the user's email address was verified. By default, the `users` table migration included with the Formidable framework already includes this column. So, all you need to do is run your database migrations:

```
craftsman migrate up
```

## Routing

Formidable provides email verification routes for your application. These routes are automatically added to your `routes/api.imba` file by the `RouterServiceResolver`.

See [Authentication Routes](docs/authentication#emailverify) for more information.

## Customization

#### Email Verification

To create a custom email verification mailable, you can run the following command:

```
craftsman make mail CustomEmail
```

The contents of the newely created `CustomEmail.imba` file will look like this:

```py
import { Mailable } from '@formidable/framework'

export default class CustomEmail < Mailable

	prop subject\String

	def constructor
		super!

	def render
		<p> "Hello World"
```

You can remove the `subject` prop and `constructor` method, then import the `VerifyEmail` mailable from the `@formidable/framework` package and extend it with your custom mailable:

```py
import Mailable from '@formidablejs/framework/lib/Auth/Mail/VerifyEmail'

export default class CustomEmail < Mailable

	def render
		<p> "Hello World"
```

Next, you can start styling your email.

> Note: Formidable publishes layout tags for all of its email mailable classes in the `resources/views/email/vendor` directory, you may use these tags in your custom email, or modify the tags instead of creating a new custom verification email. <br/> If you don't see this directory, you may run: `craftsman install --package=@formidablejs/mailer` to publish the tags.

#### Email Verification URL	

To access the email verification URL, you can use the `verificationUrl` property of the `FormRequest` instance:

```js
def render
	const url = self.request.verificationUrl

	<a href=url> "Click here: {url} to verify your email address"
```
