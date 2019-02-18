# manage 

## props 

- `user` ***Object*** (*optional*) 

- `is-logged-in` ***Boolean*** (*optional*) 

- `auth-token` ***Object*** (*optional*) 

- `activity-set-id` ***String*** (*optional*) 

## data 

- `status` 

**initial value:** `'loading'` 

- `activityData` 

**initial value:** `[object Object]` 

- `userData` 

**initial value:** `[object Object]` 

- `access` 

**initial value:** `[object Object]` 

- `tableFields` 

**initial value:** `[object Object]` 

- `viewerTableFields` 

**initial value:** `[object Object]` 

- `currentTab` 

**initial value:** `0` 

- `allUsers` 

**initial value:** `[object Object]` 

- `form` 

**initial value:** `[object Object]` 

## computed properties 

- `activityId` 

   **dependencies:** `$route` 

- `authorized` 

   **dependencies:** `activityData`, `activityData`, `isEditor`, `activityData`, `isManager`, `activityData`, `status` 

- `isAViewer` 

   **dependencies:** `activityData`, `isViewer`, `activityData` 

- `isAnEditor` 

   **dependencies:** `activityData`, `isEditor`, `activityData` 

- `numViewers` 

   **dependencies:** `activityData` 

- `editorTable` 

   **dependencies:** `activityData`, `activityData`, `userData`, `userData` 

- `managerTable` 

   **dependencies:** `activityData`, `activityData`, `userData`, `userData` 

- `userTable` 

   **dependencies:** `activityData`, `activityData`, `userData`, `userData` 

- `validUsersToView` 

   **dependencies:** `allUsers`, `activityData` 

- `viewerTable` 

   **dependencies:** `activityData`, `activityData`, `userData`, `userData`, `activityData`, `activityData`, `userData` 

- `validated` 

   **dependencies:** `form`, `form` 


## methods 

- `getActivitySet()` 

- `getAllUserMetadata()` 

  For all userId's in this.activityData.meta.members, get their metadata
  and store it in this.userData[userId] 

- `getUserMetadata(userId)` 

- `isEditor(activity)` 

- `isManager(activity)` 

- `isViewer(activity)` 

- `removeUser(role, data)` 

- `removeViewer(role, data)` 

- `setTab(index)` 

- `getAllUsers()` 

- `addUser(role, data)` 

- `addViewer(role, data)` 

- `inviteUser(role, data)` 

- `getActivitySetAccess()` 

- `addUserToViewer()` 

- `removeUserFromViewer()` 

