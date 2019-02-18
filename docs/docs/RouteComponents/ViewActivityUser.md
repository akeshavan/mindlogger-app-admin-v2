# view-activity-user 

## props 

- `auth-token` ***Object*** (*optional*) 

- `activity-data` ***Object*** (*optional*) 

## data 

- `userMetaData` 

**initial value:** `[object Object]` 

- `userData` 

**initial value:** `[object Object]` 

- `status` 

**initial value:** `'loading'` 

- `error` 

**initial value:** `[object Object]` 

- `globalDateRange` 

**initial value:** `null` 

- `filterDateRange` 

**initial value:** `null` 

## computed properties 

- `userId` 

   **dependencies:** `$route` 

- `activities` 

   **dependencies:** `userData` 

- `activitiesArray` 

   **dependencies:** `activities` 


## methods 

- `getUserMetadata()` 

- `getUserData()` 

- `scrollTo(hashtag)` 

- `setGlobalDateRange(dateRange)` 

- `setFilterDateRange(dateRange)` 

- `getColorArr(i)` 

