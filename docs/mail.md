---
id: mail
title: Mail
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Formidable provides a clean, simple email API powered by the popular [Nodemailer](https://nodemailer.com/) library. [Nodemailer](https://nodemailer.com/) provide drivers for sending email via SMTP, Amazon SES, and sendmail, allowing you to quickly get started sending mail through a local or cloud based service of your choice.

### Configuration

Formidable's email services may be configured via your application's `config/mail.imba` configuration file. Each mailer configured within this file may have its own unique configuration and even its own unique "transport", allowing your application to use different email services to send certain email messages.

Within your `mail` configuration file, you will find a `mailers` configuration object. This object contains a sample configuration entry for each of the major mail drivers / transports supported by Formidable, while the default configuration value determines which mailer will be used by default when your application needs to send an email message.

## Generating Mailables

When building Formidable applications, each type of email sent by your application is represented as a "mailable" class. These classes are stored in the `app/Mail` directory. Don't worry if you don't see this directory in your application, since it will be generated for you when you create your first mailable class using the `make:mail` Craftsman command:

```bash
node craftsman make:mail SubscribedToEventNotifications
```

## Sending Raw Emails

Here's an example of how to send an email:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').raw('This is a test email')
```

</TabItem>
<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').raw('This is a test email')
```

</TabItem>
</Tabs>

## Sending Attachments

Here's an example of how to send an email with an attachment:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example').attach({ path: file }).raw('This is a test email')
```

</TabItem>
<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file: string = path.join(process.cwd(), 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example').attach({ path: file }).raw('This is a test email')
```

</TabItem>
</Tabs>

You can also send multiple attachments:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({ path: formidableLogo })
	.attach({ path: imbaLogo })
	.raw('This is a test email')
```

</TabItem>
<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo: string = path.join(process.cwd(), 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo: string = path.join(process.cwd(), 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({ path: formidableLogo })
	.attach({ path: imbaLogo })
	.raw('This is a test email')
```

</TabItem>
</Tabs>

You may also pass an array of attachments instead of a single attachment each time you call `attach`:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo: string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo: string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach([
		{ path: formidableLogo }
		{ path: imbaLogo }
	])
	.raw('This is a test email')
```

</TabItem>
<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const formidableLogo: string = path.join(process.cwd(), 'storage', 'framework', 'logos', 'formidable.png')
const imbaLogo: string = path.join(process.cwd(), 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach([
		{ path: formidableLogo }
		{ path: imbaLogo }
	])
	.raw('This is a test email')
```

</TabItem>
</Tabs>

Attachment object consists of the following properties:

* **filename** - filename to be reported as the name of the attached file. Use of unicode is allowed.
* **content** - String, Buffer or a Stream contents for the attachment
* **path** - path to the file if you want to stream the file instead of including it (better for larger attachments)
* **href** – an URL to the file (data uris are allowed as well)
* **httpHeaders** - optional HTTP headers to pass on with the href request, eg. {authorization: "bearer ..."}
* **contentType** - optional content type for the attachment, if not set will be derived from the filename property
* **contentDisposition** - optional content disposition type for the attachment, defaults to ‘attachment’
* **cid** - optional content id for using inline images in HTML message source
* **encoding** - If set and content is string, then encodes the content to a Buffer using the specified encoding. Example values: ‘base64’, ‘hex’, ‘binary’ etc. Useful if you want to use binary attachments in a JSON formatted email object.
* **headers** - custom headers for the attachment node. Same usage as with message headers
* **raw** - is an optional special value that overrides entire contents of current mime node including mime headers. Useful if you want to prepare node contents yourself

## Embedding Images

Attachments can be used as embedded images in the HTML body. To use this feature, you need to set additional property of the attachment - `cid` (unique identifier of the file) which is a reference to the attachment file. The same `cid` value must be used as the image URL in HTML (using `cid:` as the URL protocol, see example below):

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({
		filename: 'imba.png',
		path: file,
		cid: 'imba',
	})
	.raw('Embedded image: <img src="cid:imba"/>')
