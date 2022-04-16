---
id: authentication
title: Authentication
---

# Authentication

Formidable provides a starter authentication system for both `session` and `jwt` based applications. By default, `session` based authentication is enabled.

The `session` based authentication system enables the use of cookies, and stores the session data in `memory`, `file` or `redis`. While the `jwt` based authentication system enables the use of JWT tokens, and stores authentication data in the database.

You can find your application's authentication configuration in `config/auth.imba`.

## Getting Started

Formidable will automatically enable authentication for you. Should you not want to use authentication in your application, you can disable it by removing `Auth.routes!` from the `app/Resolvers/RouterServiceResolver.imba`, this will disable all authentication routes.

## Database Considerations

Its important to note that you will need to create a database for your application to use authentication. If a database has been created, head over to your `.env` file and `config/database.imba` config file to configure your database connection, once this is done, you can run:

```
node craftsman migrate:latest
```

This will create all the tables needed for authentication. `users`, `password_resets` and `personal_access_tokens` tables will be created.

## Authentication Routes

Here is a list of all the authentication routes provided by Formidable:

### Default Headers

All routes in this section will require the `Content-Type` and `Accept` headers to be set to `application/json`.

If you are using the `session` based authentication system and have enabled the `HasCsrfToken` and `VerifyCsrfToken` middlewares, you will need to set the `X-CSRF-TOKEN` header to the value of the CSRF token.

### Configure Client

The `email` and `password` routes require a client url to be configured. This url is prepended to the routes. To configure this url, head over to your `.env` and set the `CLIENT_URL` environment variable.

### Available Routes

#### /login

Log a user in

```
POST http://localhost:3000/login
Content-Type: application/json

{
	"email": "email-address",
	"password": "password"
}
```

#### /logout

Log a user out

```
POST http://localhost:3000/logout
```

#### /register

Register a user

```
POST http://localhost:3000/register
Content-Type: application/json

{
	"name": "full-name",
	"email": "email-address",
	"password": "password",
	"password_confirmation": "password"
}
```

#### /email/verify

Verify a user's email address

```
POST http://localhost:3000/email/verify?email={email-address}&signature={signature}
```

The email address and signiture are provided in the query string and can be found in the `VerifyEmail` mailer that get's sent to the user. When the user clicks the link in the email, the user will be redirected to `{CLIENT_URL}/email/verify?email={email-address}&signature={signature}`.

Here, you can extract the email address and signature from the query string and verify the email address by sending a post request to `/email/verify` with the extracted email address and signature.

#### /email/resend

Resend an email verification email to a user

```
POST http://localhost:3000/email/resend
Content-Type: application/json

{
	"email": "email-address"
}
```

#### /password/forgot

Request a password reset email

```
POST http://localhost:3000/password/forgot
Content-Type: application/json

{
	"email": "email-address"
}
```

#### /password/reset

Reset a password

```
POST http://localhost:3000/password/reset
Content-Type: application/json

{
	"password": "password",
	"password_confirmation": "password",
}
```

The email address and signiture are provided in the query string and can be found in the `ForgotPassword` mailer that get's sent to the user. When the user clicks the link in the email, the user will be redirected to `{CLIENT_URL}/password/reset?email={email-address}&signature={signature}`.

Here, you can extract the email address and signature from the query string and reset the user's password by sending a post request to `/password/reset` with the extracted email address and signature.

## Authentication Events

Formidable provides a number of events that can be used to hook into your application's authentication.

#### `beforeLogin`

The `beforeLogin` event is fired before a user is logged in:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeLogin do(request, reply)
			# Do something
```

#### `beforeLogout`

The `beforeLogout` event is fired before a user is logged out:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeLogout do(request, reply)
			# Do something
```

#### `beforeRegister`

The `beforeRegister` event is fired before a user is registered:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeRegister do(request, reply)
			# Do something
```

#### `beforeVerify`

The `beforeVerify` event is fired before a user email is verified:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeVerify do(request, reply)
			# Do something
```

#### `beforeResend`

The `beforeResend` event is fired before a user verification email is resent:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeResend do(request, reply)
			# Do something
```

#### `beforeForgot`

The `beforeForgot` event is fired before a user password reset email is sent:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeForgot do(request, reply)
			# Do something
```

