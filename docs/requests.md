---
id: requests
title: Requests
---

# HTTP Requests

## Accessing The Request {#accessing-the-request}

Formidable loads requests to route actions as first parameters by default:

```py
export default class TaskController < Controller

	def store request
		const description = request.get('description')
```

#### Dependency Injection & Route Parameters {#dependency-injection--route-parameters}

Will continue...
