# activity-sets 

This is the main dashboard to view all the applets for a user. 

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

  a list of all applets 

**initial value:** `[object Object]` 

- `userTableFields` 

  the fields to show in the "your applets table" 

**initial value:** `[object Object]` 

- `remainingTableFields` 

  the fields to show in the public applets you can't edit 

**initial value:** `[object Object]` 

- `toDelete` 

  stage an applet data for deletion 

**initial value:** `[object Object]` 

- `error` 

  if there is an error in grabbing applets, store the message here. 

**initial value:** `[object Object]` 

## computed properties 

- `token` 

  quick reference for authtoken. 

   **dependencies:** `authToken` 

- `userActivitySets` 

  grab the applets that this user has access to 

   **dependencies:** `isLoggedIn`, `allActivitySets`, `isEditor`, `isManager`, `isViewer` 

- `remainingActivitySets` 

  the applets that the user doesn't have access to 

   **dependencies:** `isLoggedIn`, `allActivitySets`, `allActivitySets`, `isEditor`, `isManager`, `isViewer` 

- `userActivityMeta` 

  get the metadata for each applet the user has access to 

   **dependencies:** `userActivitySets` 

- `userActivityTable` 

  applet data formatted for the bootstrap-vue table component. 

   **dependencies:** `userActivityMeta`, `getRole`, `userActivitySets`, `userActivitySets` 

- `remainingActivityMeta` 

  metadata for the remaining applets. 

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

  create a new applet by talking to the seriver.
  if successful, rotue to the edit applet screen
  if not, show an error. 

- `deleteActivitySet(item)` 

  show the delete applet modal to make sure 

- `removeActivitySet()` 

  TODO: actually delete the applet on the server. 

