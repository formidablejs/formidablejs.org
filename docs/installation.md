---
id: installation
title: Installation
slug: /
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

## Meet Formidable

Formidable (or formidablejs) is a modern full-stack framework designed to help you build scalable backend applications with a strong focus on developer experience. With Formidable, you can effortlessly create full-stack Node.js applications using TypeScript or Imba, offering a solid foundation for your projects.

Formidable uses Fastify for optimal performance and scalability, ensuring your application runs efficiently even under heavy loads.

For the frontend, you can choose from popular frameworks like Vue, React, and Svelte, giving you the flexibility to craft modern, dynamic user interfaces with ease.

## Your First Formidable Project

#### Prerequisites {#prerequisites}
Please make sure that [Node.js](https://nodejs.org/) (>= 20.*) is installed on your operating system.

:::info

Please note Formidable is not yet fully compatible with [Bun](https://bun.sh/), but we are working on it.

:::

#### Tooling

For a better development experience, we recommend using the following tools:

1. [VS Code](https://code.visualstudio.com/) - A free and open source code editor for Windows, Mac, and Linux.
2. [Imba Extension](https://marketplace.visualstudio.com/items?itemName=scrimba.vsimba) - VS Code Language support for Imba.

#### Installation {#installation}

You may create a new Formidable project by using the `create-formidable` CLI. After the application has been created, you may start Formidable's local development server using the `dev` script:


<Tabs
    defaultValue={State.manager}
	groupId="code-snippets"
    values={[
        {label: 'npm', value: 'npm'},
        {label: 'pnpm', value: 'pnpm'},
        {label: 'yarn', value: 'yarn'},
        {label: 'bun', value: 'bun'},
    ]}>
<TabItem value="npm">

```bash
npm create formidable@latest example-app

cd example-app

npm run dev
```

For convenience, the Formidable installer can also create a Git repository for your new project. To indicate that you want a Git repository to be created, pass the `--git` flag when creating a new project:

```bash
npm create formidable@latest example-app -- --git
```

This command will initialize a new Git repository for your project.

By default, the `create-formidable` CLI will scaffold your application with TypeScript. If you would like to scaffold your application with Imba, you may pass the `--language` flag and set the value to "imba":

```bash
npm create formidable@latest example-app -- --language imba
```

</TabItem>
<TabItem value="pnpm">

```bash
pnpm create formidable@latest example-app

cd example-app

pnpm run dev
```

For convenience, the Formidable installer can also create a Git repository for your new project. To indicate that you want a Git repository to be created, pass the `--git` flag when creating a new project:

```bash
pnpm create formidable@latest example-app --git
```

This command will initialize a new Git repository for your project.

By default, the `create-formidable` CLI will scaffold your application with TypeScript. If you would like to scaffold your application with Imba, you may pass the `--language` flag and set the value to "imba":

```bash
pnpm create formidable@latest example-app --language imba
```

</TabItem>
<TabItem value="yarn">

```bash
yarn create formidable example-app

cd example-app

yarn run dev
```

For convenience, the Formidable installer can also create a Git repository for your new project. To indicate that you want a Git repository to be created, pass the `--git` flag when creating a new project:

```bash
yarn create formidable example-app --git
```

This command will initialize a new Git repository for your project.

By default, the `create-formidable` CLI will scaffold your application with TypeScript. If you would like to scaffold your application with Imba, you may pass the `--language` flag and set the value to "imba":

```bash
yarn create formidable example-app --language imba
```

</TabItem>
<TabItem value="bun">

```bash
bun create formidable@latest example-app

cd example-app

bun run dev
```

For convenience, the Formidable installer can also create a Git repository for your new project. To indicate that you want a Git repository to be created, pass the `--git` flag when creating a new project:

```bash
bun create formidable@latest example-app --git
```

This command will initialize a new Git repository for your project.

By default, the `create-formidable` CLI will scaffold your application with TypeScript. If you would like to scaffold your application with Imba, you may pass the `--language` flag and set the value to "imba":

```bash
bun create formidable@latest example-app --language imba
```

</TabItem>
</Tabs>

#### Windows Considations

To ensure compatibility and smooth operation on Windows, it is recommended to enable [Developer Mode](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development) or use [Windows Subsystem for Linux (WSL)](https://ubuntu.com/desktop/wsl). This will help avoid potential issues with command execution and file paths that may arise when using the default Command Prompt or PowerShell.

:::info

This is a crucial step for Windows users to avoid potential issues with command execution and file paths that may arise when using the default Command Prompt or PowerShell.

:::

## Initial Configuration

All of the configuration files for the Formidable framework are stored in the `config` directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

#### Environment Based Configuration

Since many of Formidable's configuration option values may vary depending on whether your application is running on your local computer or on a production web server, many important configuration values are defined using the `.env` file that exists at the root of your application.

Your `.env` file and the `bootstrap/cache/config.json` file should not be committed to your application's source control, since each developer / server using your application could require a different environment configuration. Furthermore, this would be a security risk in the event an intruder gains access to your source control repository, since any sensitive credentials would get exposed.

## Next Steps

#### Formidable The API Backend

Formidable may serve as an API backend to a JavaScript single-page application or mobile application. For example, you might use Formidable as an API backend for your Vue.js SPA application. In this context, you may use Formidable to provide authentication and data storage / retrieval for your application.

#### Formidable The Full Stack Framework

Formidable may also serve as a full stack framework. By "full stack" framework we mean that you are going to use Formidable to route requests to your application and render your frontend via Imba views or using a single-page application hybrid technology like Inertia.js.
