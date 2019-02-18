# activity-sets 

This is the main dashboard to view all the activity sets for a user. 

## props 

- `auth-token` ***Object*** (*optional*) 

  auth token from auth route. 

- `is-logged-in` ***Boolean*** (*optional*) 

  boolean that tells us if user is logged in. 

- `user` ***Object*** (*optional*) 

  user data from auth route 

## data 

- `status` 

  status to show loading component or not. 

**initial value:** `'loading'` 

- `allActivitySets` 

  a list of all activity sets 

**initial value:** `[object Object]` 

- `userTableFields` 

  the fields to show in the "your activity sets table" 

**initial value:** `[object Object]` 

- `remainingTableFields` 

  the fields to show in the public activity sets you can't edit 

**initial value:** `[object Object]` 

- `toDelete` 

  stage an activity set data for deletion 

**initial value:** `[object Object]` 

- `error` 

  if there is an error in grabbing activity sets, store the message here. 

**initial value:** `[object Object]` 

## computed properties 

- `token` 

  quick reference for authtoken. 

   **dependencies:** `authToken` 

- `userActivitySets` 

  grab the activity sets that this user has access to 

   **dependencies:** `isLoggedIn`, `allActivitySets`, `isEditor`, `isManager`, `isViewer` 

- `remainingActivitySets` 

  the activity sets that the user doesn't have access to 

   **dependencies:** `isLoggedIn`, `allActivitySets`, `allActivitySets`, `isEditor`, `isManager`, `isViewer` 

- `userActivityMeta` 

  get the metadata for each activity set the user has access to 

   **dependencies:** `userActivitySets` 

- `userActivityTable` 

  activity set data formatted for the bootstrap-vue table component. 

   **dependencies:** `userActivityMeta`, `getRole`, `userActivitySets`, `userActivitySets` 

- `remainingActivityMeta` 

  metadata for the remaining activity sets. 

   **dependencies:** `remainingActivitySets` 

- `remainingActivityTable` 

  bootstrap-vue formatted metadata for the table 

   **dependencies:** `remainingActivityMeta` 


## methods 

- `isEditor(activity)` 

  whether or tnot the user is an editor. 

- `isManager(activity)` 

  is user a manager, 

- `isViewer(activity)` 

  is user a viewer 

- `getRole(activity)` 

  get the various roles of the user, return a list. 

- `getImageURL(id)` 

  get the image URL from the server 

- `createNewActivitySet()` 

  create a new activity set by talking to the seriver.
  if successful, rotue to the edit activity set screen
  if not, show an error. 

- `deleteActivitySet(item)` 

  show the delete activity set modal to make sure 

- `removeActivitySet()` 

  TODO: actually delete the activity set on the server. 

