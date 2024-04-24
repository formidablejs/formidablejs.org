---
id: scheduling
title: Task Scheduling
---

import State from '../src/state/State'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Task Scheduling

Formidable's Task Scheduler provides an easy and manageable way of defining and scheduling cron jobs. The Task Scheduler allows you to expressively define your tasks with your application.
All scheduled tasks are defined in the `app/Console/Kernel.imba` or `app/Console/Kernel.ts` files, in the `schedule` method.

## Defining Schedules

You may define all of your scheduled tasks in the `schedule` method of your application's `app/Console/Kernel.imba`or `app/Console/Kernel.ts` files. To get started, let's take a look at an example. In this example, we will schedule a task to be called every day. Within the task's callback we will execute a database query to clear a table:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Console/Kernel.imba"
import { ConsoleKernel } from '@formidablejs/framework'
import { DB } from '@formidablejs/framework'
import { Schedule } from '@formidablejs/scheduler'

export class Kernel < ConsoleKernel
	get registered
		return [

        ]

	# Define the application's command schedule.
	schedule schedule\Schedule
		schedule.call(do
			DB.table('recent_users').delete!
		).everyDay!
```

</TabItem>
<TabItem value="ts">

```typescript title="app/Console/Kernel.ts"
import { ConsoleKernel } from '@formidablejs/framework'
import { DB } from '@formidablejs/framework'
import { Schedule } from '@formidablejs/scheduler'

export class Kernel extends ConsoleKernel {
	get registered(): Array<object> {
		return [
			//
		]
	}

