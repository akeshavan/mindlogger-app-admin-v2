# view-activity 

## props 

- `user` ***Object*** (*optional*) 

- `is-logged-in` ***Boolean*** (*optional*) 

- `auth-token` ***Object*** (*optional*) 

## data 

- `activityData` 

**initial value:** `[object Object]` 

- `status` 

**initial value:** `'loading'` 

- `error` 

**initial value:** `[object Object]` 

- `userData` 

**initial value:** `[object Object]` 

- `userSearch` 

**initial value:** `''` 

## computed properties 

- `activityId` 

   **dependencies:** `$route` 

- `viewableUsers` 

   **dependencies:** `userData`, `activityData`, `user` 

- `currentRoute` 

   **dependencies:** `$router` 

- `isAnEditor` 

   **dependencies:** `activityData`, `isEditor`, `activityData` 

- `isAManager` 

   **dependencies:** `activityData`, `isManager`, `activityData` 

- `searchUsers` 

   **dependencies:** `userSearch`, `viewableUsers`, `viewableUsers`, `userData`, `userData`, `userSearch` 


## methods 

- `getActivitySet()` 

- `isViewer(activity)` 

- `isEditor(activity)` 

- `isManager(activity)` 

- `getUserMetadata(userId)` 

- `mount()` 

