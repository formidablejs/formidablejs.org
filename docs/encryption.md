---
id: encryption
title: Encryption
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Encryption

Before running your application for the first time, you will need to set an application key. This key is used for encrypting and decrypting session data and jwt tokens.

To set the application key, run the following command:

```bash
node craftsman key:generate
```