```

</TabItem>
<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'
import path from 'path'

const file: string = path.join(process.cwd(), 'storage', 'framework', 'logos', 'imba.png')

Mail.to('email@example')
	.attach({
		filename: 'imba.png',
		path: file,
		cid: 'imba',
	})
	.raw('Embedded image: <img src="cid:imba"/>')
```

</TabItem>
</Tabs>

:::note

the `cid` must be unique for each attachment.

:::

## Events

### onSuccess

`onSuccess` runs if the email was successfully sent:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'
import type { SentMessageInfo } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onSuccess: do(response\SentMessageInfo)
		console.log response.messageId
})
```

</TabItem>

<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'
import type { SentMessageInfo } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onSuccess: (response: SentMessageInfo) => {
		console.log(response.messageId)
	}
})
```

</TabItem>
</Tabs>

### onError

`onError` runs when the email fails:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onError: do(reason)
		console.log reason
})
```

</TabItem>

<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onError: (reason) => {
		console.log reason
	}
})
```

</TabItem>
</Tabs>

### onComplete

`onComplete` runs when the email is task is done:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
import { Mail } from '@formidablejs/mailer'
import type { SentMessageInfo } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onComplete: do
		console.log 'done'
})
```

</TabItem>

<TabItem value="ts">

```ts
import { Mail } from '@formidablejs/mailer'
import type { SentMessageInfo } from '@formidablejs/mailer'

Mail.to('email@example').send(new Welcome, {
	onComplete: () => {
		console.log('done')
	}
})
```

</TabItem>
</Tabs>

## Sending HTML Emails

Before you can start sending html emails, you will need to create a new Mailable. All Mailables must extend the `Mailable` class:

```py
import { Mailable } from '@formidablejs/mailer'

export default WelcomeEmail < Mailable

	prop subject\string
	prop name\string

	def constructor name\string
		super()

		self.subject = 'Welcome to Formidable'
		self.name = name

	def render
		<p> "Welcome to Formidable, {self.name}"
```

Now that you've created a Mailable, you can use the `send` method of the `Mail` class to send it:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```js
Mail.to('email@example').send(new WelcomeEmail)
```

</TabItem>
<TabItem value="ts">

```ts
Mail.to('email@example').send(new WelcomeEmail)
```

</TabItem>
</Tabs>

### Attachments

You can attach files to the email by passing an array of attachment objects or a single object to the `attach` method:

```js
import { Mailable } from '@formidablejs/mailer'
import path from 'path'

export default WelcomeEmail < Mailable

	prop subject\string
	prop name\string

	def constructor name\string
		super()

		self.subject = 'Welcome to Formidable'
		self.name = name

		const file\string = path.join(process.cwd!, 'storage', 'framework', 'logos', 'imba.png')

		self.attach({ path: file })

	def render
		<p> "Welcome to Formidable, {self.name}"
```

## Mail API

Here is a list of all the methods available on the `Mail` class.

 Method    | Params                                  | Description
-----------|:----------------------------------------|:------------------------------------------
 `to`      | `recipient: String[] or String`         | Recipients of the email.
 `cc`      | `recipient: String[] or String`         | Carbon copy recipients of the email.
 `bcc`     | `recipient: String[] or String`         | Blind carbon copy recipients of the email.
 `from`    | `name: String, email: String`           | Sender of the email.
 `replyTo` | `email: String`                         | Reply to address of the email.
 `attach`  | `Object[] or Object`                    | Add attachments to the email.
 `raw`     | `content: String; text: String or null` | Raw email content.
 `subject` | `subject: String`                       | Subject of the email.
 `send`    | `mailable: Mailable`                    | Send the email with a Mailable class.

> This section is incomplete. Join our [discord](https://discord.gg/QdXM7eV5Yj) if you have questions.
