# edit-activity-set 

## props 

- `user` ***Object*** (*optional*) 

- `is-logged-in` ***Boolean*** (*optional*) 

- `auth-token` ***Object*** (*optional*) 

- `activity-set-id` ***String*** (*optional*) 

## data 

- `activityData` 

**initial value:** `[object Object]` 

- `status` 

**initial value:** `'loading'` 

- `userData` 

**initial value:** `[object Object]` 

- `userSearch` 

**initial value:** `''` 

- `activities` 

**initial value:** `[object Object]` 

- `activitiesMetadata` 

**initial value:** `[object Object]` 

- `toDelete` 

**initial value:** `[object Object]` 

- `activityTableFields` 

**initial value:** `[object Object]` 

## computed properties 

- `activityId` 

   **dependencies:** `activitySetId` 

- `authorized` 

   **dependencies:** `activityData`, `activityData`, `isEditor`, `activityData`, `isManager`, `activityData`, `status` 

- `isAViewer` 

   **dependencies:** `activityData`, `isViewer`, `activityData` 

- `isAManager` 

   **dependencies:** `activityData`, `isManager`, `activityData` 

- `activitiesTable` 

   **dependencies:** `activities`, `activitiesMetadata`, `activitiesMetadata`, `activitiesMetadata` 


## methods 

- `getImageURL(id)` 

- `getActivitySet()` 

- `getUserMetadata(userId)` 

- `isEditor(activity)` 

- `isManager(activity)` 

- `isViewer(activity)` 

- `updateMetadata()` 

- `createNewActivity()` 

- `removeActivity(stage)` 

- `deleteActivity(id)` 