#### `beforeReset`

The `beforeReset` event is fired before a user password is reset:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.beforeReset do(request, reply)
			# Do something
```

#### `onAuthenticated`

The `onAuthenticated` event is fired after a user is logged in:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onAuthenticated do(request, reply)
			# Do something
```

#### `onRegistered`

The `onRegistered` event is fired after a user is registered:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onRegistered do(request, reply)
			# Do something
```

## Custom Authentication Handlers

Formidable provides an easy way to write your own authentication handlers.

#### `onLogin`

The `onLogin` hook is used to handle the login process:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onLogin do(request, reply)
			# Log the user in
```

#### `onRegister`

The `onRegister` hook is used to handle the registration process:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onRegister do(request, reply)
			# Register the user
```

#### `onForgot`

The `onForgot` hook is used to handle the forgot password process:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onForgot do(request, reply)
			# Send the user a password reset email
```

#### `onReset`

The `onReset` hook is used to handle the password reset process:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onReset do(request, reply)
			# Reset the user's password
```

#### `onVerification`

The `onVerification` hook is used to handle the email verification process:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onVerification do(request, reply)
			# Verify the user's email address
```

#### `onEmailResend`

The `onEmailResend` hook is used to handle the email verification resend process:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth.onEmailResend do(request, reply)
			# Resend the user's email verification email
```

## Authentication Mailers

By default, Formidable provides `VerifyEmail` and `ResetPassword` mailers that can be used to send email verification and password reset emails to your users:

```py title="app/Resolvers/AppServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'
import { VerifyEmail } from '../Mail/VerifyEmail'
import { ResetPassword } from '../Mail/ResetPassword'

export class AppServiceResolver < ServiceResolver

	def boot
		Auth
			.verificationMailer(VerifyEmail)
			.resetPasswordMailer(ResetPassword)

```

## Protecting Routes

Formidable provides an `auth` middleware that can be used to require users to be logged in before accessing a route:

```py
Route.get('ping', do 'pong').middleware(['auth'])
```

### JWT

If you want to use JWT tokens for authentication, you can use the `jwt` middleware:

```py title="app/Resolvers/RouterServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

export class RouterServiceResolver < ServiceResolver

	def boot
		Route.group { middleware: 'jwt' }, do
			Auth.routes!

			require '../../routes/api'

```

When logging your users in, a JWT token will be returned in the response:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5YTNkZWY0MDkxMzFjNThjNGY3NzYwNWU2NjNmYmRmIiwiaWF0IjoxNjM4ODA0NzgyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.A008sYS3973q-6uH2cQbgPf4Xq-v93UCvNLql0knIJ8",
	"type": "Bearer",
	"user": {
		"name": "Donald",
		"email": "donaldpakkies@gmail.com",
		"email_verified_at": null,
		"created_at": "2021-12-06T15:41:48.000Z",
	    "updated_at": "2021-12-06T15:41:48.000Z"
	}
}
```

Now, to access `/ping` you can pass the JWT token in the `Authorization` header as a Bearer token:

```
POST http://localhost:3000/ping
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5YTNkZWY0MDkxMzFjNThjNGY3NzYwNWU2NjNmYmRmIiwiaWF0IjoxNjM4ODA0NzgyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.A008sYS3973q-6uH2cQbgPf4Xq-v93UCvNLql0knIJ8
```

### Session

If you want to use sessions for authentication, you can use the `session` middleware:

```py title="app/Resolvers/RouterServiceResolver.imba"
import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

export class RouterServiceResolver < ServiceResolver

	def boot
		Route.group { middleware: 'session' }, do
			Auth.routes!

			require '../../routes/api'

```

When logging your users in, a new session will be created and a cookie will be set in the response. You may need to set a `X-CSRF-TOKEN` header in your authentication routes if you have CSRF protection enabled:

```
POST http://localhost:3000/login
X-CSRF-TOKEN: qpCuH2vmjhxgcDMkVnzfdV4tsdr9InVBgZzPTOw6Rt3YG8Hz-t1WbthldpuBOV3hrtUGMihiTraU
Content-Type: application/json

{
	"email": "email-address"
	"password": "password"
}
```

See [CSRF Protection](/docs/csrf-protection) for more information.
