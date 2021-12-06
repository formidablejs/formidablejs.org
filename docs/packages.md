---
id: packages
title: Package Development
---

# Package Development

Formidable provides an easy way of letting developers extend the framework. This is a great way of building in features that aren't bundled with the framework. For example, the [Pretty Errors](https://github.com/formidablejs/pretty-errors) package adds a new view that gets displayed when there's an error. This view will only get triggered if the application is in `debug` mode.

## Package Registration

### Service Resolver

We can create a service resolver in our package that adds a route that returns a random quote:

```py title="src/QuotesServiceResolver.imba"
import { Route } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class QuotesServiceResolver

	def boot
		Route.get 'quote', do
			const key = Math.floor(Math.random! * (2 - 1 + 1))

			self.quotes[key] ?? 'Could not find a quote'

	get quotes
		[
			'Computers are good at following instructions, but not at reading your mind.'
			'UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.'
		]
```

We can then register the resolver in a formidable application in the `config/app.imba` config file:

```py title="config/app.imba" {1,8}
import { QuotesServiceResolver } from '<custom-package>'
...

export default {
	...
	resolvers: {
		...
		QuotesServiceResolver
```

Once the resolver has been registered, you can access `/quote` in the browser, and you will see any of the 2 quotes you added above.

### Publisher

Before a package can be used by Formidable, it needs to be registered. This means a package can be easily turned off and removed from the application boot cycle.

You can ship framework files such as a `config` file, along with your package. This can be done by including a `Package.js` file in your package:

```js title="formidable/Package.js" {2,4}
exports.Package = class Package {
	publish() {
		return {
			config: {
				paths: {
					'config/bugsnag.imba': './formidable/config/bugsnag.imba'
				}
			}
		}
	}
}
```

For formidable to be aware of the `Package.js` file, you must include it in the `package.json` npm file with the key `publisher`:

```json title="package.json" {4}
{
	"name": "my-package",
	"version": "1.0.0",
	"publisher": "formidable/Package.js",
	...
```

The `Package.js` file contains a `publish` function which should always return an object. In this object, you can specify the files that must be copied from the package to the framework.

e.g. The package above will copy the `formidable/config/bugsnag.imba` file from the package to `config` folder in a formidable application when running the publish [Craftsman](docs/craftsman) command:

```
craftsman publish --package=<package-name> --tags=config
```

 flag        | description
:-----------:|:---------------------------------------
 `--package` | npm package that should be published.
 `--tags`    | tags that should be published - paths returned by the `publish` function