	/**
	 * Define the application's command schedule.
	 */
	schedule(schedule: Schedule): void {
		schedule.call(() => {
			DB.table('recent_users').delete()
		}).everyDay()
	}
}
```

</TabItem>
</Tabs>

If you would like to view an overview of your scheduled tasks and the next time they are scheduled to run, you may use the `schedule:list` Craftsman command:

```bash
node craftsman schedule:list
```

### Schedule Frequency Options

Below is a list of available methods you can use:

 Method             | Description                                                          | Example
--------------------|----------------------------------------------------------------------|-------------------------
 `every`            | Run the task every `nth` Time                                        | `.every(5).minutes()`
 ` `                |                                                                      | `.every(2).hours()`
 ` `                |                                                                      | `.every(4).days()`
 `everyMinute`      | Run the task every minute                                            | `.everyMinute()`
 `everyHour`        | Run the task every hour                                              | `.everyHour()`
 `everyHourAt`      | Run the task every hour at the 20th minute                           | `.everyHourAt(20)`
 `everyDay`         | Run the task every day                                               | `.everyDay()`
 `everyDayAt`       | Run the task every day at 13th hour                                  | `.everyDayAt(13)`
 ` `                | Run the task every day at 13th hour and 20th minute                  | `.everyDayAt(13, 20)`
 `everySunday`      | Run the task every Sunday                                            | `.everySunday()`
 `everySundayAt`    | Run the task every Sunday at 8th hour                                | `.everySundayAt(8)`
 ` `                | Run the task every Sunday at 8th hour and 20th minute                | `.everySundayAt(8, 20)`
 `everyMonday`      | Run the task every Monday                                            | `.everyMonday()`
 `everyMondayAt`    | Run the task every Monday at 8th hour                                | `.everyMondayAt(8)`
 ` `                | Run the task every Monday at 8th hour and 20th minute                | `.everyMondayAt(8, 20)`
 `everyTuesday`     | Run the task every Tuesday                                           | `.everyTuesday()`
 `everyTuesdayAt`   | Run the task every Tuesday at 8th hour                               | `.everyTuesdayAt(8)`
 ` `                | Run the task every Tuesday at 8th hour and 20th minute               | `.everyTuesdayAt(8, 20)`
 `everyWednesday`   | Run the task every Wednesday                                         | `.everyWednesday()`
 `everyWednesdayAt` | Run the task every Wednesday at 8th hour                             | `.everyWednesdayAt(8)`
 ` `                | Run the task every Wednesday at 8th hour and 20th minute             | `.everyWednesdayAt(8, 20)`
 `everyThursday`    | Run the task every Thursday                                          | `.everyThursday()`
 `everyThursdayAt`  | Run the task every Thursday at 8th hour                              | `.everyThursdayAt(8)`
 ` `                | Run the task every Thursday at 8th hour and 20th minute              | `.everyThursdayAt(8, 20)`
 `everyFriday`      | Run the task every Friday                                            | `.everyFriday()`
 `everyFridayAt`    | Run the task every Friday at 8th hour                                | `.everyFridayAt(8)`
 ` `                | Run the task every Friday at 8th hour and 20th minute                | `.everyFridayAt(8, 20)`
 `everySaturday`    | Run the task every Saturday                                          | `.everySaturday()`
 `everySaturdayAt`  | Run the task every Saturday at 8th hour                              | `.everySaturdayAt(8)`
 ` `                | Run the task every Saturday at 8th hour and 20th minute              | `.everyFridayAt(8, 20)`
 `onSpecificDays`   | Run the task every Monday and Friday                                 | `.onSpecificDays(['monday', 'friday'])`
 `onSpecificDaysAt` | Run the task every Monday and Friday at the 8th hour                 | `.onSpecificDays(['monday', 'friday'], 8)`
 ` `                | Run the task every Monday and Friday at the 8th hour and 20th minute | `.onSpecificDays(['monday', 'friday'], 8)`
 ` `                | Run the task every Monday and Friday at the 8th hour and 20th minute | `.onSpecificDays(['monday', 'friday'], 8, 20)`

> List incomplete

### Timezones

Using the `timezone` method, you may specify that a scheduled task's time should be interpreted within a given timezone:

<Tabs
    defaultValue={State.language}
	groupId="code-snippets"
    values={[
        {label: 'Imba', value: 'imba'},
        {label: 'TypeScript', value: 'ts'},
    ]}>
<TabItem value="imba">

```py title="app/Console/Kernel.imba"
schedule.call(do
    DB.table('recent_users').delete!
).timezone('Pacific/Funafuti').everyDay!
```

</TabItem>
<TabItem value="ts">

```typescript title="app/Console/Kernel.ts"
schedule.call(() => {
    DB.table('recent_users').delete()
}).timezone('Pacific/Funafuti').everyDay()
```

</TabItem>
</Tabs>

## Running The Scheduler

Now that we have learned how to define scheduled tasks, let's discuss how to actually run them on our server. The `schedule:work` Craftsman command will evaluate all of your scheduled tasks and determine if they need to run based on the server's current time:

```bash
node craftsman schedule:work
```

When not testing, you can use `pm2` to run the scheduled tasks in the background:

```bash
pm2 start "node craftsman schedule:work"
```

### Crontab Based Task Scheduling (Optional)

If you would like to define your scheduled tasks using the server's `cron` facility and not use `pm2`, you may use the `schedule:run` command. This command will evaluate all of your scheduled tasks and run the tasks that are due.

Before getting started, make sure you have aliased current node version to `/usr/bin/node` (if you don't have it installed globally yet):

```bash
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
```

Then, make sure the `craftsman` cli in your project is executable:

```bash
chmod +x craftsman
```

Finally, add cron entry to your server by running the following command:

```bash
crontab -e
```

Add the following line to the crontab file:

```bash
* * * * * cd /path-to-your-project && node craftsman --MODE=production schedule:run >> /dev/null 2>&1
```

This Cron will call the `schedule:run` command every minute. When the `schedule:run` command is called, Formidable will evaluate your scheduled tasks and run the tasks that are due.

:::note

When running the scheduler in a production environment, you should ensure that you have built your project for production using `npm run build`.

:::
