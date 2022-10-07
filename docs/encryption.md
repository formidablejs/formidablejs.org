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

<Tabs
    defaultValue={State.runtime}
	groupId="runtime-snippets"
    values={[
        {label: 'Node', value: 'node'},
        {label: 'Bun', value: 'bun'},
    ]}>
<TabItem value="node">

```bash
node craftsman key:generate
```

</TabItem>
<TabItem value="bun">

```bash
bun run craftsman key:generate
```

</TabItem>
</Tabs>
