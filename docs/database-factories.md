---
id: database-factories
title: Factories
---

# Factories

Formidable provides a simple way to generate fake data for your application using [Faker](https://fakerjs.dev/). You can use this to create fake data for your Repositories or Tables, which is useful for testing and seeding your database.

## Creating Factories

You can create a factory using the `make:factory` [Craftsman command](/docs/craftsman). This will generate a new factory class in the `database/factories` directory.

```bash
node craftsman make:factory TaskFactory
```

This will create a new factory class named `TaskFactory`. You can then use this class to define fake data for the corresponding Repository or Table::

```ts showLineNumbers
import {Factory} from '@formidablejs/framework'

export class TaskFactory extends Factory {
	async definition(): Promise<any> {
		return {
			name: this.faker().lorem.sentence(),
			description: this.faker().lorem.paragraph(),
			completed: false,
		}
	}
}
```

## Using Factories

Factories can be used to create and insert records into your database.

### Creating a Single Record

```ts showLineNumbers
await TaskFactory.factory().create()
```

### Creating Multiple Records

Use the `count` method to specify how many records to generate:

```ts showLineNumbers
await TaskFactory.factory().count(10).create()
```

### Resetting the Table

You can reset the table before seeding data:

```ts showLineNumbers
await TaskFactory.factory().reset().create()
```

This will delete all existing records before inserting new ones.

## Using States

States allow you to define different variations of the same factory. This is useful for representing different scenarios or states of a model.

### Defining a State

```ts title="database/factories/TaskFactory.ts" showLineNumbers
import {Factory} from '@formidablejs/framework'

export class TaskFactory extends Factory {
	async definition(): Promise<any> {
		return {
			name: this.faker().lorem.sentence(),
			description: this.faker().lorem.paragraph(),
			completed: false,
		}
	}

	public completed() {
		return this.state({
			completed: true,
		})
	}
}
```

### Using a State

```ts showLineNumbers
await TaskFactory.factory().completed().create()
```

This will create a task record with the `completed` field set to `true`.

## Using Factories with Seeders

You can use factories inside seeders to populate your database with test data:

```ts title="database/seeders/DatabaseSeeder.ts" showLineNumbers
import {type Database} from '@formidablejs/framework'
import {TaskFactory} from '../factories/TaskFactory'

export const seed = async (DB: Database): Promise<void> => {
	await TaskFactory.factory().reset().count(10).create()
}
```
