---
id: localization
title: Localization
---

Formidable's localization features provide a convenient way to retrieve strings in various languages, allowing you to easily support multiple languages within your application.

Formidable provides an easy and convenient way to manage translation strings. Language strings may be stored in files within the `resources/lang` directory:

```test
.
└── resources
    └── lang
        ├── en
            └── messages.json
        └── es
            └── messages.json
```

## Configuring The Locale

The default language for your application is stored in the `config/app.imba` configuration file's `locale` configuration option. You are free to modify this value to suit the needs of your application.

You may modify the default language for a single HTTP request at runtime using the `setLocale` method provided by the `Request` instance:

```py
Route.get '/test/:locale', do(request\Request)
	if !['en', 'es'].includes(request.param('locale'))
		throw new HttpException('Bad request', 400)
	
	request.setLocale(request.param('locale'))

	# do something
```

For API development, you may use the `lang` middleware. This middleware looks for the `Accept-Language` header and sets the `locale` based on the value:

```py
Route.get('/', do(request\Request)
	request.translate 'index.hello', 'Hello World'
).name('hello').middleware(['lang'])
```

You may configure a "fallback language", which will be used when the active language does not contain a given translation string. Like the default language, the fallback language is also configured in the `config/app.imba` configuration file:

```py
# --------------------------------------------------------------------------
# Application Fallback Locale
# --------------------------------------------------------------------------
#
# The fallback locale determines the locale to use when the current one
# is not available. You may change the value to correspond to any of
# the language folders that are provided through your application.

fallback_locale: 'en'
```

### Determining The Current Locale

You may use the `locale` method on the `Request` instance to determine the current locale:

```py
Route.get '/', do(request\Request)
	const locale = request.locale!
```

## Defining Translation Strings

Typically, translation strings are stored in files within the `resources/lang` directory. Within this directory, there should be a subdirectory for each language supported by your application:

```text
.
└── resources
    └── lang
        ├── en
            └── messages.json
        └── es
            └── messages.json
```

All language files return an object of keyed strings. For example:

```json title="resources/lang/en/messages.json"
{
	"welcome": "Welcome to our application"
}
```

## Retrieving Translation Strings

You may retrieve translation strings from your language files using the `__` or `translate` methods from a `Request` instance. You should pass the file that contains the key and the key itself to the `__` or `translate` methods using "dot" syntax. For example, let's retrieve the welcome translation string from the `resources/lang/en/messages.json` language file:

```py
Route.get '/', do(request\Request)
	request.__('messages.welcome')
```

If the specified translation string does not exist, the `__` or `translate` methods will return the a `null` value. You can however, pass a default string if the key passed returned `null`:

```py
Route.get '/', do(request\Request)
	request.__('messages.welcome', 'Welcome to our application')
```

For translation within views, you can also use the `__` or `translate` methods:

```py
import { View } from '@formidablejs/framework'

export class Welcome < View

	def render
		<html>
			<body>
				<h1> __('messages.welcome')

```