---
id: deployment
title: Deployment
---

When you're ready to deploy your Formidable application to production, there are some important things you can do to make sure your application is running as efficiently as possible. In this document, we'll cover some great starting points for making sure your Formidable application is deployed properly.

## Server Requirements

The Formidable framework has a few system requirements. You should ensure that your web server has the following minimum Node version:

* `Node >=14.*`
* `NPM/Yarn`

## Deploy

### Heroku (recommended)

If you aren't quite ready to manage your own server configuration, we recommend using Heroku.

To get started, add a `port` flag and a `host` flag to your start script:

```json
"start": "node craftsman serve --port=${PORT:=3000} --host=${HOST}"
```

Then add a `heroku-postbuild` script:

```json
"heroku-postbuild": "node craftsman config:cache"
```

> This will cache the config.

When done with the initial setup, add production `.env` details to Heroku, that's all!
