---
id: installation
title: Installation
slug: /
---

# Introduction

Formidable (or formidablejs) is a Laravel inspired API framework for building backend applications. It uses Imba and supports JavaScript and TypeScript, meaning you don't have to completely ditch your favorite languages while getting up to speed with Imba.

Formidable uses [Fastify](https://www.fastify.io/) under the hood.

## Installation {#installation}

To get started, you need to install the Craftsman CLI. The Craftsman CLI will allow you to create new projects, and also provides a number of helpful commands that can assist you while building your application.

#### Your first Formidable Application {#your-first-formidable-application}

When creating a new application, the Craftsman CLI will clone the `formidablejs/formidablejs` repository from Github and install all the dependencies for you.

```
npm i -g @formidablejs/craftsman
craftsman new project-name
```

> To create a fullstack application, see [Frontend Development](frontend#installation--setup).

Once done, you can run your application using the following command.

```
cd project-name
npm run start
```

Open your browser and navigate to `http://localhost:3000/`.
